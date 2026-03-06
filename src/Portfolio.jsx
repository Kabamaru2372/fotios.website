import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    nav: { home: "Home", about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hello, I'm",
      name: "Fotios Pongas",
      title: "DevOps & Cloud Engineer",
      subtitle: "Building reliable, scalable infrastructure — with the service mindset of someone who's managed 5-star operations.",
      cta: "View My Work",
      contact: "Get In Touch"
    },
    about: {
      label: "About Me",
      title: "From Hotel Lobbies to Cloud Architectures",
      p1: "For over a decade, I managed high-pressure, service-critical environments — from managing a retail store in Rhodes to front-desk operations at Sheraton hotels. I learned to keep complex systems running smoothly, coordinate teams under pressure, and deliver results that people depend on.",
      p2: "Those are the same principles I now apply to DevOps and Cloud Engineering. I design CI/CD pipelines, orchestrate containers with Kubernetes, provision infrastructure with Terraform, and monitor everything with Prometheus and Grafana — because whether it's a hotel or a cluster, downtime is not an option.",
      p3: "Currently completing the Ironhack DevOps & Cloud Computing Bootcamp in Germany, I bring a unique blend of operational discipline, leadership experience, and genuine passion for automation to every project I build.",
      stats: {
        experience: { value: "10+", label: "Years in Operations" },
        projects: { value: "5+", label: "Cloud Projects" },
        certs: { value: "Azure", label: "Cloud Platform" },
        location: { value: "DE", label: "Based in Germany" }
      }
    },
    skills: {
      label: "Technical Skills",
      title: "Tools & Technologies",
      categories: {
        cloud: "Cloud & Infrastructure",
        containers: "Containers & Orchestration",
        cicd: "CI/CD & Automation",
        monitoring: "Monitoring & Observability",
        development: "Development",
        databases: "Databases & Caching"
      }
    },
    projects: {
      label: "Projects",
      title: "What I've Built",
      viewCode: "View Code",
      viewLive: "Live Demo",
      items: [
        {
          title: "Expensy — Expense Tracking Platform",
          description: "Full-stack expense tracker deployed on Azure AKS with a complete DevOps pipeline. Features GitHub Actions CI/CD, Prometheus & Grafana monitoring, Kubernetes secrets management, and Redis caching. Built to demonstrate production-grade cloud-native practices.",
          tags: ["Node.js", "Next.js", "MongoDB", "Redis", "Azure AKS", "GitHub Actions", "Prometheus", "Grafana", "Kubernetes", "Docker"],
          github: "https://github.com/Kabamaru2372/max.devops.expensy",
          emoji: "💰"
        },
        {
          title: "Hotel Knowledge Assistant — RAG AI Pipeline",
          description: "An AI-powered hotel assistant using Retrieval-Augmented Generation on Azure. Combines Blob Storage, Azure AI Search, and Azure OpenAI with a FastAPI backend. Fully containerized and deployed on Azure Container Instances via Terraform.",
          tags: ["Azure OpenAI", "Azure AI Foundry", "Azure AI Search", "FastAPI", "Terraform", "Docker", "Blob Storage", "Python"],
          github: "https://github.com/Kabamaru2372/hotel-training-RAG-pipeline",
          emoji: "🏨"
        },
        {
          title: "W3 Combo — Multi-Service Cloud Infrastructure",
          description: "Infrastructure as Code project provisioning a multi-service environment on AWS using Terraform. Demonstrates automated cloud resource management, networking configuration, and repeatable deployments following IaC best practices.",
          tags: ["Terraform", "HCL", "AWS", "Infrastructure as Code", "Cloud Networking"],
          github: "https://github.com/Kabamaru2372/w3-combo",
          emoji: "☁️"
        },
        {
          title: "3-Tier Voting App — Microservices on AWS",
          description: "Architected and deployed a multi-tier voting system simulating real enterprise DevOps workflows. Infrastructure provisioned with Terraform, configured with Ansible, containerized with Docker Compose, and automated with GitHub Actions CI/CD pipelines.",
          tags: ["Python", "Node.js", "C#/.NET", "Redis", "PostgreSQL", "Docker", "Terraform", "Ansible", "GitHub Actions"],
          github: "https://github.com/Kabamaru2372/3-tier-application",
          emoji: "🗳️"
        },
        {
          title: "Cloud Provisioning Toolkit",
          description: "Terraform modules and shell scripts for automated provisioning of cloud instances, security groups, and networking. Designed for rapid, repeatable infrastructure deployment across environments.",
          tags: ["Terraform", "HCL", "Shell", "AWS", "Automation"],
          github: "https://github.com/Kabamaru2372/ironhack-project1-provisioning",
          emoji: "⚙️"
        },
        {
          title: "fotiospongas.dev — This Portfolio Site",
          description: "The site you're looking at right now! A React + Vite portfolio with EN/DE language toggle, deployed to GitHub Pages via a GitHub Actions CI/CD pipeline. Every git push triggers an automated build and deploy.",
          tags: ["React", "Vite", "GitHub Actions", "GitHub Pages", "CI/CD"],
          github: "https://github.com/Kabamaru2372/fotios.website",
          emoji: "🌐"
        }
      ]
    },
    journey: {
      label: "My Journey",
      title: "A Career Built on Service",
      steps: [
        { year: "2009+", title: "Retail Management", desc: "Store Manager at Dixons in Rhodes — leading teams, managing inventory systems, and optimizing operations." },
        { year: "2023", title: "Hospitality Management", desc: "Managed operations at international 5-star hotels including Sheraton. Learned to run 24/7 systems where failure wasn't an option." },
        { year: "2025", title: "Career Pivot to Tech", desc: "Enrolled in Ironhack's DevOps & Cloud Computing Bootcamp. Started building real infrastructure from day one." },
        { year: "2026", title: "DevOps Engineer", desc: "Graduating with hands-on Azure, Kubernetes, Terraform, and CI/CD experience. Ready to bring operational excellence to cloud engineering." }
      ]
    },
    contact: {
      label: "Contact",
      title: "Let's Connect",
      subtitle: "I'm currently looking for DevOps & Cloud Engineering opportunities in Germany. Let's talk.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Location",
      locationValue: "Germany"
    }
  },
  de: {
    nav: { home: "Start", about: "Über mich", skills: "Fähigkeiten", projects: "Projekte", contact: "Kontakt" },
    hero: {
      greeting: "Hallo, ich bin",
      name: "Fotios Pongas",
      title: "DevOps & Cloud Engineer",
      subtitle: "Aufbau zuverlässiger, skalierbarer Infrastruktur — mit der Service-Mentalität eines erfahrenen 5-Sterne-Hotel-Managers.",
      cta: "Meine Arbeit",
      contact: "Kontakt"
    },
    about: {
      label: "Über mich",
      title: "Von der Hotellobby zur Cloud-Architektur",
      p1: "Über ein Jahrzehnt lang habe ich anspruchsvolle, servicekritische Umgebungen geleitet — vom Empfangsbereich bei Sheraton Hotels bis zur Leitung eines Einzelhandelsgeschäfts auf Rhodos. Dabei habe ich gelernt, komplexe Systeme reibungslos zu betreiben, Teams unter Druck zu koordinieren und Ergebnisse zu liefern, auf die man sich verlassen kann.",
      p2: "Dieselben Prinzipien wende ich jetzt auf DevOps und Cloud Engineering an. Ich entwerfe CI/CD-Pipelines, orchestriere Container mit Kubernetes, provisioniere Infrastruktur mit Terraform und überwache alles mit Prometheus und Grafana — denn ob Hotel oder Cluster, Ausfallzeiten sind keine Option.",
      p3: "Derzeit absolviere ich das Ironhack DevOps & Cloud Computing Bootcamp in Deutschland und bringe eine einzigartige Mischung aus operativer Disziplin, Führungserfahrung und echter Leidenschaft für Automatisierung in jedes Projekt ein.",
      stats: {
        experience: { value: "10+", label: "Jahre Berufserfahrung" },
        projects: { value: "5+", label: "Cloud-Projekte" },
        certs: { value: "Azure", label: "Cloud-Plattform" },
        location: { value: "DE", label: "Standort Deutschland" }
      }
    },
    skills: {
      label: "Technische Fähigkeiten",
      title: "Tools & Technologien",
      categories: {
        cloud: "Cloud & Infrastruktur",
        containers: "Container & Orchestrierung",
        cicd: "CI/CD & Automatisierung",
        monitoring: "Monitoring & Observability",
        development: "Entwicklung",
        databases: "Datenbanken & Caching"
      }
    },
    projects: {
      label: "Projekte",
      title: "Was ich gebaut habe",
      viewCode: "Code ansehen",
      viewLive: "Live-Demo",
      items: [
        {
          title: "Expensy — Ausgabenverfolgungsplattform",
          description: "Full-Stack Ausgaben-Tracker, bereitgestellt auf Azure AKS mit einer vollständigen DevOps-Pipeline. Mit GitHub Actions CI/CD, Prometheus & Grafana Monitoring, Kubernetes Secrets Management und Redis Caching.",
          tags: ["Node.js", "Next.js", "MongoDB", "Redis", "Azure AKS", "GitHub Actions", "Prometheus", "Grafana", "Kubernetes", "Docker"],
          github: "https://github.com/Kabamaru2372/max.devops.expensy",
          emoji: "💰"
        },
        {
          title: "Hotel Knowledge Assistant — RAG-KI-Pipeline",
          description: "Ein KI-gestützter Hotelassistent mit Retrieval-Augmented Generation auf Azure. Kombiniert Blob Storage, Azure AI Search und Azure OpenAI mit einem FastAPI-Backend. Vollständig containerisiert und über Terraform auf Azure Container Instances bereitgestellt.",
          tags: ["Azure OpenAI", "Azure AI Foundry", "Azure AI Search", "FastAPI", "Terraform", "Docker", "Blob Storage", "Python"],
          github: "https://github.com/Kabamaru2372/hotel-training-RAG-pipeline",
          emoji: "🏨"
        },
        {
          title: "W3 Combo — Multi-Service Cloud-Infrastruktur",
          description: "Infrastructure-as-Code-Projekt zur Bereitstellung einer Multi-Service-Umgebung auf AWS mit Terraform. Automatisiertes Cloud-Ressourcenmanagement, Netzwerkkonfiguration und wiederholbare Deployments nach IaC-Best-Practices.",
          tags: ["Terraform", "HCL", "AWS", "Infrastructure as Code", "Cloud Networking"],
          github: "https://github.com/Kabamaru2372/w3-combo",
          emoji: "☁️"
        },
        {
          title: "3-Tier Voting App — Microservices auf AWS",
          description: "Entwurf und Bereitstellung eines mehrstufigen Abstimmungssystems, das reale Enterprise-DevOps-Workflows simuliert. Infrastruktur mit Terraform, Konfiguration mit Ansible, Containerisierung mit Docker Compose und Automatisierung mit GitHub Actions.",
          tags: ["Python", "Node.js", "C#/.NET", "Redis", "PostgreSQL", "Docker", "Terraform", "Ansible", "GitHub Actions"],
          github: "https://github.com/Kabamaru2372/3-tier-application",
          emoji: "🗳️"
        },
        {
          title: "Cloud-Provisioning-Toolkit",
          description: "Terraform-Module und Shell-Skripte für die automatisierte Bereitstellung von Cloud-Instanzen, Sicherheitsgruppen und Netzwerken. Für schnelle, wiederholbare Infrastruktur-Deployments konzipiert.",
          tags: ["Terraform", "HCL", "Shell", "AWS", "Automation"],
          github: "https://github.com/Kabamaru2372/ironhack-project1-provisioning",
          emoji: "⚙️"
        },
        {
          title: "fotiospongas.dev — Diese Portfolio-Seite",
          description: "Die Seite, die Sie gerade betrachten! Eine React + Vite Portfolio-Seite mit EN/DE-Sprachumschaltung, bereitgestellt auf GitHub Pages über eine GitHub Actions CI/CD-Pipeline. Jeder Git-Push löst einen automatischen Build und Deploy aus.",
          tags: ["React", "Vite", "GitHub Actions", "GitHub Pages", "CI/CD"],
          github: "https://github.com/Kabamaru2372/fotios.website",
          emoji: "🌐"
        }
      ]
    },
    journey: {
      label: "Mein Werdegang",
      title: "Eine Karriere im Zeichen des Service",
      steps: [
        { year: "2010er", title: "Hotelmanagement", desc: "Leitung des Betriebs in internationalen 5-Sterne-Hotels wie Sheraton. Gelernt, 24/7-Systeme zu betreiben, bei denen Ausfälle keine Option waren." },
        { year: "2015+", title: "Einzelhandelsmanagement", desc: "Filialleiter bei Dixons auf Rhodos — Teamführung, Bestandsverwaltung und Prozessoptimierung." },
        { year: "2025", title: "Karrierewechsel in die IT", desc: "Einschreibung im Ironhack DevOps & Cloud Computing Bootcamp. Von Tag eins an echte Infrastruktur aufgebaut." },
        { year: "2026", title: "DevOps Engineer", desc: "Abschluss mit praktischer Erfahrung in Azure, Kubernetes, Terraform und CI/CD. Bereit, operative Exzellenz ins Cloud Engineering einzubringen." }
      ]
    },
    contact: {
      label: "Kontakt",
      title: "Lass uns vernetzen",
      subtitle: "Ich suche derzeit nach DevOps & Cloud Engineering Möglichkeiten in Deutschland. Lass uns sprechen.",
      email: "E-Mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Standort",
      locationValue: "Deutschland"
    }
  }
};

