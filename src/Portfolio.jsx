import { useState, useEffect, useRef, useCallback } from "react";

// ─── Translations ──────────────────────────────────────────────────────────

const translations = {
  en: {
    nav: { home: "Home", about: "About", skills: "Skills", certifications: "Certs", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hey, I'm",
      name: "Fotios Pongas",
      titles: ["DevOps Engineer", "Cloud Engineer", "Platform Engineer", "Infrastructure Engineer"],
      subtitle: "Building reliable, scalable infrastructure — with the service mindset of someone who's managed 5-star operations.",
      cta: "View My Work",
      downloadCV: "Download CV",
      contact: "Get In Touch",
      hackshow: "🏆 Ironhack Hackshow Winner",
      hackshowSub: "Hotel Knowledge Assistant · Apr 2026",
      openToWork: "Available for opportunities",
    },
    about: {
      label: "About Me",
      title: "From Hotel Lobbies to Cloud Architectures",
      p1: "For over a decade, I managed high-pressure, service-critical environments — from managing a retail store in Rhodes to front-desk operations at Sheraton hotels. I learned to keep complex systems running smoothly, coordinate teams under pressure, and deliver results that people depend on.",
      p2: "Those are the same principles I now apply to DevOps and Cloud Engineering. I design CI/CD pipelines, orchestrate containers with Kubernetes, provision infrastructure with Terraform, and monitor everything with Prometheus and Grafana — because whether it's a hotel or a cluster, downtime is not an option.",
      p3: "A graduate of the Ironhack DevOps & Cloud Computing Bootcamp in Germany, I bring a unique blend of operational discipline, leadership experience, and genuine passion for automation to every project I build.",
      stats: {
        experience: { value: "10+", label: "Years in Operations" },
        projects:   { value: "5+",  label: "Cloud Projects" },
        certs:      { value: "2",   label: "Certifications" },
        location:   { value: "DE",  label: "Based in Germany" },
      },
    },
    certifications: {
      label: "Certifications",
      title: "Credentials & Certificates",
      hint: "Hover to tilt · Click to flip",
      items: [
        {
          title: "DevOps & Cloud Computing",
          issuer: "Ironhack",
          date: "March 2026",
          image: "/Screenshot 2026-03-10 at 01.01.28.png",
          color: "#2563eb",
          facts: [
            "🕐 400+ hours of hands-on training, labs and real-world projects",
            "🛠️ Covered Docker, Kubernetes, Terraform, Ansible, AWS & Azure",
            "🏆 Won the Hackshow with Hotel Knowledge Assistant — best project of the cohort",
            "🌍 Program based in Germany — internationally recognized curriculum",
            "🚀 Built and deployed production-grade infrastructure from day one",
          ],
        },
        {
          title: "AWS Cloud Practitioner Essentials",
          issuer: "AWS Training & Certification",
          date: "August 30, 2025",
          image: "/Screenshot 2026-03-10 at 01.00.39.png",
          color: "#f59e0b",
          facts: [
            "☁️ Official AWS certification covering core cloud concepts and services",
            "🔐 Includes IAM, security best practices and shared responsibility model",
            "💰 Covers AWS pricing, billing and cost optimization strategies",
            "📦 Explores EC2, S3, RDS, Lambda and key AWS global infrastructure",
            "🎯 Foundation for AWS Solutions Architect & Developer certifications",
          ],
        },
      ],
    },
    skills: {
      label: "Technical Skills",
      title: "Tools & Technologies",
      categories: {
        cloud:       "Cloud & Infrastructure",
        containers:  "Containers & Orchestration",
        cicd:        "CI/CD & Automation",
        monitoring:  "Monitoring & Observability",
        development: "Development",
        databases:   "Databases & Caching",
      },
    },
    projects: {
      label: "Projects",
      title: "What I've Built",
      viewCode: "View Code",
      items: [
        {
          title: "Expensy",
          subtitle: "Expense Tracking Platform",
          description: "Full-stack expense tracker deployed on Azure AKS with a complete DevOps pipeline. Features GitHub Actions CI/CD, Prometheus & Grafana monitoring, Kubernetes secrets management, and Redis caching.",
          tags: ["Azure AKS", "GitHub Actions", "Kubernetes", "Prometheus", "Grafana", "Redis", "MongoDB"],
          github: "https://github.com/Kabamaru2372/max.devops.expensy",
          emoji: "💰",
          featured: true,
        },
        {
          title: "Hotel Knowledge Assistant",
          subtitle: "RAG AI Pipeline · 🏆 Hackshow Winner",
          description: "An AI-powered hotel assistant using Retrieval-Augmented Generation on Azure. Combines Blob Storage, Azure AI Search, and Azure OpenAI with a FastAPI backend. Fully containerized via Terraform.",
          tags: ["Azure OpenAI", "Azure AI Search", "FastAPI", "Terraform", "Docker", "Python"],
          github: "https://github.com/Kabamaru2372/hotel-training-RAG-pipeline",
          emoji: "🏨",
          featured: true,
        },
        {
          title: "3-Tier Voting App",
          subtitle: "Microservices on AWS",
          description: "Multi-tier voting system simulating real enterprise DevOps workflows. Provisioned with Terraform, configured with Ansible, containerized with Docker Compose, automated with GitHub Actions.",
          tags: ["Terraform", "Ansible", "Docker", "GitHub Actions", "PostgreSQL", "Redis"],
          github: "https://github.com/Kabamaru2372/3-tier-application",
          emoji: "🗳️",
          featured: false,
        },
        {
          title: "W3 Combo",
          subtitle: "Multi-Service Cloud Infrastructure",
          description: "Infrastructure as Code project provisioning a multi-service environment on AWS using Terraform. Automated cloud resource management, networking, and repeatable deployments.",
          tags: ["Terraform", "HCL", "AWS", "IaC", "Networking"],
          github: "https://github.com/Kabamaru2372/w3-combo",
          emoji: "☁️",
          featured: false,
        },
        {
          title: "Cloud Provisioning Toolkit",
          subtitle: "Automation Scripts",
          description: "Terraform modules and shell scripts for automated provisioning of cloud instances, security groups, and networking. Designed for rapid, repeatable infrastructure deployment.",
          tags: ["Terraform", "Shell", "AWS", "Automation"],
          github: "https://github.com/Kabamaru2372/ironhack-project1-provisioning",
          emoji: "⚙️",
          featured: false,
        },
        {
          title: "fotiospongas.dev",
          subtitle: "This Portfolio Site",
          description: "The site you're looking at. React + Vite with EN/DE language toggle, deployed to GitHub Pages via GitHub Actions CI/CD. Every git push triggers an automated build and deploy.",
          tags: ["React", "Vite", "GitHub Actions", "GitHub Pages"],
          github: "https://github.com/Kabamaru2372/fotios.website",
          emoji: "🌐",
          featured: false,
        },
      ],
    },
    iosApp: {
      label: "iOS App",
      title: "Picksy: Be Present",
      story: "DevOps is my profession — but curiosity has no job title. I picked up Swift, dove into SwiftUI, and built Picksy from scratch. Not because it was part of a roadmap, but because I wanted to prove I could.",
      description: "An iOS app that tracks how many times you pick up your phone, reveals your patterns, and helps you — and your friends — use it less. Live on the App Store.",
      appStoreUrl: "https://apps.apple.com/de/app/picksy-be-present/id6761116771",
      learnMore: "Full landing page →",
      tags: ["Swift", "SwiftUI", "Live Activities", "WidgetKit", "Supabase"],
    },
    journey: {
      label: "My Journey",
      title: "A Career Built on Service",
      steps: [
        { year: "2009+", icon: "🏪", title: "Retail Management",    desc: "Store Manager at Dixons in Rhodes — leading teams, managing inventory systems, and optimizing operations under pressure." },
        { year: "2023",  icon: "🏨", title: "Hospitality Management", desc: "Managed operations at international 5-star hotels including Sheraton. Learned to run 24/7 systems where failure wasn't an option." },
        { year: "2025",  icon: "💻", title: "Career Pivot to Tech",  desc: "Enrolled in Ironhack's DevOps & Cloud Computing Bootcamp. Built real infrastructure from day one — and won the Hackshow." },
        { year: "2026",  icon: "🚀", title: "DevOps Engineer",       desc: "Hands-on Azure, Kubernetes, Terraform, and CI/CD experience. Bringing operational excellence to cloud engineering." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's Connect",
      subtitle: "I'm currently looking for DevOps & Cloud Engineering opportunities in Germany. Let's talk.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Location",
      locationValue: "Germany",
      copied: "Copied!",
    },
  },

  de: {
    nav: { home: "Start", about: "Über mich", skills: "Fähigkeiten", certifications: "Zertifikate", projects: "Projekte", contact: "Kontakt" },
    hero: {
      greeting: "Hallo, ich bin",
      name: "Fotios Pongas",
      titles: ["DevOps Engineer", "Cloud Engineer", "Platform Engineer", "Infrastructure Engineer"],
      subtitle: "Aufbau zuverlässiger, skalierbarer Infrastruktur — mit der Service-Mentalität eines erfahrenen 5-Sterne-Hotel-Managers.",
      cta: "Meine Projekte",
      downloadCV: "CV herunterladen",
      contact: "Kontakt",
      hackshow: "🏆 Ironhack Hackshow Gewinner",
      hackshowSub: "Hotel Knowledge Assistant · Apr 2026",
      openToWork: "Offen für neue Stellen",
    },
    about: {
      label: "Über mich",
      title: "Von der Hotellobby zur Cloud-Architektur",
      p1: "Über ein Jahrzehnt lang habe ich anspruchsvolle, servicekritische Umgebungen geleitet — vom Empfangsbereich bei Sheraton Hotels bis zur Leitung eines Einzelhandelsgeschäfts auf Rhodos.",
      p2: "Dieselben Prinzipien wende ich jetzt auf DevOps und Cloud Engineering an. CI/CD-Pipelines, Kubernetes, Terraform, Prometheus und Grafana — denn ob Hotel oder Cluster, Ausfallzeiten sind keine Option.",
      p3: "Als Absolvent des Ironhack DevOps & Cloud Computing Bootcamps in Deutschland bringe ich operative Disziplin, Führungserfahrung und Leidenschaft für Automatisierung in jedes Projekt.",
      stats: {
        experience: { value: "10+", label: "Jahre Berufserfahrung" },
        projects:   { value: "5+",  label: "Cloud-Projekte" },
        certs:      { value: "2",   label: "Zertifizierungen" },
        location:   { value: "DE",  label: "Standort Deutschland" },
      },
    },
    certifications: {
      label: "Zertifizierungen",
      title: "Abschlüsse & Zertifikate",
      hint: "Bewegen zum Kippen · Klicken zum Umdrehen",
      items: [
        {
          title: "DevOps & Cloud Computing",
          issuer: "Ironhack",
          date: "März 2026",
          image: "/Screenshot 2026-03-10 at 01.01.28.png",
          color: "#2563eb",
          facts: [
            "🕐 400+ Stunden praktisches Training, Labs und echte Projekte",
            "🛠️ Inhalte: Docker, Kubernetes, Terraform, Ansible, AWS & Azure",
            "🏆 Hackshow-Gewinner mit Hotel Knowledge Assistant — bestes Projekt des Jahrgangs",
            "🌍 Programm in Deutschland — international anerkanntes Curriculum",
            "🚀 Echte Produktionsinfrastruktur von Tag eins aufgebaut",
          ],
        },
        {
          title: "AWS Cloud Practitioner Essentials",
          issuer: "AWS Training & Certification",
          date: "30. August 2025",
          image: "/Screenshot 2026-03-10 at 01.00.39.png",
          color: "#f59e0b",
          facts: [
            "☁️ Offizielle AWS-Zertifizierung zu Cloud-Grundlagen und Services",
            "🔐 IAM, Sicherheitskonzepte und das geteilte Verantwortungsmodell",
            "💰 AWS-Preismodell, Abrechnung und Kostenoptimierung",
            "📦 EC2, S3, RDS, Lambda und die globale AWS-Infrastruktur",
            "🎯 Grundlage für AWS Solutions Architect & Developer-Zertifizierungen",
          ],
        },
      ],
    },
    skills: {
      label: "Technische Fähigkeiten",
      title: "Tools & Technologien",
      categories: {
        cloud:       "Cloud & Infrastruktur",
        containers:  "Container & Orchestrierung",
        cicd:        "CI/CD & Automatisierung",
        monitoring:  "Monitoring & Observability",
        development: "Entwicklung",
        databases:   "Datenbanken & Caching",
      },
    },
    projects: {
      label: "Projekte",
      title: "Was ich gebaut habe",
      viewCode: "Code ansehen",
      items: [
        {
          title: "Expensy",
          subtitle: "Ausgabenverfolgungsplattform",
          description: "Full-Stack Ausgaben-Tracker auf Azure AKS mit vollständiger DevOps-Pipeline. GitHub Actions CI/CD, Prometheus & Grafana Monitoring, Kubernetes Secrets und Redis Caching.",
          tags: ["Azure AKS", "GitHub Actions", "Kubernetes", "Prometheus", "Grafana", "Redis", "MongoDB"],
          github: "https://github.com/Kabamaru2372/max.devops.expensy",
          emoji: "💰",
          featured: true,
        },
        {
          title: "Hotel Knowledge Assistant",
          subtitle: "RAG-KI-Pipeline · 🏆 Hackshow-Gewinner",
          description: "KI-gestützter Hotelassistent mit Retrieval-Augmented Generation auf Azure. Azure Blob Storage, Azure AI Search und Azure OpenAI mit FastAPI-Backend. Via Terraform containerisiert.",
          tags: ["Azure OpenAI", "Azure AI Search", "FastAPI", "Terraform", "Docker", "Python"],
          github: "https://github.com/Kabamaru2372/hotel-training-RAG-pipeline",
          emoji: "🏨",
          featured: true,
        },
        {
          title: "3-Tier Voting App",
          subtitle: "Microservices auf AWS",
          description: "Mehrstufiges Abstimmungssystem mit Terraform, Ansible, Docker Compose und GitHub Actions CI/CD-Pipelines.",
          tags: ["Terraform", "Ansible", "Docker", "GitHub Actions", "PostgreSQL", "Redis"],
          github: "https://github.com/Kabamaru2372/3-tier-application",
          emoji: "🗳️",
          featured: false,
        },
        {
          title: "W3 Combo",
          subtitle: "Multi-Service Cloud-Infrastruktur",
          description: "IaC-Projekt zur Bereitstellung einer Multi-Service-Umgebung auf AWS mit Terraform. Automatisiertes Cloud-Ressourcenmanagement und wiederholbare Deployments.",
          tags: ["Terraform", "HCL", "AWS", "IaC", "Networking"],
          github: "https://github.com/Kabamaru2372/w3-combo",
          emoji: "☁️",
          featured: false,
        },
        {
          title: "Cloud-Provisioning-Toolkit",
          subtitle: "Automatisierungsskripte",
          description: "Terraform-Module und Shell-Skripte für automatisierte Bereitstellung von Cloud-Instanzen und Netzwerken.",
          tags: ["Terraform", "Shell", "AWS", "Automation"],
          github: "https://github.com/Kabamaru2372/ironhack-project1-provisioning",
          emoji: "⚙️",
          featured: false,
        },
        {
          title: "fotiospongas.dev",
          subtitle: "Diese Portfolio-Seite",
          description: "React + Vite Portfolio mit EN/DE-Sprachumschaltung, bereitgestellt auf GitHub Pages via GitHub Actions CI/CD.",
          tags: ["React", "Vite", "GitHub Actions", "GitHub Pages"],
          github: "https://github.com/Kabamaru2372/fotios.website",
          emoji: "🌐",
          featured: false,
        },
      ],
    },
    iosApp: {
      label: "iOS App",
      title: "Picksy: Be Present",
      story: "DevOps ist mein Beruf — aber Neugier kennt keine Berufsbezeichnung. Ich habe Swift gelernt und Picksy von Grund auf gebaut. Nicht weil es geplant war, sondern weil ich wissen wollte, ob ich es kann.",
      description: "Eine iOS-App, die verfolgt, wie oft man das Handy aufnimmt, zeigt Muster auf und hilft dabei — gemeinsam mit Freunden — weniger drauf zu schauen. Live im App Store.",
      appStoreUrl: "https://apps.apple.com/de/app/picksy-be-present/id6761116771",
      learnMore: "Zur App-Seite →",
      tags: ["Swift", "SwiftUI", "Live Activities", "WidgetKit", "Supabase"],
    },
    journey: {
      label: "Mein Werdegang",
      title: "Eine Karriere im Zeichen des Service",
      steps: [
        { year: "2009+", icon: "🏪", title: "Einzelhandelsmanagement", desc: "Filialleiter bei Dixons auf Rhodos — Teamführung, Bestandsverwaltung und Prozessoptimierung." },
        { year: "2023",  icon: "🏨", title: "Hotelmanagement",         desc: "Leitung in internationalen 5-Sterne-Hotels wie Sheraton. 24/7-Betrieb ohne Ausfallzeiten." },
        { year: "2025",  icon: "💻", title: "Karrierewechsel in die IT", desc: "Ironhack DevOps & Cloud Computing Bootcamp. Echte Infrastruktur von Tag eins — und Hackshow-Gewinner." },
        { year: "2026",  icon: "🚀", title: "DevOps Engineer",          desc: "Azure, Kubernetes, Terraform und CI/CD. Operative Exzellenz im Cloud Engineering." },
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Lass uns vernetzen",
      subtitle: "Ich suche DevOps & Cloud Engineering Stellen in Deutschland. Lass uns sprechen.",
      email: "E-Mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Standort",
      locationValue: "Deutschland",
      copied: "Kopiert!",
    },
  },
};

// ─── Skills Data (with Simple Icons slugs) ─────────────────────────────────

const skillsData = [
  {
    category: "cloud",
    items: [
      { name: "Azure",              icon: "microsoftazure", color: "0078D4" },
      { name: "AWS",                icon: "amazonaws",      color: "FF9900" },
      { name: "Terraform",          icon: "terraform",      color: "844FBA" },
      { name: "Azure AKS",          icon: "microsoftazure", color: "0078D4" },
      { name: "Azure AI Foundry",   icon: "microsoftazure", color: "0078D4" },
      { name: "Blob Storage",       icon: "microsoftazure", color: "0078D4" },
      { name: "Azure AI Search",    icon: "microsoftazure", color: "0078D4" },
    ],
  },
  {
    category: "containers",
    items: [
      { name: "Docker",         icon: "docker",     color: "2496ED" },
      { name: "Kubernetes",     icon: "kubernetes", color: "326CE5" },
      { name: "Docker Compose", icon: "docker",     color: "2496ED" },
      { name: "Helm",           icon: "helm",       color: "277A9F" },
    ],
  },
  {
    category: "cicd",
    items: [
      { name: "GitHub Actions",  icon: "githubactions", color: "2088FF" },
      { name: "Git",             icon: "git",           color: "F05032" },
      { name: "Ansible",         icon: "ansible",       color: "EE0000" },
      { name: "CI/CD Pipelines", icon: null,            color: null   },
    ],
  },
  {
    category: "monitoring",
    items: [
      { name: "Prometheus", icon: "prometheus", color: "E6522C" },
      { name: "Grafana",    icon: "grafana",    color: "F46800" },
      { name: "Alerting",   icon: null,         color: null    },
    ],
  },
  {
    category: "development",
    items: [
      { name: "Python",   icon: "python",    color: "3776AB" },
      { name: "Node.js",  icon: "nodedotjs", color: "5FA04E" },
      { name: "FastAPI",  icon: "fastapi",   color: "009688" },
      { name: "Next.js",  icon: "nextdotjs", color: "ffffff" },
      { name: "Swift",    icon: "swift",     color: "F05138" },
      { name: "Bash",     icon: "gnubash",   color: "4EAA25" },
    ],
  },
  {
    category: "databases",
    items: [
      { name: "MongoDB",    icon: "mongodb",    color: "47A248" },
      { name: "Redis",      icon: "redis",      color: "DC382D" },
      { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
    ],
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useTypewriter(words, { speed = 80, deleteSpeed = 45, pauseMs = 2200 } = {}) {
  const [text, setText]       = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setText(prev =>
        deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      );
    }, deleting ? deleteSpeed : speed);

    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, deleteSpeed, pauseMs]);

  return text;
}

function useCountUp(rawValue, duration = 1400) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    // Extract numeric part — handle "10+", "5+", "2", "DE"
    const isText  = isNaN(parseInt(rawValue));
    if (isText) { setDisplay(rawValue); return; }

    const hasPlus = String(rawValue).includes("+");
    const target  = parseInt(rawValue);
    const start   = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      setDisplay(current + (hasPlus && progress === 1 ? "+" : ""));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, rawValue, duration]);

  return [ref, display];
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── New Components ────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const h   = doc.scrollHeight - doc.clientHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 3, zIndex: 1001,
      width: `${pct}%`,
      background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 60%, #f472b6 100%)",
      transition: "width 0.08s linear",
      pointerEvents: "none",
    }} />
  );
}

