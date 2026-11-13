import {
  AlignmentType,
  Bookmark,
  BorderStyle,
  Document,
  ExternalHyperlink,
  ImageRun,
  InternalHyperlink,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  UnderlineType,
  VerticalAlignTable,
  WidthType,
} from "docx";
import type { IBorderOptions } from "docx";
import { cv, type Lang } from "../data/cv";
import { getSection, type SectionKey } from "./sections";
import { TILES, type Tile } from "./tiles";

/* ============================================================
   CV .docx — espejo del diseño "Adelante" (src/styles/adelante.css)

   · Tema: sigue el activo en el momento de la descarga
     (html[data-theme="dark"] → paleta oscura; si no, clara).
   · Paleta: tokens --at-* de adelante.css (crema/teal profundo,
     verde #24C87F, ámbar #FFC233, neón #00FF8D).
   · Tipografía: Fraunces (display) · Work Sans (cuerpo) ·
     Clash Display (números). Si quien abre el docx no las tiene,
     Word sustituye; la identidad la llevan color + bordes 3px.
   · Estructura: hero → 01 Sobre Mí → 02 Habilidades →
     03 Proyectos → 04 Experiencia → 05 Formación →
     06 Certificaciones → 07 Contacto → footer. Mismo orden que
     sections.ts y Adelante.astro.
   · Chips/tarjetas = celdas de tabla con borde 3px + relleno
     (los bordes de run no se renderizan fiablemente en Word).
   · Chips/botones a su ancho de contenido (como .at-chip/.at-btn
     en la web), empaquetados en filas que caben en la página:
     nada se corta ni se encoge.
   · Botones funcionales: enlaces externos (mailto/http) y el
     "Ver mis proyectos" del hero salta a la sección 03 (bookmark
     interno, como #proyectos en la web).
   · Franja de mosaicos 03·Proyectos: las 15 baldosas SVG de la
     web (src/utils/tiles.ts) con fallback PNG.
   ============================================================ */

type Theme = "light" | "dark";

interface Palette {
  canvas: string; // fondo de página (--at-canvas)
  ink: string; // texto principal + bordes (--at-ink)
  card: string; // fondo de tarjetas (--at-card)
  cardSoft: string; // chips / tarjeta alternativa (--at-card-soft)
  onInk: string; // texto sobre chip sólido (--at-on-ink)
  onAccent: string; // texto sobre verde/ámbar/neón (--at-on-accent)
  green: string;
  neon: string;
  amber: string;
  panel: string; // sección de contacto (--at-panel)
  panelDeep: string; // caja de email (--at-panel-deep)
  panelText: string; // texto sobre panel (--at-panel-text)
}

const PALETTES: Record<Theme, Palette> = {
  light: {
    canvas: "FAF3E0",
    ink: "004242",
    card: "FFFFFF",
    cardSoft: "FAF3E0",
    onInk: "FAF3E0",
    onAccent: "004242",
    green: "24C87F",
    neon: "00FF8D",
    amber: "FFC233",
    panel: "004242",
    panelDeep: "003030",
    panelText: "FAF3E0",
  },
  dark: {
    canvas: "001515",
    ink: "FAF3E0",
    card: "002B2B",
    cardSoft: "002222",
    onInk: "001515",
    onAccent: "001515",
    green: "24C87F",
    neon: "00FF8D",
    amber: "FFC233",
    panel: "002B2B",
    panelDeep: "001515",
    panelText: "FAF3E0",
  },
};

/** Tema activo en el momento de la descarga (el toggle lo guarda en
 *  html[data-theme]); fuera del navegador (tests) → claro. */
function detectTheme(): Theme {
  try {
    if (typeof document !== "undefined" && document.documentElement?.dataset?.theme === "dark") {
      return "dark";
    }
  } catch {
    /* contexto sin DOM: paleta clara */
  }
  return "light";
}

/* ---------- Fuentes y medidas ---------- */
const F_DISPLAY = "Fraunces";
const F_BODY = "Work Sans";
const F_NUM = "Clash Display";
const PX3 = 18; // borde 3px ≈ 2.25pt (en octavos de punto)
const MARGIN = 1100; // margen de página (centésimas de punto)

/* ---------- Anchos (DXA = centésimas de punto) ----------
   Página Carta (12240) − 2×márgenes (1100) = ancho de texto.
   Todo chip/botón se mide contra esto para que nada se corte. */
