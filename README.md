# Aluhe · Interaction Study 01 — The Herbarium

Estudio editorial de cuatro pliegos sobre *Salvia officinalis*, con una lámina histórica real, lupa y lectura de un folio por pantalla en móvil. El espécimen prensado y sus datos de recolección siguen pendientes.

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

## Iteration 02 — Salvia Visual Study

La lámina 38 de *Köhler’s Medizinal-Pflanzen* (1887) procede de la [Biodiversity Heritage Library](https://www.biodiversitylibrary.org/page/303638), a través del ejemplar de la Missouri Botanical Garden. [Wikimedia Commons la identifica como dominio público](https://commons.wikimedia.org/wiki/File:K%C3%B6hler%27s_Medizinal-Pflanzen_in_naturgetreuen_Abbildungen_mit_kurz_erl%C3%A4uterndem_Texte_(Plate_38)_BHL303638.jpg). El JPEG original se conserva en `public/images/salvia/salvia-kohler-plate-38.jpg`; el libro usa una versión WebP reducida y un recorte de la misma lámina para el último pliego.

El sistema visual mantiene la paleta y las tipografías de la primera iteración. Usa papeles marfil discretos, una voz editorial para títulos y otra de archivo para números, procedencia y etiquetas. El espécimen de Salvia permanece señalado como provisional; aún no hay ficha botánica completa ni destino funcional para «Continuar al archivo».
