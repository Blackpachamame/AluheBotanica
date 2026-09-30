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

## Contenido botánico V1

La nueva capa de contenido se inicia de forma deliberadamente simple:

- política editorial: `docs/ALUHE_CONTENT_POLICY.md`;
- formato mínimo de ficha: `docs/PLANT_FORMAT_V1.md`;
- plantilla: `docs/templates/plant-v1.md`;
- fixtures de validación: `src/content/plants/salvia.md` y `src/content/plants/menta.md`;
- skill de contenido para agentes: `.agents/skills/aluhe-botanical-content/SKILL.md`.

Las fichas permanecen en `draft` y **no están conectadas todavía a `/archivo/` ni a la Home**. Una planta sólo pasa a `published` después de investigación avanzada, auditoría editorial y aprobación humana explícita.

`salvia.md` ya contiene la **primera redacción editorial completa** construida a partir del dossier piloto de investigación; sigue en `draft` hasta revisar tono, profundidad y selección de contenido antes de diseñar su ficha visual. `menta.md` se mantiene como fixture estructural de rango género.

## Salvia visual study

- `/studies/salvia/` contiene el primer estudio visual de una ficha completa de planta.
- `src/data/salvia-media.json` registra autor, fuente, licencia, rol editorial y texto alternativo del set visual V1.
- `docs/SALVIA_MEDIA_V1.md` documenta las decisiones y límites de uso de esas imágenes.
- La ruta es un estudio: no publica todavía `/archivo/salvia-officinalis/` ni cambia `status: draft` de `src/content/plants/salvia.md`.
- Las fotografías documentales del study se cargan desde Wikimedia Commons para preservar la procedencia original en esta iteración; antes de producción conviene decidir si se vendorizan/copían al repositorio respetando sus licencias.


### Salvia Study 03

Tercera pasada de precisión sobre `/studies/salvia/`:

- los números de sección pasan encima del título y ganan escala en desktop;
- `Rasgos de lectura` elimina los bordes exteriores, reduce el vacío respecto de la foto y aumenta la presencia del rótulo; en mobile se alinea con el gutter real del contenido;
- los créditos bajo fotografías se apilan también en desktop para mejorar lectura;
- Luz, Suelo, Riego y Poda ganan peso tipográfico y números más visibles;
- se elimina la línea ornamental superior del principio editorial;
- `Libre Caslon Display` se reemplaza globalmente por `Newsreader`, una serif editorial diseñada para lectura en pantalla, mientras `Source Serif 4` permanece como cuerpo;
- el cambio tipográfico afecta de forma centralizada a Home, ficha, Archivo y Herbario a través de `--display`.

Para esta iteración se reemplaza una dependencia tipográfica: `@fontsource/libre-caslon-display` por `@fontsource-variable/newsreader`. No se añade ninguna librería de UI ni dependencia funcional nueva.
