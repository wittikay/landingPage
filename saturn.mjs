const TAU = Math.PI * 2;
const RADIUS = 130;
const RING_FLATTENING = 80 / 235;
const VIEW_COS = Math.sqrt(1 - RING_FLATTENING ** 2);
const radians = degrees => degrees * Math.PI / 180;
const coordinate = value => value.toFixed(2);

// Fixed viewing angle. Longitude changes; the axis and illumination do not.
export function projectSurface(latitude, longitude) {
  const circle = Math.cos(latitude);
  return {
    x: 300 + RADIUS * circle * Math.sin(longitude),
    y: 300 + RADIUS * (-Math.sin(latitude) * VIEW_COS + circle * Math.cos(longitude) * RING_FLATTENING),
    depth: Math.sin(latitude) * RING_FLATTENING + circle * Math.cos(longitude) * VIEW_COS,
  };
}

function visiblePolygon(points) {
  const visible = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    if (a.depth >= 0) visible.push(a);
    if ((a.depth >= 0) !== (b.depth >= 0)) {
      const t = a.depth / (a.depth - b.depth);
      visible.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return visible.length < 3 ? '' : visible.map((point, i) => `${i ? 'L' : 'M'}${coordinate(point.x)} ${coordinate(point.y)}`).join('') + 'Z';
}

const cloudDetails = [
  [-43, 12, 42, 3], [-43, 158, 55, 2], [-43, 265, 31, 3],
  [-24, 58, 60, 3], [-24, 205, 45, 2], [-24, 322, 38, 3],
  [-8, 4, 52, 4], [-8, 133, 42, 3], [-8, 255, 60, 3],
  [11, 74, 48, 3], [11, 210, 65, 4], [11, 337, 38, 3],
  [29, 28, 55, 3], [29, 170, 42, 2], [29, 285, 48, 3],
  [46, 88, 50, 2], [46, 219, 38, 3], [46, 330, 40, 2],
];

function cloudShape([latitude, longitude, width, height], phase) {
  const points = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    points.push(projectSurface(radians(latitude + height * Math.sin(Math.PI * t)), radians(longitude + width * (t - .5)) + phase));
  }
  for (let i = 12; i >= 0; i--) {
    const t = i / 12;
    points.push(projectSurface(radians(latitude - height * Math.sin(Math.PI * t)), radians(longitude + width * (t - .5)) + phase));
  }
  return visiblePolygon(points);
}

const ringDetails = Array.from({ length: 16 }, (_, i) => ({
  radius: i % 2 ? 243 : 227,
  phase: i * 2.39996,
  width: .10 + (i % 4) * .05,
  thickness: 6 + i % 3,
}));

function ringShape(detail, seconds) {
  // Independent orbital periods, with the outer material moving more slowly.
  // Time is compressed for the illustration, not a scientific time scale.
  const angle = detail.phase - TAU * seconds / (32 * (detail.radius / 230) ** 1.5);
  const points = [];
  for (const side of [1, -1]) {
    for (let i = 0; i <= 8; i++) {
      const t = side === 1 ? i / 8 : 1 - i / 8;
      const theta = angle + detail.width * (t - .5);
      const radius = detail.radius + side * detail.thickness / 2;
      points.push(`${coordinate(300 + radius * Math.cos(theta))} ${coordinate(300 + radius * Math.sin(theta) * RING_FLATTENING)}`);
    }
  }
  return `M${points.join('L')}Z`;
}

export function frameAt(seconds) {
  const phase = TAU * (seconds % 24) / 24;
  return {
    clouds: cloudDetails.map((detail, i) => ({ d: cloudShape(detail, phase), fill: i % 3 ? '#eef5fb' : '#173650', opacity: i % 3 ? .46 : .40 })),
    rings: ringDetails.map((detail, i) => ({ d: ringShape(detail, seconds), fill: i % 3 ? '#f5f8fc' : '#142c44', opacity: i % 3 ? .82 : .70 })),
  };
}

export function createSaturnPlayer(paint, clock = globalThis) {
  let running = false, request = null, previous = null, painted = null, elapsed = 0;
  paint(frameAt(0));
  function tick(now) {
    if (!running) return;
    if (previous !== null) elapsed += (now - previous) / 1000;
    previous = now;
    if (painted === null || now - painted >= 1000 / 30) {
      paint(frameAt(elapsed));
      painted = now;
    }
    request = clock.requestAnimationFrame(tick);
  }
  return next => {
    if (next === running) return;
    running = next;
    previous = painted = null;
    if (running) request = clock.requestAnimationFrame(tick);
    else { clock.cancelAnimationFrame(request); request = null; }
  };
}

export function mountSaturn(svg) {
  const initial = frameAt(0);
  function paths(selector, details) {
    const layer = svg.querySelector(selector);
    return details.map(detail => {
      const path = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', detail.fill);
      path.setAttribute('opacity', String(detail.opacity));
      layer.append(path);
      return path;
    });
  }
  const clouds = paths('[data-cloud-layer]', initial.clouds);
  const back = paths('[data-ring-back]', initial.rings);
  const front = paths('[data-ring-front]', initial.rings);
  return createSaturnPlayer(frame => {
    clouds.forEach((path, i) => path.setAttribute('d', frame.clouds[i].d));
    back.forEach((path, i) => {
      path.setAttribute('d', frame.rings[i].d);
      front[i].setAttribute('d', frame.rings[i].d);
    });
  });
}
