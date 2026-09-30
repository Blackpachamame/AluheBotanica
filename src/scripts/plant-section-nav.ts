const SECTION_IDS = [
  'taxonomia',
  'habitat',
  'cultivo',
  'usos',
  'evidencia',
  'precauciones',
  'fuentes',
] as const;

const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  taxonomia: 'Taxonomía',
  habitat: 'Hábitat',
  cultivo: 'Cultivo',
  usos: 'Usos tradicionales',
  evidencia: 'Evidencia',
  precauciones: 'Precauciones',
  fuentes: 'Fuentes',
};

export function initPlantSectionNav() {
  const root = document.querySelector<HTMLElement>('[data-plant-section-nav]');
  const details = root?.querySelector<HTMLDetailsElement>('details');
  const summary = details?.querySelector<HTMLElement>('summary');
  const current = root?.querySelector<HTMLElement>('[data-current-section]');
  const sections = SECTION_IDS
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => Boolean(section));

  if (!root || !details || !summary || !current || sections.length === 0) return;

  const allSectionLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(SECTION_IDS.map((id) => `a[href="#${id}"]`).join(',')),
  );

  const setCurrent = (id: string) => {
    if (!(id in SECTION_LABELS)) return;
    const sectionId = id as keyof typeof SECTION_LABELS;
    current.textContent = SECTION_LABELS[sectionId];

    allSectionLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${sectionId}`;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const hashId = window.location.hash.slice(1);
  setCurrent(SECTION_IDS.includes(hashId as (typeof SECTION_IDS)[number]) ? hashId : SECTION_IDS[0]);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]?.target instanceof HTMLElement) setCurrent(visible[0].target.id);
    },
    { rootMargin: '-28% 0px -62% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));

  details.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.hash.slice(1);
      setCurrent(id);
      details.open = false;
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (!details.open || !(event.target instanceof Node) || details.contains(event.target)) return;
    details.open = false;
  });

  details.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !details.open) return;
    details.open = false;
    summary.focus();
  });
}
