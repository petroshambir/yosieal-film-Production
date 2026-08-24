
// import React, { useState } from "react";
// import Navbar from "../components/Nabar";
// import Footer from "../components/Footer";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setSubmitting(true);

//     setTimeout(() => {
//       setSubmitting(false);
//       setSubmitted(true);

//       setFormData({
//         name: "",
//         email: "",
//         message: "",
//       });
//     }, 1500);
//   };

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       <section className="relative flex min-h-[78vh] w-full items-end overflow-hidden">

//         {/* HERO IMAGE */}

//         <div className="absolute inset-0">

//           <img
//             src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=85&w=2200&auto=format&fit=crop"
//             alt="YOSIEAL Film Production"
//             className="h-full w-full object-cover object-center"
//           />

//           {/* DARK CINEMATIC OVERLAY */}

//           <div className="absolute inset-0 bg-black/45" />

//           <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />

//           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-black/50" />

//         </div>

//         {/* NAVBAR */}

//         <div className="absolute left-0 top-0 z-50 w-full">
//           <Navbar />
//         </div>

//         {/* HERO CONTENT */}

//         <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12 lg:pb-24">

//           <div className="max-w-4xl">

//             <div className="mb-6 flex items-center gap-4">

//               <span className="h-px w-12 bg-[#d6b36a] sm:w-16" />

//               <span className="text-[9px] font-medium tracking-[0.4em] text-[#d6b36a] sm:text-[10px]">
//                 YOSIEAL FILM PRODUCTION
//               </span>

//             </div>

//             <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//               Let&apos;s Create

//               <br />

//               <span className="italic text-[#e2c58b]">
//                 Something
//               </span>

//               <br />

//               Unforgettable.

//             </h1>

//             <div className="mt-8 max-w-xl border-l border-[#d6b36a]/60 pl-5">

//               <p className="text-sm font-light leading-7 text-white/65 sm:text-base">
//                 From weddings and traditional celebrations to
//                 documentaries, events and cinematic productions,
//                 YOSIEAL turns meaningful moments into timeless
//                 visual stories.
//               </p>

//             </div>

//           </div>

//           {/* HERO SIDE LABEL */}

//           <div className="absolute bottom-16 right-6 hidden lg:block lg:right-12">

//             <div className="flex flex-col items-center gap-4">

//               <span className="h-20 w-px bg-gradient-to-b from-transparent via-[#d6b36a] to-transparent" />

//               <span className="rotate-90 text-[8px] tracking-[0.4em] text-white/40">
//                 GET IN TOUCH
//               </span>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           CONTACT INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//         <div className="grid gap-10 lg:grid-cols-[220px_1fr]">

//           {/* LABEL */}

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="mt-2 h-px w-12 bg-[#d6b36a] lg:w-16" />

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               CONTACT
//             </span>

//           </div>

//           {/* TEXT */}

//           <div className="max-w-4xl">

//             <p className="mb-4 text-[10px] tracking-[0.3em] text-white/35">
//               YOSIEAL / STUDIO
//             </p>

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">

//               Your story deserves

//               <span className="italic text-[#d6b36a]">
//                 {" "}to be remembered.
//               </span>

//             </h2>

//             <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
//               Whether you are planning a wedding, traditional
//               ceremony, family celebration, event or cinematic
//               production, we would love to hear about your vision.
//               Tell us what you are creating and let&apos;s bring it
//               to life together.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           CONTACT AREA
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">

//         <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">

//           {/* =================================================
//               LEFT — CONTACT DETAILS
//           ================================================= */}

//           <div className="space-y-4">

//             {/* LOCATION */}

//             <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

//               <div className="flex items-start gap-5">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.5"
//                     className="h-5 w-5"
//                   >
//                     <path
//                       d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
//                     />
//                     <circle cx="12" cy="10" r="2.5" />
//                   </svg>

//                 </div>

//                 <div className="min-w-0">

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     STUDIO LOCATION
//                   </span>

//                   <h3 className="mt-2 font-serif text-xl font-light">
//                     Addis Ababa
//                   </h3>

//                   <p className="mt-1 text-sm text-white/45">
//                     Lebu Mebraten, Ethiopia
//                   </p>

//                   <a
//                     href="https://www.google.com/maps/search/?api=1&query=Addis+Ababa+Lebu+Mebraten"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="mt-4 inline-flex items-center gap-3 text-[9px] tracking-[0.25em] text-[#d6b36a] transition hover:text-white"
//                   >
//                     OPEN IN GOOGLE MAPS

