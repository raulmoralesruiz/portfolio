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
    noPdf: string;
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
    // ---- Adelante: etiquetas de UI (ficha, toggle de tema, proyectos) ----
    ficha: string;
    rol: string;
    idiomas: string;
    estado: string;
    estadoValue: string;
    proyectoDestacado: string;
    tecnologias: string;
    verProyecto: string;
    themeToLight: string;
    themeToDark: string;
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
        "Especializado en crear experiencias digitales excepcionales. Combino mi experiencia Full-Stack con una pasión por el diseño limpio y la performance.",
    },

    about: [
      "¡Hola! Soy un desarrollador apasionado por construir cosas en internet. Mi interés en el desarrollo web comenzó cuando decidí experimentar con código más allá de lo básico, descubriendo el poder de crear interfaces interactivas.",
      `Hoy en día, mi enfoque principal es el <strong class="text-emerald-400">Desarrollo Frontend</strong>, donde disfruto creando interfaces fluidas y accesibles. Sin embargo, mi experiencia como <strong class="text-white">Full-Stack Developer</strong> me da una ventaja única para entender el ciclo de vida completo de un proyecto, desde la base de datos hasta el píxel final.`,
      "Me esfuerzo por seguir buenas prácticas, escribir código limpio y optimizar cada detalle para asegurar la mejor experiencia de usuario posible.",
    ],

    skills: [
      { category: "Frontend", items: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript", "Astro", "Tailwind"] },
      { category: "Backend", items: ["Node.js", "Java", "Express", "SQL", "MongoDB", "REST APIs", "WebSocket"] },
      { category: "Admin", items: ["Linux", "Docker", "Nginx", "Home server", "Despliegue de aplicaciones"] },
      { category: "Soft Skills", items: ["Comunicación efectiva", "Trabajo en equipo", "Resolución de problemas", "Aprendizaje continuo", "Autonomía"] },
    ],

    experience: [
      { role: "Full-Stack Developer", company: "Babel", period: "2021 - Presente", description: "Desarrollo de aplicaciones web utilizando diferentes tecnologías. Java, JSF, Git, SQL, SVN" },
      { role: "Full-Stack Developer", company: "NTT Data", period: "2019 - 2021", description: "Desarrollo de aplicaciones web utilizando diferentes tecnologías. Java, JSF, SQL, SVN, Testing, Python, MongoDB, Git" },
      { role: "Systems Administrator", company: "MGS", period: "2013 - 2019", description: "Administración y mantenimiento de Sistemas Informáticos Windows/Linux." },
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
          { label: "Frontend", url: "https://github.com/raulmoralesruiz/virus-frontend" },
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
      ficha: "Ficha",
      rol: "Rol",
      idiomas: "Idiomas",
      estado: "Estado",
      estadoValue: "Abierto a nuevas oportunidades",
      proyectoDestacado: "Proyecto destacado",
      tecnologias: "tecnologías",
      verProyecto: "proyecto",
      themeToLight: "CLARO",
      themeToDark: "OSCURO",
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
        "Specialized in creating exceptional digital experiences. I combine my Full-Stack experience with a passion for clean design and performance.",
    },

    about: [
      "Hi! I'm a developer passionate about building things on the internet. My interest in web development began when I decided to experiment with code beyond the basics, discovering the power of creating interactive interfaces.",
      `Today, my main focus is <strong class="text-emerald-400">Frontend Development</strong>, where I enjoy creating fluid and accessible interfaces. However, my experience as a <strong class="text-white">Full-Stack Developer</strong> gives me a unique advantage to understand the full life cycle of a project, from the database to the final pixel.`,
      "I strive to follow best practices, write clean code, and optimize every detail to ensure the best possible user experience.",
    ],

    skills: [
      { category: "Frontend", items: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript", "Astro", "Tailwind"] },
      { category: "Backend", items: ["Node.js", "Java", "Express", "SQL", "MongoDB", "REST APIs", "WebSocket"] },
      { category: "Admin", items: ["Linux", "Docker", "Nginx", "Home server", "Application deployment"] },
      { category: "Soft Skills", items: ["Effective communication", "Teamwork", "Problem solving", "Continuous learning", "Autonomy"] },
    ],

    experience: [
      { role: "Full-Stack Developer", company: "Babel", period: "2021 - Present", description: "Web application development using various technologies. Java, JSF, Git, SQL, SVN" },
      { role: "Full-Stack Developer", company: "NTT Data", period: "2019 - 2021", description: "Web application development using various technologies. Java, JSF, SQL, SVN, Testing, Python, MongoDB, Git" },
      { role: "Systems Administrator", company: "MGS", period: "2013 - 2019", description: "Administration and maintenance of Windows/Linux computer systems." },
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
          { label: "Frontend", url: "https://github.com/raulmoralesruiz/virus-frontend" },
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
      ficha: "Profile",
      rol: "Role",
      idiomas: "Languages",
      estado: "Status",
      estadoValue: "Open to new opportunities",
      proyectoDestacado: "Featured project",
      tecnologias: "technologies",
      verProyecto: "project",
      themeToLight: "LIGHT",
      themeToDark: "DARK",
      themeAriaLight: "Switch to light theme (cream)",
      themeAriaDark: "Switch to dark theme",
    },
  },
};
