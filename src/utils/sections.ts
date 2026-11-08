import { cv, type Lang } from "../data/cv";

export type SectionKey =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "contact";

export interface Section {
  key: SectionKey;
  num: string;
  label: string;
  anchor: string;
}

/**
 * Page section order — single source of truth shared by the section nav
 * and every section header, so numbers, labels and anchors never diverge.
 */
const ORDER: SectionKey[] = [
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
];

const labelOf = (lang: Lang, key: SectionKey): string => {
  const ui = cv[lang].ui;
  switch (key) {
    case "about":
      return ui.sectionAbout;
    case "skills":
      return ui.sectionSkills;
    case "projects":
      return ui.sectionProjects;
    case "experience":
      return ui.sectionExperience;
    case "education":
      return ui.sectionEducation;
    case "certifications":
      return ui.sectionCertifications;
    case "contact":
      return ui.sectionContact;
  }
};

export function getSections(lang: Lang): Section[] {
  return ORDER.map((key, index) => ({
    key,
    num: String(index + 1).padStart(2, "0"),
    label: labelOf(lang, key),
    anchor: cv[lang].anchors[key],
  }));
}

export function getSection(lang: Lang, key: SectionKey): Section {
  const section = getSections(lang).find((s) => s.key === key);
  if (!section) throw new Error(`Unknown section: ${key}`);
  return section;
}
