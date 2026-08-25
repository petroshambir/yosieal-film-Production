


import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProtectedImage from "../components/ProtectedImage";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_DESCRIPTIONS = [
  "01. The Beginning of Forever — Our First Look",
  "02. A Tender Moment Caught in Time",
  "03. Walking Hand in Hand Towards Tomorrow",
  "04. Joy and Laughter Shared with Loved Ones",
  "05. The Grand Celebration and Vows",
  "06. Unforgettable Emotions of the Day",
  "07. Elegance in Every Single Detail",
  "08. Dancing Under the Evening Lights",
  "09. Sweet Whispers and Quiet Glances",
  "10. Cherished Memories to Last a Lifetime",
  "11. A Magical Evening Full of Grace",
  "12. Smiles That Brighten the Whole World",
  "13. Embracing the Warmth of Family",
  "14. Looking Into Each Other's Eyes",
  "15. The Perfect Ending to a Perfect Day",
];

const DEFAULT_HEADINGS = [
  "The Story Begins",
  "Tender Highlight",
  "Walking Together",
  "Shared Laughter",
  "Featured Memory",
  "Pure Emotion",
  "Elegant Detail",
  "Evening Magic",
  "Quiet Glance",
  "Cherished Moment",
  "Graceful Evening",
  "Bright Smile",
  "Family Warmth",
  "Deep Connection",
  "Grand Finale",
];

/* =========================================================
   HELPERS
========================================================= */

const generateSlug = (titleText) => {
  if (!titleText) return "";

  return titleText
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/&/g, "and")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const fixImageUrl = (url) => {
  if (!url) return "";

  return url
    .replace(
      "http://localhost:5000",
      "https://yosieal-film-production-server.onrender.com"
    )
    .replace(
      "http://localhost:4000",
      "https://yosieal-film-production-server.onrender.com"
    );
};

/* =========================================================
   IMAGE FRAME
========================================================= */

