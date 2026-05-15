"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck2,
  ChevronDown,
  Clock3,
  Instagram,
  MessageCircle,
  Moon,
  Phone,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "ar";

const heroImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2200&q=80",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80",
];

const instagramImages = [
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=900&q=80",
];

const instagramAccounts = [
  {
    label: "Dr. Nourah AlSulaili",
    handle: "drnoraalsulaili",
  },
  {
    label: "Dr. Majed Al Taqi",
    handle: "draltaqi",
  },
];

const copy = {
  en: {
    nav: ["Home", "Services", "Doctors", "Gallery", "Booking", "Contact"],
    heroTitle: "Advanced Dermatology & Aesthetic Care in Kuwait",
    heroText:
      "A luxury skin destination delivering evidence-based dermatology, refined aesthetics, and world-class patient comfort.",
    bookNow: "Book Premium Consultation",
    explore: "Explore Signature Services",
    floating: [
      "Skin Care",
      "Laser Treatment",
      "Botox & Fillers",
      "Hair Treatment",
      "Cosmetic Dermatology",
    ],
    aboutTitle: "A New Standard of Dermatology in Kuwait",
    aboutText:
      "At Al Taqi Poly Clinic, each consultation blends medical precision, aesthetic artistry, and concierge-level service. Our board-certified specialists use advanced diagnostic technologies and globally trusted protocols for visible, safe results.",
    counters: ["Happy Patients", "Years Experience", "Treatments Completed"],
    pathwayTitle: "Your Luxury Care Pathway",
    pathway: [
      "AI Skin Assessment & Medical Mapping",
      "Consultant Diagnosis & Personalized Plan",
      "Precision Treatment Session",
      "Smart Follow-up and Maintenance",
    ],
    servicesTitle: "Signature Services",
    doctorTitle: "Featured Specialist",
    beforeAfterTitle: "Before & After Result Studio",
    testimonialsTitle: "Patient Experience",
    bookingTitle: "Book Your Appointment",
    bookingSubtitle: "Fast scheduling with WhatsApp, call, or online consultation.",
    blogTitle: "Dermatology Insights",
    aiTitle: "AI Skin Analysis",
    aiText:
      "Upload a photo and receive a preliminary skin analysis score, hydration indicators, and recommended treatment direction before your visit.",
    membershipTitle: "Membership & Packages",
    faqTitle: "Frequently Asked Questions",
    instagramTitle: "Instagram Highlights",
    footerTag:
      "Luxury dermatology, advanced laser care, and premium aesthetic medicine in Kuwait.",
    offerTitle: "Exclusive May Offer",
    offerText: "20% off on skin rejuvenation packages this week.",
    close: "Close",
    online: "Online Consultation",
    callNow: "Call Now",
    whatsapp: "WhatsApp",
    submit: "Confirm Appointment",
  },
  ar: {
    nav: ["الرئيسية", "الخدمات", "الأطباء", "المعرض", "الحجز", "التواصل"],
    heroTitle: "جلدية متقدمة وعناية تجميلية راقية في الكويت",
    heroText:
      "وجهة فاخرة للعناية بالبشرة تجمع بين الطب المبني على الأدلة والتجميل الدقيق وتجربة مريض عالمية.",
    bookNow: "احجز استشارة مميزة",
    explore: "استعرض الخدمات المميزة",
    floating: ["العناية بالبشرة", "علاج الليزر", "البوتوكس والفيلر", "علاج الشعر", "الجلدية التجميلية"],
    aboutTitle: "معيار جديد لطب الجلدية في الكويت",
    aboutText:
      "في عيادة التقي، نجمع بين الدقة الطبية واللمسة الجمالية وتجربة رعاية فاخرة. يعمل أطباؤنا المعتمدون وفق أحدث التقنيات والبروتوكولات العالمية لنتائج آمنة وملموسة.",
    counters: ["مريض سعيد", "سنوات خبرة", "علاج مكتمل"],
    pathwayTitle: "رحلة رعاية فاخرة",
    pathway: [
      "تحليل ذكي للبشرة وتقييم طبي",
      "تشخيص استشاري وخطة مخصصة",
      "جلسة علاج دقيقة",
      "متابعة ذكية واستمرارية النتائج",
    ],
    servicesTitle: "الخدمات المميزة",
    doctorTitle: "الطبيب الاستشاري",
    beforeAfterTitle: "استوديو قبل وبعد",
    testimonialsTitle: "تجربة المرضى",
    bookingTitle: "احجز موعدك",
    bookingSubtitle: "جدولة سريعة عبر واتساب أو الاتصال أو الاستشارة الإلكترونية.",
    blogTitle: "مقالات جلدية",
    aiTitle: "تحليل البشرة بالذكاء الاصطناعي",
    aiText:
      "ارفع صورة للبشرة واحصل على تقييم مبدئي للمؤشرات الجلدية وتوصية علاجية قبل زيارتك.",
    membershipTitle: "العضويات والباقات",
    faqTitle: "الأسئلة الشائعة",
    instagramTitle: "أحدث منشورات إنستغرام",
    footerTag:
      "جلدية فاخرة، ليزر متقدم، وتجميل طبي راق في الكويت.",
    offerTitle: "عرض مايو الحصري",
    offerText: "خصم 20% على باقات تجديد البشرة هذا الأسبوع.",
    close: "إغلاق",
    online: "استشارة أونلاين",
    callNow: "اتصل الآن",
    whatsapp: "واتساب",
    submit: "تأكيد الموعد",
  },
} as const;

