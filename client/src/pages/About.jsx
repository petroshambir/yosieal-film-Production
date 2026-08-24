import React from "react";
import Navbar from "../components/Nabar";
import Footer from "../components/Footer";

/* =========================================================
   YOSIEAL - ABOUT PAGE
   Editorial / Cultural / Film Production Design
   ========================================================= */

const images = {
  hero:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=2200&auto=format&fit=crop",

  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1400&auto=format&fit=crop",

  traditional:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1400&auto=format&fit=crop",

  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=85&w=1400&auto=format&fit=crop",

  culture:
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=85&w=1400&auto=format&fit=crop",

  celebration:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=85&w=1400&auto=format&fit=crop",

  camera:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=85&w=1400&auto=format&fit=crop",

  production:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=85&w=1400&auto=format&fit=crop",

  portrait:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=85&w=1200&auto=format&fit=crop",

  ceremony:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=85&w=1400&auto=format&fit=crop",

  event:
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=85&w=1400&auto=format&fit=crop",

  behind:
    "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=85&w=1400&auto=format&fit=crop",

  editing:
    "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=85&w=1400&auto=format&fit=crop",

  couple:
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=85&w=1400&auto=format&fit=crop",

  celebration2:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=85&w=1400&auto=format&fit=crop",
};

/* =========================================================
   IMAGE COMPONENT
   NO CROPPING
   ========================================================= */

