declare module 'page-flip' {
  /** Surface used by Interaction Study 01; page-flip 2.0.7 ships no declaration file. */
  interface PageFlipSettings {
    width: number;
    height: number;
    size: 'stretch';
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    autoSize: boolean;
    usePortrait: boolean;
    showCover: boolean;
    drawShadow: boolean;
    maxShadowOpacity: number;
    flippingTime: number;
    mobileScrollSupport: boolean;
    disableFlipByClick: boolean;
    showPageCorners: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(pages: HTMLElement[] | NodeListOf<HTMLElement>): void;
    getCurrentPageIndex(): number;
    getOrientation(): 'portrait' | 'landscape';
    getState(): 'user_fold' | 'fold_corner' | 'flipping' | 'read';
    flipNext(): void;
    flipPrev(): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    on(event: 'flip' | 'changeOrientation' | 'init', callback: () => void): void;
  }
}
