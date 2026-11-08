export type Lang = "es" | "en";

export interface CV {
  pageTitle: string;
  metaDescription: string;

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
  }[];

  ui: {
    greeting: string;
    viewProjects: string;
    downloadCv: string;
    generating: string;
    cvError: string;
    sectionAbout: string;
    sectionSkills: string;
    sectionExperience: string;
    sectionEducation: string;
    sectionCertifications: string;
    sectionProjects: string;
    sectionContact: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    footer: string;
    docxView: string;
    docxViewProject: string;
    docxSourceCode: string;
  };
}

export const cv: Record<Lang, CV> = {
  es: {
    pageTitle: "Raúl Morales | Desarrollador Frontend",
    metaDescription: "Portfolio de Desarrollador Frontend",

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
      { title: "Virus! Backend", description: "Backend para la aplicación web del famoso juego de cartas Virus!", tech: ["Node.js", "Express", "Socket.io", "TypeScript"], link: "https://virus.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-backend" },
      { title: "Virus! Frontend", description: "Frontend para la aplicación web del famoso juego de cartas Virus!", tech: ["Angular", "Socket.io", "HTML", "CSS", "TypeScript"], link: "https://virus.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-frontend" },
      { title: "Kéfir Control", description: "Aplicación minimalista para el gestionar la fermentación de kéfir de leche", tech: ["Flutter", "Dart", "Android", "iOS"], link: "https://kefircontrol.raulmorales.eu", github: "https://github.com/raulmoralesruiz/kefir-control" },
      { title: "Portfolio Radio", description: "Portfolio de voz de radio", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://radio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/radio-portfolio" },
      { title: "Mi Portfolio", description: "Portfolio personal creado con Astro", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://portfolio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/portfolio" },
      { title: "Virus! Docs", description: "Documentación de la aplicación web del juego de cartas Virus!", tech: ["Astro", "HTML", "CSS", "JavaScript", "TypeScript"], link: "https://virusdocs.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-docs" },
      { title: "AboutMe", description: "Versión anterior del portfolio personal", tech: ["Angular", "Tailwind", "HTML", "CSS", "TypeScript"], link: "https://aboutme.raulmorales.eu", github: "https://github.com/raulmoralesruiz/aboutme" },
    ],

    ui: {
      greeting: "HOLA, MI NOMBRE ES",
      viewProjects: "Ver mis proyectos",
      downloadCv: "Descargar CV",
      generating: "Generando...",
      cvError: "Hubo un error al generar el CV. Por favor, inténtalo de nuevo.",
      sectionAbout: "Sobre Mí",
      sectionSkills: "Habilidades",
      sectionExperience: "Experiencia",
      sectionEducation: "Formación",
      sectionCertifications: "Certificaciones",
      sectionProjects: "Proyectos",
      sectionContact: "¿Qué sigue?",
      contactTitle: "Ponte en contacto",
      contactBody: "Actualmente estoy abierto a nuevas oportunidades. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible por responder!",
      contactCta: "Saludar",
      footer: "Diseñado y desarrollado por Raúl Morales",
      docxView: "Ver",
      docxViewProject: "Ver Proyecto",
      docxSourceCode: "Código Fuente",
    },
  },

  en: {
    pageTitle: "Raúl Morales | Frontend Developer",
    metaDescription: "Frontend Developer Portfolio",

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
      { title: "Virus! Backend", description: "Backend for the web app of the famous card game Virus!", tech: ["Node.js", "Express", "Socket.io", "TypeScript"], link: "https://virus.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-backend" },
      { title: "Virus! Frontend", description: "Frontend for the web app of the famous card game Virus!", tech: ["Angular", "Socket.io", "HTML", "CSS", "TypeScript"], link: "https://virus.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-frontend" },
      { title: "Kéfir Control", description: "Minimalist app to manage the fermentation of milk kefir", tech: ["Flutter", "Dart", "Android", "iOS"], link: "https://kefircontrol.raulmorales.eu", github: "https://github.com/raulmoralesruiz/kefir-control" },
      { title: "Portfolio Radio", description: "Radio voice portfolio", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://radio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/radio-portfolio" },
      { title: "My Portfolio", description: "Personal portfolio built with Astro", tech: ["Astro", "Tailwind", "HTML", "CSS"], link: "https://portfolio.raulmorales.eu", github: "https://github.com/raulmoralesruiz/portfolio" },
      { title: "Virus! Docs", description: "Documentation for the web app of the card game Virus!", tech: ["Astro", "HTML", "CSS", "JavaScript", "TypeScript"], link: "https://virusdocs.raulmorales.eu", github: "https://github.com/raulmoralesruiz/virus-docs" },
      { title: "AboutMe", description: "Previous version of the personal portfolio", tech: ["Angular", "Tailwind", "HTML", "CSS", "TypeScript"], link: "https://aboutme.raulmorales.eu", github: "https://github.com/raulmoralesruiz/aboutme" },
    ],

    ui: {
      greeting: "HI, MY NAME IS",
      viewProjects: "View my projects",
      downloadCv: "Download CV",
      generating: "Generating...",
      cvError: "There was an error generating the CV. Please try again.",
      sectionAbout: "About Me",
      sectionSkills: "Skills",
      sectionExperience: "Experience",
      sectionEducation: "Education",
      sectionCertifications: "Certifications",
      sectionProjects: "Projects",
      sectionContact: "What's next?",
      contactTitle: "Get in touch",
      contactBody: "I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!",
      contactCta: "Say hi",
      footer: "Designed & built by Raúl Morales",
      docxView: "View",
      docxViewProject: "View Project",
      docxSourceCode: "Source Code",
    },
  },
};
