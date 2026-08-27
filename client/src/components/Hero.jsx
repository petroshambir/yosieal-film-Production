
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Nabar";
import Welcome from "../assets/videos/YOSIEL_LOGO_WZ_P.N (1).mp4";

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">

      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={Welcome}
          className="h-full w-full object-cover brightness-110 contrast-105 saturate-105"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6 pt-24 sm:px-10 md:px-16 lg:px-24">

        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-12 bg-[#d8ae55]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#f0ca75] sm:text-xs">
              Film Production Studio
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-6xl font-bold uppercase leading-[0.85] tracking-[-0.04em] text-white drop-shadow-2xl sm:text-8xl md:text-[110px] lg:text-[135px]">
            YOSIEAL
          </h1>

          {/* Gold line */}
          <div className="my-6 h-px w-24 bg-[#d8ae55]" />

          {/* Subtitle */}
          <h2 className="max-w-2xl text-xl font-light uppercase tracking-[0.18em] text-white sm:text-2xl md:text-3xl">
            Film Production
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Cinematic films, commercials and visual stories crafted
            with creativity, precision and a distinctive artistic vision.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-[#d8ae55] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-[#f0ca75] hover:shadow-[0_0_30px_rgba(216,174,85,0.35)] sm:px-7"
            >
              Start Your Story
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center border border-white/40 bg-black/10 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm transition duration-300 hover:border-[#d8ae55] hover:text-[#f0ca75] sm:px-7"
            >
              Discover Yosieal
            </Link>
          </div>

          {/* Studio Details */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.25em] text-white/55 sm:text-[10px]">
            <span>Film</span>
            <span className="h-1 w-1 rounded-full bg-[#d8ae55]" />
            <span>Commercials</span>
            <span className="h-1 w-1 rounded-full bg-[#d8ae55]" />
            <span>Visual Stories</span>
          </div>

        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[8px] uppercase tracking-[0.35em] text-white/50">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-[#d8ae55] to-transparent" />
      </div>

    </section>
  );
}

export default Hero;