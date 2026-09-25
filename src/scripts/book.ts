import { PageFlip } from 'page-flip';
import { initMagnifier } from './magnifier';

function required<T extends HTMLElement>(element: T | null, name: string): T {
  if (!element) throw new Error(`Falta el elemento ${name} del herbario.`);
  return element;
}

export function initBook(): void {
  const root = document.querySelector<HTMLElement>('[data-herbarium]');
  if (!root) return;

  const book = required(root.querySelector<HTMLElement>('[data-book]'), 'libro');
  const stage = required(root.querySelector<HTMLElement>('[data-book-stage]'), 'escenario');
  const gestureSurface = required(root.querySelector<HTMLElement>('[data-mobile-gesture-surface]'), 'superficie de gestos');
  const previous = required(root.querySelector<HTMLButtonElement>('[data-prev]'), 'anterior');
  const next = required(root.querySelector<HTMLButtonElement>('[data-next]'), 'siguiente');
  const inspect = required(root.querySelector<HTMLButtonElement>('[data-inspect]'), 'inspeccionar');
  const status = required(root.querySelector<HTMLElement>('[data-status]'), 'estado');
  const hint = required(root.querySelector<HTMLElement>('[data-hint]'), 'instrucciones');

  const pages = Array.from(book.querySelectorAll<HTMLElement>('.folio'));
  const magnifier = initMagnifier(stage);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inspecting = false;

  // Desktop input reaches StPageFlip directly; mobile touch lands on a sibling surface.
  const flip = new PageFlip(book, {
    width: 520,
    height: 650,
    size: 'stretch',
    minWidth: 280,
    maxWidth: 520,
    minHeight: 350,
    maxHeight: 650,
    autoSize: false,
    usePortrait: true,
    showCover: false,
    drawShadow: true,
    maxShadowOpacity: 0.18,
    flippingTime: reducedMotion.matches ? 140 : 680,
    mobileScrollSupport: true,
    disableFlipByClick: false,
    showPageCorners: false,
  });

  function updateControls(): void {
    const current = flip.getCurrentPageIndex();
    const portrait = flip.getOrientation() === 'portrait';
    const visible = portrait ? [current] : [current, current + 1];
    const inspectable = visible.some((index) => pages[index]?.querySelector('.inspectable'));
    const finalStart = portrait ? pages.length - 1 : pages.length - 2;
    previous.disabled = inspecting || current === 0;
    next.disabled = inspecting || current >= finalStart;
    inspect.disabled = !inspectable;
    status.textContent = portrait
      ? `Folio ${String(current + 1).padStart(2, '0')} de ${String(pages.length).padStart(2, '0')}`
      : `Pliego ${Math.floor(current / 2) + 1} de ${Math.ceil(pages.length / 2)}`;
  }

  function setInspecting(active: boolean): void {
    inspecting = active;
    clearGesture();
    gestureSurface.style.pointerEvents = active ? 'none' : '';
    magnifier.setActive(active);
    inspect.setAttribute('aria-pressed', String(active));
    inspect.setAttribute('aria-label', active ? 'Cerrar modo inspección' : 'Activar modo inspección');
    const label = inspect.querySelector('span');
    if (label) label.textContent = active ? 'Cerrar inspección' : 'Inspeccionar';
    hint.textContent = active
      ? 'Mové el cursor o el dedo sobre la imagen. Escape cierra la inspección.'
      : 'Arrastrá una página o usá los controles. En móvil, deslizá el folio.';
    updateControls();
  }

  function navigate(direction: 'next' | 'previous'): void {
    if (inspecting) return;
    if (reducedMotion.matches) {
      if (direction === 'next') flip.turnToNextPage();
      else flip.turnToPrevPage();
      updateControls();
      return;
    }
    if (direction === 'next') flip.flipNext();
    else flip.flipPrev();
  }

  const mobile = window.matchMedia('(max-width: 640px)');
  const MOBILE_SWIPE_THRESHOLD = 42;
  const HORIZONTAL_INTENT_RATIO = 1.4;
  const activePointers = new Set<number>();
  let multiTouch = false;
  let gesture: { id: number; startX: number; startY: number; intent: 'pending' | 'horizontal' | 'vertical' } | null = null;

  function clearGesture(): void {
    if (gesture && gestureSurface.hasPointerCapture(gesture.id)) {
      gestureSurface.releasePointerCapture(gesture.id);
    }
    gesture = null;
    activePointers.clear();
    multiTouch = false;
  }

  gestureSurface.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' || !mobile.matches || inspecting) return;
    activePointers.add(event.pointerId);
    if (activePointers.size > 1) {
      gesture = null;
      multiTouch = true;
      return;
    }
    if (multiTouch) return;
    gesture = { id: event.pointerId, startX: event.clientX, startY: event.clientY, intent: 'pending' };
    gestureSurface.setPointerCapture(event.pointerId);
  });

  gestureSurface.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'touch' || !gesture || gesture.id !== event.pointerId || gesture.intent !== 'pending') return;
    const dx = Math.abs(event.clientX - gesture.startX);
    const dy = Math.abs(event.clientY - gesture.startY);
    if (dy >= 16 && dy > dx * HORIZONTAL_INTENT_RATIO) gesture.intent = 'vertical';
    else if (dx >= 16 && dx > dy * HORIZONTAL_INTENT_RATIO) gesture.intent = 'horizontal';
  });

  gestureSurface.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'touch') return;
    activePointers.delete(event.pointerId);
    if (!gesture || gesture.id !== event.pointerId || multiTouch || !mobile.matches || inspecting) {
      if (activePointers.size === 0) clearGesture();
      return;
    }
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    const horizontal = gesture.intent !== 'vertical'
      && Math.abs(dx) >= MOBILE_SWIPE_THRESHOLD
      && Math.abs(dx) > Math.abs(dy) * HORIZONTAL_INTENT_RATIO;
    gesture = null;
    if (activePointers.size === 0) multiTouch = false;
    if (horizontal && flip.getState() !== 'flipping') navigate(dx < 0 ? 'next' : 'previous');
  });

  gestureSurface.addEventListener('pointercancel', (event) => {
    if (event.pointerType !== 'touch') return;
    activePointers.delete(event.pointerId);
    if (gesture?.id === event.pointerId) gesture = null;
    if (activePointers.size === 0) multiTouch = false;
  });
  mobile.addEventListener('change', clearGesture);

  previous.addEventListener('click', () => navigate('previous'));
  next.addEventListener('click', () => navigate('next'));
  inspect.addEventListener('click', () => setInspecting(!inspecting));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && inspecting) {
      setInspecting(false);
      inspect.focus();
    }
    if (inspecting || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') navigate('next');
    if (event.key === 'ArrowLeft') navigate('previous');
  });

  flip.on('flip', updateControls);
  flip.on('changeOrientation', () => {
    if (inspecting) setInspecting(false);
    updateControls();
  });
  flip.on('init', updateControls);
  flip.loadFromHTML(pages);
  updateControls();
}
