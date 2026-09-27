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
