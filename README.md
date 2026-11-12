# Portfolio

Portfolio personal de **Raúl Morales** (frontend developer, base full-stack y de sistemas).
Sitio estático bilingüe (ES/EN) con dos temas (claro/oscuro) y exportación del CV en
`.docx` y PDF, todo generado en el navegador a partir de una única fuente de datos.

- **Producción:** `https://portfolio.raulmorales.eu` — `/` (español) y `/en/` (inglés)
- **Marca:** `raulmorales.eu`

## 🚀 Sobre el proyecto

Web de portfolio de una sola página donde se presenta el trabajo de Raúl:

- **7 secciones** con navegación sticky: hero, sobre mí, habilidades, experiencia,
  educación, certificaciones, proyectos y contacto.
- **Bilingüe ES/EN** — el visitante elige idioma explícitamente (sin autodetección).
- **Dos temas** (oscuro por defecto, claro opcional) con toggle persistente
  (`localStorage`).
- **CV "siempre al día":** la página y el CV se generan desde la misma fuente de
  datos (`src/data/cv.ts`), por lo que lo que se ve y lo que se descarga nunca divergen.
  - **`.docx`:** generado 100% en el cliente con la librería `docx` (mosaico de tiles
    SVG, enlaces reales, respeta el tema activo).
  - **PDF:** `window.print()` + reglas `@media print` — A4 a sangre completa, ambos
    temas, ~5 páginas, texto vectorial seleccionable. Sin dependencias nuevas.
- **Diseño "Adelante":** editorial/print-inspired — bordes de 3px, sombras duras,
  tipografía display serif (Fraunces) + Work Sans, acentos vivos (verde, neón, ámbar).

> El diseño anterior (terminal) sigue disponible en `/original/` como archivo de
> referencia; no está indexado (fuera del sitemap).

## 📦 Instalación

```bash
git clone https://github.com/raulmoralesruiz/portfolio.git
cd portfolio
npm install
```

Desarrollo:

```bash
npm run dev
# → http://localhost:4321  (ES en /, EN en /en/)
```

Build de producción:

```bash
npm run build    # → dist/
npm run preview  # sirve dist/ localmente
```

## 📤 Despliegue

El deploy hace `build` + `rsync --delete` a TrueNAS:

```bash
npm run deploy       # build + rsync a producción
npm run deploy:dry   # dry-run (muestra qué se copiaría)
```

La configuración (host, usuario, ruta) va en **`.deployrc`** (gitignoreado); la
plantilla es `.deployrc.example`:

```bash
cp .deployrc.example .deployrc
# edita DEPLOY_HOST / DEPLOY_USER / DEPLOY_PATH
```

## 📁 Estructura

```
/
├── src/
│   ├── data/cv.ts            # FUENTE ÚNICA de datos (ES + EN): secciones, CV, etiquetas UI
│   ├── components/           # Secciones del diseño "Adelante" (Adelante.astro, Contact.astro, …)
│   ├── layouts/              # AdelanteLayout.astro (tema, meta, fuentes) y Layout.astro (original)
│   ├── pages/                # / (ES), /en/ (EN), /original/* (diseño archivado), 404
│   ├── styles/adelante.css   # Design tokens, componentes y bloque @media print (PDF)
│   └── utils/
│       ├── wordExport.ts     # Generador del CV .docx (librería docx)
│       ├── tiles.ts          # 15 tiles SVG del mosaico
│       └── sections.ts       # Orden/keys de secciones compartidas
├── public/                   # favicon, og-image, fuentes, PDFs de certificaciones (cursos/)
├── scripts/deploy.sh         # build + rsync a TrueNAS
├── PRODUCT.md                # Producto: usuarios, propósito, posicionamiento, innegociables
├── DESIGN.md                 # Design system "Adelante": tokens, componentes, reglas print
└── DESIGN-ORIGINAL.md        # Design system del diseño archivado (/original/)
```

## ✨ Características

- Estático, sin backend: toda la lógica (incluida la generación del CV) corre en el navegador.
- Bilingüe ES/EN con toggle accesible.
- Dos temas (claro/oscuro) que también se respetan en el PDF exportado.
- SEO: sitemap, robots.txt, Open Graph.
- Responsive y con foco en rendimiento (tipografías preloaded, cero dependencias de runtime salvo `docx`).

## 📌 Notas

- La foto de Raúl (`src/assets/img/raul.png`) está en el repo para que el build sea
  autocontenido desde un clone fresco.
- El diseño anterior vive en `/original/` solo como archivo de referencia; el diseño
  activo es "Adelante".
