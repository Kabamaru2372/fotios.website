import { useState, useEffect, useRef, useCallback } from "react";
import { translations, links, hackshowPhoto } from "./content";

// ─── Palette (Direction A: The Registry) ───────────────────────────────────
const C = {
  paper: "#efe9db",
  paperDeep: "#e6dfcc",
  ink: "#24201a",
  inkSoft: "#454035",
  inkFaint: "#6e6552",
  rule: "#cfc6b2",
  green: "#1d4a38",
  greenSoft: "#e4ebe6",
  rust: "#a8382b",
};

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
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
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(rawValue, duration = 1100) {
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
    const isText = isNaN(parseInt(rawValue, 10));
    if (isText) { setDisplay(rawValue); return; }
    const hasPlus = String(rawValue).includes("+");
    const target = parseInt(rawValue, 10);
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target) + (hasPlus && progress === 1 ? "+" : ""));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, rawValue, duration]);

  return [ref, display];
}

// ─── Small building blocks ──────────────────────────────────────────────────

function Reveal({ children, delay = 0, as: Tag = "div", style = {}, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Stat({ value, label }) {
  const [ref, display] = useCountUp(value);
  return (
    <div ref={ref} className="stat">
      <div className="stat-value">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function Portfolio() {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved) return saved;
    return typeof navigator !== "undefined" && navigator.language?.startsWith("de") ? "de" : "en";
  });
  const t = translations[lang];
  const sectionIds = ["about", "journey", "work", "apps", "papers", "contact"];
  const activeSection = useScrollSpy(sectionIds);
  const [emailCopied, setEmailCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.title = lang === "de"
      ? "Fotios Pongas — DevOps Engineer"
      : "Fotios Pongas — DevOps Engineer";
  }, [lang]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(links.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  }, []);

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .page {
          background: ${C.paper};
          color: ${C.ink};
          font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .ui { font-family: 'Inter', -apple-system, sans-serif; }

        .site { max-width: 900px; margin: 0 auto; padding: 0 24px; }
        @media (max-width: 640px) { .site { padding: 0 18px; } }

        a { color: inherit; }

        /* Nav */
        .nav-wrap { position: sticky; top: 0; z-index: 40; background: rgba(239,233,219,0.92); backdrop-filter: blur(10px); border-bottom: 2px solid ${C.ink}; }
        .nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; }
        .brand { font-family: 'Inter', sans-serif; font-size: 14.5px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; cursor: pointer; background: none; border: none; color: ${C.ink}; padding: 0; }
        .nav-links { display: flex; gap: 26px; align-items: center; }
        .nav-link { font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500; color: ${C.inkFaint}; background: none; border: none; cursor: pointer; padding: 4px 0; border-bottom: 1.5px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .nav-link:hover { color: ${C.ink}; }
        .nav-link.active { color: ${C.ink}; border-color: ${C.rust}; }
        .lang-toggle { display: flex; gap: 2px; font-family: 'Inter', sans-serif; }
        .lang-btn { font-family: inherit; font-size: 12.5px; font-weight: 700; padding: 5px 10px; border: 1.5px solid ${C.ink}; background: transparent; color: ${C.inkFaint}; cursor: pointer; letter-spacing: 0.04em; }
        .lang-btn:first-child { border-right: none; }
        .lang-btn.active { background: ${C.ink}; color: ${C.paper}; }
        .menu-btn { display: none; background: none; border: 1.5px solid ${C.ink}; padding: 7px 10px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13px; }
        @media (max-width: 760px) {
          .nav-links.desktop { display: none; }
          .menu-btn { display: inline-block; }
        }
        .mobile-menu { display: flex; flex-direction: column; gap: 0; border-top: 1px solid ${C.ink}; }
        .mobile-menu button { text-align: left; padding: 14px 0; font-family: 'Inter', sans-serif; font-size: 15px; background: none; border: none; border-bottom: 1px solid ${C.rule}; color: ${C.ink}; cursor: pointer; }

        /* Hero */
        .hero { padding: 84px 0 64px; position: relative; }
        @media (max-width: 640px) { .hero { padding: 56px 0 48px; } }
        .eyebrow { font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.inkFaint}; margin-bottom: 24px; font-weight: 600; }
        .hero h1 { font-size: clamp(32px, 5.4vw, 54px); line-height: 1.14; margin: 0 0 26px; font-weight: 500; max-width: 18ch; text-wrap: balance; letter-spacing: -0.01em; }
        .hero h1 em { font-style: italic; color: ${C.green}; }
        .hero .sub { font-size: 18px; line-height: 1.7; max-width: 54ch; color: ${C.inkSoft}; margin: 0 0 36px; }
        .actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .btn { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; padding: 13px 26px; border: 1.5px solid ${C.ink}; background: transparent; color: ${C.ink}; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.15s ease, background 0.2s; }
        .btn:hover { transform: translateY(-1px); }
        .btn.primary { background: ${C.green}; border-color: ${C.green}; color: ${C.paper}; }
        .btn.primary:hover { background: #163a2b; }
        .stamp { position: absolute; top: 60px; right: 24px; transform: rotate(6deg); border: 2.5px solid ${C.rust}; color: ${C.rust}; padding: 8px 15px; font-family: 'Inter', sans-serif; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; opacity: 0.88; pointer-events: none; }
        @media (max-width: 640px) { .stamp { position: static; display: inline-block; transform: rotate(-2deg); margin-bottom: 22px; } }

        /* Section shell */
        .section { border-top: 2px solid ${C.ink}; padding: 52px 0 60px; }
        .section-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px; flex-wrap: wrap; gap: 8px; }
        .section-label { font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; margin: 0; }
        .section-note { font-size: 14px; color: ${C.inkFaint}; font-style: italic; }
        .section-title { font-size: clamp(24px, 3.4vw, 32px); font-weight: 500; margin: 0 0 32px; max-width: 24ch; text-wrap: balance; }

        /* About */
        .about-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: start; }
        @media (max-width: 780px) { .about-grid { grid-template-columns: 1fr; gap: 32px; } }
        .about-text p { font-size: 16.5px; line-height: 1.75; color: ${C.inkSoft}; margin: 0 0 18px; }
        .about-photo { border: 1px solid ${C.ink}; padding: 10px; background: ${C.paperDeep}; }
        .about-photo img { width: 100%; display: block; }
        .about-photo .cap { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.inkFaint}; padding: 12px 4px 4px; line-height: 1.5; }
        .about-photo .cap b { color: ${C.rust}; font-weight: 700; display: block; margin-bottom: 3px; letter-spacing: 0.03em; text-transform: uppercase; font-size: 11px; }
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; padding-top: 32px; border-top: 1px solid ${C.rule}; }
        @media (max-width: 560px) { .stats-row { grid-template-columns: repeat(2, 1fr); row-gap: 26px; } }
        .stat-value { font-size: 30px; font-weight: 600; color: ${C.green}; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
        .stat-label { font-family: 'Inter', sans-serif; font-size: 12px; color: ${C.inkFaint}; margin-top: 4px; letter-spacing: 0.02em; }

        /* Journey timeline */
        .timeline { position: relative; padding-left: 28px; }
        .timeline::before { content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1.5px; background: ${C.rule}; }
        .tstep { position: relative; padding-bottom: 34px; }
        .tstep:last-child { padding-bottom: 0; }
        .tstep::before { content: ""; position: absolute; left: -28px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: ${C.paper}; border: 2px solid ${C.green}; }
        .tstep .tyear { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: ${C.green}; letter-spacing: 0.04em; margin-bottom: 6px; }
        .tstep h3 { font-size: 19px; font-weight: 600; margin: 0 0 6px; }
        .tstep p { font-size: 15px; line-height: 1.65; color: ${C.inkSoft}; margin: 0; max-width: 56ch; }

        /* Work ledger */
        .entry { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 26px 0; border-bottom: 1px solid ${C.rule}; }
        .entry:last-child { border-bottom: none; }
        .entry .no { font-family: 'Inter', sans-serif; font-size: 13px; color: ${C.inkFaint}; font-variant-numeric: tabular-nums; padding-top: 3px; }
        .entry-body { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .entry-body.has-thumb { grid-template-columns: 1fr 220px; }
        @media (max-width: 700px) { .entry-body.has-thumb { grid-template-columns: 1fr; } }
        .entry h3 { font-size: 21px; margin: 0 0 4px; font-weight: 600; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .award-tag { font-family: 'Inter', sans-serif; font-size: 11px; color: ${C.rust}; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; border: 1px solid ${C.rust}; padding: 2px 8px; }
        .entry p { margin: 0 0 10px; font-size: 15px; line-height: 1.65; color: ${C.inkSoft}; max-width: 58ch; }
        .entry .tags { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.inkFaint}; font-style: italic; display: block; margin-bottom: 12px; }
        .entry-links { display: flex; gap: 18px; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600; }
        .entry-links a, .entry-links span { color: ${C.green}; border-bottom: 1px dotted ${C.green}; cursor: pointer; text-decoration: none; }
        .entry-thumb { border: 1px solid ${C.ink}; overflow: hidden; align-self: start; }
        .entry-thumb img { width: 100%; display: block; aspect-ratio: 16/10; object-fit: cover; }

        /* Apps */
        .apps-intro { font-size: 16px; color: ${C.inkSoft}; margin: 0 0 36px; max-width: 58ch; line-height: 1.65; }
        .app-card { display: grid; grid-template-columns: 220px 1fr; gap: 32px; padding: 30px 0; border-bottom: 1px solid ${C.rule}; align-items: start; min-width: 0; }
        .app-card:last-child { border-bottom: none; }
        @media (max-width: 700px) { .app-card { grid-template-columns: 1fr; } }
        .app-shots { display: flex; gap: 8px; min-width: 0; }
        .app-shots img { width: 100%; min-width: 0; flex: 1 1 0; border: 1px solid ${C.ink}; display: block; }
        .app-card h3 { font-size: 21px; margin: 0 0 8px; font-weight: 600; }
        .app-card p { font-size: 15px; line-height: 1.65; color: ${C.inkSoft}; margin: 0 0 12px; max-width: 56ch; }
        .app-card .tags { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.inkFaint}; font-style: italic; display: block; margin-bottom: 14px; }
        .app-links { display: flex; gap: 18px; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600; flex-wrap: wrap; }
        .app-links a { color: ${C.green}; border-bottom: 1px dotted ${C.green}; text-decoration: none; }

        /* Papers */
        .papers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        @media (max-width: 700px) { .papers-grid { grid-template-columns: 1fr; } }
        .paper-card { border: 1px solid ${C.ink}; background: ${C.paperDeep}; padding: 22px; }
        .paper-thumb { border: 1px solid ${C.rule}; margin-bottom: 16px; overflow: hidden; }
        .paper-thumb img { width: 100%; display: block; }
        .paper-card h3 { font-size: 18px; margin: 0 0 3px; font-weight: 600; }
        .paper-meta { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.inkFaint}; margin-bottom: 14px; }
        .paper-facts { margin: 0; padding: 0; list-style: none; }
        .paper-facts li { font-size: 14px; line-height: 1.6; color: ${C.inkSoft}; padding: 7px 0 7px 16px; position: relative; border-top: 1px solid ${C.rule}; }
        .paper-facts li:first-child { border-top: none; }
        .paper-facts li::before { content: ""; position: absolute; left: 0; top: 15px; width: 6px; height: 1.5px; background: ${C.inkFaint}; }

        /* Skills */
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1px solid ${C.rule}; border-left: 1px solid ${C.rule}; }
        @media (max-width: 700px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-group { padding: 20px 24px; border-right: 1px solid ${C.rule}; border-bottom: 1px solid ${C.rule}; }
        .skill-group h4 { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: ${C.green}; margin: 0 0 8px; }
        .skill-group p { font-size: 15px; line-height: 1.6; color: ${C.inkSoft}; margin: 0; }

        /* Contact */
        .contact-box { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 700px) { .contact-box { grid-template-columns: 1fr; } }
        .contact-box p { font-size: 17px; line-height: 1.7; color: ${C.inkSoft}; margin: 0; max-width: 48ch; }
        .contact-links { display: flex; flex-direction: column; gap: 0; border-top: 1px solid ${C.ink}; }
        .contact-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid ${C.rule}; }
        .contact-row .k { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.inkFaint}; letter-spacing: 0.06em; text-transform: uppercase; }
        .contact-row .v { font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 600; color: ${C.green}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; }
        .contact-row .v.copied { color: ${C.rust}; }

        footer { padding: 26px 0 40px; font-family: 'Inter', sans-serif; font-size: 13px; color: ${C.inkFaint}; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; border-top: 2px solid ${C.ink}; }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a { text-decoration: none; color: ${C.inkFaint}; }
        .footer-links a:hover { color: ${C.ink}; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ── Nav ── */}
      <div className="nav-wrap">
        <div className="site nav">
          <button className="brand" onClick={() => scrollTo("top")}>Fotios Pongas</button>
          <div className="nav-links desktop">
            {sectionIds.map((id) => (
              <button key={id} className={`nav-link${activeSection === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                {t.nav[id === "journey" ? "journey" : id]}
              </button>
            ))}
            <div className="lang-toggle">
              <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`lang-btn${lang === "de" ? " active" : ""}`} onClick={() => setLang("de")}>DE</button>
            </div>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">{menuOpen ? "✕" : "☰"}</button>
        </div>
        {menuOpen && (
          <div className="site mobile-menu">
            {sectionIds.map((id) => (
              <button key={id} onClick={() => scrollTo(id)}>{t.nav[id]}</button>
            ))}
            <div style={{ display: "flex", gap: 8, padding: "14px 0" }}>
              <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`lang-btn${lang === "de" ? " active" : ""}`} onClick={() => setLang("de")}>DE</button>
            </div>
          </div>
        )}
      </div>

      <div id="top" />

      {/* ── Hero ── */}
      <div className="site">
        <section className="hero">
          <span className="stamp">{t.hero.stamp}</span>
          <div className="eyebrow">{t.hero.eyebrow}</div>
          <h1>{t.hero.titleBefore}<em>{t.hero.titleAccent}</em>{t.hero.titleAfter}</h1>
          <p className="sub">{t.hero.sub}</p>
          <div className="actions">
            <button className="btn primary" onClick={() => scrollTo("work")}>{t.hero.viewWork}</button>
            <a className="btn" href={links.cv} download>{t.hero.downloadCV}</a>
          </div>
        </section>

        {/* ── About ── */}
        <section className="section" id="about">
          <div className="section-head"><h2 className="section-label">{t.about.label}</h2></div>
          <h3 className="section-title">{t.about.title}</h3>
          <div className="about-grid">
            <Reveal className="about-text">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="about-photo">
                <img src={hackshowPhoto} alt="Fotios Pongas's name announced as Hackshow winner on a video call" loading="lazy" />
                <div className="cap">
                  <b>{t.about.photoNote}</b>
                  {t.about.photoCaption}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="stats-row">
            {t.about.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
          </div>
        </section>

        {/* ── Journey ── */}
        <section className="section" id="journey">
          <div className="section-head"><h2 className="section-label">{t.journey.label}</h2></div>
          <h3 className="section-title">{t.journey.title}</h3>
          <div className="timeline">
            {t.journey.steps.map((s, i) => (
              <Reveal key={s.year} delay={i * 70} className="tstep">
                <div className="tyear">{s.year}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Work ── */}
        <section className="section" id="work">
          <div className="section-head">
            <h2 className="section-label">{t.work.label}</h2>
            <span className="section-note">{t.work.note}</span>
          </div>
          <div>
            {t.work.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 50} as="div" className="entry">
                <span className="no">{p.year}</span>
                <div className={`entry-body${p.image ? " has-thumb" : ""}`}>
                  <div>
                    <h3>{p.title}{p.awarded && <span className="award-tag">{t.work.award}</span>}</h3>
                    <p>{p.desc}</p>
                    <span className="tags">{p.tags}</span>
                    <div className="entry-links">
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">{t.work.viewCode}</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">{t.work.liveDemo}</a>}
                    </div>
                  </div>
                  {p.image && (
                    <div className="entry-thumb">
                      <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Apps ── */}
        <section className="section" id="apps">
          <div className="section-head"><h2 className="section-label">{t.apps.label}</h2></div>
          <h3 className="section-title">{t.apps.title}</h3>
          <p className="apps-intro">{t.apps.intro}</p>

          <Reveal as="div" className="app-card">
            <div className="app-shots">
              <img src="/picksy-new-1.jpg" alt="Picksy app home screen showing pickup count" loading="lazy" />
              <img src="/picksy-new-2.jpg" alt="Picksy app intervention screen before opening a distracting app" loading="lazy" />
            </div>
            <div>
              <h3>{t.apps.picksy.title}</h3>
              <p>{t.apps.picksy.desc}</p>
              <span className="tags">{t.apps.picksy.tags}</span>
              <div className="app-links">
                <a href={t.apps.picksy.appStoreUrl} target="_blank" rel="noopener noreferrer">{t.apps.picksy.appStore}</a>
                <a href={t.apps.picksy.siteUrl} target="_blank" rel="noopener noreferrer">{t.apps.picksy.site}</a>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" delay={80} className="entry" style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, padding: "26px 0 0", border: "none" }}>
            <span className="no">{"//"}</span>
            <div>
              <h3>{t.apps.scytale.title}</h3>
              <p>{t.apps.scytale.desc}</p>
              <span className="tags">{t.apps.scytale.tags}</span>
              <div className="app-links">
                <a href={t.apps.scytale.linkUrl}>{t.apps.scytale.link}</a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Papers ── */}
        <section className="section" id="papers">
          <div className="section-head"><h2 className="section-label">{t.papers.label}</h2></div>
          <h3 className="section-title">{t.papers.title}</h3>
          <div className="papers-grid">
            {t.papers.items.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="paper-card">
                <div className="paper-thumb"><img src={c.image} alt={`${c.title} certificate`} loading="lazy" /></div>
                <h3>{c.title}</h3>
                <div className="paper-meta">{c.issuer} · {c.date}</div>
                <ul className="paper-facts">
                  {c.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="section">
          <div className="section-head"><h2 className="section-label">{t.skills.label}</h2></div>
          <h3 className="section-title">{t.skills.title}</h3>
          <div className="skills-grid">
            {t.skills.groups.map((g) => (
              <div className="skill-group" key={g.name}>
                <h4>{g.name}</h4>
                <p>{g.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="section" id="contact">
          <div className="section-head"><h2 className="section-label">{t.contact.label}</h2></div>
          <h3 className="section-title">{t.contact.title}</h3>
          <div className="contact-box">
            <p>{t.contact.sub}</p>
            <div className="contact-links">
              <div className="contact-row">
                <span className="k">{t.contact.emailLabel}</span>
                <button className={`v${emailCopied ? " copied" : ""}`} onClick={copyEmail} title={t.contact.copyHint}>
                  {emailCopied ? t.contact.copied : links.email}
                </button>
              </div>
              <div className="contact-row">
                <span className="k">LinkedIn</span>
                <a className="v" href={links.linkedin} target="_blank" rel="noopener noreferrer">f-pongas-devops-cloud</a>
              </div>
              <div className="contact-row">
                <span className="k">GitHub</span>
                <a className="v" href={links.github} target="_blank" rel="noopener noreferrer">Kabamaru2372</a>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <span>{t.footer.location}</span>
          <div className="footer-links">
            <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${links.email}`}>Email</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