//                     <span className="text-sm">
//                       →
//                     </span>

//                   </a>

//                 </div>

//               </div>

//             </div>

//             {/* PHONE */}

//             <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

//               <div className="flex items-start gap-5">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.5"
//                     className="h-5 w-5"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
//                   </svg>

//                 </div>

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     PHONE
//                   </span>

//                   <div className="mt-2 space-y-1">

//                     <a
//                       href="tel:+251976130175"
//                       className="block font-serif text-xl font-light text-white transition hover:text-[#d6b36a]"
//                     >
//                       +251 976 130 175
//                     </a>

//                     <a
//                       href="tel:+251942746150"
//                       className="block text-sm text-white/45 transition hover:text-[#d6b36a]"
//                     >
//                       +251 942 746 150
//                     </a>

//                   </div>

//                   <p className="mt-3 text-xs text-white/30">
//                     Available for bookings and enquiries
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* EMAIL */}

//             <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

//               <div className="flex items-start gap-5">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.5"
//                     className="h-5 w-5"
//                   >
//                     <rect x="3" y="5" width="18" height="14" rx="1" />
//                     <path d="m3 7 9 6 9-6" />
//                   </svg>

//                 </div>

//                 <div className="min-w-0">

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     EMAIL
//                   </span>

//                   <a
//                     href="mailto:Adalhambir946@gmail.com"
//                     className="mt-2 block break-all font-serif text-lg font-light text-white transition hover:text-[#d6b36a]"
//                   >
//                     Adalhambir946@gmail.com
//                   </a>

//                   <p className="mt-2 text-xs text-white/30">
//                     Send us your project details anytime
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* HOURS */}

//             <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

//               <div className="flex items-start gap-5">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.5"
//                     className="h-5 w-5"
//                   >
//                     <circle cx="12" cy="12" r="9" />
//                     <path d="M12 7v5l3 2" />
//                   </svg>

//                 </div>

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     STUDIO HOURS
//                   </span>

//                   <h3 className="mt-2 font-serif text-xl font-light">
//                     Monday — Friday
//                   </h3>

//                   <p className="mt-1 text-sm text-white/45">
//                     8:00 AM — 6:00 PM
//                   </p>

//                   <p className="mt-1 text-sm text-white/45">
//                     Saturday: 9:00 AM — 8:00 PM
//                   </p>

//                   <p className="mt-2 text-xs text-white/25">
//                     Sunday — Closed
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               RIGHT — MESSAGE FORM
//           ================================================= */}

//           <div className="relative overflow-hidden border border-white/10 bg-[#0b0b0b]">

//             {/* GOLD LINE */}

//             <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#d6b36a] via-[#d6b36a]/20 to-transparent" />

//             <div className="p-7 sm:p-10 lg:p-12">

//               <div className="mb-10">

//                 <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//                   START A CONVERSATION
//                 </span>

//                 <h3 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
//                   Tell us about your story.
//                 </h3>

//                 <p className="mt-4 max-w-lg text-sm leading-6 text-white/40">
//                   Share a few details about your event or production.
//                   Our team will get back to you as soon as possible.
//                 </p>

//               </div>

//               {submitted ? (

//                 <div className="border border-[#d6b36a]/30 bg-[#d6b36a]/5 p-8 text-center">

//                   <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b36a] text-xl text-[#d6b36a]">
//                     ✓
//                   </div>

//                   <h4 className="mt-5 font-serif text-2xl font-light">
//                     Message Received
//                   </h4>

//                   <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
//                     Thank you for contacting YOSIEAL.
//                     We&apos;ll get back to you shortly.
//                   </p>

//                   <button
//                     type="button"
//                     onClick={() => setSubmitted(false)}
//                     className="mt-7 border-b border-[#d6b36a] pb-2 text-[9px] tracking-[0.3em] text-[#d6b36a] transition hover:text-white"
//                   >
//                     SEND ANOTHER MESSAGE
//                   </button>

//                 </div>

//               ) : (

//                 <form
//                   onSubmit={handleSubmit}
//                   className="space-y-6"
//                 >

//                   {/* NAME + EMAIL */}

//                   <div className="grid gap-6 sm:grid-cols-2">

//                     <div>

//                       <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
//                         YOUR NAME
//                       </label>

//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Your full name"
//                         required
//                         className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
//                       />

//                     </div>

//                     <div>

//                       <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
//                         EMAIL ADDRESS
//                       </label>

//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="you@example.com"
//                         required
//                         className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
//                       />

//                     </div>

//                   </div>

//                   {/* MESSAGE */}

