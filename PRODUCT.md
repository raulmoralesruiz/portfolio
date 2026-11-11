# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Reclutadores y equipos de contratación** — evalúan a Raúl como candidato a un puesto full-time; buscan en segundos evidencia de habilidades, experiencia y proyectos, y un camino claro para contactar.
- **Clientes potenciales (freelance / contrato)** — buscan un desarrollador para un proyecto concreto; quieren ver trabajo real, alcance y cómo empezar una conversación.

## Product Purpose

Portfolio personal de Raúl Morales que demuestra su trabajo como desarrollador frontend (con base full-stack y de sistemas). Su función es que un reclutador o un cliente entienda su valor en pocos segundos y dé el siguiente paso: escribirle por email o descargar el CV. El éxito es una conversación iniciada — una respuesta a un email, una solicitud de entrevista o una propuesta de proyecto.

## Positioning

Desarrollador frontend con profundidad full-stack real y experiencia previa de administración de sistemas: entiende el ciclo completo, de la base de datos al píxel final. Mecanismo distintivo: la página y el CV comparten la misma fuente de datos — el CV `.docx` se genera en el navegador a partir de los mismos datos que pintan la página, por lo que lo que se ve y lo que se descarga nunca divergen.

## Operating Context

- Sitio de una sola página, estático, desplegado en `portfolio.raulmorales.eu`: `/` (ES) y `/en/` (EN).
- La versión anterior del diseño ("The Terminal Garden") vive archivada en `/original/` y `/original/en/` (noindex, fuera del sitemap).
- Contacto principal por email (`raulmoralesruiz@outlook.com`), más GitHub y LinkedIn.
- El CV se genera 100% en el cliente (librería `docx`) y se descarga como `Raul-Morales-CV.docx`; no hay backend.
- Licencia del repositorio: AGPL-3.0.
- Idioma: bilingüe ES/EN (implementado): `/` en español, `/en/` en inglés; sin autodetección, el visitante elige.

## Capabilities and Constraints

- **Innegociables (confirmados por el dueño):**
  - Descarga de CV `.docx` generada en el cliente.
  - Proyectos reales con sus enlaces vivos (demo + GitHub).
  - Foto de Raúl y PDFs de certificaciones.
  - Dominio de despliegue `raulmorales.eu`.
- **Requerimiento de idioma:** bilingüe ES/EN como estándar de producto (decisión confirmada; implementado en producción: `/` ES + `/en/` EN).
- **Stack existente:** Astro 7.4.7 + Tailwind CSS v4 + TypeScript; datos centralizados en `src/data/cv.ts` (fuente única de la página y del CV).
- **Estático:** sin backend; toda la lógica (incluida la generación del CV) corre en el navegador.

## Brand Commitments

- Nombre: Raúl Morales.
- Rol público: "Frontend Developer" (con base full-stack y de sistemas).
- Voz: cercana y directa, en primera persona ("HOLA, MI NOMBRE ES", "Ponte en contacto").
- Dominio `raulmorales.eu` como identidad estable (confirmado innegociable).

## Evidence on Hand

- **Foto:** `src/assets/img/raul.png` — referenciada por `Adelante.astro` (y por `About.astro` en la versión archivada); **asset local-only (gitignored)**, no está en el repositorio.
- **Certificaciones (PDFs, en el repo):** `public/cursos/bigschool_ia.pdf`, `public/cursos/midu_mcp.pdf`, `public/cursos/mongo_m001.pdf`, `public/cursos/udemy_angular.pdf`.
- **Proyectos con enlaces vivos** (en `src/data/cv.ts`): Virus! (frontend, backend y docs), Kéfir Control, Portfolio Radio, AboutMe.
- **Experiencia:** Babel (2021–presente), NTT Data (2019–2021), MGS (2013–2019).
- **Formación:** IES Jacarandá (2021), Colegio Altair (2013).
- **Ausencias que no fabricar:** no hay testimonios, clientes nombrados, métricas, cifras de rendimiento ni reseñas. No inventar ninguno.

## Product Principles

1. **La evidencia manda:** proyectos reales y enlaces vivos por encima de adjetivos.
2. **Una sola fuente de verdad:** la página y el CV comparten datos; nunca divergen.
3. **Rápido y legible:** un reclutador o cliente entiende el valor en segundos.
4. **Puerta abierta:** el siguiente paso (contactar o descargar el CV) siempre está a un clic.
5. **Bilingüe por diseño:** español e inglés como primera clase.

## Accessibility & Inclusion

- **Bilingüe ES/EN** como requerimiento de producto confirmado (incluye a un público más amplio).
- Baseline accesible a preservar: estados de foco visibles, etiquetas `sr-only` en iconos y contraste adecuado.