const CONTENT_W = 12240 - MARGIN * 2; // 10040
const CARD_W = CONTENT_W - 340; // interior de tarjeta a ancho completo (márgenes 170×2)
const CARD_W_HALF = 4350; // interior de tarjeta a media página (4853−70−90−340)
const CARD_W_THIRD = 2740; // interior de tarjeta en rejilla de 3 columnas
const SPACER_W = 200; // celda de separación entre chips/botones (~10px)
const BOOKMARK_PROJECTS = "at-projects"; // destino del botón del hero

/* ---------- Bordes ---------- */
const side = (color: string): IBorderOptions => ({ style: BorderStyle.SINGLE, size: PX3, color });
const NO: IBorderOptions = { style: BorderStyle.NONE, size: 0, color: "auto" };
const box = (color: string) => ({ top: side(color), bottom: side(color), left: side(color), right: side(color) });
const NO_BOX = { top: NO, bottom: NO, left: NO, right: NO };
const NO_TABLE = { top: NO, bottom: NO, left: NO, right: NO, insideHorizontal: NO, insideVertical: NO };

/* ---------- Chips (celda con borde 3px + relleno) ---------- */
interface ChipOpts {
  fill?: string;
  color?: string;
  border?: string;
  font?: string;
  size?: number;
  bold?: boolean;
  link?: string;
  underline?: boolean;
  width?: number; // DXA; filas empaquetadas lo fijan según el texto
}

function chipCell(p: Palette, text: string, o: ChipOpts = {}): TableCell {
  const fill = o.fill ?? p.cardSoft;
  const color = o.color ?? p.ink;
  const border = o.border ?? p.ink;
  const run = new TextRun({
    text,
    font: o.font ?? F_BODY,
    size: o.size ?? 19,
    bold: o.bold ?? true,
    color,
    ...(o.underline ? { underline: { type: UnderlineType.SINGLE, color } } : {}),
  });
  const children = o.link
    ? [new ExternalHyperlink({ children: [run], link: o.link })]
    : [run];
  return new TableCell({
    ...(o.width ? { width: { size: o.width, type: WidthType.DXA } } : {}),
    children: [
      new Paragraph({ children, alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
    ],
    borders: box(border),
    shading: { type: ShadingType.CLEAR, fill },
    margins: { top: 70, bottom: 70, left: 130, right: 130 },
    verticalAlign: VerticalAlignTable.CENTER,
  });
}

/** Celda vacía de separación entre chips (~10px). */
function spacerCell(): TableCell {
  return new TableCell({
    width: { size: 200, type: WidthType.DXA },
    borders: NO_BOX,
    children: [new Paragraph({ children: [], spacing: { before: 0, after: 0 } })],
  });
}

/** Celda de separación con ancho porcentual (filas de botones). */
function gapCell(w: number): TableCell {
  return new TableCell({
    width: { size: w, type: WidthType.PERCENTAGE },
    borders: NO_BOX,
    children: [new Paragraph({ children: [], spacing: { before: 0, after: 0 } })],
  });
}

/** Ancho estimado de un chip (DXA): ~0,6em por carácter +
    márgenes (130×2) + bordes (3px×2) + holgura. */
const chipW = (text: string, size: number) => Math.ceil(text.length * size * 6) + 400;

/** Chips empaquetados en filas que caben en maxW (DXA).
    Cada chip a su ancho de contenido (como .at-chip con flex-wrap
    en la web): ningún chip se corta, se encoge ni hace wrap.
    Devuelve una tabla por fila (Word fusionaría tablas contiguas,
    por eso se intercalan spacers al componer). */
function chipRows(
  p: Palette,
  items: { text: string; o?: ChipOpts }[],
  maxW: number,
): Table[] {
  const out: Table[] = [];
  let cur: { text: string; o?: ChipOpts; w: number }[] = [];
  let used = 0;
  const flush = () => {
    if (!cur.length) return;
    const cells: TableCell[] = [];
    cur.forEach((c, i) => {
      if (i > 0) cells.push(spacerCell());
      cells.push(chipCell(p, c.text, { ...c.o, width: c.w }));
    });
    out.push(
      new Table({
        width: { size: cur.reduce((s, c) => s + c.w, 0) + SPACER_W * (cur.length - 1), type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows: [new TableRow({ cantSplit: true, children: cells })],
      }),
    );
    cur = [];
    used = 0;
  };
  for (const it of items) {
    const w = chipW(it.text, it.o?.size ?? 19);
    if (cur.length && used + SPACER_W + w > maxW) flush();
    cur.push({ text: it.text, o: it.o, w });
    used += cur.length > 1 ? SPACER_W + w : w;
  }
  flush();
  return out;
}

interface BtnSpec {
  text: string;
  link: string;
  fill?: string; // relleno (por defecto --at-card-soft, .at-btn outline)
  color?: string; // color del texto (por defecto --at-ink)
}

/** Ancho estimado de un botón (DXA): mayúsculas ~0,62em por
    carácter + márgenes (160×2) + bordes (3px×2) + holgura. */
const btnW = (text: string) => Math.ceil(text.length * 126) + 460;

/** Botones funcionales a su ancho de contenido (como .at-btn en la
    web), empaquetados en filas que caben en maxW (DXA): ningún
    botón se corta ni hace wrap. Cada botón es un enlace. */
function btnRows(
  p: Palette,
  btns: BtnSpec[],
  maxW: number,
  o: { fill?: string; color?: string; border?: string } = {},
): Table[] {
  const out: Table[] = [];
  let cur: { b: BtnSpec; w: number }[] = [];
  let used = 0;
  const flush = () => {
    if (!cur.length) return;
    const cells: TableCell[] = [];
    cur.forEach(({ b, w }, i) => {
      if (i > 0) cells.push(spacerCell());
      const fill = b.fill ?? o.fill ?? p.cardSoft;
      const color = b.color ?? o.color ?? p.ink;
      cells.push(
        new TableCell({
          width: { size: w, type: WidthType.DXA },
          borders: box(o.border ?? p.ink),
          shading: { type: ShadingType.CLEAR, fill },
          margins: { top: 110, bottom: 110, left: 160, right: 160 },
          verticalAlign: VerticalAlignTable.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 0 },
              children: [
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: b.text.toUpperCase(),
                      font: F_BODY,
                      size: 18,
                      bold: true,
                      color,
                      underline: { type: UnderlineType.SINGLE, color },
                    }),
                  ],
                  link: b.link,
                }),
              ],
            }),
          ],
        }),
      );
    });
    out.push(
      new Table({
        width: { size: cur.reduce((s, c) => s + c.w, 0) + SPACER_W * (cur.length - 1), type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows: [new TableRow({ cantSplit: true, children: cells })],
      }),
    );
    cur = [];
    used = 0;
  };
  for (const b of btns) {
    const w = btnW(b.text);
    if (cur.length && used + SPACER_W + w > maxW) flush();
    cur.push({ b, w });
    used += cur.length > 1 ? SPACER_W + w : w;
  }
  flush();
  return out;
}