function ImageFrame({
  src,
  alt = "",
  className = "",
  children,
}) {
  if (!src) return null;

  return (
    <div
      className={`
        relative flex h-full w-full items-center justify-center
        overflow-hidden bg-[#0b0b0b]
        ${className}
      `}
    >
      <ProtectedImage
        src={src}
        alt={alt}
        className="
          block
          h-auto
          w-auto
          max-h-full
          max-w-full
          object-contain
          object-center
        "
        showLogoOnly={true}
      />

      <div className="pointer-events-none absolute inset-3 border border-white/[0.12] sm:inset-4" />

      {children}
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const [featured, setFeatured] = useState(0);

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const response = await fetch(
          "https://yosieal-film-production-server.onrender.com/api/projects"
        );

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Projects response is not an array");
        }

        const processedData = data.map((section) => {
          let parsedDescriptions = [];
          let parsedHeadings = [];

          let mainDesc =
            section.desc ||
            section.description ||
            "";

          if (
            typeof section.description === "string" &&
            section.description.includes("||DESCS||")
          ) {
            const parts = section.description.split("||DESCS||");

            mainDesc = parts[0] || "";

            try {
              parsedDescriptions = parts[1]
                ? JSON.parse(parts[1])
                : [];
            } catch {
              parsedDescriptions = [];
            }

            try {
              parsedHeadings = parts[2]
                ? JSON.parse(parts[2])
                : [];
            } catch {
              parsedHeadings = [];
            }
          }

          const fixedImages = Array.isArray(section.images)
            ? section.images
                .map(fixImageUrl)
                .filter(Boolean)
            : [];

          return {
            ...section,
            images: fixedImages,
            desc: mainDesc,
            descriptions: parsedDescriptions,
            headings: parsedHeadings,
          };
        });

        if (mounted) {
          setSections(processedData);
        }
      } catch (error) {
        console.error("Projects loading error:", error);

        if (mounted) {
          setSections([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     ALL IMAGES
  ======================================================= */

  const allImages = useMemo(() => {
    return sections.flatMap((section) =>
      Array.isArray(section.images)
        ? section.images
        : []
    );
  }, [sections]);

  /* =======================================================
     FEATURED IMAGE
  ======================================================= */

  useEffect(() => {
    if (!allImages.length) {
      setFeatured(0);
      return;
    }

    setFeatured((current) =>
      current >= allImages.length ? 0 : current
    );
  }, [allImages.length]);

  const featuredImage =
    allImages[featured] || allImages[0];

  const nextFeatured = () => {
    if (!allImages.length) return;

    setFeatured(
      (current) =>
        (current + 1) % allImages.length
    );
  };

  const previousFeatured = () => {
    if (!allImages.length) return;

    setFeatured(
      (current) =>
        (current - 1 + allImages.length) %
        allImages.length
    );
  };

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const openGallery = (images) => {
    if (!Array.isArray(images) || !images.length) {
      return;
    }

    const slides = images
      .filter(Boolean)
      .map((src) => ({ src }));

    if (!slides.length) return;

    setCurrentImages(slides);
    setOpen(true);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

      {/* HERO */}

      <Hero />

      {/* =====================================================
          CINEMATIC FEATURE
      ===================================================== */}

      {featuredImage && (
        <section className="relative border-b border-white/[0.08] bg-[#080808]">

          <div className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-6 sm:py-5 lg:px-10">

            <div
              className="
                relative
                overflow-hidden
                border border-white/[0.08]
                bg-[#0b0b0b]
                lg:grid
                lg:min-h-[720px]
                lg:grid-cols-[1fr_390px]
              "
            >

              {/* =================================================
                  IMAGE SIDE
              ================================================= */}

              <div
                className="
                  relative
                  order-1
                  flex
                  min-h-[360px]
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#090909]
                  sm:min-h-[500px]
                  lg:min-h-[720px]
                "
              >

                <ProtectedImage
                  src={featuredImage}
                  alt="Featured film production"
                  className="
                    block
                    h-auto
                    w-auto
                    max-h-full
                    max-w-full
                    object-contain
                    object-center
                  "
                  showLogoOnly={true}
                />

                {/* IMAGE OVERLAYS */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/35" />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <div className="pointer-events-none absolute inset-3 border border-white/[0.12] sm:inset-6 lg:inset-9" />

                {/* IMAGE NUMBER */}

                <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-8 lg:left-10 lg:top-10">
                  <span className="font-serif text-4xl font-light text-white/20 sm:text-6xl lg:text-7xl">
                    {String(featured + 1).padStart(2, "0")}
                  </span>
                </div>

              </div>

              {/* =================================================
                  MOBILE CONTROLS

                  These are BELOW the IMAGE on mobile.
                  On desktop they remain in the TEXT SIDE.
              ================================================= */}

              <div
                className="
                  order-2
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.08]
                  bg-[#090909]
                  px-5
                  py-4
                  lg:hidden
                "
              >

                <span className="text-[8px] tracking-[0.3em] text-white/30">
                  FRAME {String(featured + 1).padStart(2, "0")} /{" "}
                  {String(allImages.length).padStart(2, "0")}
                </span>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={previousFeatured}
                    aria-label="Previous image"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      border
                      border-white/20
                      text-lg
                      text-white/70
                      transition
                      hover:border-[#d6b36a]
                      hover:bg-[#d6b36a]
                      hover:text-black
                    "
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={nextFeatured}
                    aria-label="Next image"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      border
                      border-white/20
                      text-lg
                      text-white/70
                      transition
                      hover:border-[#d6b36a]
                      hover:bg-[#d6b36a]
                      hover:text-black
                    "
                  >
                    →
                  </button>

                </div>

              </div>

              {/* =================================================
                  TEXT SIDE

                  MOBILE:
                  BELOW IMAGE + MOBILE CONTROLS

                  DESKTOP:
                  RIGHT SIDE
              ================================================= */}

              <div
                className="
                  order-3
                  relative
                  flex
                  min-h-[420px]
                  flex-col
                  justify-between
                  border-t
                  border-white/[0.08]
                  bg-[#0a0a0a]
                  p-6
                  sm:p-10
                  lg:order-2
                  lg:min-h-[720px]
                  lg:border-l
                  lg:border-t-0
                  lg:p-12
                "
              >

                <div>

                  {/* BRAND */}

                  <div className="mb-10 flex items-center gap-3 sm:mb-12">

                    <span className="h-px w-8 bg-[#d6b36a] sm:w-10" />

                    <span className="text-[8px] tracking-[0.3em] text-[#d6b36a] sm:text-[9px]">
                      YOSIEAL FILM PRODUCTION
                    </span>

                  </div>

                  {/* CATEGORY */}

                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/35 sm:text-[9px] sm:tracking-[0.35em]">
                    Wedding • Events • Cinematic
                  </p>

                  {/* MAIN TITLE */}

                  <h1
                    className="
                      mt-5
                      font-serif
                      text-[42px]
                      font-light
                      leading-[0.95]
                      sm:text-6xl
                      lg:text-7xl
                    "
                  >
                    Stories

                    <span className="block italic text-[#d6b36a]">
                      Worth
                    </span>

                    Remembering.
                  </h1>

                  <div className="mt-7 h-px w-16 bg-[#d6b36a]/60 sm:mt-8 sm:w-20" />

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
                    We transform real emotions,
                    beautiful celebrations and
                    unforgettable moments into
                    cinematic visual stories.
                  </p>

                  {/* MOBILE VIEW GALLERY */}

                  <button
                    type="button"
                    onClick={() => openGallery(allImages)}
                    className="
                      mt-8
                      border
                      border-white/20
                      bg-black/20
                      px-4
                      py-3
                      text-[8px]
                      tracking-[0.25em]
                      text-white/70
                      backdrop-blur-md
                      transition
                      hover:border-[#d6b36a]
                      hover:bg-[#d6b36a]
                      hover:text-black
                      lg:hidden
                    "
                  >
                    VIEW GALLERY
                    <span className="ml-2 text-base">
                      ↗
                    </span>
                  </button>

                </div>

                {/* =================================================
                    DESKTOP CONTROLS
                ================================================= */}

                <div className="mt-12">

                  <div className="mb-5 flex items-end justify-between">

                    <div>

                      <span className="text-[8px] tracking-[0.3em] text-white/30">
                        CURRENT FRAME
                      </span>

                      <div className="mt-1 font-serif text-2xl text-[#d6b36a]">

                        {String(featured + 1).padStart(2, "0")}

                        <span className="mx-2 text-white/20">
                          /
                        </span>

                        <span className="text-sm text-white/40">
                          {String(allImages.length).padStart(2, "0")}
                        </span>

                      </div>

                    </div>

                    {/* DESKTOP ARROWS */}

                    <div className="hidden gap-2 lg:flex">

                      <button
                        type="button"
                        onClick={previousFeatured}
                        aria-label="Previous image"
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border
                          border-white/20
                          text-lg
                          text-white/70
                          transition
                          hover:border-[#d6b36a]
                          hover:bg-[#d6b36a]
                          hover:text-black
                        "
                      >
                        ←
                      </button>

                      <button
                        type="button"
                        onClick={nextFeatured}
                        aria-label="Next image"
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border
                          border-white/20
                          text-lg
                          text-white/70
                          transition
                          hover:border-[#d6b36a]
                          hover:bg-[#d6b36a]
                          hover:text-black
                        "
                      >
                        →
                      </button>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="h-px w-full bg-white/10">

                    <span
                      className="block h-px bg-[#d6b36a] transition-all duration-500"
                      style={{
                        width: `${
                          allImages.length
                            ? ((featured + 1) /
                                allImages.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">

          <div className="flex items-start gap-3">

            <span className="mt-2 h-px w-12 bg-[#d6b36a]" />

            <div>

              <p className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
                OUR PHILOSOPHY
              </p>

              <p className="mt-3 text-[9px] leading-5 tracking-[0.15em] text-white/25">
                EMOTION
                <br />
                LIGHT
                <br />
                STORY
              </p>

            </div>

          </div>

          <div className="max-w-5xl">

            <h2 className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-7xl">

              We don't just

              <span className="italic text-[#d6b36a]">
                {" "}capture
              </span>

              <br />

              moments.

            </h2>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              We preserve the feeling behind them.
              Every wedding, celebration and special
              occasion becomes a visual story crafted
              with cinematic composition, natural
              emotion and timeless detail.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-5 pb-28 sm:px-8 lg:px-12">

        <div className="mb-20 flex flex-col justify-between gap-8 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">

          <div>

            <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
              SELECTED WORK
            </span>

            <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
              Our Stories
            </h2>

          </div>

          <p className="max-w-xs text-xs leading-6 text-white/35">
            A collection of moments,
            celebrations and stories
            captured by Yosieal.
          </p>

        </div>

        {loading ? (

          <div className="flex min-h-[350px] items-center justify-center">

            <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] text-white/40">

              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

              PREPARING THE STORIES...

            </div>

          </div>

        ) : sections.length === 0 ? (

          <div className="flex min-h-[350px] items-center justify-center border border-white/[0.08]">

            <span className="text-[9px] tracking-[0.3em] text-white/30">
              NO STORIES AVAILABLE
            </span>

          </div>

        ) : (

          <div className="space-y-32">

            {sections.map((section, index) => {

              const titleLower =
                section.title
                  ? section.title.toLowerCase()
                  : "";

              const isWedding =
                titleLower.includes("wedding");

              const isBridal =
                titleLower.includes("bridal");

              const isBaby =
                titleLower.includes("baby") ||
                titleLower.includes("baptism");

              const headings =
                section.headings?.length
                  ? section.headings
                  : DEFAULT_HEADINGS;

              const descriptions =
                section.descriptions?.length
                  ? section.descriptions
                  : DEFAULT_DESCRIPTIONS;

              const displayHeading =
                section.names?.trim() ||
                section.title ||
                "Untitled Project";

              return (

                <article
                  key={section._id || `project-${index}`}
                  className="relative"
                >

                  <div className="mb-12 grid gap-7 border-b border-white/[0.08] pb-8 lg:grid-cols-[90px_1fr_auto] lg:items-end">

                    <div className="flex items-center gap-3">

                      <span className="font-serif text-3xl font-light text-[#d6b36a]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="hidden h-px w-8 bg-white/20 sm:block" />

                    </div>

                    <div>

                      <span className="text-[8px] tracking-[0.3em] text-white/30">
                        EVENT STORY
                        {" / "}
                        {section.date || "FEATURED PROJECT"}
                      </span>

                      <h3 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
                        {displayHeading}
                      </h3>

                      {section.desc && (

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                          {section.desc}
                        </p>

                      )}

                    </div>

                    <span className="hidden text-[8px] tracking-[0.3em] text-white/20 lg:block">
                      YOSIEAL / FILM
                    </span>

                  </div>

                  {isWedding && (
                    <WeddingSection
                      section={section}
                      headings={headings}
                      descriptions={descriptions}
                      openGallery={openGallery}
                    />
                  )}

                  {!isWedding && isBridal && (
                    <BridalSection
                      section={section}
                      headings={headings}
                      descriptions={descriptions}
                      openGallery={openGallery}
                    />
                  )}

                  {!isWedding &&
                    !isBridal &&
                    isBaby && (
                      <BabySection
                        section={section}
                        headings={headings}
                        descriptions={descriptions}
                        openGallery={openGallery}
                      />
                    )}

                  {!isWedding &&
                    !isBridal &&
                    !isBaby && (
                      <DefaultSection
                        section={section}
                        openGallery={openGallery}
                      />
                    )}

                </article>

              );
            })}

          </div>

        )}

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="border-y border-white/[0.08] bg-[#0a0a0a]">

        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-28">

          <div>

            <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
              YOUR STORY STARTS HERE
            </span>

            <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">

              Let's create something

              <span className="italic text-[#d6b36a]">
                {" "}unforgettable.
              </span>

            </h2>

          </div>

          <Link
            to="/contact"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-6
              border
              border-[#d6b36a]/60
              px-7
              py-4
              text-[9px]
              tracking-[0.3em]
              text-[#d6b36a]
              transition
              hover:bg-[#d6b36a]
              hover:text-black
            "
          >
            GET IN TOUCH

            <span className="text-base transition group-hover:translate-x-2">
              →
            </span>

          </Link>

        </div>

      </section>

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={currentImages}
      />

      <Footer />

    </main>
  );
}

/* =========================================================
   WEDDING
========================================================= */

function WeddingSection({
  section,
  headings,
  descriptions,
  openGallery,
}) {
  const images = Array.isArray(section.images)
    ? section.images
    : [];

  if (!images.length) return null;

  return (

    <div className="space-y-24">

      {/* FIRST IMAGE */}

      {images[0] && (

        <div className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr]">

          <div className="order-2 lg:order-1">

            <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
              01 / THE BEGINNING
            </span>

            <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl lg:text-5xl">
              {headings[0] || "The Story Begins"}
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/40">
              {descriptions[0] ||
                DEFAULT_DESCRIPTIONS[0]}
            </p>

            <button
              type="button"
              onClick={() => openGallery(images)}
              className="
                mt-8
                border-b
                border-[#d6b36a]/50
                pb-2
                text-[9px]
                tracking-[0.25em]
                text-[#d6b36a]
                transition
                hover:border-[#d6b36a]
                hover:text-white
              "
            >
              OPEN STORY →
            </button>

          </div>

          <CinematicImage
            src={images[0]}
            alt={section.title}
            onClick={() => openGallery(images)}
            className="order-1 min-h-[400px] lg:order-2"
          />

        </div>

      )}

      {/* IMAGE GRID */}

      {images.length > 1 && (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {images.slice(1, 5).map((img, i) => (

            <div
              key={`wedding-grid-${i}`}
              className="group"
            >

              <CinematicImage
                src={img}
                alt={section.title}
                onClick={() => openGallery(images)}
                className="min-h-[360px]"
              />

              <div className="mt-4">

                <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
                  FRAME {String(i + 2).padStart(2, "0")}
                </span>

                <p className="mt-2 text-sm text-white/60">
                  {headings[i + 1] ||
                    DEFAULT_HEADINGS[i + 1]}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* FEATURED MEMORY */}

      {images[5] && (

        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">

          <CinematicImage
            src={images[5]}
            alt={section.title}
            onClick={() => openGallery(images)}
            className="min-h-[450px]"
          />

          <div>

            <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
              06 / FEATURED MEMORY
            </span>

            <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
              {headings[5] ||
                DEFAULT_HEADINGS[5]}
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/40">
              {descriptions[5] ||
                DEFAULT_DESCRIPTIONS[5]}
            </p>

          </div>

        </div>

      )}

      {/* CHAPTERS */}

      {images.length > 6 && (

        <div className="space-y-20">

          {images.slice(6, 10).map((img, i) => {

            const imageIndex = i + 6;

            return (

              <div
                key={`chapter-${imageIndex}`}
                className={`
                  grid
                  items-center
                  gap-10
                  lg:grid-cols-3
                  ${i % 2 === 1
                    ? "lg:[&>div:first-child]:order-2"
                    : ""}
                `}
              >

                <div>

                  <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
                    CHAPTER{" "}
                    {String(imageIndex + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 font-serif text-3xl font-light">
                    {headings[imageIndex] ||
                      DEFAULT_HEADINGS[imageIndex]}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-white/40">
                    {descriptions[imageIndex] ||
                      DEFAULT_DESCRIPTIONS[imageIndex]}
                  </p>

                </div>

                <CinematicImage
                  src={img}
                  alt={section.title}
                  onClick={() => openGallery(images)}
                  className="min-h-[380px] lg:col-span-2"
                />

              </div>

            );
          })}

        </div>

      )}

      {/* FINAL CUT */}

      {images.length > 10 && (

        <div>

          <div className="mb-8">

            <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
              FINAL CUT
            </span>

            <h3 className="mt-3 font-serif text-3xl font-light">
              Album Highlights
            </h3>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {images.slice(10, 14).map((img, i) => {

              const imageIndex = i + 10;

              return (

                <button
                  type="button"
                  key={`final-${imageIndex}`}
                  onClick={() => openGallery(images)}
                  className="group text-left"
                >

                  <CinematicImage
                    src={img}
                    alt={section.title}
                    onClick={() => openGallery(images)}
                    className="min-h-[350px]"
                  />

                  <div className="mt-3">

                    <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
                      FRAME{" "}
                      {String(imageIndex + 1).padStart(2, "0")}
                    </span>

                    <h4 className="mt-2 text-sm text-white/65">
                      {headings[imageIndex] ||
                        DEFAULT_HEADINGS[imageIndex] ||
                        "Precious Memory"}
                    </h4>

                  </div>

                </button>

              );
            })}

          </div>

        </div>

      )}

      <GalleryButton title={section.title} />

    </div>
  );
}

/* =========================================================
   CINEMATIC IMAGE
========================================================= */

function CinematicImage({
  src,
  alt,
  className = "",
  onClick,
}) {
  if (!src) return null;

  return (

    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${alt || "image"}`}
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#0b0b0b]
        text-left
        ${className}
      `}
    >

      <ProtectedImage
        src={src}
        alt={alt}
        className="
          block
          h-auto
          w-auto
          max-h-full
          max-w-full
          object-contain
          object-center
          transition
          duration-700
          ease-out
          group-hover:scale-[1.015]
        "
        showLogoOnly={true}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />

      <div className="pointer-events-none absolute inset-3 border border-white/[0.12] transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-4" />

      <span
        className="
          absolute
          bottom-5
          right-5
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-white/25
          bg-black/40
          text-lg
          backdrop-blur-md
          transition
          duration-300
          group-hover:border-[#d6b36a]
          group-hover:bg-[#d6b36a]
          group-hover:text-black
        "
      >
        +
      </span>

    </button>
  );
}

/* =========================================================
   BRIDAL
========================================================= */

function BridalSection({
  section,
  headings,
  descriptions,
  openGallery,
}) {
  const images = Array.isArray(section.images)
    ? section.images
    : [];

  if (!images.length) return null;

  return (

    <div className="space-y-14">

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">

        <div>

          <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
            BRIDAL CELEBRATION
          </span>

          <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
            A Celebration of Elegance
          </h3>

        </div>

        <p className="max-w-2xl text-sm leading-7 text-white/40">
          {section.desc ||
            section.description ||
            "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
        </p>

      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

        {images.map((img, i) => (

          <button
            type="button"
            key={`bridal-${i}`}
            onClick={() => openGallery(images)}
            className="group mb-7 block w-full break-inside-avoid text-left"
          >

            <div className="relative overflow-hidden bg-[#0b0b0b]">

              <ProtectedImage
                src={img}
                alt={section.title}
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  object-center
                  transition
                  duration-700
                  group-hover:scale-[1.015]
                "
                showLogoOnly={true}
              />

              <div className="pointer-events-none absolute inset-3 border border-white/[0.12]" />

            </div>

            <div className="mt-4">

              <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
                FRAME {String(i + 1).padStart(2, "0")}
              </span>

              <h4 className="mt-2 font-serif text-xl font-light">
                {headings[i] ||
                  `Precious Moment ${i + 1}`}
              </h4>

              <p className="mt-2 text-xs leading-6 text-white/35">
                {descriptions[i] ||
                  "A beautiful moment captured with emotion and elegance."}
              </p>

            </div>

          </button>

        ))}

      </div>

      <GalleryButton title={section.title} />

    </div>
  );
}

/* =========================================================
   BABY
========================================================= */

function BabySection({
  section,
  headings,
  descriptions,
  openGallery,
}) {
  const images = Array.isArray(section.images)
    ? section.images
    : [];

  if (!images.length) return null;

  return (

    <div className="space-y-20">

      <div className="max-w-3xl">

        <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
          BABY SHOWER / BAPTISM
        </span>

        <p className="mt-5 text-sm leading-7 text-white/40">
          {section.desc ||
            section.description ||
            "Celebrating the joy and warmth of this special journey."}
        </p>

      </div>

      {images.map((img, i) => (

        <article
          key={`baby-${i}`}
          className="grid items-center gap-10 lg:grid-cols-2"
        >

          <CinematicImage
            src={img}
            alt={section.title}
            onClick={() => openGallery(images)}
            className={`
              min-h-[400px]
              ${i % 2 === 1 ? "lg:order-2" : ""}
            `}
          />

          <div
            className={
              i % 2 === 1
                ? "lg:order-1"
                : ""
            }
          >

            <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
              MOMENT {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
              {headings[i] ||
                `Precious Moment ${i + 1}`}
            </h3>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              {descriptions[i] ||
                "Celebrating the joy and warmth of this special journey."}
            </p>

          </div>

        </article>

      ))}

      <GalleryButton title={section.title} />

    </div>
  );
}

/* =========================================================
   DEFAULT PROJECT
========================================================= */

function DefaultSection({
  section,
  openGallery,
}) {
  const images = Array.isArray(section.images)
    ? section.images
    : [];

  return (

    <div className="space-y-12">

      <div className="max-w-2xl">

        <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
          CURATED PROJECT
        </span>

        <p className="mt-5 text-sm leading-7 text-white/40">
          {section.desc ||
            section.description ||
            "A curated visual story captured with cinematic detail."}
        </p>

      </div>

      {images.length > 0 && (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {images.slice(0, 4).map((img, i) => (

            <CinematicImage
              key={`default-${i}`}
              src={img}
              alt={section.title}
              onClick={() => openGallery(images)}
              className="min-h-[350px]"
            />

          ))}

        </div>

      )}

      <GalleryButton
        title={section.title}
        label="EXPLORE PROJECT"
      />

    </div>
  );
}

/* =========================================================
   GALLERY BUTTON
========================================================= */

function GalleryButton({
  title,
  label = "VIEW FULL GALLERY",
}) {
  return (

    <div className="pt-2">

      <Link
        to={`/gallery/${generateSlug(title)}`}
        className="
          group
          inline-flex
          items-center
          gap-5
          border-b
          border-[#d6b36a]/50
          pb-3
          text-[9px]
          tracking-[0.3em]
          text-[#d6b36a]
          transition
          hover:border-[#d6b36a]
          hover:text-white
        "
      >

        <span>{label}</span>

        <strong className="text-base transition duration-300 group-hover:translate-x-2">
          →
        </strong>
 
      </Link>

    </div>
  );
}

export default Home;