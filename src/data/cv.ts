export type Lang = "es" | "en";

export interface CV {
  pageTitle: string;
  metaDescription: string;
  email: string;
  anchors: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    certifications: string;
    projects: string;
    contact: string;
  };

  header: {
    name: string;
    role: string;
    description: string;
  };

  about: string[];

  skills: {
    category: string;
    items: string[];
  }[];

  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];

  education: {
    degree: string;
    school: string;
    year: string;
    description: string;
  }[];

  certifications: {
    name: string;
    issuer: string;
    date: string;
    link: string | null;
  }[];

  projects: {
    title: string;
    description: string;
    tech: string[];
    link: string;
    github: string;
    featured?: boolean;
    sublinks?: { label: string; url: string }[];
  }[];

  ui: {
    skipToContent: string;
    greeting: string;
    viewProjects: string;
    download: string;
    downloadCv: string; // Botón de CV del hero: "Descargar CV · siempre al día"
    generating: string;
    cvError: string;
    cvFile: string;
    cvDone: string;
    cvCaption: string;
    sectionAbout: string;
    sectionSkills: string;
    sectionExperience: string;
    sectionEducation: string;
    sectionCertifications: string;
    noPdf: string; // solo lo usa el sitio archivado (Certifications.astro)
    sectionProjects: string;
    sectionContact: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    copyEmail: string;
    emailCopied: string;
    emailCopyError: string;
    footer: string;
    docxView: string;
    docxViewProject: string;
    docxSourceCode: string;
    heroTerminalCmd: string;
    // ---- Sitio archivado (/original/): puntero al diseño actual ----
    newDesignBanner: string;
    // ---- Adelante: etiquetas de UI (ficha, toggle de tema, proyectos) ----
    ficha: string;
    rol: string;
    web: string;
    idiomas: string;
    estado: string;
    estadoValue: string;
    proyectoDestacado: string;
    tecnologias: string;
    verProyecto: string;
    themeAriaLight: string;
    themeAriaDark: string;
  };
}