const services = [
  "Dermatology Consultation",
  "Laser Hair Removal",
  "Botox & Fillers",
  "HydraFacial",
  "Acne Treatment",
  "Skin Rejuvenation",
  "PRP Therapy",
  "Hair Loss Treatment",
  "Pigmentation Treatment",
  "Anti-aging Solutions",
];

const serviceImages = [
  "/services/dermatology-consultation.jpg",
  "/services/laser-hair-removal.png",
  "/services/botox-fillers.jpg",
  "/services/hydrafacial.webp",
  "/services/acne-treatment.jpg",
  "/services/skin-rejuvenation.jpg",
  "/services/prp-therapy.jpeg",
  "/services/hair-loss-treatment.jpg",
  "/services/pigmentation-treatment.jpg",
  "/services/anti-aging-solutions.webp",
];

const doctors = [
  {
    name: "Dr. Nourah AlSulaili",
    roleEn: "Dermatologist",
    roleAr: "طبيبة جلدية",
    bioEn: "Specialized dermatology clinic under the supervision of Dr. Noura Al-Salili. Precision medical treatment, advanced laser, and non-surgical cosmetic procedures. Your beauty is our responsibility.",
    bioAr: "عيادة جلدية متخصصة تحت إشراف الدكتورة نورة السليلي. علاج طبي دقيق، ليزر متقدم، وإجراءات تجميلية غير جراحية. جمالك مسؤوليتنا.",
    image: "/Dr_Nourah.png",
  },
  {
    name: "Dr. Majed Al Taqi, MD FRCS(C)",
    roleEn: "Aesthetic Plastic Surgeon",
    roleAr: "جراح التجميل والإصلاح",
    bioEn: "Consultant Plastic and Reconstructive Surgeon, Canadian Board Certified (FRCS(C)). Specialist in facial aesthetics, body contouring, and advanced reconstructive procedures with international expertise.",
    bioAr: "استشاري جراحة التجميل والإصلاح، معتمد من الكندية (FRCS(C)). متخصص في جماليات الوجه وتحديد الجسم والإجراءات الإصلاحية المتقدمة مع خبرة دولية.",
    image: "/Dr_Majed.jpg",
  },
];

const faqs = [
  {
    q: "Do you offer consultations in both Arabic and English?",
    a: "Yes. Our team supports both Arabic and English consultations for local and international patients.",
  },
  {
    q: "How soon can I get an appointment?",
    a: "Most premium consultations are available within 24-48 hours depending on doctor schedule.",
  },
  {
    q: "Are your laser and injectables FDA approved?",
    a: "We use internationally approved devices and protocols with strict safety standards.",
  },
  {
    q: "Can I book an online consultation first?",
    a: "Yes. Online consultation is available for initial evaluation and treatment planning.",
  },
];