//                   <div>

//                     <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
//                       YOUR MESSAGE
//                     </label>

//                     <textarea
//                       name="message"
//                       rows="6"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us about your wedding, event or film production..."
//                       required
//                       className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
//                     />

//                   </div>

//                   {/* SUBMIT */}

//                   <div className="flex items-center justify-between gap-6 pt-3">

//                     <p className="hidden max-w-xs text-[9px] leading-5 tracking-wider text-white/25 sm:block">
//                       YOSIEAL FILM PRODUCTION
//                       <br />
//                       Addis Ababa, Ethiopia
//                     </p>

//                     <button
//                       type="submit"
//                       disabled={submitting}
//                       className="group inline-flex items-center gap-5 border border-[#d6b36a] px-7 py-4 text-[9px] tracking-[0.3em] text-[#d6b36a] transition duration-300 hover:bg-[#d6b36a] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
//                     >

//                       {submitting
//                         ? "SENDING..."
//                         : "SEND MESSAGE"}

//                       <span className="text-base transition duration-300 group-hover:translate-x-2">
//                         →
//                       </span>

//                     </button>

//                   </div>

//                 </form>

//               )}

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           LOCATION / MAP
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">

//         <div className="mb-8 flex items-end justify-between gap-6">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               FIND OUR STUDIO
//             </span>

//             <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
//               Visit YOSIEAL
//             </h2>

//           </div>

//           <a
//             href="https://www.google.com/maps/search/?api=1&query=Addis+Ababa+Lebu+Mebraten"
//             target="_blank"
//             rel="noreferrer"
//             className="hidden items-center gap-3 border-b border-[#d6b36a]/50 pb-2 text-[9px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white sm:flex"
//           >
//             GET DIRECTIONS
//             <span className="text-sm">→</span>
//           </a>

//         </div>

//         <div className="relative h-[360px] overflow-hidden border border-white/10 bg-[#0b0b0b] sm:h-[450px]">

//           <iframe
//             title="YOSIEAL Film Production Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.751765275537!2d38.7420!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOGKwNTgnMjQuMiJOIDM4wrA0NCczMS4yIkU!5e0!3m2!1sen!2set!4v1650000000000!5m2!1sen!2set"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />

//           {/* MAP LABEL */}

//           <div className="pointer-events-none absolute bottom-5 left-5 border border-white/10 bg-black/80 px-5 py-4 backdrop-blur-md">

//             <span className="block text-[8px] tracking-[0.3em] text-[#d6b36a]">
//               YOSIEAL STUDIO
//             </span>

//             <span className="mt-1 block text-xs text-white/70">
//               Addis Ababa · Lebu Mebraten
//             </span>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           FINAL CTA
//       ===================================================== */}

//       <section className="border-y border-white/10 bg-[#090909]">

//         <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center lg:px-12">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               YOSIEAL FILM PRODUCTION
//             </span>

//             <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
//               Ready to tell your story?
//             </h2>

//           </div>

//           <a
//             href="tel:+251976130175"
//             className="group inline-flex items-center gap-5 border border-[#d6b36a] px-7 py-4 text-[9px] tracking-[0.3em] text-[#d6b36a] transition hover:bg-[#d6b36a] hover:text-black"
//           >
//             CALL YOSIEAL
//             <span className="text-base transition group-hover:translate-x-2">
//               →
//             </span>
//           </a>

//         </div>

//       </section>

//       <Footer />

//     </main>
//   );
// }


