export function initSaturnMotion(art, button, preference, setRunning) {
  let choice = null;

  function apply() {
    const running = choice ?? !preference.matches;
    art.dataset.motion = running ? 'running' : 'paused';
    button.textContent = running ? 'Pause' : 'Play';
    button.setAttribute('aria-label', `${running ? 'Pause' : 'Play'} Saturn animation`);
    setRunning(running);
  }

  button.addEventListener('click', () => {
    choice = art.dataset.motion !== 'running';
    apply();
  });
  preference.addEventListener('change', apply);
  apply();
  button.hidden = false;
}
