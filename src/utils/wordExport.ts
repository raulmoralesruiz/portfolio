import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ExternalHyperlink,
  BorderStyle,
} from "docx";
import {
  headerData,
  aboutData,
  experienceData,
  educationData,
  skillsData,
  certificationsData,
  projectsData,
} from "../data/cv";

// Helper to parse HTML strings into TextRuns with colors and bold
function parseHtmlToTextRuns(htmlString: string): TextRun[] {
  const runs: TextRun[] = [];
  
  const regex = /(<strong[^>]*>|<span[^>]*>)(.*?)(<\/strong>|<\/span>)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: htmlString.substring(lastIndex, match.index) }));
    }
    
    const tag = match[1];
    const text = match[2];
    
    let color = "e5e7eb";
    let bold = false;
    let font = "Segoe UI";
    
    if (tag.includes('strong')) bold = true;
    if (tag.includes('text-emerald-400')) color = "34d399";
    if (tag.includes('text-white')) color = "ffffff";
    if (tag.includes('font-mono')) font = "Consolas";

    runs.push(new TextRun({ text, bold, color, font }));
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < htmlString.length) {
    runs.push(new TextRun({ text: htmlString.substring(lastIndex) }));
  }

  return runs;
}

export async function generateWordDocument(): Promise<Blob> {
  const doc = new Document({
    background: {
      color: "0a0a0a", // bg-neutral-950
    },
    styles: {
      default: {
        document: {
          run: {
            font: "Segoe UI",
            size: 22, // 11pt
            color: "e5e7eb", // text-gray-200
          },
        },
        heading1: {
          run: {
            font: "Segoe UI",
            size: 36, // 18pt
            color: "ffffff",
            bold: true,
          },
        },
        heading2: {
          run: {
            font: "Segoe UI",
            size: 28, // 14pt
            color: "9ca3af", // text-gray-400
            bold: true,
          },
        },
        heading3: {
          run: {
            font: "Segoe UI",
            size: 24, // 12pt
            color: "e5e7eb",
            bold: true,
          },
        },
        title: {
          run: {
            font: "Segoe UI",
            size: 48, // 24pt
            color: "ffffff",
            bold: true,
          },
        },
        hyperlink: {
          run: {
            color: "34d399",
            underline: {
              type: "single",
              color: "34d399",
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // HEADER SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "HOLA, MI NOMBRE ES", font: "Consolas", color: "34d399" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: headerData.name,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: headerData.role,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: parseHtmlToTextRuns(headerData.description.replace('Full-Stack', '<span class="text-emerald-400">Full-Stack</span>')),
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // ABOUT SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "01. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Sobre Mí" })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            keepNext: true,
          }),
          ...aboutData.map(
            (paragraph) =>
              new Paragraph({
                children: parseHtmlToTextRuns(paragraph),
                spacing: { after: 200 },
              })
          ),

          // SKILLS SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "02. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Habilidades" }) // Oh wait, in web Skills is 02, let's keep the order we had or follow web
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            keepNext: true,
          }),
          ...skillsData.flatMap((skillGroup) => [
            new Paragraph({
              text: skillGroup.category,
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "▹ ", color: "34d399", font: "Consolas" }),
                new TextRun({ text: skillGroup.items.join(", ") })
              ],
              spacing: { after: 200 },
            }),
          ]),

          // EXPERIENCE SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "03. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Experiencia" })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            pageBreakBefore: true,
            keepNext: true,
          }),
          ...experienceData.flatMap((job) => [
            new Paragraph({
              children: [
                new TextRun({ text: job.role, bold: true, color: "e5e7eb" }),
                new TextRun({ text: ` @ `, color: "34d399" }),
                new TextRun({ text: job.company, color: "d1d5db" }),
              ],
              spacing: { before: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: job.period, font: "Consolas", color: "34d399", size: 20 })
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: job.description, color: "9ca3af" })
              ],
              spacing: { after: 200 },
            }),
          ]),

          // EDUCATION SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "04. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Formación" })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            keepNext: true,
          }),
          ...educationData.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true, color: "e5e7eb" }),
              ],
              spacing: { before: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: edu.school, color: "34d399" })
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: edu.description, color: "9ca3af" })
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: edu.year, font: "Consolas", color: "6b7280" })
              ],
              spacing: { after: 200 },
            }),
          ]),

          // CERTIFICATIONS SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "05. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Certificaciones" })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            keepNext: true,
          }),
          ...certificationsData.flatMap((cert) => {
            const children: any[] = [
              new TextRun({ text: `${cert.name} `, bold: true, color: "e5e7eb" }),
              new TextRun({ text: `(${cert.issuer})`, color: "34d399" }),
              new TextRun({ text: ` - ${cert.date}`, font: "Consolas", color: "6b7280" }),
            ];
            
            if (cert.link) {
              const fullLink = cert.link.startsWith('http') ? cert.link : `https://portfolio.raulmorales.eu${cert.link}`;
              children.push(new TextRun({ text: ` - ` }));
              children.push(
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: "Ver",
                      style: "Hyperlink",
                    }),
                  ],
                  link: fullLink,
                })
              );
            }

            return [
              new Paragraph({
                children: children,
                bullet: { level: 0 },
                spacing: { after: 100 }
              })
            ];
          }),

          // PROJECTS SECTION
          new Paragraph({
            children: [
              new TextRun({ text: "06. ", font: "Consolas", color: "34d399", size: 36 }),
              new TextRun({ text: "Proyectos" })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            border: { bottom: { color: "1f2937", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            pageBreakBefore: true,
            keepNext: true,
          }),
          ...projectsData.flatMap((project) => [
            new Paragraph({
              children: [
                new TextRun({ text: project.title, bold: true, color: "e5e7eb" }),
              ],
              spacing: { before: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: project.description, color: "9ca3af" })
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${project.tech.join("   ")}`, font: "Consolas", color: "34d399", size: 20 })
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new ExternalHyperlink({
                  children: [new TextRun({ text: "Ver Proyecto", style: "Hyperlink" })],
                  link: project.link,
                }),
                new TextRun({ text: " | " }),
                new ExternalHyperlink({
                  children: [new TextRun({ text: "Código Fuente", style: "Hyperlink" })],
                  link: project.github,
                })
              ],
              spacing: { after: 300 },
            }),
          ]),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
