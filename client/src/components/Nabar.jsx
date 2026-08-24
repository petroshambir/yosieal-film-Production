

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/YOSIEL_LOGO_WZ_P.N.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [galleryLinks, setGalleryLinks] = useState([]);

  useEffect(() => {
    fetch('https://habesha-film-production-server.onrender.com/api/projects')
      .then(res => res.json())
      .then(data => {
        setGalleryLinks(data);
      })
      .catch(err => console.log("Error fetching navbar categories:", err));
  }, []);

  const generateSlug = (titleText) => {
    if (!titleText) return '';
    return titleText
      .toLowerCase()
      .replace(/["']/g, '')
      .replace(/&/g, 'and')
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
 

// <nav className="absolute top-0 left-0 z-50 w-full px-5 sm:px-8 lg:px-12 py-5 text-white">

//   {/* =========================
//       NAVBAR MAIN
//   ========================== */}
//   <div className="relative flex w-full items-center">

//     {/* =========================
//         LOGO
//         Mobile: Right
//         Desktop: Left + slightly right
//     ========================== */}
//     <Link
//       to="/home"
//       className="
//         order-2
//         md:order-1
//         flex-shrink-0
//         md:ml-10
//         lg:ml-16
//       "
//     >
//       <img
//         src={logo}
//         alt="Yosieal Logo"
//         className="
//           w-14 h-14
//           md:w-20 md:h-20
//           rounded-full
//           object-cover
//         "
//       />
//     </Link>


//     {/* =========================
//         BURGER - MOBILE
//     ========================== */}
//     <button
//       type="button"
//       className="
//         order-1
//         md:hidden
//         ml-1
//         text-2xl
//         leading-none
//         transition-opacity
//         hover:opacity-70
//       "
//       onClick={() => setIsOpen(!isOpen)}
//       aria-label="Toggle navigation menu"
//     >
//       {isOpen ? "✕" : "☰"}
//     </button>


//     {/* =========================
//         NAVIGATION
//     ========================== */}
//     <div
//       className={`
//         order-3

//         absolute
//         top-full
//         left-0
//         w-full
//         mt-5

//         px-5
//         py-5

//         bg-black/95
//         backdrop-blur-md

//         flex
//         flex-col

//         text-xs
//         font-semibold
//         uppercase
//         tracking-[0.18em]

//         ${isOpen ? "flex" : "hidden"}

//         md:static
//         md:mt-0

//         md:ml-auto
//         md:mr-8
//         lg:mr-16

//         md:w-auto
//         md:px-0
//         md:py-0

//         md:bg-transparent
//         md:backdrop-blur-none

//         md:flex-row
//         md:items-center
//         md:justify-center

//         md:gap-7
//         lg:gap-9

//         md:flex
//       `}
//     >

//       {/* HOME */}
//       <Link
//         to="/home"
//         onClick={() => setIsOpen(false)}
//         className="
//           group
//           relative
//           py-4
//           text-center
//           whitespace-nowrap

//           text-[#e7ddc7]

//           transition-colors
//           duration-300

//           hover:text-white

//           md:py-2
//         "
//       >
//         Home

//         <span
//           className="
//             absolute
//             left-1/2
//             bottom-0

//             h-[1px]
//             w-0

//             -translate-x-1/2

//             bg-[#bfb8ad]

//             transition-all
//             duration-300

//             group-hover:w-8
//           "
//         />
//       </Link>


//       {/* ABOUT */}
//       <Link
//         to="/about"
//         onClick={() => setIsOpen(false)}
//         className="
//           group
//           relative
//           py-4
//           text-center
//           whitespace-nowrap

//           text-[#e7ddc7]

//           transition-colors
//           duration-300

//           hover:text-white

//           md:py-2
//         "
//       >
//         About

//         <span
//           className="
//             absolute
//             left-1/2
//             bottom-0

//             h-[1px]
//             w-0

//             -translate-x-1/2

//             bg-[#d8ae55]

//             transition-all
//             duration-300

//             group-hover:w-8
//           "
//         />
//       </Link>

// {/* ========================= GALLERY ========================= */}
// <div className="relative py-4 md:py-2" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
//   {/* Gallery Button */}
//   <button type="button" onClick={() => setWorkOpen(!workOpen)} className="group relative flex w-full items-center justify-center gap-1.5 whitespace-nowrap text-[#f5feff] transition-all duration-300 hover:text-white">
//     <span>Gallery</span>

//     {/* Arrow */}
//     <span className={`text-[9px] transition-transform duration-300 ${workOpen ? "rotate-180" : "rotate-0"}`}>
//       ▾
//     </span>

//     {/* Gold underline */}
//     <span className="absolute left-1/2 bottom-[-9px] h-[1px] w-0 -translate-x-1/2 bg-[#d8ae55] shadow-[0_0_8px_rgba(216,174,85,0.45)] transition-all duration-300 group-hover:w-10" />
//   </button>

//   {/* ========================= GALLERY DROPDOWN ========================= */}
//   {workOpen && (
//     <div className="absolute top-[calc(100%+0.8rem)] right-0 z-50 w-60 overflow-hidden rounded-xl border border-[#d8ae55]/20 bg-[#241610]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] animate-fadeIn">

//       {/* Dropdown Header */}
//       <div className="px-5 pt-4 pb-3 border-b border-white/10">
//         <div className="flex items-center gap-2">
//           <span className="h-1.5 w-1.5 rounded-full bg-[#d8ae55] shadow-[0_0_8px_rgba(216,174,85,0.8)]" />

//           <span className="text-[9px] uppercase tracking-[0.3em] text-[#d8ae55] font-semibold">
//             Our Gallery
//           </span>
//         </div>

//         <p className="mt-1.5 text-[8px] uppercase tracking-[0.18em] text-white/40">
//           Explore our visual stories
//         </p>
//       </div>

//       {/* Gallery Items */}
//       <div className="px-2 py-2">
//         {galleryLinks.length > 0 ? (
//           galleryLinks.map((item, index) => {
//             const rawTitle = item.title ? item.title.replace(/"/g, "") : "";
//             const slug = generateSlug(item.title);

//             return (
//               <Link
//                 key={item._id || index}
//                 to={`/gallery/${slug}`}
//                 onClick={() => {
//                   setWorkOpen(false);
//                   setIsOpen(false);
//                 }}
//                 className="group relative flex items-center justify-between rounded-lg px-3 py-3 text-[#f3eee8] transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
//               >
//                 {/* Left side */}
//                 <div className="flex items-center gap-3">
//                   {/* Number */}
//                   <span className="w-5 text-[8px] tracking-widest text-[#d8ae55]/50 transition-colors duration-300 group-hover:text-[#d8ae55]">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   {/* Title */}
//                   <span className="text-[11px] uppercase tracking-[0.12em] transition-all duration-300 group-hover:translate-x-1">
//                     {rawTitle}
//                   </span>
//                 </div>

//                 {/* Arrow */}
//                 <span className="text-[11px] text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d8ae55]">
//                   →
//                 </span>

//                 {/* Gold hover line */}
//                 <span className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-[#d8ae55] transition-all duration-300 group-hover:h-7" />
//               </Link>
//             );
//           })
//         ) : (
//           <div className="px-3 py-5 text-center text-[9px] uppercase tracking-[0.2em] text-white/40">
//             Loading...
//           </div>
//         )}
//       </div>

//       {/* Bottom Gold Accent */}
//       <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d8ae55]/50 to-transparent" />
//     </div>
//   )}
// </div>


//       {/* PRICE */}
//       <Link
//         to="/price"
//         onClick={() => setIsOpen(false)}
//         className="
//           group
//           relative
//           py-4
//           text-center
//           whitespace-nowrap

//           text-[#e7ddc7]

//           transition-colors
//           duration-300

//           hover:text-white

//           md:py-2
//         "
//       >
//         Price

//         <span
//           className="
//             absolute
//             left-1/2
//             bottom-0

//             h-[1px]
//             w-0

//             -translate-x-1/2

//             bg-[#d8ae55]

//             transition-all
//             duration-300

//             group-hover:w-8
//           "
//         />
//       </Link>


//       {/* CONTACT */}
//       <Link
//         to="/contact"
//         onClick={() => setIsOpen(false)}
//         className="
//           group
//           relative
//           py-4
//           text-center
//           whitespace-nowrap

//           text-[#e7ddc7]

//           transition-colors
//           duration-300

//           hover:text-white

//           md:py-2
//         "
//       >
//         Contact

//         <span
//           className="
//             absolute
//             left-1/2
//             bottom-0

//             h-[1px]
//             w-0

//             -translate-x-1/2

//             bg-[#d8ae55]

//             transition-all
//             duration-300

//             group-hover:w-8
//           "
//         />
//       </Link>


//       {/* CLIENT SELECTION */}
//       <Link
//         to="/client-selection"
//         onClick={() => setIsOpen(false)}
//         className="
//           group
//           relative
//           py-4
//           text-center
//           whitespace-nowrap

//           font-bold
//           text-[#f5feff]

//           transition-colors
//           duration-300

//           hover:text-white

//           md:py-2
//         "
//       >
//         Client Selection

//         <span
//           className="
//             absolute
//             left-1/2
//             bottom-0

//             h-[1px]
//             w-0

//             -translate-x-1/2

//             bg-[#d8ae55]

//             transition-all
//             duration-300

//             group-hover:w-full
//           "
//         />
//       </Link>

//     </div>

//   </div>

// </nav>
<nav className="absolute top-0 left-0 z-50 w-full px-5 sm:px-8 lg:px-12 py-5 text-white">

  {/* =========================
      NAVBAR MAIN
  ========================== */}
  <div className="relative flex w-full items-center justify-between">

    {/* =========================
        BURGER - MOBILE ONLY
        LEFT SIDE
    ========================== */}
    <button
      type="button"
      className="
        order-1
        md:hidden
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        text-2xl
        leading-none
        text-white
        transition-opacity
        duration-300
        hover:opacity-70
      "
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      {isOpen ? "✕" : "☰"}
    </button>


    {/* =========================
        LOGO
        MOBILE: RIGHT SIDE
        DESKTOP: LEFT SIDE
    ========================== */}
    <Link
      to="/home"
      className="
        order-2
        md:order-1
        flex-shrink-0
        md:ml-10
        lg:ml-16
      "
    >
      <img
        src={logo}
        alt="Yosieal Logo"
        className="
          w-14
          h-14
          md:w-20
          md:h-20
          rounded-full
          object-cover
        "
      />
    </Link>


    {/* =========================
        NAVIGATION
    ========================== */}
    <div
      className={`
        order-3

        absolute
        top-full
        left-0
        w-full
        mt-5

        px-5
        py-5

        bg-black/95
        backdrop-blur-md

        flex
        flex-col

        text-xs
        font-semibold
        uppercase
        tracking-[0.18em]

        ${isOpen ? "flex" : "hidden"}

        md:static
        md:mt-0

        md:ml-auto
        md:mr-8
        lg:mr-16

        md:w-auto
        md:px-0
        md:py-0

        md:bg-transparent
        md:backdrop-blur-none

        md:flex-row
        md:items-center
        md:justify-center

        md:gap-7
        lg:gap-9

        md:flex
      `}
    >

      {/* =========================
          HOME
      ========================== */}
      <Link
        to="/home"
        onClick={() => setIsOpen(false)}
        className="
          group
          relative
          py-4
          text-center
          whitespace-nowrap
          text-[#e7ddc7]
          transition-colors
          duration-300
          hover:text-white
          md:py-2
        "
      >
        Home

        <span
          className="
            absolute
            left-1/2
            bottom-0
            h-[1px]
            w-0
            -translate-x-1/2
            bg-[#bfb8ad]
            transition-all
            duration-300
            group-hover:w-8
          "
        />
      </Link>


      {/* =========================
          ABOUT
      ========================== */}
      <Link
        to="/about"
        onClick={() => setIsOpen(false)}
        className="
          group
          relative
          py-4
          text-center
          whitespace-nowrap
          text-[#e7ddc7]
          transition-colors
          duration-300
          hover:text-white
          md:py-2
        "
      >
        About

        <span
          className="
            absolute
            left-1/2
            bottom-0
            h-[1px]
            w-0
            -translate-x-1/2
            bg-[#d8ae55]
            transition-all
            duration-300
            group-hover:w-8
          "
        />
      </Link>


      {/* =========================
          GALLERY
      ========================== */}
      <div
        className="relative py-4 md:py-2"
        onMouseEnter={() => setWorkOpen(true)}
        onMouseLeave={() => setWorkOpen(false)}
      >

        {/* Gallery Button */}
        <button
          type="button"
          onClick={() => setWorkOpen(!workOpen)}
          className="
            group
            relative
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            whitespace-nowrap
            text-[#f5feff]
            transition-all
            duration-300
            hover:text-white
          "
        >
          <span>Gallery</span>

          {/* Arrow */}
          <span
            className={`
              text-[9px]
              transition-transform
              duration-300
              ${workOpen ? "rotate-180" : "rotate-0"}
            `}
          >
            ▾
          </span>

          {/* Gold underline */}
          <span
            className="
              absolute
              left-1/2
              bottom-[-9px]
              h-[1px]
              w-0
              -translate-x-1/2
              bg-[#d8ae55]
              shadow-[0_0_8px_rgba(216,174,85,0.45)]
              transition-all
              duration-300
              group-hover:w-10
            "
          />
        </button>


        {/* =========================
            GALLERY DROPDOWN
        ========================== */}
        {workOpen && (
          <div
            className="
              absolute
              top-[calc(100%+0.8rem)]
              right-0
              z-50
              w-60
              overflow-hidden
              rounded-xl
              border
              border-[#d8ae55]/20
              bg-[#241610]/95
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.55)]
              animate-fadeIn
            "
          >

            {/* Dropdown Header */}
            <div className="border-b border-white/10 px-5 pb-3 pt-4">

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d8ae55]
                    shadow-[0_0_8px_rgba(216,174,85,0.8)]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#d8ae55]
                  "
                >
                  Our Gallery
                </span>

              </div>

              <p
                className="
                  mt-1.5
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
              >
                Explore our visual stories
              </p>

            </div>


            {/* Gallery Items */}
            <div className="px-2 py-2">

              {galleryLinks.length > 0 ? (

                galleryLinks.map((item, index) => {

                  const rawTitle = item.title
                    ? item.title.replace(/"/g, "")
                    : "";

                  const slug = generateSlug(item.title);

                  return (
                    <Link
                      key={item._id || index}
                      to={`/gallery/${slug}`}
                      onClick={() => {
                        setWorkOpen(false);
                        setIsOpen(false);
                      }}
                      className="
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        px-3
                        py-3
                        text-[#f3eee8]
                        transition-all
                        duration-300
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >

                      {/* Left side */}
                      <div className="flex items-center gap-3">

                        {/* Number */}
                        <span
                          className="
                            w-5
                            text-[8px]
                            tracking-widest
                            text-[#d8ae55]/50
                            transition-colors
                            duration-300
                            group-hover:text-[#d8ae55]
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Title */}
                        <span
                          className="
                            text-[11px]
                            uppercase
                            tracking-[0.12em]
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          {rawTitle}
                        </span>

                      </div>


                      {/* Arrow */}
                      <span
                        className="
                          text-[11px]
                          text-white/20
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-[#d8ae55]
                        "
                      >
                        →
                      </span>


                      {/* Gold hover line */}
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2
                          h-0
                          w-[2px]
                          -translate-y-1/2
                          rounded-full
                          bg-[#d8ae55]
                          transition-all
                          duration-300
                          group-hover:h-7
                        "
                      />

                    </Link>
                  );

                })

              ) : (

                <div
                  className="
                    px-3
                    py-5
                    text-center
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/40
                  "
                >
                  Loading...
                </div>

              )}

            </div>


            {/* Bottom Gold Accent */}
            <div
              className="
                h-[1px]
                w-full
                bg-gradient-to-r
                from-transparent
                via-[#d8ae55]/50
                to-transparent
              "
            />

          </div>
        )}

      </div>


      {/* =========================
          PRICE
      ========================== */}
      <Link
        to="/price"
        onClick={() => setIsOpen(false)}
        className="
          group
          relative
          py-4
          text-center
          whitespace-nowrap
          text-[#e7ddc7]
          transition-colors
          duration-300
          hover:text-white
          md:py-2
        "
      >
        Price

        <span
          className="
            absolute
            left-1/2
            bottom-0
            h-[1px]
            w-0
            -translate-x-1/2
            bg-[#d8ae55]
            transition-all
            duration-300
            group-hover:w-8
          "
        />
      </Link>


      {/* =========================
          CONTACT
      ========================== */}
      <Link
        to="/contact"
        onClick={() => setIsOpen(false)}
        className="
          group
          relative
          py-4
          text-center
          whitespace-nowrap
          text-[#e7ddc7]
          transition-colors
          duration-300
          hover:text-white
          md:py-2
        "
      >
        Contact

        <span
          className="
            absolute
            left-1/2
            bottom-0
            h-[1px]
            w-0
            -translate-x-1/2
            bg-[#d8ae55]
            transition-all
            duration-300
            group-hover:w-8
          "
        />
      </Link>


      {/* =========================
          CLIENT SELECTION
      ========================== */}
      <Link
        to="/client-selection"
        onClick={() => setIsOpen(false)}
        className="
          group
          relative
          py-4
          text-center
          whitespace-nowrap
          font-bold
          text-[#f5feff]
          transition-colors
          duration-300
          hover:text-white
          md:py-2
        "
      >
        Client Selection

        <span
          className="
            absolute
            left-1/2
            bottom-0
            h-[1px]
            w-0
            -translate-x-1/2
            bg-[#d8ae55]
            transition-all
            duration-300
            group-hover:w-full
          "
        />
      </Link>

    </div>

  </div>

</nav>
  );
}

export default Navbar;