/* ---------- Franja de mosaicos (03·Proyectos) ----------
   Las 15 baldosas SVG de la web (tiles.ts), celdas cuadradas con
   borde 3px y hueco ink — igual que .at-tiles--band. */
const TILE_CELL = 620; // DXA (31px); 15 celdas + bordes caben en la tarjeta (9700)
const TILE_IMG = 30; // px; la baldosa llena la celda con un marco de ink (~3px)

function tileBand(p: Palette): Table {
  const cell = (tile: Tile): TableCell =>
    new TableCell({
      width: { size: TILE_CELL, type: WidthType.DXA },
      borders: box(p.ink),
      shading: { type: ShadingType.CLEAR, fill: p.ink },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      verticalAlign: VerticalAlignTable.CENTER,
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
          children: [
            new ImageRun({
              type: "svg",
              data: tile.svg,
              fallback: { type: "png", data: tile.png },
              transformation: { width: TILE_IMG, height: TILE_IMG },
            }),
          ],
        }),
      ],
    });
  return new Table({
    width: { size: TILE_CELL * 15, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    borders: box(p.ink),
    rows: [new TableRow({ cantSplit: true, children: TILES.map(cell) })],
  });
}

/* ---------- Tarjeta (tabla 1x1 con borde 3px + relleno) ---------- */
function card(
  children: (Paragraph | Table)[],
  p: Palette,
  o: { fill?: string; border?: string; margins?: number } = {},
): Table {
  const fill = o.fill ?? p.card;
  const border = o.border ?? p.ink;
  const m = o.margins ?? 170;
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: box(border),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children,
            borders: box(border),
            shading: { type: ShadingType.CLEAR, fill },
            margins: { top: m, bottom: m, left: m, right: m },
          }),
        ],
      }),
    ],
  });
}

/** Separador fino entre tablas adyacentes (Word las fusionaría). */
const spacer = (after: number) =>
  new Paragraph({ children: [new TextRun({ text: "", size: 2 })], spacing: { before: 0, after } });