import React, { useState } from "react";
import Navbar from "../components/Nabar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================================
     SEND MESSAGE TO GMAIL
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/petroshambirr@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,

            _subject: `New YOSIEAL Contact Message from ${formData.name}`,

            _template: "table",

            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.success !== "true") {
        throw new Error("Message could not be sent");
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        "We could not send your message right now. Please try again or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-[78vh] w-full items-end overflow-hidden">

        {/* HERO IMAGE */}

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=2200&auto=format&fit=crop"
            alt="YOSIEAL Wedding Film Production"
            className="h-full w-full object-cover object-center"
          />

          {/* CINEMATIC OVERLAY */}

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-black/50" />

        </div>

        {/* NAVBAR */}

        <div className="absolute left-0 top-0 z-50 w-full">
          <Navbar />
        </div>

        {/* HERO CONTENT */}

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12 lg:pb-24">

          <div className="max-w-4xl">

            <div className="mb-6 flex items-center gap-4">

              <span className="h-px w-12 bg-[#d6b36a] sm:w-16" />

              <span className="text-[9px] font-medium tracking-[0.4em] text-[#d6b36a] sm:text-[10px]">
                YOSIEAL FILM PRODUCTION
              </span>

            </div>

            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

              Let&apos;s Create

              <br />

              <span className="italic text-[#e2c58b]">
                Something
              </span>

              <br />

              Unforgettable.

            </h1>

            <div className="mt-8 max-w-xl border-l border-[#d6b36a]/60 pl-5">

              <p className="text-sm font-light leading-7 text-white/65 sm:text-base">
                From weddings and traditional celebrations to
                documentaries, events and cinematic productions,
                YOSIEAL turns meaningful moments into timeless
                visual stories.
              </p>

            </div>

          </div>

          {/* SIDE LABEL */}

          <div className="absolute bottom-16 right-6 hidden lg:block lg:right-12">

            <div className="flex flex-col items-center gap-4">

              <span className="h-20 w-px bg-gradient-to-b from-transparent via-[#d6b36a] to-transparent" />

              <span className="rotate-90 text-[8px] tracking-[0.4em] text-white/40">
                GET IN TOUCH
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT INTRO
      ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">

          {/* LABEL */}

          <div className="flex items-start gap-3 lg:flex-col">

            <span className="mt-2 h-px w-12 bg-[#d6b36a] lg:w-16" />

            <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
              CONTACT
            </span>

          </div>

          {/* TEXT */}

          <div className="max-w-4xl">

            <p className="mb-4 text-[10px] tracking-[0.3em] text-white/35">
              YOSIEAL / STUDIO
            </p>

            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">

              Your story deserves

              <span className="italic text-[#d6b36a]">
                {" "}to be remembered.
              </span>

            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              Whether you are planning a wedding, traditional
              ceremony, family celebration, event or cinematic
              production, we would love to hear about your vision.
              Tell us what you are creating and let&apos;s bring it
              to life together.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">


          {/* =================================================
              LEFT — CONTACT DETAILS
          ================================================= */}

          <div className="space-y-4">

            {/* LOCATION */}

            <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

              <div className="flex items-start gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                </div>

                <div className="min-w-0">

                  <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
                    STUDIO LOCATION
                  </span>

                  <h3 className="mt-2 font-serif text-xl font-light">
                    Addis Ababa
                  </h3>

                  <p className="mt-1 text-sm text-white/45">
                    Lebu Mebraten, Ethiopia
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Addis+Ababa+Lebu+Mebraten"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-3 text-[9px] tracking-[0.25em] text-[#d6b36a] transition hover:text-white"
                  >
                    OPEN IN GOOGLE MAPS

                    <span className="text-sm">
                      →
                    </span>

                  </a>

                </div>

              </div>

            </div>


            {/* PHONE */}

            <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

              <div className="flex items-start gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                  </svg>

                </div>

                <div>

                  <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
                    PHONE
                  </span>

                  <div className="mt-2 space-y-1">

                    <a
                      href="tel:+251976130175"
                      className="block font-serif text-xl font-light text-white transition hover:text-[#d6b36a]"
                    >
                      +251 976 130 175
                    </a>

                    <a
                      href="tel:+251942746150"
                      className="block text-sm text-white/45 transition hover:text-[#d6b36a]"
                    >
                      +251 942 746 150
                    </a>

                  </div>

                  <p className="mt-3 text-xs text-white/30">
                    Available for bookings and enquiries
                  </p>

                </div>

              </div>

            </div>


            {/* EMAIL */}

            <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

              <div className="flex items-start gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                </div>

                <div className="min-w-0">

                  <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
                    EMAIL
                  </span>

                  <a
                    href="mailto:petroshambirr@gmail.com"
                    className="mt-2 block break-all font-serif text-lg font-light text-white transition hover:text-[#d6b36a]"
                  >
                    petroshambirr@gmail.com
                  </a>

                  <p className="mt-2 text-xs text-white/30">
                    Send us your project details anytime
                  </p>

                </div>

              </div>

            </div>


            {/* HOURS */}

            <div className="group border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:border-[#d6b36a]/50">

              <div className="flex items-start gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d6b36a]/30 bg-[#d6b36a]/5 text-[#d6b36a]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>

                </div>

                <div>

                  <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
                    STUDIO HOURS
                  </span>

                  <h3 className="mt-2 font-serif text-xl font-light">
                    Monday — Friday
                  </h3>

                  <p className="mt-1 text-sm text-white/45">
                    8:00 AM — 6:00 PM
                  </p>

                  <p className="mt-1 text-sm text-white/45">
                    Saturday: 9:00 AM — 8:00 PM
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    Sunday — Closed
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT — MESSAGE FORM
          ================================================= */}

          <div className="relative overflow-hidden border border-white/10 bg-[#0b0b0b]">

            {/* GOLD LINE */}

            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#d6b36a] via-[#d6b36a]/20 to-transparent" />

            <div className="p-7 sm:p-10 lg:p-12">

              <div className="mb-10">

                <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
                  START A CONVERSATION
                </span>

                <h3 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
                  Tell us about your story.
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/40">
                  Share a few details about your event or production.
                  Our team will get back to you as soon as possible.
                </p>

              </div>


              {/* SUCCESS */}

              {submitted ? (

                <div className="border border-[#d6b36a]/30 bg-[#d6b36a]/5 p-8 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b36a] text-xl text-[#d6b36a]">
                    ✓
                  </div>

                  <h4 className="mt-5 font-serif text-2xl font-light">
                    Message Received
                  </h4>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
                    Thank you for contacting YOSIEAL.
                    Your message has been sent successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 border-b border-[#d6b36a] pb-2 text-[9px] tracking-[0.3em] text-[#d6b36a] transition hover:text-white"
                  >
                    SEND ANOTHER MESSAGE
                  </button>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* ERROR */}

                  {error && (
                    <div className="border border-red-400/30 bg-red-400/5 px-5 py-4 text-sm text-red-300">
                      {error}
                    </div>
                  )}


                  {/* NAME + EMAIL */}

                  <div className="grid gap-6 sm:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
                        YOUR NAME
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
                      />

                    </div>


                    <div>

                      <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
                        EMAIL ADDRESS
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
                      />

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div>

                    <label className="mb-2 block text-[9px] tracking-[0.25em] text-white/40">
                      YOUR MESSAGE
                    </label>

                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wedding, event or film production..."
                      required
                      className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#d6b36a]"
                    />

                  </div>


                  {/* SUBMIT */}

                  <div className="flex flex-col items-start justify-between gap-6 pt-3 sm:flex-row sm:items-center">

                    <p className="max-w-xs text-[9px] leading-5 tracking-wider text-white/25">
                      YOSIEAL FILM PRODUCTION
                      <br />
                      Addis Ababa, Ethiopia
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-5 border border-[#d6b36a] px-7 py-4 text-[9px] tracking-[0.3em] text-[#d6b36a] transition duration-300 hover:bg-[#d6b36a] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {submitting
                        ? "SENDING..."
                        : "SEND MESSAGE"}

                      <span className="text-base transition duration-300 group-hover:translate-x-2">
                        →
                      </span>

                    </button>

                  </div>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">

        <div className="mb-8 flex items-end justify-between gap-6">

          <div>

            <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
              FIND OUR STUDIO
            </span>

            <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
              Visit YOSIEAL
            </h2>

          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Addis+Ababa+Lebu+Mebraten"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-3 border-b border-[#d6b36a]/50 pb-2 text-[9px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white sm:flex"
          >
            GET DIRECTIONS

            <span className="text-sm">
              →
            </span>

          </a>

        </div>


        <div className="relative h-[360px] overflow-hidden border border-white/10 bg-[#0b0b0b] sm:h-[450px]">

          <iframe
            title="YOSIEAL Film Production Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.751765275537!2d38.7420!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOGKwNTgnMjQuMiJOIDM4wrA0NCczMS4yIkU!5e0!3m2!1sen!2set!4v1650000000000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="pointer-events-none absolute bottom-5 left-5 border border-white/10 bg-black/80 px-5 py-4 backdrop-blur-md">

            <span className="block text-[8px] tracking-[0.3em] text-[#d6b36a]">
              YOSIEAL STUDIO
            </span>

            <span className="mt-1 block text-xs text-white/70">
              Addis Ababa · Lebu Mebraten
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-y border-white/10 bg-[#090909]">

        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center lg:px-12">

          <div>

            <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
              YOSIEAL FILM PRODUCTION
            </span>

            <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
              Ready to tell your story?
            </h2>

          </div>

          <a
            href="tel:+251976130175"
            className="group inline-flex items-center gap-5 border border-[#d6b36a] px-7 py-4 text-[9px] tracking-[0.3em] text-[#d6b36a] transition hover:bg-[#d6b36a] hover:text-black"
          >
            CALL YOSIEAL

            <span className="text-base transition group-hover:translate-x-2">
              →
            </span>

          </a>

        </div>

      </section>


      <Footer />

    </main>
  );
}