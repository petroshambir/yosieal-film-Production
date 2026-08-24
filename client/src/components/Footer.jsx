
// import React from 'react';
// import { Link } from 'react-router-dom';

// import tiktokImg from '../assets/images/tiktok.jpeg';
// import instagramImg from '../assets/images/instagram.jpeg';
// import youtubeImg from '../assets/images/youtube.jpeg';
// import facebookImg from '../assets/images/facebook.jpeg';

// function Footer() {
//   return (
//     <footer className="bg-[#0a0a0a] text-white border-t border-white/10 py-16 px-6 md:px-24">
//       {/* 
//         text-center (ንሞባይል ማእከል ይገብሮ) 
//         md:text-left (ካብ ላፕቶፕ ንላዕሊ ናብ ጸጋም ይገብሮ) 
//         flex flex-col items-center md:block (ንኩሉ ትሕስቶ ኣብ ሞባይል ናብ ማእከል ይስሕቦ)
//       */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
//         {/* ንፋልማይ ክፋል */}
//         <div className="space-y-4 flex flex-col items-center md:items-start">
//           <h3 className="text-xl font-light tracking-widest uppercase">Habesha Film Production</h3>
//           <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
//             Crafting cinematic stories and timeless portraits for your most cherished moments. 
//           </p>
//         </div>

//         {/* ኮንታክት */}
//         <div className="space-y-4 flex flex-col items-center md:items-start">
//           <h4 className="text-sm uppercase tracking-[0.2em] text-white/50">Contact</h4>
//           <ul className="space-y-6 text-sm text-zinc-400">
//             <a href="mailto:Adalhambir946@gmail.com" className="hover:text-amber-400 transition-colors">
//               <li>Adalhambir946@gmail.com</li>
//             </a>
//             <br />
//             <a href="tel:+251976130175" className="hover:text-amber-400 transition-colors">
//               <li>Phone:+251 976130175</li>
//             </a>
//             <br />
//             <a href="tel:+251942746150" className="hover:text-amber-400 transition-colors">
//               <li>Phone:+251 942746150</li>
//             </a>
//             <br />
//             <a href="https://maps.google.com/?q=Addis+Ababa,+Ethiopia" className="hover:text-amber-400 transition-colors">
//               <li>Location: Addis Ababa, Ethiopia</li>
//             </a>
//           </ul>
//         </div>

//         {/* ሶሻል ሚድያ */}
//         <div className="space-y-4 flex flex-col items-center md:items-start">
//           <h4 className="text-sm uppercase tracking-[0.2em] text-white/50">Follow Us</h4>
//           {/* justify-center (ንሶሻል ሚድያ ስእልታት ኣብ ሞባይል ማእከል ይገብሮ) */}
//           <div className="flex items-center justify-center md:justify-start gap-6">
            
//             {/* ቲክቶክ ስእሊ (w-8 h-8 ኣብ ሞባይል ይዓቢ፣ md:w-6 md:h-6 ኣብ ላፕቶፕ ንቁሩብ ይመጣጠን) */}
//             <a href="https://www.tiktok.com/@habshapicture?_r=1&_t=ZS-98RLvYscrdH:opacity-80 transition-opacity">
//               <img src={tiktokImg} alt="TikTok" className="w-8 h-8 md:w-6 md:h-6 object-contain rounded-md" />
//             </a>

//             {/* ኢንስታግራም ስእሊ */}
//             <a href="https://www.instagram.com/habesha_pictuer?igsh=anF1OXc4dnB4bGs1acity-80 transition-opacity">
//               <img src={instagramImg} alt="Instagram" className="w-8 h-8 md:w-6 md:h-6 object-contain rounded-md" />
//             </a>

//             {/* ዩቱብ ስእሊ */}
//             {/* <a href="https://www.youtube.com/@joniphotographyofficial" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
//               <img src={youtubeImg} alt="YouTube" className="w-8 h-8 md:w-6 md:h-6 object-contain rounded-md" />
//             </a> */}

//             {/* ፌስቡክ ስእሊ */}
//             <a href="https://www.facebook.com/share/1BbUufnsKQ/" className="hover:opacity-80 transition-opacity">
//               <img src={facebookImg} alt="Facebook" className="w-8 h-8 md:w-6 md:h-6 object-contain rounded-md" />
//             </a>

//           </div>
//         </div>
//       </div>

//       {/* ታሕተዋይ ክፋል (Copyright & Admin link) */}
//       <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-zinc-600 text-[10px] uppercase tracking-[0.3em]">
//         <div>© 2026 HABESHA Studio. All rights reserved.</div>
        
//         <Link 
//           to="/admin-login" 
//           className="text-zinc-800 hover:text-zinc-500 transition-colors"
//         >
//           Admin
//         </Link>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