/** Intercala un separador entre tablas consecutivas (Word las
    fusionaría en una sola). El resto de bloques pasa intacto. */
function withSpacers(blocks: (Paragraph | Table)[], gap = 200): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];
  for (const b of blocks) {
    if (out.length && b instanceof Table && out[out.length - 1] instanceof Table) out.push(spacer(gap));
    out.push(b);
  }
  return out;
}

/* ---------- Mancheta de sección: "01." + etiqueta + filete 3px ---------- */
function sectionHeading(
  p: Palette,
  lang: Lang,
  key: SectionKey,
  label: string,
  o: { color?: string; border?: string; bookmark?: string } = {},
): Paragraph {
  const color = o.color ?? p.ink;
  const runs = [
    new TextRun({ text: `${getSection(lang, key).num}  `, font: F_NUM, size: 26, bold: true, color }),
    new TextRun({ text: label.toUpperCase(), font: F_BODY, size: 19, bold: true, color, characterSpacing: 35 }),
  ];
  return new Paragraph({
    children: o.bookmark ? [new Bookmark({ id: o.bookmark, children: runs })] : runs,
    border: { bottom: { style: BorderStyle.SINGLE, size: PX3, color: o.border ?? p.ink, space: 6 } },
    spacing: { before: 500, after: 280 },
    keepNext: true,
  });
}

/* ---------- Texto del "about" con HTML ligero ----------
   Mantiene <strong>/<em>; remapea las clases viejas de resaltado
   al diseño nuevo (igual que .about-text en adelante.css):
   .text-emerald-400 → relleno verde · .text-white → relleno ámbar. */
function aboutRuns(html: string, p: Palette): TextRun[] {
  const runs: TextRun[] = [];
  const re =
    /(<strong\b[^>]*>|<\/strong\s*>|<b\b[^>]*>|<\/b\s*>|<em\b[^>]*>|<\/em\s*>|<i\b[^>]*>|<\/i\s*>|<span[^>]*>|<\/span\s*>)/g;
  let bold = false;
  let italic = false;
  let hi: "green" | "amber" | null = null;
  let last = 0;
  const flush = (text: string) => {
    if (!text) return;
    runs.push(
      new TextRun({
        text,
        font: F_BODY,
        size: 21,
        bold: bold || undefined,
        italics: italic || undefined,
        color: hi ? p.onAccent : p.ink,
        shading: hi ? { type: ShadingType.CLEAR, fill: hi === "green" ? p.green : p.amber } : undefined,
        characterSpacing: hi ? 12 : undefined,
      }),
    );
  };
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    flush(html.slice(last, m.index));
    last = re.lastIndex;
    const tag = m[1];
    if (tag.startsWith("<strong") || tag.startsWith("<b")) bold = true;
    else if (tag.startsWith("</strong") || tag.startsWith("</b")) bold = false;
    else if (tag.startsWith("<em") || tag.startsWith("<i")) italic = true;
    else if (tag.startsWith("</em") || tag.startsWith("</i")) italic = false;
    else if (tag.startsWith("<span")) {
      if (tag.includes("text-emerald-400")) hi = "green";
      else if (tag.includes("text-white")) hi = "amber";
    } else if (tag.startsWith("</span")) hi = null;
  }
  flush(html.slice(last));
  return runs;
}

/* ============================================================
   Generación del documento
   ============================================================ */
