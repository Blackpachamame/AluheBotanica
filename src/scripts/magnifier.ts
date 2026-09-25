export interface MagnifierController {
  setActive(active: boolean): void;
}

export function initMagnifier(stage: HTMLElement): MagnifierController {
  const overlay = stage.querySelector<HTMLElement>('[data-inspection-overlay]');
  const lens = stage.querySelector<HTMLElement>('[data-inspection-lens]');
  if (!overlay || !lens) throw new Error('Faltan elementos del modo inspección.');

  const zoom = 2.1;
  const radius = 65;
  let active = false;

  function move(event: PointerEvent): void {
    if (!active || !overlay || !lens) return;
    const stageRect = stage.getBoundingClientRect();
    const figures = stage.querySelectorAll<HTMLElement>('.inspectable');
    let image: HTMLImageElement | null = null;

    for (const figure of figures) {
      const candidate = figure.querySelector<HTMLImageElement>('img');
      if (!candidate) continue;
      const rect = candidate.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        image = candidate;
        break;
      }
    }

    if (!image) {
      lens.classList.remove('is-visible');
      return;
    }

    const rect = image.getBoundingClientRect();
    const source = image.closest<HTMLElement>('[data-magnify-src]')?.dataset.magnifySrc ?? image.currentSrc;
    if (!image.naturalWidth || !image.naturalHeight) {
      lens.classList.remove('is-visible');
      return;
    }

    // object-fit: contain centers the rendered image inside the <img> box.
    const scale = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;
    const x = event.clientX - rect.left - (rect.width - imageWidth) / 2;
    const y = event.clientY - rect.top - (rect.height - imageHeight) / 2;
    if (x < 0 || x > imageWidth || y < 0 || y > imageHeight) {
      lens.classList.remove('is-visible');
      return;
    }

    const desiredX = event.clientX - stageRect.left - radius;
    const desiredY = event.clientY - stageRect.top - radius - (event.pointerType === 'touch' ? 115 : 0);
    const left = Math.max(0, Math.min(stageRect.width - radius * 2, desiredX));
    const top = Math.max(0, Math.min(stageRect.height - radius * 2, desiredY));

    lens.style.left = `${left}px`;
    lens.style.top = `${top}px`;
    lens.style.backgroundImage = `url("${source}")`;
    lens.style.backgroundSize = `${imageWidth * zoom}px ${imageHeight * zoom}px`;
    // background-position uses the padding box, which starts inside the border.
    const lensStyle = getComputedStyle(lens);
    const centerX = radius - parseFloat(lensStyle.borderLeftWidth);
    const centerY = radius - parseFloat(lensStyle.borderTopWidth);
    lens.style.backgroundPosition = `${centerX - x * zoom}px ${centerY - y * zoom}px`;
    lens.classList.add('is-visible');
  }

  overlay.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    overlay.setPointerCapture(event.pointerId);
    move(event);
  });
  overlay.addEventListener('pointermove', move);
  overlay.addEventListener('pointerup', () => lens.classList.remove('is-visible'));
  overlay.addEventListener('pointercancel', () => lens.classList.remove('is-visible'));
  overlay.addEventListener('pointerleave', () => lens.classList.remove('is-visible'));
  for (const name of ['touchstart', 'touchmove', 'touchend', 'touchcancel']) {
    overlay.addEventListener(name, (event) => {
      event.stopPropagation();
      if (event.cancelable) event.preventDefault();
    }, { passive: false });
  }

  return {
    setActive(nextActive) {
      active = nextActive;
      overlay.hidden = !nextActive;
      overlay.setAttribute('aria-hidden', String(!nextActive));
      lens.classList.remove('is-visible');
    },
  };
}
