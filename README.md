# Aluhe · Interaction Study 01 — The Herbarium

Prototipo técnico para evaluar un libro de cuatro pliegos, una lupa y la lectura de un folio por pantalla en móvil. El contenido y las tres imágenes SVG son placeholders; no representan material botánico validado.

```sh
bun install
bun run dev
bun run check
bun run build
```

`page-flip` está fijado en la versión 2.0.7. Su integración vive en `src/scripts/book.ts` y la pequeña declaración local de su API usada está en `src/types/page-flip.d.ts`, porque el paquete no publica tipos. La lupa vive en `src/scripts/magnifier.ts`.

## Interacción del prototipo

En desktop, StPageFlip recibe el mouse directamente y gestiona el arrastre del libro. En móvil (≤640 px), una superficie transparente separada clasifica gestos táctiles con Pointer Events: deja el desplazamiento vertical al navegador y pide a StPageFlip que anime los swipes horizontales mediante `flipNext()` o `flipPrev()`.

La interacción táctil se validó mediante emulación touch de Chrome; todavía no se probó en un dispositivo físico.