export async function generateWordDocument(lang: Lang): Promise<Blob> {
  const data = cv[lang];
  const ui = data.ui;
  const p = PALETTES[detectTheme()];
  const year = new Date().getFullYear();

  const site = "https://raulmorales.eu";
  const github = "https://github.com/raulmoralesruiz";
  const linkedin = "https://www.linkedin.com/in/raulmoralesruiz";

  /* ---------- HERO ---------- */
  const roleWords = data.header.role.split(" ");
  const roleFirst = roleWords[0];
  const roleRest = roleWords.slice(1).join(" ");
  const heroBtnText = `${ui.viewProjects.toUpperCase()}  ↘`;
  const heroBtnW = btnW(heroBtnText);
  const hero: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({ text: ui.greeting, font: F_BODY, size: 18, bold: true, color: p.ink, characterSpacing: 45 }),
      ],
      border: { bottom: { style: BorderStyle.SINGLE, size: PX3, color: p.ink, space: 8 } },
      spacing: { before: 0, after: 260 },
    }),
    new Paragraph({
      children: [new TextRun({ text: data.header.name, font: F_DISPLAY, size: 104, bold: true, color: p.ink })],
      spacing: { before: 0, after: 140 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: roleFirst,
          font: F_DISPLAY,
          size: 54,
          bold: true,
          italics: true,
          color: p.ink,
          underline: { type: UnderlineType.THICK, color: p.amber }, // mancheta ámbar (.at-mark)
        }),
        new TextRun({ text: ` ${roleRest}`, font: F_DISPLAY, size: 54, bold: true, italics: true, color: p.ink }),
      ],
      spacing: { before: 0, after: 240 },
    }),
    new Paragraph({
      children: [new TextRun({ text: data.header.description, font: F_BODY, size: 23, color: p.ink })],
      spacing: { before: 0, after: 300 },
    }),
    // Botón "Ver mis proyectos ↘" + chips (raulmorales.eu, ES·EN) en UNA
    // sola fila, cada caja a su ancho de contenido (como en la web):
    // ninguna se estira ni se corta. El botón salta a la sección 03
    // (bookmark at-projects).
    (() => {
      const siteChipW = chipW("raulmorales.eu", 19);
      const langChipW = chipW("ES · EN", 19);
      const totalW = heroBtnW + SPACER_W + siteChipW + SPACER_W + langChipW;
      const btnCell = new TableCell({
        width: { size: heroBtnW, type: WidthType.DXA },
        borders: box(p.ink),
        shading: { type: ShadingType.CLEAR, fill: p.green },
        margins: { top: 100, bottom: 100, left: 150, right: 150 },
        verticalAlign: VerticalAlignTable.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            children: [
              new InternalHyperlink({
                children: [
                  new TextRun({
                    text: heroBtnText,
                    font: F_BODY,
                    size: 18,
                    bold: true,
                    color: p.onAccent,
                    underline: { type: UnderlineType.SINGLE, color: p.onAccent },
                  }),
                ],
                anchor: BOOKMARK_PROJECTS,
              }),
            ],
          }),
        ],
      });
      const siteCell = new TableCell({
        width: { size: siteChipW, type: WidthType.DXA },
        borders: box(p.ink),
        shading: { type: ShadingType.CLEAR, fill: p.ink },
        margins: { top: 100, bottom: 100, left: 130, right: 130 },
        verticalAlign: VerticalAlignTable.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            children: [
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "raulmorales.eu",
                    font: F_BODY,
                    size: 19,
                    bold: true,
                    color: p.onInk,
                    underline: { type: UnderlineType.SINGLE, color: p.onInk },
                  }),
                ],
                link: site,
              }),
            ],
          }),
        ],
      });
      const langCell = new TableCell({
        width: { size: langChipW, type: WidthType.DXA },
        borders: box(p.ink),
        shading: { type: ShadingType.CLEAR, fill: p.amber },
        margins: { top: 100, bottom: 100, left: 130, right: 130 },
        verticalAlign: VerticalAlignTable.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            children: [new TextRun({ text: "ES · EN", font: F_BODY, size: 19, bold: true, color: p.onAccent })],
          }),
        ],
      });
      return new Table({
        width: { size: totalW, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows: [
          new TableRow({
            cantSplit: true,
            children: [btnCell, spacerCell(), siteCell, spacerCell(), langCell],
          }),
        ],
      });
    })(),
  ];

  /* ---------- 01 · SOBRE MÍ ---------- */
  const about: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "about", ui.sectionAbout),
    ...data.about.map((html, i) =>
      new Paragraph({
        children: aboutRuns(html, p),
        spacing: { before: i === 0 ? 0 : 200, after: 0 },
      }),
    ),
  ];

  /* ---------- 02 · HABILIDADES ---------- */
  const skillCard = (group: { category: string; items: string[] }, i: number): Table => {
    const fill = i % 2 === 1 ? p.cardSoft : p.card;
    const chipFill = i % 2 === 1 ? p.card : p.cardSoft;
    // Cabecera: categoría (display) + número (badge)
    const header = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.FIXED,
      borders: NO_TABLE,
      rows: [
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: NO_BOX,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: group.category, font: F_DISPLAY, size: 34, bold: true, color: p.ink })],
                  spacing: { before: 0, after: 220 },
                }),
              ],
            }),
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              borders: NO_BOX,
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 220 },
                  children: [new TextRun({ text: `0${i + 1}`, font: F_NUM, size: 22, bold: true, color: p.ink })],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    // Chips a su ancho de contenido, empaquetados como en la web
    const chips = chipRows(p, group.items.map((item) => ({ text: item, o: { fill: chipFill } })), CARD_W_HALF);
    return card(withSpacers([header, ...chips], 100), p, { fill });
  };
  const skills: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "skills", ui.sectionSkills),
    (() => {
      const cards = data.skills.map((g, i) => skillCard(g, i));
      const rows: TableRow[] = [];
      for (let i = 0; i < cards.length; i += 2) {
        const right = cards[i + 1];
        rows.push(
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: NO_BOX,
                margins: { top: 40, bottom: 40, left: 0, right: right ? 70 : 0 },
                children: [cards[i]],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: NO_BOX,
                margins: { top: 40, bottom: 40, left: right ? 70 : 0, right: 0 },
                children: right ? [right] : [new Paragraph({ children: [], spacing: { before: 0, after: 0 } })],
              }),
            ],
          }),
        );
      }
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows,
      });
    })(),
  ];

  /* ---------- 03 · PROYECTOS ---------- */
  const abs = (l: string) => (l.startsWith("http") ? l : `https://portfolio.raulmorales.eu${l}`);
  const projects: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "projects", ui.sectionProjects, { bookmark: BOOKMARK_PROJECTS }),
  ];

  // Destacado: franja de mosaico + chips + título + descripción + tech + botones
  for (const project of data.projects.filter((pr) => pr.featured)) {
    const btns: BtnSpec[] = [
      { text: `${ui.docxView} ${ui.verProyecto}`, link: project.link, fill: p.green, color: p.onAccent },
      { text: ui.docxSourceCode, link: project.github },
      ...(project.sublinks ?? []).map((s) => ({ text: s.label, link: s.url })),
    ];
    projects.push(
      card(
        withSpacers(
          [
            tileBand(p),
            ...chipRows(
              p,
              [
                { text: ui.proyectoDestacado, o: { fill: p.ink, color: p.onInk } },
                { text: `${project.tech.length} ${ui.tecnologias}` },
              ],
              CARD_W,
            ),
            new Paragraph({
              children: [new TextRun({ text: project.title, font: F_DISPLAY, size: 52, bold: true, color: p.ink })],
              spacing: { before: 200, after: 160 },
            }),
            new Paragraph({
              children: [new TextRun({ text: project.description, font: F_BODY, size: 21, color: p.ink })],
              spacing: { before: 0, after: 220 },
            }),
            ...chipRows(p, project.tech.map((t) => ({ text: t })), CARD_W),
            ...btnRows(p, btns, CARD_W),
          ],
          200,
        ),
        p,
      ),
    );
  }

  // Resto: rejilla de 2 columnas (la 2ª tarjeta, verde, como en Adelante;
  // chips y botones con el mismo tratamiento que las tarjetas normales)
  const rest = data.projects.filter((pr) => !pr.featured);
  if (rest.length) {
    const restCards = rest.map((project, i) => {
      const green = i === 1;
      const fill = green ? p.green : p.card;
      const color = green ? p.onAccent : p.ink;
      const btns: BtnSpec[] = [
        { text: ui.docxView, link: project.link, fill: p.green, color: p.onAccent },
        { text: "GitHub", link: project.github },
      ];
      return card(
        withSpacers(
          [
            new Paragraph({
              children: [new TextRun({ text: project.title, font: F_DISPLAY, size: 32, bold: true, color })],
              spacing: { before: 0, after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: project.description, font: F_BODY, size: 19, color })],
              spacing: { before: 0, after: 180 },
            }),
            ...chipRows(p, project.tech.map((t) => ({ text: t, o: { fill: p.cardSoft, color: p.ink, size: 17 } })), CARD_W_HALF),
            ...btnRows(p, btns, CARD_W_HALF),
          ],
          160,
        ),
        p,
        { fill },
      );
    });
    const rows: TableRow[] = [];
    for (let i = 0; i < restCards.length; i += 2) {
      const right = restCards[i + 1];
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_BOX,
              margins: { top: 40, bottom: 40, left: 0, right: right ? 70 : 0 },
              children: [restCards[i]],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_BOX,
              margins: { top: 40, bottom: 40, left: right ? 70 : 0, right: 0 },
              children: right ? [right] : [new Paragraph({ children: [], spacing: { before: 0, after: 0 } })],
            }),
          ],
        }),
      );
    }
    projects.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows,
      }),
    );
  }

  /* ---------- 04 · EXPERIENCIA / 05 · FORMACIÓN ----------
     Fila tipo .at-row: chip de periodo a la izquierda + contenido a la derecha. */
  const rowCard = (o: {
    period: string;
    periodAmber: boolean;
    title: string;
    org: string;
    description: string;
  }): Table => {
    const chipFill = o.periodAmber ? p.amber : p.cardSoft;
    const chipColor = o.periodAmber ? p.onAccent : p.ink;
    return card(
      [
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          borders: NO_TABLE,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 28, type: WidthType.PERCENTAGE },
                  borders: NO_BOX,
                  verticalAlign: VerticalAlignTable.TOP,
                  children: [
                    new Table({
                      width: { size: 100, type: WidthType.PERCENTAGE },
                      layout: TableLayoutType.FIXED,
                      borders: box(p.ink),
                      rows: [
                        new TableRow({
                          cantSplit: true,
                          children: [
                            new TableCell({
                              borders: box(p.ink),
                              shading: { type: ShadingType.CLEAR, fill: chipFill },
                              margins: { top: 70, bottom: 70, left: 100, right: 100 },
                              verticalAlign: VerticalAlignTable.CENTER,
                              children: [
                                new Paragraph({
                                  alignment: AlignmentType.CENTER,
                                  spacing: { before: 0, after: 0 },
                                  children: [new TextRun({ text: o.period, font: F_NUM, size: 22, bold: true, color: chipColor })],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 72, type: WidthType.PERCENTAGE },
                  borders: NO_BOX,
                  margins: { top: 40, bottom: 40, left: 220, right: 0 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: o.title, font: F_DISPLAY, size: 30, bold: true, color: p.ink })],
                      spacing: { before: 0, after: 60 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: o.org.toUpperCase(), font: F_BODY, size: 17, bold: true, color: p.ink, characterSpacing: 30 })],
                      spacing: { before: 0, after: 140 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: o.description, font: F_BODY, size: 20, color: p.ink })],
                      spacing: { before: 0, after: 0 },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      p,
    );
  };

  const experience: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "experience", ui.sectionExperience),
    ...data.experience.flatMap((job, i) => [
      rowCard({ period: job.period, periodAmber: true, title: job.role, org: job.company, description: job.description }),
      ...(i < data.experience.length - 1 ? [spacer(240)] : []),
    ]),
  ];

  const education: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "education", ui.sectionEducation),
    ...data.education.flatMap((edu, i) => [
      rowCard({ period: edu.year, periodAmber: false, title: edu.degree, org: edu.school, description: edu.description }),
      ...(i < data.education.length - 1 ? [spacer(240)] : []),
    ]),
  ];

  /* ---------- 06 · CERTIFICACIONES ---------- */
  const certCards = data.certifications.map((cert) => {
    const isLink = Boolean(cert.link);
    const nameRun = new TextRun({ text: cert.name, font: F_DISPLAY, size: 26, bold: true, color: p.ink });
    const nameChildren =
      isLink && cert.link
        ? [new ExternalHyperlink({ children: [nameRun], link: abs(cert.link) })]
        : [nameRun];
    return card(
      withSpacers(
        [
          ...chipRows(
            p,
            [
              { text: cert.date, o: { fill: p.ink, color: p.onInk, font: F_NUM } },
              ...(isLink ? [{ text: "PDF ↗", o: { link: cert.link ? abs(cert.link) : undefined } }] : []),
            ],
            CARD_W_THIRD,
          ),
          new Paragraph({ children: nameChildren, spacing: { before: 160, after: 100 } }),
          new Paragraph({
            children: [new TextRun({ text: cert.issuer.toUpperCase(), font: F_BODY, size: 16, bold: true, color: p.ink, characterSpacing: 30 })],
            spacing: { before: 0, after: 0 },
          }),
        ],
        160,
      ),
      p,
    );
  });
  const certifications: (Paragraph | Table)[] = [
    sectionHeading(p, lang, "certifications", ui.sectionCertifications),
    (() => {
      const rows: TableRow[] = [];
      for (let i = 0; i < certCards.length; i += 3) {
        const chunk = certCards.slice(i, i + 3);
        const gapW = 4;
        const cardW = (100 - gapW * 2) / 3;
        const cells: TableCell[] = [];
        chunk.forEach((c, j) => {
          if (j > 0) cells.push(gapCell(gapW));
          cells.push(
            new TableCell({
              width: { size: cardW, type: WidthType.PERCENTAGE },
              borders: NO_BOX,
              children: [c],
            }),
          );
        });
        // rellena hasta 3 columnas
        while (cells.length < 5) cells.push(gapCell(gapW));
        rows.push(new TableRow({ children: cells }));
      }
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        borders: NO_TABLE,
        rows,
      });
    })(),
  ];

  /* ---------- 07 · CONTACTO (panel) ---------- */
  const contactKey = lang === "es" ? "contacto" : "touch";
  const contactTitle = ui.contactTitle;
  const titleIdx = contactTitle.indexOf(contactKey);
  const before = titleIdx >= 0 ? contactTitle.slice(0, titleIdx) : contactTitle;
  const marked = titleIdx >= 0 ? contactTitle.slice(titleIdx, titleIdx + contactKey.length) : "";
  const after = titleIdx >= 0 ? contactTitle.slice(titleIdx + contactKey.length) : "";
  const contact: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({ text: `${getSection(lang, "contact").num}  `, font: F_NUM, size: 26, bold: true, color: p.ink }),
        new TextRun({ text: ui.sectionContact.toUpperCase(), font: F_BODY, size: 19, bold: true, color: p.ink, characterSpacing: 35 }),
      ],
      border: { bottom: { style: BorderStyle.SINGLE, size: PX3, color: p.ink, space: 6 } },
      spacing: { before: 500, after: 320 },
      keepNext: true,
    }),
    card(
      [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            ...(before ? [new TextRun({ text: before, font: F_DISPLAY, size: 56, bold: true, color: p.panelText })] : []),
            ...(marked ? [new TextRun({ text: marked, font: F_DISPLAY, size: 56, bold: true, italics: true, color: p.amber })] : []),
            ...(after ? [new TextRun({ text: after, font: F_DISPLAY, size: 56, bold: true, color: p.panelText })] : []),
          ],
          spacing: { before: 0, after: 240 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: ui.contactBody, font: F_BODY, size: 21, color: p.panelText })],
          spacing: { before: 0, after: 280 },
        }),
        // Caja de email (panel-deep, borde panel-text)
        card(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: data.email,
                      font: F_NUM,
                      size: 24,
                      bold: true,
                      color: p.panelText,
                      underline: { type: UnderlineType.SINGLE, color: p.panelText },
                    }),
                  ],
                  link: `mailto:${data.email}`,
                }),
              ],
              spacing: { before: 0, after: 0 },
            }),
          ],
          p,
          { fill: p.panelDeep, border: p.panelText, margins: 160 },
        ),
        spacer(280),
        // CTAs: Saludar (neón, mailto) + GitHub + LinkedIn
        (() => {
          const btn = (text: string, link: string, fill: string, color: string): TableCell =>
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              borders: box(p.panelText),
              shading: { type: ShadingType.CLEAR, fill },
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              verticalAlign: VerticalAlignTable.CENTER,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                  children: [
                    new ExternalHyperlink({
                      children: [new TextRun({ text, font: F_BODY, size: 18, bold: true, color, underline: { type: UnderlineType.SINGLE, color } })],
                      link,
                    }),
                  ],
                }),
              ],
            });
          return new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            layout: TableLayoutType.FIXED,
            borders: NO_TABLE,
            rows: [
              new TableRow({
                cantSplit: true,
                children: [
                  btn(`${ui.contactCta.toUpperCase()}  ✳`, `mailto:${data.email}`, p.neon, p.onAccent),
                  gapCell(4),
                  btn("GITHUB", github, p.panelDeep, p.panelText),
                  gapCell(4),
                  btn("LINKEDIN", linkedin, p.panelDeep, p.panelText),
                ],
              }),
            ],
          });
        })(),
      ],
      p,
      { fill: p.panel, border: p.panel, margins: 320 },
    ),
  ];

  /* ---------- FOOTER ---------- */
  const footer: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({ text: ui.footer, font: F_BODY, size: 17, bold: true, color: p.ink }),
        new TextRun({ text: "   ·   ", font: F_BODY, size: 17, color: p.ink }),
        new TextRun({ text: `© ${year}`, font: F_BODY, size: 17, color: p.ink }),
      ],
      border: { top: { style: BorderStyle.SINGLE, size: PX3, color: p.neon, space: 8 } },
      spacing: { before: 500, after: 0 },
    }),
  ];

  /* ---------- DOCUMENTO ---------- */
  const doc = new Document({
    background: { color: p.canvas },
    styles: {
      default: {
        document: {
          run: { font: F_BODY, size: 21, color: p.ink },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        children: [
          ...hero,
          ...about,
          ...skills,
          ...projects,
          ...experience,
          ...education,
          ...certifications,
          ...contact,
          ...footer,
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
