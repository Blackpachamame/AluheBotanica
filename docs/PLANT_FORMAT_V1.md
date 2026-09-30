# Aluhe · Formato mínimo de ficha V1

La V1 evita un mega-schema. Cada planta se incorpora después de su investigación y revisión, por lo que el archivo público guarda **contenido ya curado**, no todo el historial de auditoría.

## Frontmatter mínimo

```yaml
---
name: Salvia
scientificName: Salvia officinalis
authorship: L.
family: Lamiaceae
rank: species
status: draft

relatedTaxa: []

sources:
  - id: kew-powo-salvia-officinalis
    label: Plants of the World Online — Salvia officinalis L.
    url: https://...
    accessedAt: 2026-09-28
---
```

### Campos

| Campo | Uso |
|---|---|
| `name` | Nombre editorial visible. |
| `scientificName` | Identidad taxonómica resuelta al rango defendible. Puede ser género. |
| `authorship` | Autoría botánica cuando corresponda. |
| `family` | Familia botánica aceptada. |
| `rank` | `species`, `genus`, `hybrid`, `complex`, `aggregate`, `section`, `cultigen` u otro rango necesario. |
| `status` | `draft`, `reviewed` o `published`. |
| `relatedTaxa` | Taxones relevantes para explicar la ficha sin convertirlos en su identidad principal. |
| `sources` | Fuentes principales de la ficha. Pueden añadirse fuentes específicas dentro del texto cuando haga falta. |

No se agrega un campo sólo porque podría ser útil en una futura base de cientos de plantas. Se agrega cuando una ficha real de V1 lo necesita.

## Cuerpo editorial

```md
# Nombre de la planta

Entrada breve, botánica y editorial.

<h2 id="taxonomia">Identidad y taxonomía</h2>

...

<h2 id="habitat">Hábitat y distribución</h2>

...

<h2 id="cultivo">Cultivo</h2>

...

<h2 id="usos">Usos tradicionales</h2>

...

<h2 id="evidencia">Evidencia</h2>

...

<h2 id="precauciones">Precauciones</h2>

...

<h2 id="fuentes">Fuentes</h2>

...
```

No todas las secciones necesitan la misma extensión. Si un tema carece de evidencia suficiente, la ficha puede explicitar esa limitación en lugar de rellenar espacio.

## Fichas de rango mayor que especie

El formato admite, por ejemplo, una ficha editorial de género:

```yaml
---
name: Menta
scientificName: Mentha
authorship: L.
family: Lamiaceae
rank: genus
status: draft

relatedTaxa:
  - Mentha × piperita L.
---
```

Dentro de `#evidencia`, cualquier resultado que pertenezca específicamente a *Mentha × piperita* debe nombrar el taxón, material y preparación pertinentes. La ficha no convierte automáticamente esa evidencia en una propiedad del género `Mentha`.

## Rutas

Durante investigación, una ficha puede existir sólo como contenido interno o study.

La ruta pública se decide recién cuando `status: published` y la política de URL de la unidad editorial haya sido aprobada. No se crean rutas temporales para fichas pendientes.

## Qué no vive en la ficha pública

Por defecto quedan fuera:

- claims heredados descartados;
- matrices de auditoría completas;
- razonamiento interno de investigación;
- recetas terapéuticas retiradas;
- contenido peligroso o erróneo;
- fotografías históricas sin derechos resueltos.

Ese material puede conservarse en los informes de investigación del proyecto.
