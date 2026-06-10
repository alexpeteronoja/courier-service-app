import { useState, useEffect, useRef } from "react";

// ─── Color tokens ───────────────────────────────────────────────
const C = {
  primary: "#20186d",
  primaryDark: "#160f55",
  primaryLight: "#2d239e",
  accent: "#ef770e",
  accentLight: "#ff9a3c",
  bg: "#f5f7fa",
  white: "#ffffff",
  text: "#1e1e1e",
  muted: "#6b7280",
  border: "#e2e6ef",
  success: "#16a34a",
  card: "#ffffff",
};

// ─── Inject Google Fonts + global styles ──────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.text}; }

    .syne { font-family: 'Syne', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .animate-fadeUp  { animation: fadeUp  0.6s ease both; }
    .animate-fadeIn  { animation: fadeIn  0.5s ease both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: ${C.accent}; color: #fff; font-family: 'Syne', sans-serif;
      font-weight: 700; font-size: 0.95rem; letter-spacing: 0.02em;
      padding: 14px 28px; border-radius: 4px; border: none; cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    }
    .btn-primary:hover {
      background: ${C.accentLight}; transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(239,119,14,0.35);
    }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: ${C.primary}; font-family: 'Syne', sans-serif;
      font-weight: 700; font-size: 0.95rem; letter-spacing: 0.02em;
      padding: 13px 28px; border-radius: 4px; border: 2px solid ${C.primary};
      cursor: pointer; transition: all 0.2s;
    }
    .btn-outline:hover { background: ${C.primary}; color: #fff; }
    .btn-outline-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: #fff; font-family: 'Syne', sans-serif;
      font-weight: 700; font-size: 0.95rem;
      padding: 13px 28px; border-radius: 4px; border: 2px solid rgba(255,255,255,0.5);
      cursor: pointer; transition: all 0.2s;
    }
    .btn-outline-white:hover { background: rgba(255,255,255,0.15); border-color: #fff; }

    .card {
      background: ${C.card}; border-radius: 12px;
      box-shadow: 0 2px 16px rgba(32,24,109,0.07);
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(32,24,109,0.12); }

    .section-tag {
      display: inline-block; background: rgba(239,119,14,0.12);
      color: ${C.accent}; font-family: 'Syne', sans-serif;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; padding: 5px 12px; border-radius: 20px;
      margin-bottom: 16px;
    }

    .ticker-wrap { overflow: hidden; background: ${C.accent}; padding: 12px 0; }
    .ticker-inner { display: flex; width: max-content; animation: marquee 24s linear infinite; }
    .ticker-item {
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.8rem;
      letter-spacing: 0.08em; text-transform: uppercase; color: #fff;
      padding: 0 32px; white-space: nowrap;
    }
    .ticker-dot { color: rgba(255,255,255,0.5); }

    input:focus, textarea:focus { outline: none; }

    .nav-link {
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
      color: rgba(255,255,255,0.8); text-decoration: none; cursor: pointer;
      padding: 6px 2px; position: relative; transition: color 0.2s;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 100%; height: 2px; background: ${C.accent};
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.25s ease;
    }
    .nav-link:hover { color: #fff; }
    .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
    .nav-link.active { color: #fff; }

    .step-line {
      position: absolute; top: 28px; left: calc(50% + 32px);
      width: calc(100% - 64px); height: 2px;
      background: linear-gradient(90deg, ${C.accent}, ${C.primary});
    }

    .stat-bar {
      height: 6px; border-radius: 3px; background: rgba(32,24,109,0.1);
      overflow: hidden; margin-top: 8px;
    }
    .stat-bar-fill {
      height: 100%; border-radius: 3px;
      background: linear-gradient(90deg, ${C.primary}, ${C.accent});
      transition: width 1.2s ease;
    }
  `}</style>
);

// ─── Icons (inline SVG) ────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    package: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    truck: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    clock: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    shield: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    globe: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    arrow: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    star: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    map: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
    users: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    phone: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22 6 12 13 2 6" />
      </svg>
    ),
    menu: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    x: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    pin: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── Navbar ────────────────────────────────────────────────────
const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "About", "Tracking"];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? C.primaryDark : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
          transition: "background 0.35s, box-shadow 0.35s",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => setPage("Home")}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: C.accent,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="truck" size={20} color="#fff" />
            </div>
            <span
              className="syne"
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Swift<span style={{ color: C.accent }}>Ex</span>
            </span>
          </div>

          {/* Desktop links */}
          <div
            style={{ display: "flex", gap: 36, alignItems: "center" }}
            className="desktop-nav"
          >
            {links.map((l) => (
              <span
                key={l}
                className={`nav-link ${page === l ? "active" : ""}`}
                onClick={() => {
                  setPage(l);
                  setMobileOpen(false);
                }}
              >
                {l}
              </span>
            ))}
            <button
              className="btn-primary"
              style={{ padding: "10px 20px", fontSize: "0.85rem" }}
              onClick={() => setPage("Tracking")}
            >
              Track Shipment
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              display: "none",
            }}
            className="mobile-menu-btn"
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={24} color="#fff" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            zIndex: 99,
            background: C.primaryDark,
            padding: "24px 5%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {links.map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: page === l ? C.accent : "#fff",
                cursor: "pointer",
              }}
              onClick={() => {
                setPage(l);
                setMobileOpen(false);
              }}
            >
              {l}
            </span>
          ))}
          <button
            className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: 8 }}
            onClick={() => {
              setPage("Tracking");
              setMobileOpen(false);
            }}
          >
            Track Shipment
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

// ─── Ticker ────────────────────────────────────────────────────
const Ticker = () => {
  const items = [
    "Express Delivery",
    "Same-Day Dispatch",
    "Nationwide Coverage",
    "Real-Time Tracking",
    "Insured Shipments",
    "Fragile Handling",
    "Cold Chain Logistics",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">◆</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── HOME PAGE ─────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const services = [
    {
      icon: "truck",
      title: "Same-Day Delivery",
      desc: "Your parcel picked up and delivered within hours, anywhere in the city.",
    },
    {
      icon: "globe",
      title: "Nationwide Shipping",
      desc: "Reliable delivery across all 36 states with real-time tracking.",
    },
    {
      icon: "package",
      title: "E-commerce Fulfilment",
      desc: "Seamlessly integrate with your store and automate your logistics.",
    },
    {
      icon: "shield",
      title: "Insured Shipments",
      desc: "Every package is fully insured. Zero risk, total peace of mind.",
    },
    {
      icon: "clock",
      title: "Scheduled Pickup",
      desc: "Book a pickup slot that works for you — we come to your door.",
    },
    {
      icon: "map",
      title: "Live GPS Tracking",
      desc: "Know exactly where your shipment is, every step of the way.",
    },
  ];

  const stats = [
    { label: "Packages Delivered", value: "2.4M+", pct: 92 },
    { label: "Cities Covered", value: "180+", pct: 78 },
    { label: "On-Time Rate", value: "98.7%", pct: 98 },
    { label: "Happy Customers", value: "400K+", pct: 85 },
  ];

  const steps = [
    {
      num: "01",
      title: "Book Online",
      desc: "Fill in your pickup and delivery details in under 2 minutes.",
    },
    {
      num: "02",
      title: "We Collect",
      desc: "A rider arrives at your location at the scheduled time.",
    },
    {
      num: "03",
      title: "Track Live",
      desc: "Monitor your shipment in real-time on our tracking dashboard.",
    },
    {
      num: "04",
      title: "Delivered",
      desc: "Your package arrives safely — recipient signs, you get notified.",
    },
  ];

  const testimonials = [
    {
      name: "Chidera Okonkwo",
      role: "E-commerce Seller, Lagos",
      text: "SwiftEx transformed my business. Deliveries are faster than ever and my customers keep coming back.",
      rating: 5,
    },
    {
      name: "Amara Nwosu",
      role: "Fashion Brand Owner, Abuja",
      text: "I've used 4 courier services and SwiftEx is the only one that's never lost or damaged my items.",
      rating: 5,
    },
    {
      name: "Bola Adeyemi",
      role: "Procurement Manager, Kano",
      text: "The live tracking feature is a game-changer. I always know where my goods are in transit.",
      rating: 5,
    },
  ];

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 55%, ${C.primaryLight} 100%)`,
          position: "relative",
          overflow: "hidden",
          padding: "120px 5% 80px",
        }}
      >
        {/* Geometric background shapes */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -80,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "rgba(239,119,14,0.08)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: "20%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              filter: "blur(40px)",
            }}
          />
          {/* Grid lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.07,
            }}
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Diagonal accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "28%",
              width: 4,
              height: "100%",
              background: `linear-gradient(180deg, transparent, ${C.accent}44, transparent)`,
            }}
          />
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div className="section-tag animate-fadeUp">
              Nigeria's #1 Courier Service
            </div>
            <h1
              className="syne animate-fadeUp delay-1"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: "-0.03em",
              }}
            >
              Delivered Fast.
              <br />
              <span style={{ color: C.accent }}>Delivered Safe.</span>
              <br />
              Every Time.
            </h1>
            <p
              className="animate-fadeUp delay-2"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              SwiftEx connects businesses and individuals with fast, reliable,
              and trackable courier services across Nigeria — from same-day city
              deliveries to nationwide shipping.
            </p>
            <div
              className="animate-fadeUp delay-3"
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              <button
                className="btn-primary"
                style={{ fontSize: "1rem" }}
                onClick={() => setPage("Tracking")}
              >
                Track a Shipment <Icon name="arrow" size={16} color="#fff" />
              </button>
              <button
                className="btn-outline-white"
                onClick={() => setPage("About")}
              >
                Learn More
              </button>
            </div>
            {/* Trust badges */}
            <div
              className="animate-fadeUp delay-4"
              style={{
                marginTop: 52,
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
              }}
            >
              {["2.4M+ Deliveries", "180+ Cities", "98.7% On Time"].map((b) => (
                <div
                  key={b}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "rgba(239,119,14,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="check" size={12} color={C.accent} />
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – tracking widget preview */}
          <div
            className="animate-fadeUp delay-2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.12)",
                padding: 32,
                width: "100%",
                maxWidth: 400,
              }}
            >
              <p
                className="syne"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Quick Track
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  placeholder="Enter tracking ID e.g. SWX-29183"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    padding: "14px 16px",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                  }}
                />
                <button
                  className="btn-primary"
                  style={{ padding: "14px 16px", borderRadius: 8 }}
                  onClick={() => setPage("Tracking")}
                >
                  <Icon name="search" size={18} color="#fff" />
                </button>
              </div>
              {/* Fake live shipments */}
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[
                  {
                    id: "SWX-29183",
                    status: "In Transit",
                    city: "Lagos → Abuja",
                  },
                  {
                    id: "SWX-10047",
                    status: "Delivered",
                    city: "Kano → Port Harcourt",
                  },
                  {
                    id: "SWX-38812",
                    status: "Picked Up",
                    city: "Ibadan → Enugu",
                  },
                ].map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {s.id}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          fontSize: "0.75rem",
                        }}
                      >
                        {s.city}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontFamily: "'Syne', sans-serif",
                        background:
                          s.status === "Delivered"
                            ? "rgba(22,163,74,0.2)"
                            : s.status === "In Transit"
                              ? "rgba(239,119,14,0.2)"
                              : "rgba(32,24,109,0.4)",
                        color:
                          s.status === "Delivered"
                            ? "#4ade80"
                            : s.status === "In Transit"
                              ? C.accent
                              : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* Services */}
      <section style={{ padding: "100px 5%", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag">What We Offer</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
                marginBottom: 16,
              }}
            >
              Services Built for{" "}
              <span style={{ color: C.accent }}>Speed & Reliability</span>
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "1.05rem",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Whether you're a business shipping at scale or an individual
              sending a gift, we have the right solution for you.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${C.primary}15, ${C.accent}20)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon name={s.icon} size={26} color={C.primary} />
                </div>
                <h3
                  className="syne"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: C.primary,
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.93rem",
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: C.accent,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Learn more <Icon name="arrow" size={14} color={C.accent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef}
        style={{ padding: "80px 5%", background: C.primary }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p
                className="syne"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  marginBottom: 12,
                }}
              >
                {s.label}
              </p>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: statsVisible ? `${s.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "100px 5%", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="section-tag">The Process</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
              }}
            >
              Ship in <span style={{ color: C.accent }}>4 Simple Steps</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 40,
              position: "relative",
            }}
          >
            {steps.map((s, i) => (
              <div
                key={i}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? C.primary : C.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: `0 8px 24px ${i % 2 === 0 ? C.primary : C.accent}55`,
                  }}
                >
                  <span
                    className="syne"
                    style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}
                  >
                    {s.num}
                  </span>
                </div>
                <h3
                  className="syne"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: C.primary,
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          padding: "100px 5%",
          background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag">Customer Stories</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.025em",
              }}
            >
              Trusted by <span style={{ color: C.accent }}>Thousands</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Icon key={j} name="star" size={16} color={C.accent} />
                    ))}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    marginBottom: 24,
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 20,
                  }}
                >
                  <p
                    className="syne"
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.82rem",
                      marginTop: 2,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 5%", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
              borderRadius: 24,
              padding: "64px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(239,119,14,0.15)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                className="syne"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 16,
                  letterSpacing: "-0.025em",
                }}
              >
                Ready to Ship?
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 36,
                  fontSize: "1.05rem",
                  maxWidth: 480,
                  margin: "0 auto 36px",
                }}
              >
                Join over 400,000 customers shipping smarter with SwiftEx. Get
                started in minutes.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button className="btn-primary" style={{ fontSize: "1rem" }}>
                  Get a Quote
                </button>
                <button
                  className="btn-outline-white"
                  onClick={() => setPage("Tracking")}
                >
                  Track a Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── ABOUT PAGE ────────────────────────────────────────────────
const AboutPage = () => {
  const values = [
    {
      icon: "clock",
      title: "Speed First",
      desc: "We obsess over delivery times. Our entire logistics chain is engineered to be faster than the competition.",
    },
    {
      icon: "shield",
      title: "Uncompromising Safety",
      desc: "Every shipment is handled with care and insured. We treat your parcels like they're our own.",
    },
    {
      icon: "users",
      title: "Customer Obsessed",
      desc: "Our support team is available 24/7 to resolve any issue. Your satisfaction is our KPI.",
    },
    {
      icon: "globe",
      title: "Building Nigeria's Backbone",
      desc: "We believe reliable logistics is a fundamental enabler of commerce — and we're on a mission to make it accessible to all.",
    },
  ];

  const team = [
    { name: "Emeka Obi", role: "CEO & Co-Founder", initial: "EO" },
    { name: "Funke Adeyemi", role: "Chief Operations Officer", initial: "FA" },
    { name: "Tunde Bello", role: "Head of Technology", initial: "TB" },
    { name: "Ngozi Eze", role: "Head of Customer Experience", initial: "NE" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`,
          padding: "100px 5% 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="dots"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="section-tag animate-fadeUp">Our Story</div>
          <h1
            className="syne animate-fadeUp delay-1"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            We Exist to Move{" "}
            <span style={{ color: C.accent }}>Nigeria Forward</span>
          </h1>
          <p
            className="animate-fadeUp delay-2"
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "1.1rem",
              lineHeight: 1.75,
            }}
          >
            SwiftEx was founded in 2018 with a single belief: that every
            Nigerian business and individual deserves a courier service they can
            actually trust. Since then, we've delivered over 2.4 million parcels
            and grown into a national network.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "100px 5%", background: C.bg }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <div className="section-tag">Our Mission</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
                marginBottom: 24,
              }}
            >
              Logistics That{" "}
              <span style={{ color: C.accent }}>Actually Works</span>
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              We started SwiftEx after personally experiencing the frustrations
              of unreliable deliveries, lost packages, and zero visibility into
              where a shipment actually was.
            </p>
            <p
              style={{
                color: C.muted,
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              Our mission is simple: build the most dependable courier
              infrastructure in Nigeria — one that e-commerce sellers,
              enterprises, and everyday Nigerians can rely on without a second
              thought.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Founded in Lagos, serving all of Nigeria",
                "ISO-certified warehouse & handling facilities",
                "Proprietary real-time GPS tracking system",
                "Average pickup time under 45 minutes",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: C.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <Icon name="check" size={11} color="#fff" />
                  </div>
                  <span style={{ color: C.text, fontSize: "0.95rem" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {[
              { value: "2018", label: "Founded" },
              { value: "500+", label: "Team Members" },
              { value: "36", label: "States Covered" },
              { value: "24/7", label: "Support" },
            ].map((s, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 32,
                  textAlign: "center",
                  borderTop: `4px solid ${i % 2 === 0 ? C.primary : C.accent}`,
                }}
              >
                <p
                  className="syne"
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: i % 2 === 0 ? C.primary : C.accent,
                    marginBottom: 6,
                  }}
                >
                  {s.value}
                </p>
                <p style={{ color: C.muted, fontSize: "0.9rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag">What Drives Us</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
              }}
            >
              Our Core <span style={{ color: C.accent }}>Values</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 32,
                  borderLeft: `4px solid ${i % 2 === 0 ? C.primary : C.accent}`,
                }}
              >
                <div style={{ marginBottom: 18 }}>
                  <Icon
                    name={v.icon}
                    size={28}
                    color={i % 2 === 0 ? C.primary : C.accent}
                  />
                </div>
                <h3
                  className="syne"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: C.primary,
                    marginBottom: 10,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.93rem",
                    lineHeight: 1.65,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "100px 5%", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag">The People</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
              }}
            >
              Meet the <span style={{ color: C.accent }}>Leadership</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {team.map((m, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 32, textAlign: "center" }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <span
                    className="syne"
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                    }}
                  >
                    {m.initial}
                  </span>
                </div>
                <h3
                  className="syne"
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: C.primary,
                    marginBottom: 4,
                  }}
                >
                  {m.name}
                </h3>
                <p style={{ color: C.muted, fontSize: "0.85rem" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
        >
          <div>
            <div className="section-tag">Get In Touch</div>
            <h2
              className="syne"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.025em",
                marginBottom: 24,
              }}
            >
              We'd Love to{" "}
              <span style={{ color: C.accent }}>Hear from You</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "phone", label: "Phone", value: "+234 800 SWIFTEX" },
                { icon: "mail", label: "Email", value: "hello@swiftex.ng" },
                {
                  icon: "pin",
                  label: "Head Office",
                  value: "1 Courier Way, Victoria Island, Lagos",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `${C.primary}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={c.icon} size={20} color={C.primary} />
                  </div>
                  <div>
                    <p
                      style={{
                        color: C.muted,
                        fontSize: "0.8rem",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </p>
                    <p
                      style={{
                        color: C.text,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 36 }}>
            <h3
              className="syne"
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: C.primary,
                marginBottom: 24,
              }}
            >
              Send a Message
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Full Name", "Email Address", "Subject"].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  style={{
                    padding: "14px 16px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: C.text,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.accent)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              ))}
              <textarea
                placeholder="Your message..."
                rows={4}
                style={{
                  padding: "14px 16px",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: C.text,
                  resize: "vertical",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.accent)}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
              <button
                className="btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Send Message <Icon name="arrow" size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── TRACKING PAGE ─────────────────────────────────────────────
const TrackingPage = () => {
  const [query, setQuery] = useState("");
  const [tracked, setTracked] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockData = {
    "SWX-29183": {
      id: "SWX-29183",
      status: "In Transit",
      progress: 60,
      sender: "Kemi Fashion Store",
      receiver: "Adamu Musa",
      origin: "Lagos Island, Lagos",
      dest: "Wuse 2, Abuja",
      weight: "2.3 kg",
      type: "Standard Package",
      eta: "Jun 9, 2026",
      events: [
        {
          time: "Jun 8 · 09:14 AM",
          title: "In Transit",
          detail: "Package on the way to Abuja sorting hub",
          done: true,
        },
        {
          time: "Jun 8 · 07:50 AM",
          title: "Departed Origin Hub",
          detail: "Left Lagos Island sorting facility",
          done: true,
        },
        {
          time: "Jun 7 · 06:30 PM",
          title: "Picked Up",
          detail: "Collected from sender at Lagos Island",
          done: true,
        },
        {
          time: "Jun 7 · 05:55 PM",
          title: "Order Confirmed",
          detail: "Shipment booked successfully",
          done: true,
        },
        {
          time: "Expected Jun 9",
          title: "Out for Delivery",
          detail: "Abuja local delivery scheduled",
          done: false,
        },
        {
          time: "Expected Jun 9",
          title: "Delivered",
          detail: "Awaiting delivery at destination",
          done: false,
        },
      ],
    },
    "SWX-10047": {
      id: "SWX-10047",
      status: "Delivered",
      progress: 100,
      sender: "TechParts NG",
      receiver: "Chukwuemeka Dike",
      origin: "Kano Municipal, Kano",
      dest: "GRA Phase 2, Port Harcourt",
      weight: "5.1 kg",
      type: "Electronics",
      eta: "Jun 5, 2026",
      events: [
        {
          time: "Jun 5 · 02:37 PM",
          title: "Delivered",
          detail: "Signed by Chukwuemeka Dike at destination",
          done: true,
        },
        {
          time: "Jun 5 · 09:00 AM",
          title: "Out for Delivery",
          detail: "Port Harcourt local rider dispatched",
          done: true,
        },
        {
          time: "Jun 4 · 11:20 PM",
          title: "Arrived Destination Hub",
          detail: "Package at Port Harcourt facility",
          done: true,
        },
        {
          time: "Jun 3 · 03:00 PM",
          title: "In Transit",
          detail: "Road freight en route to Port Harcourt",
          done: true,
        },
        {
          time: "Jun 3 · 07:00 AM",
          title: "Picked Up",
          detail: "Collected from Kano warehouse",
          done: true,
        },
        {
          time: "Jun 2 · 04:12 PM",
          title: "Order Confirmed",
          detail: "Shipment booked",
          done: true,
        },
      ],
    },
    "SWX-38812": {
      id: "SWX-38812",
      status: "Picked Up",
      progress: 25,
      sender: "Luminary Foundation",
      receiver: "Ngozi Iheanacho",
      origin: "Ibadan North, Oyo",
      dest: "Independence Layout, Enugu",
      weight: "1.2 kg",
      type: "Documents",
      eta: "Jun 10, 2026",
      events: [
        {
          time: "Jun 8 · 11:00 AM",
          title: "Picked Up",
          detail: "Collected from sender, heading to sorting hub",
          done: true,
        },
        {
          time: "Jun 8 · 10:45 AM",
          title: "Order Confirmed",
          detail: "Shipment booked successfully",
          done: true,
        },
        {
          time: "Expected Jun 9",
          title: "In Transit",
          detail: "Awaiting dispatch to Enugu",
          done: false,
        },
        {
          time: "Expected Jun 10",
          title: "Out for Delivery",
          detail: "Enugu local delivery",
          done: false,
        },
        {
          time: "Expected Jun 10",
          title: "Delivered",
          detail: "Awaiting delivery",
          done: false,
        },
      ],
    },
  };

  const handleTrack = () => {
    setLoading(true);
    setTracked(null);
    setTimeout(() => {
      const result = mockData[query.toUpperCase().trim()];
      setTracked(result || "notfound");
      setLoading(false);
    }, 1200);
  };

  const statusColor = (s) =>
    s === "Delivered" ? C.success : s === "In Transit" ? C.accent : C.primary;

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: C.bg }}>
      {/* Header */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`,
          padding: "80px 5% 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="dots2"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots2)" />
          </svg>
        </div>
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="section-tag animate-fadeUp">Real-Time Tracking</div>
          <h1
            className="syne animate-fadeUp delay-1"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Where's Your <span style={{ color: C.accent }}>Package?</span>
          </h1>
          <p
            className="animate-fadeUp delay-2"
            style={{
              color: "rgba(255,255,255,0.65)",
              marginBottom: 36,
              fontSize: "1rem",
            }}
          >
            Enter your SwiftEx tracking ID to get live updates on your shipment.
          </p>
          <div
            className="animate-fadeUp delay-2"
            style={{
              display: "flex",
              gap: 12,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g. SWX-29183"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "16px 20px",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.04em",
              }}
            />
            <button
              className="btn-primary"
              style={{
                padding: "16px 28px",
                fontSize: "0.95rem",
                borderRadius: 8,
                flexShrink: 0,
              }}
              onClick={handleTrack}
              disabled={loading || !query.trim()}
            >
              {loading ? (
                "..."
              ) : (
                <>
                  <Icon name="search" size={18} color="#fff" /> Track
                </>
              )}
            </button>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.8rem",
              marginTop: 14,
            }}
          >
            Try: SWX-29183 · SWX-10047 · SWX-38812
          </p>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: "60px 5%", maxWidth: 900, margin: "0 auto" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: 44,
                height: 44,
                border: `4px solid ${C.border}`,
                borderTopColor: C.accent,
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ color: C.muted }}>Searching for your shipment…</p>
          </div>
        )}

        {tracked === "notfound" && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>📦</div>
            <h3
              className="syne"
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: C.primary,
                marginBottom: 8,
              }}
            >
              No shipment found
            </h3>
            <p style={{ color: C.muted }}>
              We couldn't find a shipment with that tracking ID. Please
              double-check and try again.
            </p>
          </div>
        )}

        {tracked && tracked !== "notfound" && (
          <div className="animate-fadeUp">
            {/* Status bar */}
            <div
              className="card"
              style={{
                padding: "28px 32px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: `${statusColor(tracked.status)}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="package"
                    size={26}
                    color={statusColor(tracked.status)}
                  />
                </div>
                <div>
                  <p
                    className="syne"
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: C.primary,
                    }}
                  >
                    {tracked.id}
                  </p>
                  <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                    {tracked.type} · {tracked.weight}
                  </p>
                </div>
              </div>
              <span
                style={{
                  background: `${statusColor(tracked.status)}18`,
                  color: statusColor(tracked.status),
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  padding: "8px 20px",
                  borderRadius: 24,
                  border: `1.5px solid ${statusColor(tracked.status)}44`,
                }}
              >
                {tracked.status}
              </span>
            </div>

            {/* Progress */}
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span style={{ color: C.muted, fontSize: "0.8rem" }}>
                  {tracked.origin}
                </span>
                <span style={{ color: C.muted, fontSize: "0.8rem" }}>
                  {tracked.dest}
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 5,
                  background: C.border,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${tracked.progress}%`,
                    background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                    borderRadius: 5,
                    transition: "width 1s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <span
                  style={{
                    color: C.text,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                  }}
                >
                  ETA: <strong>{tracked.eta}</strong>
                </span>
                <span
                  style={{
                    color: C.accent,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  {tracked.progress}% Complete
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 24,
              }}
            >
              {[
                { label: "Sender", value: tracked.sender },
                { label: "Recipient", value: tracked.receiver },
                { label: "Origin", value: tracked.origin },
                { label: "Destination", value: tracked.dest },
              ].map((d, i) => (
                <div key={i} className="card" style={{ padding: "18px 24px" }}>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: "0.75rem",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {d.label}
                  </p>
                  <p
                    style={{
                      color: C.text,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  >
                    {d.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: "32px" }}>
              <h3
                className="syne"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: C.primary,
                  marginBottom: 28,
                }}
              >
                Shipment Timeline
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {tracked.events.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 20,
                      position: "relative",
                      paddingBottom: i < tracked.events.length - 1 ? 28 : 0,
                    }}
                  >
                    {/* Spine */}
                    {i < tracked.events.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 19,
                          top: 38,
                          bottom: 0,
                          width: 2,
                          background: ev.done ? `${C.accent}50` : C.border,
                        }}
                      />
                    )}
                    {/* Dot */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: ev.done
                          ? i === 0
                            ? C.accent
                            : `${C.accent}25`
                          : C.border,
                        border: ev.done
                          ? i === 0
                            ? `none`
                            : `2px solid ${C.accent}60`
                          : "2px solid #d1d5db",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      {ev.done ? (
                        <Icon
                          name="check"
                          size={14}
                          color={i === 0 ? "#fff" : C.accent}
                        />
                      ) : (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#d1d5db",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingTop: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 4,
                          marginBottom: 4,
                        }}
                      >
                        <p
                          className="syne"
                          style={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: ev.done ? C.text : C.muted,
                          }}
                        >
                          {ev.title}
                        </p>
                        <p style={{ color: C.muted, fontSize: "0.78rem" }}>
                          {ev.time}
                        </p>
                      </div>
                      <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                        {ev.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Default state */}
        {!tracked && !loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: `${C.primary}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Icon name="truck" size={44} color={`${C.primary}50`} />
            </div>
            <h3
              className="syne"
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: C.primary,
                marginBottom: 8,
              }}
            >
              Enter a Tracking ID Above
            </h3>
            <p style={{ color: C.muted }}>
              Your shipment details will appear here once you search.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