import tiktokImg from '../assets/images/tiktok.jpeg';
import instagramImg from '../assets/images/instagram.jpeg';
import youtubeImg from '../assets/images/youtube.jpeg';
import facebookImg from '../assets/images/facebook.jpeg';

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#d8ae55]/15 bg-[#070707] px-6 py-16 text-white md:px-12 lg:px-20">

      {/* =========================
          CINEMATIC BACKGROUND
      ========================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#d8ae55]/5 blur-3xl" />
        <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#d8ae55]/5 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,174,85,0.06),transparent_45%)]" />
      </div>


      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">


          {/* =========================
              BRAND
          ========================== */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">

            {/* Logo / Brand */}
            <Link
              to="/home"
              className="group mb-6 inline-flex items-center"
            >
              <div className="relative">

                {/* Gold Ring */}
                <div className="absolute -inset-1 rounded-full border border-[#d8ae55]/30 transition-all duration-500 group-hover:border-[#d8ae55]/70 group-hover:shadow-[0_0_25px_rgba(216,174,85,0.18)]" />

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black">
                  <span className="font-serif text-xl tracking-widest text-[#d8ae55]">
                    Y
                  </span>
                </div>

              </div>

              <div className="ml-4">
                <h3 className="font-serif text-xl tracking-[0.18em] text-white">
                  YOSIEAL
                </h3>

                <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-[#d8ae55]">
                  Film Production
                </p>
              </div>
            </Link>


            {/* Description */}
            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              We capture authentic stories, meaningful celebrations,
              cultural moments, and cinematic memories through
              professional film production and photography.
            </p>


            {/* Gold line */}
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d8ae55]/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8ae55]" />
              <span className="h-px w-10 bg-[#d8ae55]/60" />
            </div>

          </div>



          {/* =========================
              CONTACT
          ========================== */}
          <div className="flex flex-col items-center md:items-start">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d8ae55]" />

              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8ae55]">
                Contact
              </h4>
            </div>


            <div className="space-y-5 text-center md:text-left">

              {/* Email */}
              <a
                href="mailto:petroshambirr@gmail.com"
                className="group flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-[#d8ae55] transition-all duration-300 group-hover:border-[#d8ae55]/40 group-hover:bg-[#d8ae55]/10">
                  @
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-[#d8ae55]">
                    petroshambirr@gmail.com
                  </p>
                </div>
              </a>


              {/* Phone 1 */}
              <a
                href="tel:+251976130175"
                className="group flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-[#d8ae55] transition-all duration-300 group-hover:border-[#d8ae55]/40 group-hover:bg-[#d8ae55]/10">
                  ☎
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-[#d8ae55]">
                    +251 976 130 175
                  </p>
                </div>
              </a>


              {/* Phone 2 */}
              <a
                href="tel:+251942746150"
                className="group flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-[#d8ae55] transition-all duration-300 group-hover:border-[#d8ae55]/40 group-hover:bg-[#d8ae55]/10">
                  ☎
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-[#d8ae55]">
                    +251 942 746 150
                  </p>
                </div>
              </a>


              {/* Location */}
              <a
                href="https://maps.google.com/?q=Addis+Ababa,+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-[#d8ae55] transition-all duration-300 group-hover:border-[#d8ae55]/40 group-hover:bg-[#d8ae55]/10">
                  ●
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Studio
                  </p>

                  <p className="mt-1 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-[#d8ae55]">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </a>

            </div>

          </div>



          {/* =========================
              SOCIAL MEDIA
          ========================== */}
          <div className="flex flex-col items-center md:items-start">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d8ae55]" />

              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8ae55]">
                Follow Us
              </h4>
            </div>


            <p className="mb-6 max-w-xs text-center text-sm leading-6 text-zinc-500 md:text-left">
              Follow YOSIEAL and discover our latest productions,
              stories, events, and cinematic work.
            </p>


            {/* Social Icons */}
            <div className="flex items-center gap-4">

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@habshapicture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d8ae55]/60 group-hover:shadow-[0_8px_25px_rgba(216,174,85,0.15)]">
                  <img
                    src={tiktokImg}
                    alt="TikTok"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>


              {/* Instagram */}
              <a
                href="https://www.instagram.com/habesha_pictuer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d8ae55]/60 group-hover:shadow-[0_8px_25px_rgba(216,174,85,0.15)]">
                  <img
                    src={instagramImg}
                    alt="Instagram"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>


              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d8ae55]/60 group-hover:shadow-[0_8px_25px_rgba(216,174,85,0.15)]">
                  <img
                    src={youtubeImg}
                    alt="YouTube"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>


              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1BbUufnsKQ/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d8ae55]/60 group-hover:shadow-[0_8px_25px_rgba(216,174,85,0.15)]">
                  <img
                    src={facebookImg}
                    alt="Facebook"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>

            </div>


            {/* CTA */}
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 border border-[#d8ae55]/40 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8ae55] transition-all duration-300 hover:bg-[#d8ae55] hover:text-black"
            >
              Start a Conversation
              <span>→</span>
            </Link>

          </div>

        </div>



        {/* =========================
            BOTTOM LINE
        ========================== */}
        <div className="mt-14 border-t border-white/10 pt-7">

          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

            <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-600">
              © 2026 YOSIEAL Film Production. All rights reserved.
            </p>

            <Link
              to="/admin-login"
              className="text-[9px] uppercase tracking-[0.25em] text-zinc-700 transition-colors duration-300 hover:text-[#d8ae55]"
            >
              Admin
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;