from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
input_path = root / "images" / "wittikay-logo.png"
output_dir = root / "images" / "3d"
output_dir.mkdir(parents=True, exist_ok=True)

img = Image.open(input_path).convert("RGBA")

# Build depth: logo (opaque/bright) closer, background farther.
# Use luminance and alpha as weights.
r, g, b, a = img.split()

# Luminance
lum = ImageOps.grayscale(Image.merge("RGB", (r, g, b)))

# Normalize alpha to mask background
alpha_mask = a.point(lambda v: v / 255)

# Combine: brighten logo areas, darken background
# Depth map: white = near, black = far
near = ImageOps.autocontrast(lum)
near = Image.eval(near, lambda v: min(255, int(v * 1.1)))

# Apply alpha: transparent areas become far (black)
near = Image.composite(near, Image.new("L", img.size, 0), a)

# Save depth map
output_depth = output_dir / "wittikay-logo_depth.png"
near.save(output_depth)

# Also save a recommended RGB image (flattened on black)
rgb = Image.alpha_composite(Image.new("RGBA", img.size, (0, 0, 0, 255)), img).convert("RGB")
output_rgb = output_dir / "wittikay-logo_rgb.jpg"
rgb.save(output_rgb, quality=95)

print(f"Depth map saved: {output_depth}")
print(f"RGB image saved: {output_rgb}")