export const cv: Record<Lang, CV> = {
  es: {
    pageTitle: "Raúl Morales | Desarrollador Frontend",
    metaDescription: "Portfolio de Desarrollador Frontend",
    email: "raulmoralesruiz@outlook.com",
    anchors: {
      about: "sobre-mi",
      skills: "habilidades",
      experience: "experiencia",
      education: "estudios",
      certifications: "certificaciones",
      projects: "proyectos",
      contact: "contacto",
    },

    header: {
      name: "Raúl Morales",
      role: "Frontend Developer.",
      description:
        "Frontend con base full-stack y de sistemas: entiendo el ciclo completo, de la base de datos al píxel final. Y lo demuestro con Virus!, un juego en tiempo real que he construido de extremo a extremo.",
    },

    about: [
      "¡Hola! Soy Raúl. Hoy me especializo en frontend — interfaces fluidas y accesibles — pero vengo de la otra mitad del stack: años como full-stack developer y, antes, como administrador de sistemas. Esa base me da una ventaja real: entiendo el ciclo completo, de la base de datos al píxel final.",
      "Y no es teoría. Virus! es un juego de cartas en tiempo real que he construido de extremo a extremo — backend Node.js + Socket.io, frontend Angular y documentación Astro — y está en producción. También he hecho apps móviles como Kéfir Control (Flutter) y portfolios que viven en mi propia infraestructura.",
      "Me obsesiona el detalle: código limpio, buenas prácticas y performance. Y como vengo de sistemas, despliego y mantengo mis proyectos yo mismo, con Docker, Nginx y Linux.",
    ],

    skills: [
      { category: "Frontend", items: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript", "Astro", "Tailwind"] },
      { category: "Backend", items: ["Node.js", "Java", "Express", "SQL", "MongoDB", "REST APIs", "WebSocket"] },
      { category: "Admin", items: ["Linux", "Docker", "Nginx", "Home server", "Despliegue de aplicaciones"] },
      { category: "Soft Skills", items: ["Comunicación efectiva", "Trabajo en equipo", "Resolución de problemas", "Aprendizaje continuo", "Autonomía"] },
    ],

    experience: [
      { role: "Full-Stack Developer", company: "Babel", period: "2021 - Presente", description: "Desarrollo full-stack de aplicaciones web con Java, JSF y SQL; control de versiones con Git y SVN." },
      { role: "Full-Stack Developer", company: "NTT Data", period: "2019 - 2021", description: "Desarrollo full-stack con un stack más amplio — Java, JSF, Python, MongoDB y SQL — y énfasis en testing; Git y SVN." },
      { role: "Systems Administrator", company: "MGS", period: "2013 - 2019", description: "Administración y mantenimiento de sistemas informáticos Windows/Linux: el origen de mi base de sistemas." },
    ],

    education: [
      { degree: "Grado Superior en Desarrollo de Aplicaciones Web", school: "IES Jacarandá", year: "2021", description: "Formación especializada en desarrollo full-stack, bases de datos y despliegue de aplicaciones." },
      { degree: "Administración de Sistemas Informáticos en Red", school: "Colegio Altair", year: "2013", description: "Formación especializada en Administración y mantenimiento de Sistemas Informáticos Windows/Linux." },
    ],

    certifications: [
      { name: "Android & Kotlin", issuer: "Píldoras Informáticas", date: "2026", link: null },
      { name: "Iniciación al desarrollo IA", issuer: "BigSchool", date: "2025", link: "/cursos/bigschool_ia.pdf" },
      { name: "Curso Intensivo de Model Context Protocol", issuer: "MiduDev", date: "2025", link: "/cursos/midu_mcp.pdf" },
      { name: "Angular: De cero a experto", issuer: "Udemy", date: "2024", link: "/cursos/udemy_angular.pdf" },
      { name: "Angular Advanced: Best Practices", issuer: "Pluralsight", date: "2021", link: null },
      { name: "M001: MongoDB Basics", issuer: "MongoDB", date: "2021", link: "/cursos/mongo_m001.pdf" },
    ],

    projects: [
      {
        title: "Virus!",
        description: "Juego de cartas en tiempo real: backend Node.js + Socket.io, frontend Angular y documentación Astro. Proyecto de extremo a extremo.",
        tech: ["Node.js", "Express", "Socket.io", "Angular", "TypeScript"],
        link: "https://virus.raulmorales.eu",
        github: "https://github.com/raulmoralesruiz/virus-frontend",
        featured: true,
        sublinks: [
          { label: "Backend", url: "https://github.com/raulmoralesruiz/virus-backend" },
          { label: "Docs", url: "https://virusdocs.raulmorales.eu" },
        ],
      },
      { title: "Kéfir Control", description: "Aplicación minimalista para gestionar la fermentación de kéfir de leche", tech: ["Flutter", "Dart", "Android", "iOS"], link: "https://kefircontrol.raulmorales.eu", github: "https://github.com/raulmoralesruiz/kefir-control" },
      { title: "Portfolio Radio", description: "Portfolio de voz de radio", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://radio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/radio-portfolio" },
      { title: "Mi Portfolio", description: "Portfolio personal creado con Astro. Evolución de AboutMe, mi iteración anterior en Angular.", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://portfolio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/portfolio" },
    ],

    ui: {
      skipToContent: "Saltar al contenido",
      greeting: "HOLA, MI NOMBRE ES",
      viewProjects: "Ver mis proyectos",
      download: "descargar",
      downloadCv: "Descargar CV · siempre al día",
      generating: "generando…",
      cvError: "Hubo un error al generar el CV. Por favor, inténtalo de nuevo.",
      cvFile: "Raul-Morales-CV.docx",
      cvDone: "descargado",
      cvCaption: "Se genera en tu navegador desde los mismos datos que pintan esta página.",
      sectionAbout: "Sobre Mí",
      sectionSkills: "Habilidades",
      sectionExperience: "Experiencia",
      sectionEducation: "Formación",
      sectionCertifications: "Certificaciones",
      noPdf: "sin PDF",
      sectionProjects: "Proyectos",
      sectionContact: "¿Qué sigue?",
      contactTitle: "Ponte en contacto",
      contactBody: "Actualmente estoy abierto a nuevas oportunidades. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible por responder!",
      contactCta: "Saludar",
      copyEmail: "Copiar email",
      emailCopied: "Copiado",
      emailCopyError: "No se pudo copiar",
      footer: "Diseñado y desarrollado por Raúl Morales",
      docxView: "Ver",
      docxViewProject: "Ver Proyecto",
      docxSourceCode: "Código Fuente",
      heroTerminalCmd: "ls proyectos",
      newDesignBanner: "✦ nuevo diseño disponible →",
      ficha: "Ficha",
      rol: "Rol",
      web: "Web",
      idiomas: "Idiomas",
      estado: "Estado",
      estadoValue: "Abierto a nuevas oportunidades",
      proyectoDestacado: "Proyecto destacado",
      tecnologias: "tecnologías",
      verProyecto: "proyecto",
      themeAriaLight: "Cambiar a tema claro (crema)",
      themeAriaDark: "Cambiar a tema oscuro",
    },
  },

  en: {
    pageTitle: "Raúl Morales | Frontend Developer",
    metaDescription: "Frontend Developer Portfolio",
    email: "raulmoralesruiz@outlook.com",
    anchors: {
      about: "about",
      skills: "skills",
      experience: "experience",
      education: "education",
      certifications: "certifications",
      projects: "projects",
      contact: "contact",
    },

    header: {
      name: "Raúl Morales",
      role: "Frontend Developer.",
      description:
        "Frontend with a full-stack and systems background: I understand the full cycle, from the database to the final pixel. And I prove it with Virus! — a real-time game I built end to end.",
    },

    about: [
      "Hi! I'm Raúl. Today I specialize in frontend — fluid, accessible interfaces — but I come from the other half of the stack: years as a full-stack developer and, before that, as a systems administrator. That foundation gives me a real edge: I understand the full cycle, from the database to the final pixel.",
      "And it's not theory. Virus! is a real-time card game I built end to end — Node.js + Socket.io backend, Angular frontend, and Astro docs — and it's in production. I've also built mobile apps like Kéfir Control (Flutter) and portfolios that run on my own infrastructure.",
      "I obsess over the details: clean code, best practices, and performance. And because I come from systems, I deploy and maintain my own projects with Docker, Nginx, and Linux.",
    ],

    skills: [
      { category: "Frontend", items: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript", "Astro", "Tailwind"] },
      { category: "Backend", items: ["Node.js", "Java", "Express", "SQL", "MongoDB", "REST APIs", "WebSocket"] },
      { category: "Admin", items: ["Linux", "Docker", "Nginx", "Home server", "Application deployment"] },
      { category: "Soft Skills", items: ["Effective communication", "Teamwork", "Problem solving", "Continuous learning", "Autonomy"] },
    ],

    experience: [
      { role: "Full-Stack Developer", company: "Babel", period: "2021 - Present", description: "Full-stack development of web applications with Java, JSF, and SQL; version control with Git and SVN." },
      { role: "Full-Stack Developer", company: "NTT Data", period: "2019 - 2021", description: "Full-stack development with a broader stack — Java, JSF, Python, MongoDB, and SQL — with an emphasis on testing; Git and SVN." },
      { role: "Systems Administrator", company: "MGS", period: "2013 - 2019", description: "Administration and maintenance of Windows/Linux systems: the origin of my systems background." },
    ],

    education: [
      { degree: "Higher Degree in Web Application Development", school: "IES Jacarandá", year: "2021", description: "Specialized training in full-stack development, databases, and application deployment." },
      { degree: "Networked Computer Systems Administration", school: "Colegio Altair", year: "2013", description: "Specialized training in the administration and maintenance of Windows/Linux computer systems." },
    ],

    certifications: [
      { name: "Android & Kotlin", issuer: "Píldoras Informáticas", date: "2026", link: null },
      { name: "Introduction to AI development", issuer: "BigSchool", date: "2025", link: "/cursos/bigschool_ia.pdf" },
      { name: "Intensive Model Context Protocol course", issuer: "MiduDev", date: "2025", link: "/cursos/midu_mcp.pdf" },
      { name: "Angular: From zero to expert", issuer: "Udemy", date: "2024", link: "/cursos/udemy_angular.pdf" },
      { name: "Angular Advanced: Best Practices", issuer: "Pluralsight", date: "2021", link: null },
      { name: "M001: MongoDB Basics", issuer: "MongoDB", date: "2021", link: "/cursos/mongo_m001.pdf" },
    ],

    projects: [
      {
        title: "Virus!",
        description: "Real-time card game: Node.js + Socket.io backend, Angular frontend, and Astro docs. End-to-end project.",
        tech: ["Node.js", "Express", "Socket.io", "Angular", "TypeScript"],
        link: "https://virus.raulmorales.eu",
        github: "https://github.com/raulmoralesruiz/virus-frontend",
        featured: true,
        sublinks: [
          { label: "Backend", url: "https://github.com/raulmoralesruiz/virus-backend" },
          { label: "Docs", url: "https://virusdocs.raulmorales.eu" },
        ],
      },
      { title: "Kéfir Control", description: "Minimalist app to manage the fermentation of milk kefir", tech: ["Flutter", "Dart", "Android", "iOS"], link: "https://kefircontrol.raulmorales.eu", github: "https://github.com/raulmoralesruiz/kefir-control" },
      { title: "Portfolio Radio", description: "Radio voice portfolio", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://radio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/radio-portfolio" },
      { title: "My Portfolio", description: "Personal portfolio built with Astro. Evolution of AboutMe, my earlier Angular iteration.", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://portfolio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/portfolio" },
    ],

    ui: {
      skipToContent: "Skip to content",
      greeting: "HI, MY NAME IS",
      viewProjects: "View my projects",
      download: "download",
      downloadCv: "Download CV · always up to date",
      generating: "generating…",
      cvError: "There was an error generating the CV. Please try again.",
      cvFile: "Raul-Morales-CV.docx",
      cvDone: "downloaded",
      cvCaption: "Generated in your browser from the same data that renders this page.",
      sectionAbout: "About Me",
      sectionSkills: "Skills",
      sectionExperience: "Experience",
      sectionEducation: "Education",
      sectionCertifications: "Certifications",
      noPdf: "no PDF",
      sectionProjects: "Projects",
      sectionContact: "What's next?",
      contactTitle: "Get in touch",
      contactBody: "I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!",
      contactCta: "Say hi",
      copyEmail: "Copy email",
      emailCopied: "Copied",
      emailCopyError: "Copy failed",
      footer: "Designed & built by Raúl Morales",
      docxView: "View",
      docxViewProject: "View Project",
      docxSourceCode: "Source Code",
      heroTerminalCmd: "ls projects",
      newDesignBanner: "✦ new design available →",
      ficha: "Profile",
      rol: "Role",
      web: "Web",
      idiomas: "Languages",
      estado: "Status",
      estadoValue: "Open to new opportunities",
      proyectoDestacado: "Featured project",
      tecnologias: "technologies",
      verProyecto: "project",
      themeAriaLight: "Switch to light theme (cream)",
      themeAriaDark: "Switch to dark theme",
    },
  },
};
