export function initHeroStudy(): void {
  const root = document.querySelector<HTMLElement>('[data-hero-study]');
  if (!root || root.dataset.heroStudyReady === 'true') return;

  const copy = root.querySelector<HTMLElement>('[data-reveal="copy"]');
  const scene = root.querySelector<HTMLElement>('[data-reveal="scene"]');
  const sceneTargets = scene
    ? Array.from(scene.querySelectorAll<HTMLElement>('[data-reveal]'))
    : [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const revealCopy = (): void => {
    copy?.classList.add('is-visible');
  };

  const revealScene = (): void => {
    scene?.classList.add('is-visible');
    sceneTargets.forEach((target) => target.classList.add('is-visible'));
    root.classList.add('is-ready');
  };

  const showAll = (): void => {
    revealCopy();
    revealScene();
  };

  const initInspection = (): void => {
    if (!scene) return;

    const toggle = scene.querySelector<HTMLButtonElement>('[data-inspect-toggle]');
    const label = scene.querySelector<HTMLElement>('[data-inspect-label]');
    const specimen = scene.querySelector<HTMLElement>('[data-inspect-image]');
    const image = specimen?.querySelector<HTMLImageElement>('img');
    const lens = scene.querySelector<HTMLElement>('[data-hero-lens]');
    const glass = lens?.querySelector<HTMLElement>('.hero-study__magnifier-glass');
    if (!toggle || !label || !specimen || !image || !lens || !glass) return;

    const zoom = 2.05;
    const restingPoint = { x: .58, y: .45 };
    let active = false;

    const moveLens = (clientX: number, clientY: number, clampToImage = false): void => {
      if (!image.naturalWidth || !image.naturalHeight) return;

      const sceneRect = scene.getBoundingClientRect();
      const imageBox = image.getBoundingClientRect();
      const scale = Math.min(imageBox.width / image.naturalWidth, imageBox.height / image.naturalHeight);
      const renderedWidth = image.naturalWidth * scale;
      const renderedHeight = image.naturalHeight * scale;
      const renderedLeft = imageBox.left + (imageBox.width - renderedWidth) / 2;
      const renderedTop = imageBox.top + (imageBox.height - renderedHeight) / 2;

      let x = clientX - renderedLeft;
      let y = clientY - renderedTop;
      if (!clampToImage && (x < 0 || x > renderedWidth || y < 0 || y > renderedHeight)) return;

      x = Math.max(0, Math.min(renderedWidth, x));
      y = Math.max(0, Math.min(renderedHeight, y));

      const lensRect = lens.getBoundingClientRect();
      const lensWidth = lensRect.width || 104;
      const lensHeight = lensRect.height || lensWidth;
      const targetX = renderedLeft + x;
      const targetY = renderedTop + y;
      const left = Math.max(0, Math.min(sceneRect.width - lensWidth, targetX - sceneRect.left - lensWidth / 2));
      const top = Math.max(0, Math.min(sceneRect.height - lensHeight, targetY - sceneRect.top - lensHeight / 2));

      lens.style.left = `${left}px`;
      lens.style.top = `${top}px`;
      glass.style.backgroundSize = `${renderedWidth * zoom}px ${renderedHeight * zoom}px`;
      glass.style.backgroundPosition = `${lensWidth / 2 - x * zoom}px ${lensHeight / 2 - y * zoom}px`;
    };

    const parkLens = (): void => {
      const rect = image.getBoundingClientRect();
      moveLens(
        rect.left + rect.width * restingPoint.x,
        rect.top + rect.height * restingPoint.y,
        true,
      );
    };

    const setActive = (next: boolean): void => {
      active = next;
      root.classList.toggle('is-inspecting', next);
      toggle.setAttribute('aria-pressed', String(next));
      label.textContent = next ? 'Cerrar inspección' : 'Inspeccionar lámina';
      lens.classList.toggle('is-active', next);
      if (!next) parkLens();
    };

    const prepareLens = (): void => {
      parkLens();
      lens.classList.add('is-visible');
    };

    toggle.addEventListener('click', () => setActive(!active));

    specimen.addEventListener('pointermove', (event) => {
      if (!active) return;
      moveLens(event.clientX, event.clientY, event.pointerType === 'touch');
    });

    specimen.addEventListener('pointerdown', (event) => {
      if (!active) return;
      event.preventDefault();
      if (event.pointerType === 'touch') specimen.setPointerCapture?.(event.pointerId);
      moveLens(event.clientX, event.clientY, true);
    });

    specimen.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'touch' && specimen.hasPointerCapture?.(event.pointerId)) {
        specimen.releasePointerCapture(event.pointerId);
      }
    });

    window.addEventListener('resize', () => requestAnimationFrame(parkLens));

    if (image.complete && image.naturalWidth) prepareLens();
    else image.addEventListener('load', prepareLens, { once: true });
  };

  initInspection();

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    showAll();
    root.dataset.heroStudyReady = 'true';
    return;
  }

  const inViewport = (element: Element | null): boolean => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  };

  // The scene owns the coordinated reveal. We do not observe the tall plate
  // independently because an area-based threshold can leave it permanently hidden.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === copy) revealCopy();
        if (entry.target === scene) revealScene();

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -6% 0px' },
  );

  if (copy) {
    if (inViewport(copy)) revealCopy();
    else observer.observe(copy);
  }

  if (scene) {
    if (inViewport(scene)) revealScene();
    else observer.observe(scene);
  }

  root.dataset.heroStudyReady = 'true';
}