function BackToTop({ C }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 50,
        width: 48, height: 48, borderRadius: "50%",
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 18,
        boxShadow: "0 8px 24px rgba(37,99,235,0.45)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        transition: "opacity 0.3s, transform 0.3s",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}

function SkillChip({ item, C }) {
  const iconUrl = item.icon
    ? `https://cdn.simpleicons.org/${item.icon}/${item.color || "ffffff"}`
    : null;

  return (
    <span className="skill-chip">
      {iconUrl && (
        <img
          src={iconUrl}
          alt={item.name}
          width={15}
          height={15}
          style={{ objectFit: "contain", flexShrink: 0, verticalAlign: "middle" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      )}
      {!iconUrl && <span style={{ fontSize: 14 }}>⚙️</span>}
      {item.name}
    </span>
  );
}

function AnimatedStat({ value, label, C }) {
  const [ref, display] = useCountUp(value);
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function Portfolio() {
  const [lang, setLang]         = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const t        = translations[lang];
  const sections = ["home", "about", "journey", "skills", "certifications", "projects", "contact"];
  const active   = useScrollSpy(sections);
  const titleText = useTypewriter(t.hero.titles);

  useEffect(() => {
    const timer   = setTimeout(() => setHeroVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("fotis.poggas@gmail.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  }, []);

  const C = {
    dark:   "#080812",
    dark2:  "#111122",
    dark3:  "#181830",
    blue:   "#2563eb",
    blueL:  "#60a5fa",
    violet: "#7c3aed",
    text:   "#f0f0ff",
    muted:  "#8888aa",
    border: "rgba(255,255,255,0.07)",
  };

  const fadeIn = (delay = 0) => ({
    opacity:    heroVisible ? 1 : 0,
    transform:  heroVisible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Outfit', sans-serif", background: C.dark, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #2563eb33; }

        /* ── Aurora ── */
        .aurora { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .aurora-blob { position: absolute; border-radius: 50%; filter: blur(130px); opacity: 0.14; animation: drift linear infinite; }
        .aurora-blob:nth-child(1) { width: 700px; height: 700px; background: #2563eb; top: -200px; left: -150px; animation-duration: 30s; }
        .aurora-blob:nth-child(2) { width: 500px; height: 500px; background: #7c3aed; top: 5%; right: -100px; animation-duration: 24s; animation-delay: -10s; }
        .aurora-blob:nth-child(3) { width: 400px; height: 400px; background: #0ea5e9; bottom: 15%; left: 25%; animation-duration: 36s; animation-delay: -18s; }
        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-30px) scale(1.05); }
          66%  { transform: translate(-20px,50px) scale(0.95); }
          100% { transform: translate(0,0) scale(1); }
        }

        /* ── Nav ── */
        .nav-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s; }
        .nav-scrolled { background: rgba(8,8,18,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 1px 0 rgba(255,255,255,0.06); }
        .nav-link { position: relative; font-size: 14px; font-weight: 500; color: ${C.muted}; cursor: pointer; padding: 6px 0; background: none; border: none; font-family: inherit; transition: color 0.2s; letter-spacing: 0.01em; }
        .nav-link:hover, .nav-link.active { color: ${C.text}; }
        .nav-link.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: ${C.blueL}; border-radius: 1px; }
        .lang-toggle { display: flex; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); }
        .lang-btn { padding: 5px 12px; border: none; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 13px; background: transparent; color: ${C.muted}; transition: all 0.2s; }
        .lang-btn.active { background: ${C.blue}; color: #fff; }

        /* ── Buttons ── */
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: ${C.blue}; color: #fff; font-weight: 700; font-size: 15px; border: none; cursor: pointer; transition: all 0.25s; font-family: inherit; text-decoration: none; box-shadow: 0 0 28px rgba(37,99,235,0.3); }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 36px rgba(37,99,235,0.45); }
        .btn-cv { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; border-radius: 12px; background: rgba(124,58,237,0.15); color: #a78bfa; font-weight: 600; font-size: 15px; border: 1px solid rgba(124,58,237,0.35); cursor: pointer; transition: all 0.25s; font-family: inherit; text-decoration: none; }
        .btn-cv:hover { background: rgba(124,58,237,0.25); color: #c4b5fd; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.25); }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; border-radius: 12px; background: rgba(255,255,255,0.06); color: ${C.muted}; font-weight: 600; font-size: 15px; border: 1px solid ${C.border}; cursor: pointer; transition: all 0.25s; font-family: inherit; text-decoration: none; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); color: ${C.text}; }

        /* ── Section labels ── */
        .section-label { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${C.blueL}; margin-bottom: 12px; }
        .section-title { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.15; letter-spacing: -0.025em; margin-bottom: 20px; }
        .gradient-text { background: linear-gradient(135deg, ${C.blueL} 0%, #a78bfa 60%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* ── Cards ── */
        .dark-card { background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 20px; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .dark-card:hover { border-color: rgba(96,165,250,0.22); transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.35); }

        /* ── Skill chips ── */
        .skill-chip { display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; background: rgba(255,255,255,0.05); border: 1px solid ${C.border}; color: ${C.muted}; transition: all 0.2s; cursor: default; }
        .skill-chip:hover { background: rgba(37,99,235,0.15); border-color: rgba(96,165,250,0.32); color: ${C.blueL}; transform: translateY(-2px); }
        .skill-chip img { filter: saturate(0.8) brightness(0.95); transition: filter 0.2s; }
        .skill-chip:hover img { filter: saturate(1.1) brightness(1.05); }

        /* ── Tags ── */
        .tag { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; background: rgba(255,255,255,0.06); color: ${C.muted}; border: 1px solid ${C.border}; }

        /* ── Project cards ── */
        .project-card { background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 20px; padding: 32px; display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(.22,1,.36,1); }
        .project-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(96,165,250,0.07) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .project-card:hover { border-color: rgba(96,165,250,0.28); transform: translateY(-5px); box-shadow: 0 24px 56px rgba(0,0,0,0.4); }
        .project-card:hover::before { opacity: 1; }
        .project-card.featured { border-color: rgba(37,99,235,0.25); background: linear-gradient(140deg, rgba(37,99,235,0.07), ${C.dark2}); }
        .project-card.featured:hover { border-color: rgba(96,165,250,0.4); box-shadow: 0 24px 56px rgba(37,99,235,0.15); }
        .project-github { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: ${C.blueL}; text-decoration: none; margin-top: auto; padding-top: 20px; transition: gap 0.2s; }
        .project-github:hover { gap: 10px; }

        /* ── Timeline ── */
        .timeline-dot { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid ${C.border}; background: ${C.dark2}; position: relative; z-index: 2; }
        .timeline-dot.last { background: linear-gradient(135deg, ${C.blue}, ${C.violet}); border-color: transparent; }

        /* ── Stat cards ── */
        .stat-card { text-align: center; padding: 28px 16px; background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 16px; transition: border-color 0.3s, transform 0.3s; }
        .stat-card:hover { border-color: rgba(96,165,250,0.2); transform: translateY(-3px); }
        .stat-value { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 34px; background: linear-gradient(135deg, ${C.blueL}, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-label { font-size: 13px; color: ${C.muted}; margin-top: 6px; font-weight: 500; }

        /* ── Hackshow badge ── */
        @keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.75; } }
        .hackshow-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); border-radius: 100px; font-size: 13px; font-weight: 600; color: #fbbf24; animation: shimmer 2.5s ease-in-out infinite; }

        /* ── Open to work badge ── */
        @keyframes pulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.5); } 50% { opacity: 0.85; box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
        .otw-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.25); border-radius: 100px; font-size: 13px; font-weight: 600; color: #4ade80; margin-bottom: 18px; }
        .otw-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; animation: pulse 2.2s ease-in-out infinite; }

        /* ── Typewriter cursor ── */
        .cursor { display: inline-block; width: 2px; height: 1em; background: ${C.blueL}; margin-left: 2px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* ── Hamburger ── */
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: ${C.text}; margin: 5px 0; transition: all 0.3s; border-radius: 1px; }

        /* ── Hackshow photo ── */
        .hackshow-frame { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid rgba(251,191,36,0.2); box-shadow: 0 0 60px rgba(251,191,36,0.08), 0 32px 64px rgba(0,0,0,0.5); }
        .hackshow-frame img { width: 100%; display: block; }
        .hackshow-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,18,0.7) 0%, transparent 50%); }
        .hackshow-caption { position: absolute; bottom: 16px; left: 16px; right: 16px; }

        /* ── Copy button ── */
        .copy-btn { background: none; border: none; cursor: pointer; color: ${C.blueL}; font-size: 13px; font-weight: 600; font-family: inherit; padding: 4px 8px; border-radius: 6px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 4px; }
        .copy-btn:hover { background: rgba(96,165,250,0.1); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { display: none; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas a, .hero-ctas button { width: 100%; justify-content: center; }
          .mobile-menu { position: fixed; inset: 0; background: rgba(8,8,18,0.97); backdrop-filter: blur(20px); z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; }
          .mobile-menu button { font-size: 20px; font-weight: 600; color: ${C.text}; background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; }
          .mobile-close { position: absolute; top: 24px; right: 24px; font-size: 28px; background: none; border: none; cursor: pointer; color: ${C.muted}; }
        }
        @media (min-width: 769px) { .mobile-menu { display: none !important; } }

        /* ── iOS screenshots ── */
        .ios-scroll { display: flex; gap: 20px; padding: 8px 0 24px; overflow-x: auto; scrollbar-width: none; cursor: grab; }
        .ios-scroll:active { cursor: grabbing; }
        .ios-scroll::-webkit-scrollbar { display: none; }
        .ios-scroll img { height: 460px; width: auto; border-radius: 32px; border: 1px solid ${C.border}; flex-shrink: 0; box-shadow: 0 24px 56px rgba(0,0,0,0.45); transition: transform 0.3s; background: ${C.dark3}; }
        .ios-scroll img:hover { transform: translateY(-8px) scale(1.02); }

        /* ── Cert hint ── */
        .cert-hint { font-size: 11px; color: ${C.muted}; text-align: center; margin-top: 14px; letter-spacing: 0.04em; opacity: 0.7; }

        /* ── Footer links ── */
        .footer-link { color: ${C.muted}; text-decoration: none; font-size: 13px; transition: color 0.2s; }
        .footer-link:hover { color: ${C.blueL}; }
      `}</style>

      {/* ── AURORA ── */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob" /><div className="aurora-blob" /><div className="aurora-blob" />
      </div>

      {/* ── SCROLL PROGRESS ── */}
      <ScrollProgressBar />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── NAV ── */}
        <nav className={`nav-wrap ${scrolled ? "nav-scrolled" : ""}`}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, cursor: "pointer", letterSpacing: "-0.03em" }}
              onClick={() => scrollTo("home")}
            >
              <span style={{ color: C.blueL }}>F</span><span style={{ color: C.text }}>P</span>
            </div>
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {sections.map(s => (
                <button key={s} className={`nav-link ${active === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
                  {t.nav[s] || s}
                </button>
              ))}
              <div className="lang-toggle">
                <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
                <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
              </div>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(true)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div className="mobile-menu">
            <button className="mobile-close" onClick={() => setMenuOpen(false)}>×</button>
            {sections.map(s => <button key={s} onClick={() => scrollTo(s)}>{t.nav[s] || s}</button>)}
            <div className="lang-toggle" style={{ marginTop: 12 }}>
              <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
            </div>
          </div>
        )}

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

              {/* Left */}
              <div>
                {/* Open to Work */}
                <div style={fadeIn(0)}>
                  <div className="otw-badge">
                    <div className="otw-dot" />
                    {t.hero.openToWork}
                  </div>
                </div>

                {/* Hackshow badge */}
                <div style={{ ...fadeIn(0.06), marginBottom: 24 }}>
                  <span className="hackshow-badge">{t.hero.hackshow}</span>
                </div>

                <div style={fadeIn(0.12)}>
                  <p style={{ fontSize: 16, color: C.muted, fontWeight: 500, marginBottom: 10 }}>{t.hero.greeting}</p>
                </div>

                <div style={fadeIn(0.18)}>
                  <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
                    <span className="gradient-text">{t.hero.name}</span>
                  </h1>
                </div>

                {/* Typewriter title */}
                <div style={fadeIn(0.24)}>
                  <div style={{ display: "inline-block", padding: "7px 18px", borderRadius: 100, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(96,165,250,0.2)", marginBottom: 24 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.blueL, letterSpacing: "0.02em", fontFamily: "'Outfit', sans-serif" }}>
                      {titleText}
                      <span className="cursor" />
                    </span>
                  </div>
                </div>

                <div style={fadeIn(0.30)}>
                  <p style={{ fontSize: 18, lineHeight: 1.7, color: C.muted, maxWidth: 480, marginBottom: 40, fontWeight: 400 }}>
                    {t.hero.subtitle}
                  </p>
                </div>

                {/* CTAs */}
                <div className="hero-ctas" style={{ ...fadeIn(0.36), display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={() => scrollTo("projects")}>{t.hero.cta} ↓</button>
                  {/* ⚠️ Add Fotios_Pongas_CV.pdf to the /public folder to enable the CV download */}
                  <a className="btn-cv" href="/Fotios_Pongas_CV.pdf" download>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {t.hero.downloadCV}
                  </a>
                  <button className="btn-outline" onClick={() => scrollTo("contact")}>{t.hero.contact}</button>
                </div>
              </div>

              {/* Right — Hackshow photo */}
              <div className="hero-photo" style={fadeIn(0.2)}>
                <div className="hackshow-frame">
                  <img src="/IMG_2589.jpeg" alt="Ironhack Hackshow Winner" />
                  <div className="hackshow-overlay" />
                  <div className="hackshow-caption">
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>🏆 Ironhack Hackshow Winner</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{t.hero.hackshowSub}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.about.label}</span>
              <h2 className="section-title">{t.about.title}</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, marginTop: 32 }}>
              <Reveal delay={0.1}>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: C.muted, marginBottom: 20 }}>{t.about.p1}</p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: C.muted, marginBottom: 20 }}>{t.about.p2}</p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: C.muted }}>{t.about.p3}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {Object.values(t.about.stats).map((s, i) => (
                    <AnimatedStat key={i} value={s.value} label={s.label} C={C} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── JOURNEY ── */}
        <section id="journey" style={{ padding: "100px 24px", background: C.dark2 }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.journey.label}</span>
              <h2 className="section-title">{t.journey.title}</h2>
            </Reveal>
            <div style={{ position: "relative", marginTop: 48 }}>
              <div style={{ position: "absolute", left: 23, top: 48, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.blue}, ${C.violet}, ${C.border})` }} />
              {t.journey.steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: 24, marginBottom: 40, position: "relative" }}>
                    <div className={`timeline-dot ${i === t.journey.steps.length - 1 ? "last" : ""}`}>{step.icon}</div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{step.year}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 6, color: C.text }}>{step.title}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.skills.label}</span>
              <h2 className="section-title">{t.skills.title}</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 40 }}>
              {skillsData.map((group, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="dark-card" style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: C.blueL, marginBottom: 18, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {t.skills.categories[group.category]}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {group.items.map((item, j) => (
                        <SkillChip key={j} item={item} C={C} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" style={{ padding: "100px 24px", background: C.dark2 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.certifications.label}</span>
              <h2 className="section-title">{t.certifications.title}</h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ margin: "40px 0 48px", padding: "36px 40px", borderRadius: 20, background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.07))", border: "1px solid rgba(96,165,250,0.18)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent)" }} />
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blueL, marginBottom: 20 }}>Ironhack DevOps & Cloud Computing — Program Highlights</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                  {[
                    { icon: "⏱️", title: "400+ Hours",     desc: "Pre-work, labs, hands-on projects and career development." },
                    { icon: "🛠️", title: "Industry Tools", desc: "Git, Terraform, Ansible, Docker, Kubernetes, AWS, Azure." },
                    { icon: "📊", title: "Observability",  desc: "Real-world monitoring with Prometheus and Grafana." },
                    { icon: "🏆", title: "Hackshow Winner", desc: "Hotel Knowledge Assistant — top project of the cohort." },
                  ].map((h, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{h.icon}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>{h.title}</div>
                        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
              {t.certifications.items.map((cert, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <CertCard cert={cert} C={C} />
                  <p className="cert-hint">{t.certifications.hint}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.projects.label}</span>
              <h2 className="section-title">{t.projects.title}</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginTop: 40 }}>
              {t.projects.items.map((project, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <ProjectCard project={project} viewCode={t.projects.viewCode} C={C} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── iOS APP ── */}
        <section id="iosapp" style={{ padding: "100px 24px", background: C.dark2 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <span className="section-label">{t.iosApp.label}</span>
              <h2 className="section-title">{t.iosApp.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center", marginTop: 32, marginBottom: 48 }}>
                <div>
                  <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, fontStyle: "italic", borderLeft: `3px solid rgba(96,165,250,0.4)`, paddingLeft: 16, marginBottom: 20 }}>
                    "{t.iosApp.story}"
                  </p>
                  <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>{t.iosApp.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {t.iosApp.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <a href={t.iosApp.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      App Store
                    </a>
                    <a href="https://getpicksy.app" target="_blank" rel="noopener noreferrer" className="btn-outline">{t.iosApp.learnMore}</a>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ position: "relative", width: 160, height: 160 }}>
                    <img
                      src="/icon-1024-flat.png"
                      alt="Picksy app icon"
                      style={{ width: 160, height: 160, borderRadius: 36, boxShadow: "0 24px 56px rgba(37,99,235,0.35), 0 8px 24px rgba(0,0,0,0.5)", display: "block" }}
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div style={{ display: "none", width: 160, height: 160, borderRadius: 36, background: "linear-gradient(135deg, #2563eb, #7c3aed)", alignItems: "center", justifyContent: "center", fontSize: 64, boxShadow: "0 24px 56px rgba(37,99,235,0.35)" }}>
                      📱
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <IosCarousel C={C} />
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "100px 24px 80px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <span className="section-label">{t.contact.label}</span>
              <h2 className="section-title">{t.contact.title}</h2>
              <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, marginBottom: 48 }}>{t.contact.subtitle}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16 }}>
                {/* Email — with copy button */}
                <div className="dark-card" style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>✉️</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.contact.email}</div>
                  <a href="mailto:fotis.poggas@gmail.com" style={{ fontSize: 12.5, fontWeight: 600, color: C.blueL, textDecoration: "none", display: "block", marginBottom: 8, wordBreak: "break-word", lineHeight: 1.4 }}>
                    fotis.poggas@gmail.com
                  </a>
                  <button className="copy-btn" onClick={copyEmail}>
                    {emailCopied ? (
                      <><span>✓</span> {t.contact.copied}</>
                    ) : (
                      <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                    )}
                  </button>
                </div>

                {[
                  { label: t.contact.linkedin, icon: "💼", href: "https://www.linkedin.com/in/f-pongas-devops-cloud/", value: "LinkedIn" },
                  { label: t.contact.github,   icon: "💻", href: "https://github.com/Kabamaru2372",                    value: "GitHub" },
                  { label: t.contact.location, icon: "📍", href: null, value: t.contact.locationValue },
                ].map((item, i) => (
                  <div key={i} className="dark-card" style={{ padding: 24, textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: C.blueL, textDecoration: "none" }}>{item.value}</a>
                      : <span style={{ fontSize: 14, fontWeight: 500, color: C.muted }}>{item.value}</span>
                    }
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "36px 24px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <p style={{ fontSize: 13, color: "#3d3d55" }}>
              © 2026 Fotios Pongas — Built with React, deployed with CI/CD.
            </p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <a href="https://github.com/Kabamaru2372"                          target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://www.linkedin.com/in/f-pongas-devops-cloud/"       target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
              <a href="mailto:fotis.poggas@gmail.com"                                                                      className="footer-link">Email</a>
              <a href="https://apps.apple.com/de/app/picksy-be-present/id6761116771" target="_blank" rel="noopener noreferrer" className="footer-link">Picksy</a>
            </div>
          </div>
        </footer>

      </div>{/* /page */}

      {/* ── BACK TO TOP ── */}
      <BackToTop C={C} />
    </div>
  );
}

// ─── Project Card ───────────────────────────────────────────────────────────

function ProjectCard({ project, viewCode, C }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%";
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
    ref.current.style.setProperty("--mx", x);
    ref.current.style.setProperty("--my", y);
  };

  return (
    <div ref={ref} className={`project-card ${project.featured ? "featured" : ""}`} onMouseMove={handleMouseMove}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>{project.emoji}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: C.text, marginBottom: 4, lineHeight: 1.2 }}>
        {project.title}
      </h3>
      <div style={{ fontSize: 13, color: C.blueL, fontWeight: 600, marginBottom: 16 }}>{project.subtitle}</div>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: C.muted, flex: 1, marginBottom: 20 }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
        {project.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-github">
        {viewCode} <span>→</span>
      </a>
    </div>
  );
}

// ─── Cert Card ──────────────────────────────────────────────────────────────

function CertCard({ cert, C }) {
  const [showBack, setShowBack] = useState(false);
  const ref         = useRef(null);
  const isAnimating = useRef(false);
  const isBack      = useRef(false);

  const setTrans = (t)  => { ref.current.style.transition = t; };
  const setTf    = (tf) => { ref.current.style.transform  = tf; };

  const handleMouseMove = (e) => {
    if (isBack.current || isAnimating.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTrans("transform 0.1s linear");
    setTf(`perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    if (isBack.current || isAnimating.current) return;
    setTrans("transform 0.4s cubic-bezier(.22,1,.36,1)");
    setTf("perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)");
  };

  const handleClick = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const goBack = !isBack.current;

    setTrans("transform 0.28s ease-in");
    setTf("perspective(1000px) rotateY(90deg)");

    setTimeout(() => {
      isBack.current = goBack;
      setShowBack(goBack);
      setTrans("transform 0.28s ease-out");
      setTf("perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)");
      setTimeout(() => { isAnimating.current = false; }, 290);
    }, 285);
  };

  const accentRgb = cert.color === "#2563eb" ? "37,99,235" : "245,158,11";

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: "pointer",
        borderRadius: 20,
        border: `1px solid ${showBack ? cert.color + "55" : C.border}`,
        background: showBack
          ? `linear-gradient(140deg, rgba(${accentRgb},0.13), ${C.dark2})`
          : C.dark2,
        overflow: "hidden",
        transition: "transform 0.4s cubic-bezier(.22,1,.36,1), border-color 0.3s, background 0.3s",
        transform: "perspective(1000px) rotateY(0deg)",
        willChange: "transform",
      }}
    >
      {!showBack ? (
        <>
          <div style={{ height: 4, background: cert.color }} />
          <div style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: cert.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'Outfit', sans-serif" }}>{cert.title}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{cert.issuer} · {cert.date}</div>
              </div>
            </div>
            <div style={{ borderRadius: 12, background: "#fff", border: `1px solid ${C.border}`, padding: 8 }}>
              <img src={cert.image} alt={cert.title} loading="lazy" decoding="async" style={{ width: "100%", display: "block", objectFit: "contain", borderRadius: 8 }} />
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: "32px 28px", minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: cert.color, marginBottom: 20 }} />
          <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: C.text, marginBottom: 6 }}>{cert.title}</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 28 }}>{cert.issuer} · {cert.date}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cert.facts.map((fact, i) => (
              <div key={i} style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{fact}</div>
            ))}
          </div>
          <div style={{ marginTop: 28, fontSize: 12, color: cert.color, opacity: 0.7, textAlign: "center" }}>Click to flip back</div>
        </div>
      )}
    </div>
  );
}

// ─── iOS Carousel ───────────────────────────────────────────────────────────

function IosCarousel({ C }) {
  const ref = useRef(null);
  let isDown = false, startX, scrollLeft;

  const screenshots = [
    "/picksy-new-1.jpg",
    "/picksy-new-2.jpg",
    "/picksy-new-3.jpg",
    "/picksy-new-4.jpg",
    "/picksy-new-5.jpg",
    "/picksy-new-6.jpg",
  ];

  return (
    <div ref={ref} className="ios-scroll"
      onMouseDown={e  => { isDown = true; startX = e.pageX - ref.current.offsetLeft; scrollLeft = ref.current.scrollLeft; }}
      onMouseLeave={() => { isDown = false; }}
      onMouseUp={() => { isDown = false; }}
      onMouseMove={e  => { if (!isDown) return; e.preventDefault(); const x = e.pageX - ref.current.offsetLeft; ref.current.scrollLeft = scrollLeft - (x - startX) * 1.4; }}
    >
      {screenshots.map((src, i) => (
        <img key={i} src={src} alt={`Picksy screen ${i + 1}`} draggable="false" loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
