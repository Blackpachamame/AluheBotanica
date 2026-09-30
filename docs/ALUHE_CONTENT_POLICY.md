# Aluhe · Política editorial de contenido botánico

Esta política define cómo entra una planta a **Aluhe — Botánica Oculta**.

## Principio central

El sitio antiguo de Aluhe es **referencia histórica del proyecto**, no una fuente de verdad botánica, clínica ni terapéutica. Nada del legado se publica por arrastre: cada planta se investiga, contrasta, redacta y revisa antes de incorporarse a la versión pública.

La V1 trabaja con un núcleo pequeño y curado. La prioridad es **control de calidad en la entrada**, no construir una infraestructura documental compleja para compensar datos sin revisar.

## Flujo obligatorio por planta

1. **Candidata**
   - Identificar la planta o unidad editorial que se quiere incorporar.
   - Reunir el material heredado de Aluhe, si existe.

2. **Investigación avanzada**
   - Resolver primero la identidad taxonómica hasta el rango que las fuentes permitan.
   - Investigar taxonomía, morfología, distribución/hábitat, cultivo, usos tradicionales, evidencia, seguridad y fuentes.
   - Investigar en español e inglés cuando aporte mejores fuentes.

3. **Contraste del legado**
   - El contenido antiguo sirve para formular preguntas, no para decidir la respuesta.
   - Corregir, matizar, retirar o reemplazar cualquier dato heredado que no resista el contraste.
   - Los descartes y decisiones pueden vivir en el informe de investigación; no necesitan viajar a la ficha pública.

4. **Redacción editorial**
   - Crear una ficha nueva con texto original y fuentes trazables.
   - Mantener el tono de archivo/herbario botánico y cultural; no convertir la ficha en un prospecto médico.

5. **Auditoría final**
   - Hacer una segunda revisión completa de la ficha ya redactada.
   - Revisar especialmente taxonomía, extrapolaciones de evidencia, seguridad, afirmaciones categóricas y coherencia con las fichas ya publicadas.

6. **Aprobación humana**
   - `status: published` sólo se asigna después de la revisión del usuario responsable del proyecto.
   - La IA puede proponer cambios o marcar la ficha como `draft` / `reviewed`; no debe autoaprobarla como `published`.

## Reglas de investigación y redacción

### Taxonomía

- No forzar una especie cuando la evidencia sólo permite resolver género, híbrido, complejo, agregado u otro rango.
- El nombre común nunca es una identificación taxonómica suficiente por sí mismo.
- Registrar nombre científico, autoría, familia y rango cuando estén suficientemente resueltos.
- Los taxones relacionados pueden citarse sin convertirlos en la identidad principal de la ficha.

### Alcance geográfico

- Separar distribución nativa de presencia introducida, naturalizada o cultivada.
- La base puede ser global y añadir contexto de Argentina/Cono Sur cuando exista información pertinente.
- No convertir ausencia de datos regionales en ausencia de la planta.

### Usos tradicionales

- `Uso tradicional` describe historia cultural o etnobotánica; **no demuestra eficacia**.
- Identificar parte vegetal, preparación, región/cultura y periodo cuando sean relevantes y las fuentes lo permitan.
- No rescatar una afirmación terapéutica antigua sólo cambiándole el tono si no existe base documental para conservarla.

### Evidencia

Separar siempre, cuando sea relevante:

- taxón;
- parte vegetal;
- material (hoja, raíz, aceite esencial, etc.);
- preparación (infusión, extracto, spray, etc.);
- vía de administración;
- población;
- outcome o pregunta estudiada;
- tipo de evidencia.

Reglas:

- `in vitro` ≠ eficacia clínica;
- estudio animal ≠ resultado humano;
- especie ≠ género;
- aceite esencial ≠ hoja;
- extracto ≠ infusión doméstica;
- adultos ≠ niños;
- un outcome ≠ otro diagnóstico relacionado.

No usar como eje principal una escala inventada `alta / media / baja`. Explicar qué se investigó, con qué diseño, qué encontró y cuáles son las limitaciones.

### Seguridad

- Revisar seguridad de forma independiente de la eficacia.
- No interpretar ausencia de datos como seguridad.
- Diferenciar riesgos por taxón, parte/material, preparación, vía y población cuando corresponda.
- No publicar instrucciones heredadas de automedicación, recetas terapéuticas o dosis domésticas sólo porque existían en el sitio viejo.
- Si una preparación o afirmación es peligrosa, contradictoria, no respaldada o innecesaria para la ficha pública, **se omite** de la ficha final.
- Una ficha con dudas de seguridad pendientes no puede proponerse como `published`.

### Fuentes

Priorizar, según el tema:

1. bases taxonómicas y botánicas institucionales;
2. agencias regulatorias y organismos sanitarios;
3. revisiones sistemáticas / metaanálisis;
4. ensayos clínicos y literatura primaria revisada por pares;
5. universidades, jardines botánicos e instituciones hortícolas reconocidas para cultivo y morfología.

Evitar como fundamento final blogs, sitios SEO, tiendas, páginas comerciales y contenido sin referencias.

Cada afirmación científica importante de la ficha debe poder remontarse a una fuente.

### Imágenes

- Identificación botánica y derechos de uso son problemas independientes.
- Una foto histórica sin procedencia no se trata como voucher ni como asset reutilizable automáticamente.
- Para imágenes externas registrar procedencia, autor y licencia antes de publicarlas.

## Estados de una ficha

- `draft`: investigación o redacción todavía en curso.
- `reviewed`: investigación y auditoría editorial terminadas; pendiente de aprobación/publicación.
- `published`: ficha aprobada para el sitio público.

`published` significa, por definición del proyecto, que la ficha atravesó investigación avanzada, revisión de seguridad y aprobación editorial.

## Secciones públicas V1

Cada ficha pública usa, cuando el contenido corresponda, estos anchors estables:

- `#taxonomia`
- `#habitat`
- `#cultivo`
- `#usos`
- `#evidencia`
- `#precauciones`
- `#fuentes`

El texto visible del encabezado puede ser más descriptivo; los `id` anteriores forman parte del contrato de navegación.

## Criterio ante la duda

Si una afirmación no puede escribirse de forma fiel a la evidencia disponible sin inducir a error, no se publica todavía. Se reinvestiga, se reformula con sus límites o se descarta.