function EditorialImage({ src, alt = "", className = "" }) {
  return (
    <div className={`group relative overflow-hidden bg-[#0b0b0b] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-auto max-h-full w-full object-contain object-center transition duration-700 ease-out group-hover:scale-[1.015]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-3 border border-white/10 transition duration-500 group-hover:border-[#d8b56b]/60" />
    </div>
  );
}

/* =========================================================
   SECTION LABEL
   ========================================================= */

function SectionLabel({ number, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-sm text-[#d8b56b]">{number}</span>
      <span className="h-px w-10 bg-[#d8b56b]/50" />
      <span className="text-[9px] font-medium tracking-[0.35em] text-[#d8b56b]">
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   ABOUT PAGE
   ========================================================= */

export default function About() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#080808]">
        
        {/* NAVBAR */}
        <div className="absolute left-0 top-0 z-50 w-full">
          <Navbar />
        </div>

        {/* HERO IMAGE */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src={images.hero}
            alt="YOSIEAL Film Production"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* HERO OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />

        {/* HERO CONTENT */}
        <div className="relative z-20 mx-auto flex min-h-[92vh] w-full max-w-[1500px] items-end px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
          
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_330px]">
            
            {/* LEFT */}
            <div className="max-w-4xl">
              
              <SectionLabel number="01">YOSIEAL FILM PRODUCTION</SectionLabel>

              <h1 className="mt-6 font-serif text-5xl font-light leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[110px]">
                We preserve
                <br />
                <span className="italic text-[#e0bf7b]">moments.</span>
              </h1>

              <div className="mt-8 max-w-xl border-l border-[#d8b56b]/60 pl-5">
                <p className="text-sm font-light leading-7 text-white/70 sm:text-base">
                  YOSIEAL is a film production studio dedicated to
                  transforming real people, meaningful celebrations and
                  cultural stories into timeless cinematic memories.
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="hidden border-l border-white/15 pl-7 lg:block">
              
              <p className="text-[9px] tracking-[0.35em] text-[#d8b56b]">
                OUR IDENTITY
              </p>

              <h2 className="mt-4 font-serif text-3xl font-light leading-tight">
                Stories rooted
                <br />
                in <span className="italic">culture.</span>
              </h2>

              <p className="mt-5 text-xs leading-6 text-white/45">
                Wedding films, traditional ceremonies, family stories,
                events, documentaries and cinematic productions.
              </p>

              <div className="mt-8 h-px w-16 bg-[#d8b56b]" />

            </div>

          </div>
        </div>

        {/* HERO NUMBER */}
        <div className="absolute bottom-7 right-6 z-30 text-[9px] tracking-[0.3em] text-white/40 sm:right-10 lg:right-16">
          YOSIEAL / ABOUT
        </div>

      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1450px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          
          <div>
            <SectionLabel number="02">WHO WE ARE</SectionLabel>
          </div>

          <div className="max-w-5xl">
            
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">
              A visual studio
              <br />
              <span className="italic text-[#d8b56b]">
                built around people.
              </span>
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              
              <p className="text-sm leading-8 text-white/55 sm:text-base">
                ዮሲኤል ንሓበሻ ሕብረተሰብ፣ ባህሊ፣ ልምዲን ኣገደስቲ
                ፍጻመታትን ብሲኒማቲክ ኣገባብ ንምስናድ ዝሰርሕ
                ፊልም ፕሮዳክሽን ስቱድዮ እዩ።
              </p>

              <p className="text-sm leading-8 text-white/45 sm:text-base">
                From intimate wedding moments to traditional ceremonies,
                family celebrations, cultural stories and professional
                productions, we create films that remain meaningful long
                after the event is over.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CULTURE STATEMENT
      ===================================================== */}

      <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a]">
        
        <div className="mx-auto grid max-w-[1500px] items-center lg:grid-cols-[0.9fr_1.1fr]">
          
          <div className="order-2 px-6 py-20 sm:px-10 lg:order-1 lg:px-16 lg:py-28">
            
            <SectionLabel number="03">OUR CULTURE</SectionLabel>

            <h2 className="mt-7 max-w-2xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              Our culture is
              <br />
              <span className="italic text-[#d8b56b]">
                part of the story.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
              Every traditional dress, every family gathering, every
              celebration and every smile carries a story. We do not simply
              record these moments — we preserve the feeling, identity and
              beauty behind them.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4">
              <div>
                <strong className="font-serif text-2xl text-[#d8b56b]">01</strong>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-white/40">TRADITION</p>
              </div>
              <div>
                <strong className="font-serif text-2xl text-[#d8b56b]">02</strong>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-white/40">FAMILY</p>
              </div>
              <div>
                <strong className="font-serif text-2xl text-[#d8b56b]">03</strong>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-white/40">EMOTION</p>
              </div>
              <div>
                <strong className="font-serif text-2xl text-[#d8b56b]">04</strong>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-white/40">LEGACY</p>
              </div>
            </div>

          </div>

          <div className="order-1 min-h-[500px] lg:order-2 lg:min-h-[720px]">
            <EditorialImage
              src={images.traditional}
              alt="Traditional cultural celebration"
              className="h-full w-full"
            />
          </div>

        </div>

      </section>

      {/* =====================================================
          WEDDING EDITORIAL
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          
          <div>
            <SectionLabel number="04">WEDDINGS</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
              Love,
              <span className="italic text-[#d8b56b]"> beautifully filmed.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45">
            From preparation to celebration, we capture the details,
            emotions and people that make every wedding unique.
          </p>

        </div>

        <div className="grid items-start gap-6 lg:grid-cols-12">
          
          <div className="lg:col-span-7 lg:pt-14">
            <EditorialImage
              src={images.wedding}
              alt="Wedding celebration"
              className="w-full"
            />
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src={images.couple}
              alt="Wedding couple"
              className="w-full"
            />

            <div className="mt-6 border-l border-[#d8b56b]/50 pl-5">
              <span className="text-[9px] tracking-[0.3em] text-[#d8b56b]">
                WEDDING STORY
              </span>
              <h3 className="mt-3 font-serif text-2xl font-light">
                Two lives.
                <br />
                One beautiful chapter.
              </h3>
            </div>
          </div>

        </div>

      </section>

      {/* =====================================================
          TRADITIONAL + FAMILY
      ===================================================== */}

      <section className="bg-[#090909] py-24 sm:py-32">
        
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
          
          <div className="grid gap-16 lg:grid-cols-12">
            
            <div className="lg:col-span-4">
              
              <SectionLabel number="05">TRADITIONAL CEREMONIES</SectionLabel>

              <h2 className="mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Where
                <br />
                <span className="italic text-[#d8b56b]">tradition</span>
                <br />
                becomes cinema.
              </h2>

              <p className="mt-7 text-sm leading-7 text-white/45">
                Traditional ceremonies are more than events. They carry
                generations of identity, family and heritage. Our films
                preserve these details with respect and cinematic quality.
              </p>

            </div>

            <div className="lg:col-span-8">
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                <EditorialImage
                  src={images.ceremony}
                  alt="Traditional ceremony"
                  className="sm:mt-16"
                />

                <EditorialImage
                  src={images.family}
                  alt="Family celebration"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CULTURE MASONRY
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        
        <div className="mb-14">
          <SectionLabel number="06">CULTURE & COMMUNITY</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
            The beauty of
            <span className="italic text-[#d8b56b]"> our people.</span>
          </h2>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          
          <div className="mb-6 break-inside-avoid">
            <EditorialImage
              src={images.culture}
              alt="Ethiopian culture"
              className="w-full"
            />
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#d8b56b]">
              CULTURE / 01
            </p>
          </div>

          <div className="mb-6 break-inside-avoid lg:mt-20">
            <EditorialImage
              src={images.celebration}
              alt="Cultural celebration"
              className="w-full"
            />
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#d8b56b]">
              CELEBRATION / 02
            </p>
          </div>

          <div className="mb-6 break-inside-avoid">
            <EditorialImage
              src={images.celebration2}
              alt="Community event"
              className="w-full"
            />
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#d8b56b]">
              COMMUNITY / 03
            </p>
          </div>

          <div className="mb-6 break-inside-avoid">
            <EditorialImage
              src={images.portrait}
              alt="Portrait"
              className="w-full"
            />
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#d8b56b]">
              PEOPLE / 04
            </p>
          </div>

          <div className="mb-6 break-inside-avoid lg:mt-16">
            <EditorialImage
              src={images.event}
              alt="Cultural event"
              className="w-full"
            />
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#d8b56b]">
              EVENTS / 05
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section className="border-y border-white/10 bg-[#070707]">
        
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[1.15fr_0.85fr]">
          
          <div className="relative min-h-[600px]">
            <EditorialImage
              src={images.event}
              alt="YOSIEAL event production"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16">
            
            <div>
              <SectionLabel number="07">EVENTS</SectionLabel>

              <h2 className="mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Every gathering
                <br />
                deserves a
                <br />
                <span className="italic text-[#d8b56b]">story.</span>
              </h2>

              <p className="mt-7 text-sm leading-8 text-white/45">
                Corporate events, cultural celebrations, private occasions
                and community gatherings — we create visual stories that
                capture the atmosphere and energy of the entire experience.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 text-[9px] tracking-[0.25em] text-white/50">
                <span>EVENT FILM</span>
                <span>PHOTOGRAPHY</span>
                <span>HIGHLIGHTS</span>
                <span>DOCUMENTATION</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FILM PRODUCTION
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          
          <div>
            
            <SectionLabel number="08">FILM PRODUCTION</SectionLabel>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              Behind every
              <br />
              <span className="italic text-[#d8b56b]">frame.</span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-8 text-white/45">
              Professional cameras, controlled lighting, creative direction,
              sound and post-production come together to create a complete
              cinematic experience.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5">
              
              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] tracking-[0.25em] text-[#d8b56b]">
                  01
                </span>
                <p className="mt-2 text-sm text-white/60">
                  Cinematography
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] tracking-[0.25em] text-[#d8b56b]">
                  02
                </span>
                <p className="mt-2 text-sm text-white/60">
                  Creative Direction
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] tracking-[0.25em] text-[#d8b56b]">
                  03
                </span>
                <p className="mt-2 text-sm text-white/60">
                  Editing
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] tracking-[0.25em] text-[#d8b56b]">
                  04
                </span>
                <p className="mt-2 text-sm text-white/60">
                  Color Grading
                </p>
              </div>

            </div>

          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            
            <EditorialImage
              src={images.camera}
              alt="Professional cinematography"
              className="sm:mt-16"
            />

            <EditorialImage
              src={images.production}
              alt="Film production"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          BEHIND THE SCENES
      ===================================================== */}

      <section className="bg-[#0a0a0a] py-24 sm:py-32">
        
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
          
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            
            <div>
              <SectionLabel number="09">BEHIND THE SCENES</SectionLabel>

              <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                What happens
                <span className="italic text-[#d8b56b]"> behind.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40">
              The final film is only one part of the process. The real story
              begins long before the camera starts rolling.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            
            <div className="lg:col-span-5">
              <EditorialImage
                src={images.behind}
                alt="Behind the scenes"
              />
            </div>

            <div className="lg:col-span-4 lg:pt-24">
              <EditorialImage
                src={images.editing}
                alt="Film editing"
              />
            </div>

            <div className="flex items-end lg:col-span-3">
              <div className="border-l border-[#d8b56b]/50 py-2 pl-6">
                <p className="font-serif text-2xl font-light leading-relaxed">
                  “The magic is
                  <br />
                  in the details.”
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHAT WE CREATE
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          
          <div>
            <SectionLabel number="10">WHAT WE CREATE</SectionLabel>
          </div>

          <div>
            
            <div className="grid border-t border-white/10 md:grid-cols-2">
              
              {[
                ["01", "Wedding Films", "Timeless stories of love and celebration."],
                ["02", "Traditional Ceremonies", "Heritage, rituals and cultural identity."],
                ["03", "Family Stories", "The people and memories that matter most."],
                ["04", "Events", "Energy, atmosphere and unforgettable moments."],
                ["05", "Documentary", "Real stories told with honesty and cinematic depth."],
                ["06", "Commercial Production", "Professional visual content for brands and organizations."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="group border-b border-white/10 py-8 transition hover:px-4"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-[9px] tracking-[0.25em] text-[#d8b56b]">
                      {number}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-light">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL STATEMENT
      ===================================================== */}

      <section className="relative overflow-hidden border-t border-white/10">
        
        <div className="absolute inset-0">
          <EditorialImage
            src={images.family}
            alt="Family and community"
            className="h-full w-full"
          />
        </div>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-[1500px] items-center px-6 py-24 sm:px-10 lg:px-16">
          
          <div className="max-w-4xl">
            
            <SectionLabel number="11">OUR PROMISE</SectionLabel>

            <h2 className="mt-7 font-serif text-5xl font-light leading-[0.95] sm:text-6xl lg:text-8xl">
              Your story
              <br />
              deserves to
              <br />
              <span className="italic text-[#e0bf7b]">
                live forever.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              YOSIEAL exists to turn real moments into meaningful films —
              preserving the people, culture, emotion and memories that make
              every story worth remembering.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-16 bg-[#d8b56b]" />
              <span className="text-[9px] tracking-[0.35em] text-[#d8b56b]">
                YOSIEAL FILM PRODUCTION
              </span>
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}