// ─── Footer ────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background: C.primaryDark, padding: "60px 5% 32px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: C.accent,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="truck" size={20} color="#fff" />
            </div>
            <span
              className="syne"
              style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}
            >
              Swift<span style={{ color: C.accent }}>Ex</span>
            </span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              maxWidth: 260,
            }}
          >
            Nigeria's most trusted courier service — fast, safe, and always on
            time.
          </p>
        </div>
        {[
          { heading: "Company", links: ["Home", "About", "Tracking"] },
          {
            heading: "Services",
            links: [
              "Same-Day Delivery",
              "Nationwide Shipping",
              "E-commerce",
              "Bulk Freight",
            ],
          },
          {
            heading: "Support",
            links: ["Help Centre", "Contact Us", "Terms", "Privacy"],
          },
        ].map((col, i) => (
          <div key={i}>
            <p
              className="syne"
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {col.heading}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l, j) => (
                <span
                  key={j}
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onClick={() =>
                    ["Home", "About", "Tracking"].includes(l) && setPage(l)
                  }
                  onMouseEnter={(e) => (e.target.style.color = C.accent)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
          © 2026 SwiftEx Logistics Ltd. All rights reserved.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
          Built with ❤️ in Nigeria
        </p>
      </div>
    </div>
  </footer>
);

// ─── App ───────────────────────────────────────────────────────
export default function Testing() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} />
      {page === "Home" && <HomePage setPage={setPage} />}
      {page === "About" && <AboutPage />}
      {page === "Tracking" && <TrackingPage />}
      <Footer setPage={setPage} />
    </>
  );
}