const navAnchors = ["home", "services", "doctors", "gallery", "booking", "contact"];
const clinicLocation = "T tower, Sharhabil Bin Hasanah St, مقابل 30000, Kuwait";
const clinicCoordinates = "29.3245213,48.0118032";
const mapsDirectionsUrl = "https://maps.app.goo.gl/T4fYJDhiRpvdwsy99";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoading, setIsLoading] = useState(true);
  const [beforeAfter, setBeforeAfter] = useState(52);
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { stiffness: 380, damping: 34, mass: 0.25 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 380, damping: 34, mass: 0.25 });

  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const heroParallaxX = useSpring(heroX, { stiffness: 140, damping: 24 });
  const heroParallaxY = useSpring(heroY, { stiffness: 140, damping: 24 });
  const panelParallaxX = useTransform(heroParallaxX, (v) => -v * 0.55);
  const panelParallaxY = useTransform(heroParallaxY, (v) => -v * 0.55);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.24 });

  const t = copy[lang];
  const currentYear = new Date().getFullYear();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinicCoordinates)}&z=17&output=embed`;

  const clinicSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Al Taqi Poly Clinic",
      medicalSpecialty: "Dermatology",
      telephone: "+96522228899",
      areaServed: "Kuwait",
      availableLanguage: ["English", "Arabic"],
      address: {
        "@type": "PostalAddress",
        streetAddress: clinicLocation,
        addressLocality: "Kuwait City",
        addressCountry: "KW",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.3245213,
        longitude: 48.0118032,
      },
    }),
    []
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    }),
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Sarah M.",
        text:
          lang === "en"
            ? "The clinic is elegant and the doctor gave a very clear treatment roadmap. My pigmentation improved in 6 weeks."
            : "العيادة راقية والطبيبة قدمت خطة علاج واضحة جدا. تحسن التصبغ لدي خلال 6 أسابيع.",
      },
      {
        name: "Ahmad A.",
        text:
          lang === "en"
            ? "Best laser experience in Kuwait. Professional team, luxury environment, and visible results."
            : "أفضل تجربة ليزر في الكويت. فريق احترافي وبيئة فاخرة ونتائج واضحة.",
      },
      {
        name: "Noura K.",
        text:
          lang === "en"
            ? "The online consultation and follow-up reminders made everything easy. Highly recommended."
            : "الاستشارة الإلكترونية والمتابعة الذكية جعلت كل شيء سهلا. أنصح بها بشدة.",
      },
    ],
    [lang]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.setAttribute("data-theme", theme);
    root.style.scrollBehavior = "smooth";
  }, [lang, theme]);

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia("(pointer:fine)").matches) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX - 24);
      cursorY.set(event.clientY - 24);
      setCursorVisible(true);
    };

    const onLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  useEffect(() => {
    const heroTimer = shouldReduceMotion
      ? null
      : window.setInterval(() => {
          setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 3800);

    const reviewTimer = shouldReduceMotion
      ? null
      : window.setInterval(() => {
          setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 4300);

    return () => {
      if (heroTimer) {
        window.clearInterval(heroTimer);
      }
      if (reviewTimer) {
        window.clearInterval(reviewTimer);
      }
    };
  }, [testimonials.length, shouldReduceMotion]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <motion.div
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-[#f2dcae] via-[#d6b275] to-[#9f7642]"
        style={{ scaleX: progressScale }}
      />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-[#111113]"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-center text-[#efddbc]"
            >
              <Image src="/logo-mark.svg" alt="Brand mark" width={72} height={72} className="mx-auto rounded-2xl border border-white/20" priority />
              <p className="mt-4 text-[0.72rem] uppercase tracking-[0.3em]">Al Taqi Poly Clinic</p>
              <div className="mt-5 h-[2px] w-52 overflow-hidden rounded bg-white/15">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e8d2a3] via-[#c9a468] to-[#e8d2a3]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.15, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[85] hidden h-12 w-12 rounded-full border border-[#dec18d]/65 bg-[#f0d9a7]/15 md:block ${cursorVisible && !shouldReduceMotion ? "opacity-100" : "opacity-0"}`}
        style={{ x: smoothCursorX, y: smoothCursorY }}
      />

      <div className="spotlight spotlight-a" />
      <div className="spotlight spotlight-b" />

      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 flex w-[94%] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-black/25 px-4 py-3 text-white backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border border-white/30 bg-black/30">
              <Image src="/logo-mark.svg" alt="Al Taqi Poly Clinic" width={38} height={38} className="rounded-lg" priority />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <p className="font-medium text-[0.95rem] tracking-wide">Al Taqi Poly Clinic</p>
              <p className="mt-[2px] text-[0.7rem] uppercase tracking-[0.26em] text-white/75">Luxury Dermatology</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-white/85 lg:flex">
            {t.nav.map((item, idx) => (
              <a key={item} href={`#${navAnchors[idx]}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="rounded-xl border border-white/25 bg-white/10 p-2 text-white"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setLang((prev) => (prev === "en" ? "ar" : "en"))}
              className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold tracking-[0.18em] text-white"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>
          </div>
        </div>
      </nav>

      <header
        className="relative min-h-screen overflow-hidden pt-30"
        id="home"
        onMouseMove={(event) => {
          if (shouldReduceMotion) {
            return;
          }
          const bounds = event.currentTarget.getBoundingClientRect();
          const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
          const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
          heroX.set(nx * 24);
          heroY.set(ny * 24);
        }}
        onMouseLeave={() => {
          heroX.set(0);
          heroY.set(0);
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImages[heroIndex]}
        >
          <source src="https://cdn.coverr.co/videos/coverr-woman-in-a-spa-6126/1080p.mp4" type="video/mp4" />
        </video>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImages[heroIndex]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image src={heroImages[heroIndex]} alt="Dermatology luxury clinic" fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-[#2f1f10]/45" />
        <div className="mesh-overlay" />

        <div className="relative mx-auto grid min-h-screen w-[92%] max-w-7xl items-center gap-8 py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-white"
            style={{ x: heroParallaxX, y: heroParallaxY }}
          >
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[0.72rem] uppercase tracking-[0.2em]">Kuwait Premium Skin Institute</p>
            <h1 className="cinematic-title max-w-4xl text-5xl font-semibold sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
            <p className="max-w-2xl text-base text-white/85 sm:text-lg">{t.heroText}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#booking" className="gold-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition">
                {t.bookNow}
                <ArrowUpRight size={16} />
              </a>
              <a href="#services" className="outline-btn inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                {t.explore}
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-5 text-white"
            style={{ x: panelParallaxX, y: panelParallaxY }}
          >
            <h2 className="mb-4 text-2xl">Signature Focus Areas</h2>
            <div className="space-y-3">
              {t.floating.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="floating-particle left-[8%] top-[22%]" />
        <div className="floating-particle left-[88%] top-[28%]" style={{ animationDelay: "1s" }} />
        <div className="floating-particle left-[74%] top-[82%]" style={{ animationDelay: "2.1s" }} />
      </header>

      <main id="main-content" className="mx-auto w-[92%] max-w-7xl flex-1 space-y-10 py-12 md:py-16">
        <section className="grid gap-6 lg:grid-cols-2 lg:items-center" id="about">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">About Clinic</p>
            <h2 className="text-4xl md:text-5xl">{t.aboutTitle}</h2>
            <p className="max-w-xl text-[var(--muted)]">{t.aboutText}</p>
            <div className="grid grid-cols-3 gap-3">
              {["48k+", "17+", "220k+"].map((value, idx) => (
                <motion.div key={value} whileHover={{ y: -3 }} className="glass rounded-2xl p-3 text-center">
                  <p className="text-2xl font-semibold text-[var(--gold)]">{value}</p>
                  <p className="text-xs text-[var(--muted)]">{t.counters[idx]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="grid h-[420px] grid-cols-2 gap-3 sm:h-[500px] lg:h-[540px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1300&q=80"
                alt="Luxury clinic interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                  alt="Doctor certification"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 24vw, 14vw"
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=80"
                  alt="Clinic environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 24vw, 14vw"
                />
              </div>
            </div>
          </motion.div>
        </section>

        <section className="glass section-gradient rounded-3xl p-6" id="pathway">
          <h3 className="mb-5 text-3xl">{t.pathwayTitle}</h3>
          <div className="grid gap-3 md:grid-cols-4">
            {t.pathway.map((step, i) => (
              <motion.article key={step} whileHover={{ rotateX: 2, rotateY: -2, y: -4 }} className="luxury-border rounded-2xl p-4">
                <p className="mb-2 text-sm text-[var(--gold)]">0{i + 1}</p>
                <p className="text-sm leading-6">{step}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services">
          <h2 className="mb-6 text-4xl">{t.servicesTitle}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service, i) => (
              <motion.article
                key={service}
                whileHover={{ y: -5, rotateX: 2 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="glass interactive-card group rounded-2xl p-4"
              >
                <Sparkles className="mb-3 text-[var(--gold)]" size={20} />
                <h3 className="text-lg">{service}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {lang === "en" ? "Advanced protocol with measurable outcomes." : "بروتوكول متقدم بنتائج واضحة وقابلة للقياس."}
                </p>
                <div className="mt-4 h-28 overflow-hidden rounded-xl">
                  <Image
                    src={serviceImages[i]}
                    alt={service}
                    width={400}
                    height={260}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="doctors">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{t.doctorTitle}</p>
            <h2 className="mt-2 text-4xl">{lang === "en" ? "Our Specialists" : "فريق الأطباء"}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <motion.article key={doctor.name} whileHover={{ y: -4 }} className="glass luxury-border overflow-hidden rounded-3xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f3eadc]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-5 text-[var(--text)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{lang === "en" ? doctor.roleEn : doctor.roleAr}</p>
                  <h3 className="mt-2 text-2xl">{doctor.name}</h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">{lang === "en" ? doctor.bioEn : doctor.bioAr}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                    <li className="flex items-center gap-2"><ShieldCheck size={16} /> {lang === "en" ? "Board Certified" : "معتمدة دوليا"}</li>
                    <li className="flex items-center gap-2"><Sparkles size={16} /> {lang === "en" ? "Aesthetic Expertise" : "خبرة تجميلية متقدمة"}</li>
                    <li className="flex items-center gap-2"><CalendarCheck2 size={16} /> {lang === "en" ? "Extensive Clinical Experience" : "خبرة سريرية واسعة"}</li>
                  </ul>
                </div>
              </motion.article>
            ))}
            <aside className="glass luxury-border flex flex-col justify-between rounded-3xl p-6 text-[var(--text)]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Clinic Focus</p>
                <h3 className="mt-2 text-3xl">Two specialists, one care pathway</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Dr. Nourah leads precision dermatology, laser, and non-surgical cosmetic care, while Dr. Majed handles advanced plastic and reconstructive procedures. Together they cover the full treatment journey under one roof.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                    Precision medical dermatology with advanced laser support
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                    Non-surgical cosmetic procedures and skin refinement
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                    Canadian board-certified plastic and reconstructive surgery
                  </li>
                </ul>
              </div>
              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/25 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">Patient Promise</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Your beauty is our responsibility. We build personalized plans that balance safety, elegance, and long-term results.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="gallery" className="glass rounded-3xl p-6">
          <h2 className="mb-5 text-4xl">{t.beforeAfterTitle}</h2>
          <div className="relative overflow-hidden rounded-2xl">
            <Image src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=80" alt="Before treatment" width={1800} height={900} className="h-[420px] w-full object-cover" />
            <div className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${beforeAfter}%` }}>
              <Image src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1800&q=80" alt="After treatment" width={1800} height={900} className="h-[420px] w-full object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `calc(${beforeAfter}% - 1px)` }}>
              <div className="h-full w-[2px] bg-white/90" />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={beforeAfter}
              onChange={(e) => setBeforeAfter(Number(e.target.value))}
              className="absolute bottom-4 left-1/2 w-[70%] -translate-x-1/2"
              aria-label="Before after slider"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-5">
            {galleryImages.map((image) => (
              <Image key={image} src={image} alt="Aesthetic result" width={320} height={220} className="h-24 w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" id="testimonials">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-4xl">{t.testimonialsTitle}</h2>
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonials[testimonialIndex].name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-4 rounded-2xl border border-[var(--line)] bg-white/30 p-4"
              >
                <p className="text-[var(--muted)]">{testimonials[testimonialIndex].text}</p>
                <p className="mt-3 font-semibold">{testimonials[testimonialIndex].name}</p>
                <p className="text-sm text-[var(--gold)]">Google Verified Review</p>
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="text-2xl">Video Testimonials</h3>
            <video controls className="mt-4 h-[230px] w-full rounded-2xl object-cover" poster={galleryImages[0]}>
              <source src="https://cdn.coverr.co/videos/coverr-a-woman-smiles-while-getting-a-facial-treatment-1646/1080p.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.95fr]" id="booking">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-4xl">{t.bookingTitle}</h2>
            <p className="mt-2 text-[var(--muted)]">{t.bookingSubtitle}</p>
            <form className="mt-5 grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border border-[var(--line)] bg-white/50 p-3" placeholder={lang === "en" ? "Full Name" : "الاسم الكامل"} />
              <input className="rounded-xl border border-[var(--line)] bg-white/50 p-3" placeholder={lang === "en" ? "Phone Number" : "رقم الهاتف"} />
              <input type="date" className="rounded-xl border border-[var(--line)] bg-white/50 p-3" />
              <select className="rounded-xl border border-[var(--line)] bg-white/50 p-3">
                <option>{lang === "en" ? "Preferred Time" : "الوقت المفضل"}</option>
                <option>10:00 AM</option>
                <option>12:30 PM</option>
                <option>6:00 PM</option>
              </select>
              <textarea className="rounded-xl border border-[var(--line)] bg-white/50 p-3 sm:col-span-2" rows={4} placeholder={lang === "en" ? "Share your concern" : "اكتب ملاحظاتك"} />
              <button className="gold-btn rounded-xl px-4 py-3 text-sm font-semibold sm:col-span-2">{t.submit}</button>
            </form>
          </div>

          <div className="space-y-3">
            <a href="https://wa.me/96522228899" className="glass flex items-center justify-between rounded-2xl p-4">
              <span className="flex items-center gap-2"><MessageCircle size={18} /> {t.whatsapp}</span>
              <ArrowUpRight size={16} />
            </a>
            <a href="tel:+96522228899" className="glass flex items-center justify-between rounded-2xl p-4">
              <span className="flex items-center gap-2"><Phone size={18} /> {t.callNow}</span>
              <ArrowUpRight size={16} />
            </a>
            <a href="#" className="glass flex items-center justify-between rounded-2xl p-4">
              <span className="flex items-center gap-2"><Clock3 size={18} /> {t.online}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" id="ai">
          <div className="glass rounded-3xl p-6">
            <div className="mb-3 inline-flex rounded-full bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">AI</div>
            <h2 className="text-4xl">{t.aiTitle}</h2>
            <p className="mt-3 text-[var(--muted)]">{t.aiText}</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/35 p-3">
              <ScanFace className="text-[var(--gold)]" />
              <div>
                <p className="font-semibold">Skin Hydration Index: 78%</p>
                <p className="text-sm text-[var(--muted)]">Suggested: HydraFacial + Pigmentation Protocol</p>
              </div>
            </div>
          </div>
          <Image src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1500&q=80" alt="AI skin analysis" width={1200} height={760} className="h-full rounded-3xl object-cover" />
        </section>

        <section id="membership" className="glass rounded-3xl p-6">
          <h2 className="mb-5 text-4xl">{t.membershipTitle}</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { name: "Elite Glow", price: "KD 190 / month" },
              { name: "Laser Platinum", price: "KD 280 / month" },
              { name: "Royal Rejuvenation", price: "KD 420 / month" },
            ].map((pkg) => (
              <motion.div key={pkg.name} whileHover={{ y: -4 }} className="luxury-border interactive-card rounded-2xl p-4">
                <h3 className="text-2xl">{pkg.name}</h3>
                <p className="mt-1 text-[var(--gold)]">{pkg.price}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">Includes priority booking, monthly treatment sessions, skin analytics, and concierge support.</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="blog">
          <h2 className="mb-5 text-4xl">{t.blogTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "How Kuwait Climate Affects Skin Barrier Health",
              "What to Expect from Medical-Grade Laser Programs",
              "Botox and Fillers: Safety, Timing, and Best Outcomes",
            ].map((title, idx) => (
              <article key={title} className="glass rounded-2xl overflow-hidden">
                <Image src={galleryImages[idx]} alt={title} width={600} height={360} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">SEO optimized educational content for informed skincare decisions.</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="glass rounded-3xl p-6">
          <h2 className="mb-4 text-4xl">{t.faqTitle}</h2>
          <div className="space-y-2">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="rounded-xl border border-[var(--line)] bg-white/30 px-4 py-3">
                  <button className="flex w-full items-center justify-between text-left" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                    <span className="font-medium">{item.q}</span>
                    <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={18} />
                  </button>
                  <AnimatePresence>
                    {isOpen ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-3 text-sm text-[var(--muted)]"
                      >
                        {item.a}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        <section id="instagram">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/45 text-[var(--text)] shadow-sm">
                  <Instagram size={20} />
                </span>
                <h2 className="text-4xl">{t.instagramTitle}</h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
                Connect with the doctors on Instagram for updates, behind-the-scenes content, and treatment highlights.
              </p>
              <div className="mt-4 inline-flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white/45 px-4 py-3 text-sm text-[var(--muted)] shadow-sm">
                <MessageCircle className="mt-0.5 shrink-0 text-[var(--gold)]" size={18} />
                <div>
                  <p className="font-medium text-[var(--text)]">A personal note from our team</p>
                  <p className="mt-1 leading-6">
                    Dr. Nourah and Dr. Majed welcome you to follow along, send a DM, or reach out with your skin goals. We love turning questions into a clear care plan.
                  </p>
                  <p className="mt-3 font-serif text-base italic text-[var(--text)]">
                    "Your beauty is our responsibility."
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--gold)]">
                    Dr. Nourah AlSulaili & Dr. Majed Al Taqi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {instagramAccounts.map((account) => (
                <a
                  key={account.handle}
                  href={`https://instagram.com/${account.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] bg-white/40 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white/70"
                >
                  <span className="inline-flex items-center gap-2">
                    <Instagram size={15} />
                    @{account.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {instagramImages.map((image) => (
              <Image key={image} src={image} alt="Instagram skincare post" width={420} height={420} className="h-56 w-full rounded-2xl object-cover" />
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="mt-8 bg-[#0f0f13] py-10 text-[#eee5db]">
        <div className="mx-auto grid w-[92%] max-w-7xl gap-5 md:grid-cols-4">
          <div>
            <h3 className="text-2xl">Al Taqi Poly Clinic</h3>
            <p className="mt-2 text-sm text-[#cbbba9]">{t.footerTag}</p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-[#ccb183]">Contact</h4>
            <p className="mt-2 text-sm">+965 2222 8899</p>
            <p className="text-sm">info@altaqipolyclinic.com</p>
            <p className="mt-2 text-sm text-[#cbbba9]">{clinicLocation}</p>
            <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-[#e6c996] underline underline-offset-4">
              {lang === "en" ? "Get Directions" : "عرض الاتجاهات"}
            </a>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-[#ccb183]">Hours</h4>
            <p className="mt-2 text-sm">Sat - Thu: 9:00 AM - 9:00 PM</p>
            <p className="text-sm">Friday: Closed</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Kuwait clinic map"
              src={mapSrc}
              loading="lazy"
              className="h-40 w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mx-auto mt-8 w-[92%] max-w-7xl border-t border-white/10 pt-4 text-xs text-[#cbbba9]">
          <p>© {currentYear} Al Taqi Poly Clinic. All rights reserved.</p>
        </div>
      </footer>

      <a
        href="https://wa.me/96522228899"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-2xl"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>

    </div>
  );
}