const skillsData = [
  { category: "cloud", items: ["Azure", "AWS", "Azure AI Foundry", "Terraform", "Azure AKS", "Blob Storage", "Azure AI Search", "Azure Container Instances"] },
  { category: "containers", items: ["Docker", "Kubernetes", "Docker Compose", "Helm"] },
  { category: "cicd", items: ["GitHub Actions", "Git", "CI/CD Pipelines"] },
  { category: "monitoring", items: ["Prometheus", "Grafana", "Alerting"] },
  { category: "development", items: ["Python", "Node.js", "FastAPI", "Next.js", "Bash"] },
  { category: "databases", items: ["MongoDB", "Redis", "PostgreSQL"] }
];

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];
  const sections = ["home", "about", "journey", "skills", "projects", "contact"];
  const active = useScrollSpy(sections);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Outfit', sans-serif", background: "#FAFBFC", color: "#1a1a2e", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: #2563eb22; color: #1a1a2e; }

        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
        }
        .nav-scrolled {
          background: rgba(250,251,252,0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .nav-link {
          position: relative; font-size: 14px; font-weight: 500; color: #64748b;
          cursor: pointer; padding: 6px 0; transition: color 0.25s; background: none; border: none;
          font-family: inherit; letter-spacing: 0.01em;
        }
        .nav-link:hover, .nav-link.active { color: #1a1a2e; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #2563eb; border-radius: 1px;
        }

        .lang-toggle {
          display: flex; border-radius: 8px; overflow: hidden; border: 1.5px solid #e2e8f0;
          font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .lang-btn {
          padding: 5px 12px; border: none; cursor: pointer; transition: all 0.25s;
          font-family: inherit; font-weight: 600; font-size: 13px;
          background: transparent; color: #94a3b8;
        }
        .lang-btn.active { background: #1a1a2e; color: #fff; }

        .section-label {
          display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #2563eb; margin-bottom: 12px;
          padding: 4px 12px; background: #2563eb0a; border-radius: 6px;
        }
        .section-title {
          font-family: 'Outfit', sans-serif; font-weight: 700; font-size: clamp(28px, 4vw, 40px);
          color: #1a1a2e; line-height: 1.2; margin-bottom: 20px;
        }

        .card {
          background: #fff; border-radius: 16px; border: 1px solid #f0f0f5;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
        }

        .skill-chip {
          display: inline-block; padding: 6px 14px; border-radius: 8px;
          font-size: 13px; font-weight: 500; background: #f8fafc;
          border: 1px solid #e2e8f0; color: #475569;
          transition: all 0.2s;
        }
        .skill-chip:hover { background: #2563eb; color: #fff; border-color: #2563eb; }

        .tag {
          display: inline-block; padding: 3px 10px; border-radius: 6px;
          font-size: 12px; font-weight: 500; background: #f1f5f9; color: #64748b;
        }

        .stat-card {
          text-align: center; padding: 24px 16px;
        }
        .stat-value {
          font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 32px;
          color: #2563eb; line-height: 1;
        }
        .stat-label {
          font-size: 13px; color: #94a3b8; margin-top: 6px; font-weight: 500;
        }

        .timeline-line {
          position: absolute; left: 23px; top: 48px; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, #2563eb, #10b981, #e2e8f0);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: #1a1a2e; color: #fff; font-weight: 600; font-size: 15px;
          border: none; cursor: pointer; transition: all 0.25s;
          font-family: inherit; text-decoration: none;
        }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: transparent; color: #1a1a2e; font-weight: 600; font-size: 15px;
          border: 1.5px solid #e2e8f0; cursor: pointer; transition: all 0.25s;
          font-family: inherit; text-decoration: none;
        }
        .btn-outline:hover { border-color: #2563eb; color: #2563eb; }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span {
          display: block; width: 24px; height: 2px; background: #1a1a2e;
          margin: 6px 0; transition: all 0.3s; border-radius: 1px;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block; }
          .mobile-menu {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(250,251,252,0.98); backdrop-filter: blur(20px);
            z-index: 200; display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 32px;
          }
          .mobile-menu button {
            font-size: 20px; font-weight: 600; color: #1a1a2e;
            background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif;
          }
          .mobile-close {
            position: absolute; top: 24px; right: 24px;
            font-size: 28px; background: none; border: none; cursor: pointer; color: #1a1a2e;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav-fixed ${scrolled ? "nav-scrolled" : ""}`}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: "#1a1a2e", cursor: "pointer", letterSpacing: "-0.02em" }} onClick={() => scrollTo("home")}>
            <span style={{ color: "#2563eb" }}>F</span>P
          </div>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {sections.map((s) => (
              <button key={s} className={`nav-link ${active === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
                {t.nav[s] || s.charAt(0).toUpperCase() + s.slice(1)}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>×</button>
          {sections.map((s) => (
            <button key={s} onClick={() => scrollTo(s)}>
              {t.nav[s] || s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <div className="lang-toggle" style={{ marginTop: 16 }}>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #2563eb08 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #2563eb05 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 720, textAlign: "center", position: "relative" }}>
          <FadeIn>
            <div style={{ marginBottom: 32 }}>
              <img
                src="/profile.jpeg"
                alt="Fotios Pongas"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: "0 8px 32px rgba(37, 99, 235, 0.15)",
                }}
              />
            </div>
          </FadeIn>
          <FadeIn>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#64748b", marginBottom: 12, letterSpacing: "0.02em" }}>{t.hero.greeting}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(40px, 7vw, 72px)", color: "#1a1a2e", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
              {t.hero.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 100, background: "#2563eb0d", marginBottom: 24 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#2563eb", letterSpacing: "0.04em" }}>{t.hero.title}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#64748b", maxWidth: 560, margin: "0 auto 40px", fontWeight: 400 }}>
              {t.hero.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                {t.hero.cta} <span style={{ fontSize: 18 }}>↓</span>
              </button>
              <button className="btn-outline" onClick={() => scrollTo("contact")}>
                {t.hero.contact}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #f0f7ff 0%, #FAFBFC 100%)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <span className="section-label">{t.about.label}</span>
          <h2 className="section-title">{t.about.title}</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, marginTop: 32 }}>
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#475569", marginBottom: 20 }}>{t.about.p1}</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#475569", marginBottom: 20 }}>{t.about.p2}</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#475569" }}>{t.about.p3}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {Object.values(t.about.stats).map((stat, i) => (
                <div key={i} className="card stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section id="journey" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <span className="section-label">{t.journey.label}</span>
            <h2 className="section-title">{t.journey.title}</h2>
          </FadeIn>
          <div style={{ position: "relative", marginTop: 40 }}>
            <div className="timeline-line" />
            {t.journey.steps.map((step, i) => {
              const bubbleIcons = ["🏪", "🏨", "💻", "🚀"];
              return (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ display: "flex", gap: 24, marginBottom: 40, position: "relative" }}>
                  <div style={{ minWidth: 48, height: 48, borderRadius: "50%", background: i === t.journey.steps.length - 1 ? "linear-gradient(135deg, #2563eb, #10b981)" : "#f1f5f9", border: "3px solid #fff", boxShadow: "0 0 0 2px #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, zIndex: 2 }}>
                    {bubbleIcons[i]}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{step.year}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>{step.title}</div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#64748b" }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #FAFBFC 0%, #f0fdf4 50%, #FAFBFC 100%)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <span className="section-label">{t.skills.label}</span>
          <h2 className="section-title">{t.skills.title}</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 40 }}>
          {skillsData.map((group, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>
                  {t.skills.categories[group.category]}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.items.map((item, j) => (
                    <span key={j} className="skill-chip">{item}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <span className="section-label">{t.projects.label}</span>
            <h2 className="section-title">{t.projects.title}</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, marginTop: 40 }}>
            {t.projects.items.map((project, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{project.emoji}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", fontFamily: "'Outfit', sans-serif", marginBottom: 12, lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#64748b", marginBottom: 20, flex: 1 }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {project.tags.map((tag, j) => (
                      <span key={j} className="tag">{tag}</span>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: "#2563eb", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {t.projects.viewCode} <span>→</span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px 80px", background: "linear-gradient(180deg, #FAFBFC 0%, #eef2ff 100%)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span className="section-label">{t.contact.label}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7, marginBottom: 48 }}>{t.contact.subtitle}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
              {[
                { label: t.contact.email, value: "Get in touch", href: "mailto:fotis.poggas@gmail.com", icon: "✉️" },
                { label: t.contact.linkedin, value: "LinkedIn", href: "https://www.linkedin.com/in/f-pongas-devops-cloud/", icon: "💼" },
                { label: t.contact.github, value: "GitHub", href: "https://github.com/Kabamaru2372", icon: "💻" },
                { label: t.contact.location, value: t.contact.locationValue, href: null, icon: "📍" }
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "#2563eb", textDecoration: "none" }}>{item.value}</a>
                  ) : (
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid #f0f0f5", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>
          © 2026 Fotios Pongas — Built with passion, deployed with CI/CD.
        </p>
      </footer>
    </div>
  );
}