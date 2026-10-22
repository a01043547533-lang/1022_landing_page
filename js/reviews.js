(() => {
  const viewport = document.querySelector('#reviews-viewport');
  const track = document.querySelector('.reviews-track');
  const group = document.querySelector('.reviews-group');
  if (!viewport || !track || !group) return;
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.setAttribute('inert', '');
  track.append(duplicate);
  const toggle = document.querySelector('.reviews-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  function render() {
    viewport.classList.toggle('is-paused', paused);
    if (toggle) {
      toggle.textContent = paused ? '후기 흐름 재생' : '후기 흐름 일시정지';
      toggle.setAttribute('aria-pressed', String(paused));
    }
  }
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; render(); });
  if (toggle) toggle.addEventListener('click', () => { paused = !paused; render(); });
  viewport.classList.add('is-ready');
  render();
})();

