export function initExploreSection(): void {
  const root = document.querySelector<HTMLElement>('[data-explore-section]');
  if (!root || root.dataset.exploreReady === 'true') return;

  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-explore-reveal]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const showAll = (): void => targets.forEach((target) => target.classList.add('is-visible'));

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    showAll();
    root.dataset.exploreReady = 'true';
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
  );

  targets.forEach((target) => observer.observe(target));
  root.dataset.exploreReady = 'true';
}
