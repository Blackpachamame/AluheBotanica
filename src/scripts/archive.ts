import { initMagnifier } from './magnifier';

type ArchiveKey = 'taxonomy' | 'habitat' | 'uses' | 'evidence' | 'precautions';

type ArchiveEntry = {
  index: string;
  kicker: string;
  title: string;
  copy: string;
};

const entries: Record<ArchiveKey, ArchiveEntry> = {
  taxonomy: {
    index: '01',
    kicker: 'Taxonomía',
    title: 'Identidad y clasificación',
    copy: 'La ficha completa reunirá nombre científico, autoridad, familia y criterios de identificación. En este estudio visual todavía no incorporamos información botánica no verificada.',
  },
  habitat: {
    index: '02',
    kicker: 'Hábitat',
    title: 'Distribución y ambiente',
    copy: 'Esta capa estará destinada a distribución, ambientes registrados y relaciones ecológicas documentadas, siempre separando observación, fuente y alcance de la evidencia.',
  },
  uses: {
    index: '03',
    kicker: 'Usos tradicionales',
    title: 'Registro histórico y cultural',
    copy: 'El archivo distinguirá prácticas tradicionales y contexto histórico de cualquier afirmación clínica. La información final deberá quedar acompañada por su fuente y procedencia.',
  },
  evidence: {
    index: '04',
    kicker: 'Evidencia',
    title: 'Fuentes y nivel de respaldo',
    copy: 'La futura ficha reunirá bibliografía y estudios de forma trazable, evitando presentar tradición, hipótesis y evidencia contemporánea como si fueran equivalentes.',
  },
  precautions: {
    index: '05',
    kicker: 'Precauciones',
    title: 'Riesgos e interacciones',
    copy: 'Esta sección quedará reservada para contraindicaciones, interacciones y límites de uso respaldados por fuentes confiables. No se completará con contenido generado sin verificación.',
  },
};

function required<T extends Element>(value: T | null, name: string): T {
  if (!value) throw new Error(`Falta ${name} en Archive Study.`);
  return value;
}

export function initArchiveStudy(): void {
  const root = document.querySelector<HTMLElement>('[data-archive-study]');
  if (!root || root.dataset.archiveReady === 'true') return;

  const board = required(root.querySelector<HTMLElement>('[data-archive-board]'), 'archive board');
  const readout = required(root.querySelector<HTMLElement>('[data-archive-readout]'), 'archive readout');
  const readoutIndex = required(readout.querySelector<HTMLElement>('[data-readout-index]'), 'readout index');
  const readoutKicker = required(readout.querySelector<HTMLElement>('[data-readout-kicker]'), 'readout kicker');
  const readoutTitle = required(readout.querySelector<HTMLElement>('[data-readout-title]'), 'readout title');
  const readoutCopy = required(readout.querySelector<HTMLElement>('[data-readout-copy]'), 'readout copy');
  const noteButtons = Array.from(board.querySelectorAll<HTMLButtonElement>('[data-archive-note]'));
  const inspectButton = required(root.querySelector<HTMLButtonElement>('[data-archive-inspect]'), 'inspect button');
  const magnifier = initMagnifier(board);
  root.dataset.archiveReady = 'true';
  let inspecting = false;

  function select(key: ArchiveKey, focusReadout = false): void {
    const entry = entries[key];
    readoutIndex.textContent = entry.index;
    readoutKicker.textContent = entry.kicker;
    readoutTitle.textContent = entry.title;
    readoutCopy.textContent = entry.copy;
    readout.dataset.active = key;
    noteButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.archiveNote === key)));
    if (focusReadout) readout.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }

  function setInspecting(active: boolean): void {
    inspecting = active;
    magnifier.setActive(active);
    inspectButton.setAttribute('aria-pressed', String(active));
    inspectButton.setAttribute('aria-label', active ? 'Cerrar inspección de la lámina' : 'Activar inspección de la lámina');
    const label = inspectButton.querySelector<HTMLElement>('[data-inspect-label]');
    if (label) label.textContent = active ? 'Cerrar inspección' : 'Inspeccionar lámina';
    board.classList.toggle('is-inspecting', active);
  }

  noteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (inspecting) return;
      const key = button.dataset.archiveNote as ArchiveKey | undefined;
      if (key && key in entries) select(key, true);
    });
  });

  inspectButton.addEventListener('click', () => setInspecting(!inspecting));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && inspecting) {
      setInspecting(false);
      inspectButton.focus();
    }
  });

  select('taxonomy');
}
