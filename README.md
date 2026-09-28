# Aluhe · Visual Studies

Prototipos editoriales de **Aluhe — Botánica Oculta** construidos con Astro + TypeScript.

## Hero Study 01 — Archivo Vivo

La ruta `/studies/hero/` contiene el estudio aislado del futuro hero de la Home.

Decisiones congeladas del prototipo:

- arquitectura editorial clara, aproximadamente 42/58 en desktop;
- una sola pieza botánica protagonista;
- máximo tres papeles/enlaces HTML reales: Taxonomía, Hábitat y Evidencia;
- nada de hotspots atados a coordenadas internas de una imagen raster;
- tablet y mobile se recomponen como diseños propios, no como el collage desktop encogido;
- decoración lateral limitada a dos motivos botánicos translúcidos;
- botón principal con acabado de pincelada/papel pintado;
- animación sin dependencias nuevas: revelado de la ilustración y entrada suave de papeles con `IntersectionObserver` + CSS;
- `prefers-reduced-motion` elimina la coreografía y muestra el contenido directamente.

Criterio perceptual de validación: mirar 1440, 768 y 390 px a tamaño normal y responder sin matices si cada variante parece diseñada deliberadamente para ese ancho. Si parece una versión encogida o estirada de otra, el estudio no pasa.

## Archivo de investigación preservado

La ruta `/` sigue usando `ResearchArchive.astro`.

## Herbario de gabinete preservado

La ruta `/herbarium/` conserva el estudio con `page-flip` 2.0.7.

## Desarrollo

```sh
bun install
bun run dev
bun run check
bun run build
```

No se añadieron dependencias para Hero Study 01.

### Correcciones 01.1

- el reveal de la lámina ya no depende del porcentaje visible de la propia lámina: la escena coordina el revelado completo cuando entra al viewport;
- las notas internas de proceso se retiraron del HTML visible y se reemplazaron por copy de producto;
- el CTA usa una silueta de pincelada derivada de la referencia visual `btn-preview.png`, manteniendo texto y foco como HTML real.

### Correcciones 01.3

- Evidencia pasa a `03`; el Hero mantiene solo tres papeles/enlaces.
- se retiran del Hero el sello de Herbario y el dibujo lineal residual de fondo;
- la lámina de Köhler incorpora un derivado con fondo transparente (`salvia-kohler-cutout.webp`) para integrar planta, flores y detalles con el papel principal sin el rectángulo de color;
- el montón de páginas gana offsets, tonos, bordes irregulares, contacto y cinta sutil para acercarse al lenguaje material del preview;
- se prueba una nota manuscrita lateral como huella humana, sin hacerla parte de la navegación;
- los tres papeles usan SVG inline propios, sin dependencia de iconos;
- se añade `Inspeccionar lámina` como botón HTML real: activa/desactiva una lupa que sigue el puntero sobre la ilustración en desktop/tablet;
- en mobile se conserva la composición vertical y se omiten nota lateral/lupa para no forzar el collage desktop.
