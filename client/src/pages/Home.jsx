
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Hero from '../components/Hero';
// import Footer from "../components/Footer";
// import ProtectedImage from '../components/ProtectedImage'; // 🔒 መከላኸሊ ኮምፖነንት

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look", "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow", "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows", "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail", "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances", "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace", "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family", "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day"
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins", "Tender Highlight", "Walking Together", "Shared Laughter",
//   "Featured Memory", "Pure Emotion", "Elegant Detail", "Evening Magic",
//   "Quiet Glance", "Cherished Moment", "Graceful Evening", "Bright Smile",
//   "Family Warmth", "Deep Connection", "Grand Finale"
// ];

// const generateSlug = (titleText) => {
//   if (!titleText) return '';
//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, '')
//     .replace(/&/g, 'and')
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-');
// };

// const fixImageUrl = (url) => {
//   if (!url) return '';
//   if (url.includes('localhost:5000')) {
//     return url.replace('http://localhost:5000', 'https://habesha-film-production-server.onrender.com');
//   }
//   return url;
// };

// function Home() {
//   const [open, setOpen] = useState(false);
//   const [currentImages] = useState([]);
//   const [title] = useState('');
//   const [sections, setSections] = useState([]); 

//   useEffect(() => {
//     fetch('https://habesha-film-production-server.onrender.com/api/projects')
//       .then(res => res.json())
//       .then(data => {
//         const processedData = data.map(section => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];
//           let mainDesc = section.desc || section.description || '';

//           try {
//             if (typeof section.description === 'string' && section.description.includes('||DESCS||')) {
//               const parts = section.description.split('||DESCS||');
//               mainDesc = parts[0] || '';
              
//               try { parsedDescriptions = parts[1] ? JSON.parse(parts[1]) : []; } catch(err) { parsedDescriptions = []; }
//               try { parsedHeadings = parts[2] ? JSON.parse(parts[2]) : []; } catch(err) { parsedHeadings = []; }
//             }
//           } catch (e) {
//             console.log("Error parsing section data", e);
//           }

//           const fixedImages = Array.isArray(section.images) 
//             ? section.images.map(img => fixImageUrl(img)) 
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings
//           };
//         });

//         setSections(processedData);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#dfb557]/30 selection:text-[#dfb557] overflow-x-hidden">
//       <Hero />

//       {title && <h1 className="text-center text-3xl md:text-4xl mt-10 text-zinc-100 px-4">{title}</h1>}


//       <section className="py-12 md:py-24 w-full">
//         {sections.map((section, index) => {
//           const titleLower = section.title ? section.title.toLowerCase() : '';
//           const isWedding = titleLower.includes('wedding');
//           const isBridalShower = titleLower.includes('bridal');
//           const isBabyShower = titleLower.includes('baby') || titleLower.includes('baptism');

//           const customDescriptions = section.descriptions?.length > 0 ? section.descriptions : DEFAULT_DESCRIPTIONS;
//           const customHeadings = section.headings?.length > 0 ? section.headings : DEFAULT_HEADINGS;

//           // Display title or names (whichever is available)
//           const displayHeading = section.names && section.names.trim() !== '' ? section.names : section.title;

//           return (
//             <div key={section._id || index} className="mb-20 md:mb-36 w-full border-b border-zinc-900 pb-16 md:pb-28 last:border-b-0">
              
//               {displayHeading && (
//                 <div className="mb-10 md:mb-16 text-center px-4">
//                   <span className="text-[9px] md:text-[11px] tracking-[0.5em] uppercase text-[#dfb557] font-medium block mb-2">
//                     Event Story & Timeline
//                   </span>
//                   <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-zinc-100 tracking-wide font-light">
//                     {displayHeading}
//                   </h3>
//                   <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto my-3"></div>
//                   <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-400 font-light">
//                     {section.date || "Featured Project"}
//                   </p>
//                 </div>
//               )}

//               {isWedding ? (
//                 <WeddingSection section={section} customHeadings={customHeadings} customDescriptions={customDescriptions} />
//               ) : isBridalShower ? (
//                 <BridalShowerSection section={section} customHeadings={customHeadings} customDescriptions={customDescriptions} />
//               ) : isBabyShower ? (
//                 <BabyShowerSection section={section} customHeadings={customHeadings} customDescriptions={customDescriptions} />
//               ) : (
//                 <DefaultSection section={section} />
//               )}
//             </div>
//           );
//         })}
//       </section>

//       <Lightbox open={open} close={() => setOpen(false)} slides={currentImages} />
//       <Footer />
//     </div>
//   );
// }

// function WeddingSection({ section, customHeadings, customDescriptions }) {
//   const images = Array.isArray(section.images) ? section.images : [];
//   const bottomGridImages = images.slice(10, 14);

//   return (
//     <div className="w-full space-y-10 md:space-y-16">
//       {images[0] && (
//         <div className="w-full max-w-4xl mx-auto px-4">
//           <div className="text-center max-w-lg mx-auto mb-6">
//             <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-1">
//               {customHeadings[0] || DEFAULT_HEADINGS[0]}
//             </span>
//             <p className="text-sm md:text-base text-zinc-300 font-light">
//               {customDescriptions[0] || DEFAULT_DESCRIPTIONS[0]}
//             </p>
//           </div>
//           <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl bg-zinc-900 border-2 border-[#dfb557]/40 relative">
//             <ProtectedImage src={images[0]} alt={section.title} className="w-full h-full" showLogoOnly={true} />
//           </div>
//         </div>
//       )}

//       {images.length > 1 && (
//         <div className="max-w-4xl mx-auto px-4 relative">
//           <div className="space-y-6 sm:space-y-12">
//             {images.slice(1, 5).map((img, i) => {
//               const actualIdx = i + 1;
//               const isEven = i % 2 === 0;
//               return (
//                 <ChapterRow key={i} img={img} actualIdx={actualIdx} isEven={isEven} sectionTitle={section.title} customHeadings={customHeadings} customDescriptions={customDescriptions} />
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {images[5] && (
//         <div className="w-full max-w-4xl mx-auto px-4 pt-4">
//           <div className="text-center max-w-lg mx-auto mb-6">
//             <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-1">
//               {customHeadings[5] || DEFAULT_HEADINGS[5]}
//             </span>
//             <p className="text-sm md:text-base text-zinc-300 font-light">
//               {customDescriptions[5] || DEFAULT_DESCRIPTIONS[5]}
//             </p>
//           </div>
//           <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl bg-zinc-900 border-2 border-[#dfb557]/40 relative">
//             <ProtectedImage src={images[5]} alt={section.title} className="w-full h-full" showLogoOnly={true} />
//           </div>
//         </div>
//       )}

//       {images.length > 6 && (
//         <div className="max-w-4xl mx-auto px-4 relative pt-4">
//           <div className="space-y-6 sm:space-y-12">
//             {images.slice(6, 10).map((img, i) => {
//               const actualIdx = i + 6;
//               const isEven = i % 2 === 0;
//               return (
//                 <ChapterRow key={i} img={img} actualIdx={actualIdx} isEven={isEven} sectionTitle={section.title} customHeadings={customHeadings} customDescriptions={customDescriptions} />
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {bottomGridImages.length > 0 && (
//         <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
//           <div className="text-center max-w-lg mx-auto mb-4">
//             <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-1">
//               {customHeadings[10] || "Album Highlights"}
//             </span>
//             <p className="text-xs md:text-sm text-zinc-300 font-light">
//               {customDescriptions[10] || "A collection of beautiful moments captured in pristine detail."}
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-3 sm:gap-6">
//             {bottomGridImages.map((img, i) => {
//               const actualIdx = i + 10;
//               return (
//                 <div key={i} className="space-y-2 p-2 sm:p-3 rounded-xl bg-zinc-950/70 border border-[#dfb557]/30 shadow-xl flex flex-col justify-between">
//                   <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#dfb557]/50 bg-zinc-900 relative">
//                     <ProtectedImage src={img} alt={section.title} className="w-full h-full hover:scale-105 transition-transform duration-500" showLogoOnly={true} />
//                   </div>
//                   <div className="text-center space-y-1">
//                     <span className="text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-[#dfb557] font-bold block">
//                       Moment 0{actualIdx + 1}
//                     </span>
//                     <h4 className="text-[11px] sm:text-sm font-serif text-zinc-100 line-clamp-1">
//                       {customHeadings[actualIdx] || DEFAULT_HEADINGS[actualIdx] || "Precious Memory"}
//                     </h4>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       <div className="text-center pt-8 px-4">
//         <Link to={`/gallery/${generateSlug(section.title)}`} className="text-[11px] font-bold uppercase tracking-[0.3em] border-2 border-[#dfb557] px-8 py-3.5 text-[#dfb557] hover:bg-[#dfb557] hover:text-black transition-all duration-300 inline-block rounded-xl shadow-lg">
//           View Full Gallery
//         </Link>
//       </div>
//     </div>
//   );
// }

// function ChapterRow({ img, actualIdx, isEven, sectionTitle, customHeadings, customDescriptions }) {
//   return (
//     <div className={`flex items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-zinc-950/70 border-2 border-[#dfb557]/50 shadow-2xl ${isEven ? 'flex-row-reverse text-right sm:text-left' : 'flex-row text-left sm:text-right'}`}>
//       <div className={`flex-1 ${isEven ? 'sm:text-left text-right' : 'sm:text-right text-left'} space-y-1.5`}>
//         <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#dfb557] font-bold block">
//           Chapter 0{actualIdx}
//         </span>
//         <h4 className="text-base sm:text-2xl font-serif text-zinc-100">
//           {customHeadings[actualIdx] || DEFAULT_HEADINGS[actualIdx]}
//         </h4>
//         <p className="text-[11px] sm:text-sm text-zinc-300 font-light leading-relaxed">
//           {customDescriptions[actualIdx] || DEFAULT_DESCRIPTIONS[actualIdx]}
//         </p>
//       </div>
//       <div className="relative flex-shrink-0 flex justify-center">
//         <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-[#dfb557] shadow-xl bg-zinc-900 hover:scale-105 transition-transform duration-500 flex-shrink-0">
//           <ProtectedImage src={img} alt={sectionTitle} className="w-full h-full" showLogoOnly={true} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function BridalShowerSection({ section, customHeadings, customDescriptions }) {
//   const images = Array.isArray(section.images) ? section.images : [];
//   const pairs = [];
//   for (let i = 0; i < images.length; i += 2) {
//     pairs.push(images.slice(i, i + 2));
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 space-y-12">
//       <div className="text-center space-y-2 mb-8">
//         <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block">
//           Bridal Shower Celebration
//         </span>
//         <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100">{section.title}</h2>
//         <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto"></div>
//         <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">{section.desc || section.description}</p>
//       </div>

//       <div className="space-y-10">
//         {pairs.map((pair, pairIdx) => (
//           <div key={pairIdx} className="p-2 sm:p-6 rounded-2xl bg-zinc-950/75 border-2 border-[#dfb557]/40 shadow-xl space-y-4">
//             <div className="grid grid-cols-2 gap-2 sm:gap-6">
//               {pair.map((img, imgIdx) => {
//                 const absoluteIdx = (pairIdx * 2) + imgIdx;
//                 return (
//                   <div key={imgIdx} className="space-y-2 flex flex-col justify-between">
//                     <div className="w-full aspect-[3/4] sm:aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border-2 border-[#dfb557]/60 shadow-lg bg-zinc-900">
//                       <ProtectedImage src={img} alt={section.title} className="w-full h-full hover:scale-105 transition-transform duration-500" showLogoOnly={true} />
//                     </div>
//                     <div className="text-center space-y-1 px-1">
//                       <span className="text-[7px] sm:text-[10px] tracking-[0.2em] uppercase text-[#dfb557] font-bold block">
//                         Moment 0{absoluteIdx + 1}
//                       </span>
//                       <h4 className="text-[11px] sm:text-lg font-serif text-zinc-100 line-clamp-1">
//                         {customHeadings[absoluteIdx] || `Precious Moment ${absoluteIdx + 1}`}
//                       </h4>
//                       <p className="text-[9px] sm:text-xs text-zinc-300 font-light leading-snug line-clamp-2">
//                         {customDescriptions[absoluteIdx] || `Celebrating the joy and warmth of this special bridal shower journey.`}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center pt-6">
//         <Link to={`/gallery/${generateSlug(section.title)}`} className="text-[11px] font-bold uppercase tracking-[0.3em] border-2 border-[#dfb557] px-8 py-3 text-[#dfb557] hover:bg-[#dfb557] hover:text-black transition-all duration-300 inline-block rounded-xl shadow-md">
//           View Full Gallery
//         </Link>
//       </div>
//     </div>
//   );
// }

// function BabyShowerSection({ section, customHeadings, customDescriptions }) {
//   const images = Array.isArray(section.images) ? section.images : [];

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 space-y-8">
//       <div className="text-center space-y-2 mb-8">
//         <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block">
//           Baby Shower & Baptism Celebration
//         </span>
//         <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100">{section.title}</h2>
//         <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto"></div>
//         <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">{section.desc || section.description}</p>
//       </div>

//       <div className="space-y-6 sm:space-y-10">
//         {images.map((img, i) => {
//           const isEven = i % 2 === 0;
//           return (
//             <div key={i} className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 rounded-2xl bg-zinc-950/70 border-2 border-[#dfb557]/40 shadow-xl ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
//               <div className="w-full sm:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-[#dfb557]/50 shadow-md bg-zinc-900 flex-shrink-0">
//                 <ProtectedImage src={img} alt={section.title} className="w-full h-full hover:scale-105 transition-transform duration-500" showLogoOnly={true} />
//               </div>
//               <div className="w-full sm:w-1/2 space-y-2 text-center sm:text-left">
//                 <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#dfb557] font-bold block">
//                   Moment 0{i + 1}
//                 </span>
//                 <h4 className="text-lg sm:text-xl font-serif text-zinc-100">
//                   {customHeadings[i] || `Precious Moment ${i + 1}`}
//                 </h4>
//                 <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
//                   {customDescriptions[i] || `Celebrating the joy and warmth of this special journey.`}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="text-center pt-6">
//         <Link to={`/gallery/${generateSlug(section.title)}`} className="text-[11px] font-bold uppercase tracking-[0.3em] border-2 border-[#dfb557] px-8 py-3 text-[#dfb557] hover:bg-[#dfb557] hover:text-black transition-all duration-300 inline-block rounded-xl shadow-md">
//           View Full Gallery
//         </Link>
//       </div>
//     </div>
//   );
// }

// function DefaultSection({ section }) {
//   const images = Array.isArray(section.images) ? section.images : [];

//   return (
//     <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center space-y-6 py-6">
//       <span className="text-[10px] tracking-[0.5em] uppercase text-[#dfb557] font-bold">
//         Curated Project
//       </span>
//       <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-100">{section.title}</h2>
//       <p className="text-sm md:text-base leading-relaxed text-zinc-400 max-w-lg font-light">
//         {section.desc || section.description}
//       </p>

//       <div className="grid grid-cols-2 gap-4 w-full pt-4 max-w-2xl">
//         {images.slice(0, 2).map((img, i) => (
//           <div key={i} className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-[#dfb557]/40 rounded-xl shadow-lg">
//             <ProtectedImage src={img} alt={section.title} className="w-full h-full" showLogoOnly={true} />
//           </div>
//         ))}
//       </div>
      
//       <div className="pt-4">
//         <Link to={`/gallery/${generateSlug(section.title)}`} className="text-[11px] font-bold uppercase tracking-[0.3em] border-2 border-[#dfb557] px-8 py-3 text-[#dfb557] hover:bg-[#dfb557] hover:text-black transition-all duration-300 inline-block rounded-xl shadow-md">
//           Explore Project
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Home;


// import React,{useEffect,useState}from"react";
// import{Link}from"react-router-dom";
// import Hero from"../components/Hero";
// import Footer from"../components/Footer";
// import ProtectedImage from"../components/ProtectedImage";
// import Lightbox from"yet-another-react-lightbox";
// import"yet-another-react-lightbox/styles.css";


// const DEFAULT_DESCRIPTIONS=[
// "The Beginning of Forever — Our First Look","A Tender Moment Caught in Time","Walking Hand in Hand Towards Tomorrow","Joy and Laughter Shared with Loved Ones","The Grand Celebration and Vows","Unforgettable Emotions of the Day","Elegance in Every Single Detail","Dancing Under the Evening Lights","Sweet Whispers and Quiet Glances","Cherished Memories to Last a Lifetime","A Magical Evening Full of Grace","Smiles That Brighten the Whole World","Embracing the Warmth of Family","Looking Into Each Other's Eyes","The Perfect Ending to a Perfect Day"
// ];
// const DEFAULT_HEADINGS=["The Story Begins","Tender Highlight","Walking Together","Shared Laughter","Featured Memory","Pure Emotion","Elegant Detail","Evening Magic","Quiet Glance","Cherished Moment","Graceful Evening","Bright Smile","Family Warmth","Deep Connection","Grand Finale"];
// const generateSlug=t=>!t?"":t.toLowerCase().replace(/["']/g,"").replace(/&/g,"and").trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-");
// const fixImageUrl=url=>url?.includes("localhost:5000")?url.replace("http://localhost:5000","https://habesha-film-production-server.onrender.com"):url;

// function Home(){
//  const[sections,setSections]=useState([]);
//  const[open,setOpen]=useState(false);
//  const[featured,setFeatured]=useState(0);
//  useEffect(()=>{
//   fetch("https://habesha-film-production-server.onrender.com/api/projects")
//    .then(r=>r.json()).then(data=>setSections(data.map(s=>{
//     let desc=s.desc||s.description||"",descriptions=[],headings=[];
//     if(typeof s.description==="string"&&s.description.includes("||DESCS||")){
//      const p=s.description.split("||DESCS||");desc=p[0]||"";
//      try{descriptions=p[1]?JSON.parse(p[1]):[]}catch{}
//      try{headings=p[2]?JSON.parse(p[2]):[]}catch{}
//     }
//     return{...s,images:Array.isArray(s.images)?s.images.map(fixImageUrl):[],desc,descriptions,headings};
//    }))).catch(console.error);
//  },[]);
//  const allImages=sections.flatMap(s=>s.images||[]);
//  const featuredImage=allImages[featured];
//  const next=()=>setFeatured(i=>allImages.length?(i+1)%allImages.length:0);
//  const prev=()=>setFeatured(i=>allImages.length?(i-1+allImages.length)%allImages.length:0);
//  return <main className="home">
//   <Hero/>
//   {allImages.length>0&&<section className="cinematic-hero">
//    <div className="featured-image">
//     <ProtectedImage src={featuredImage} alt="Featured film production" className="featured-photo" showLogoOnly={true}/>
//     <div className="featured-shade"/>
//     <div className="featured-content">
//      <span>YOSIEAL FILM PRODUCTION</span>
//      <h1>Stories.<br/><i>Captured.</i><br/>Forever.</h1>
//      <p>Wedding • Events • Cinematic Production</p>
//     </div>
//     <div className="slider-controls">
//      <button onClick={prev} aria-label="Previous">←</button>
//      <div><b>{String(featured+1).padStart(2,"0")}</b><span>/ {String(allImages.length).padStart(2,"0")}</span></div>
//      <button onClick={next} aria-label="Next">→</button>
//     </div>
//     <div className="slider-progress"><span style={{width:`${((featured+1)/allImages.length)*100}%`}}/></div>
//    </div>
//   </section>}
//   <section className="projects">
//    <div className="section-intro"><span>OUR WORK</span><h2>Stories <i>in Motion</i></h2><p>Every frame is crafted with intention, emotion and cinematic precision.</p></div>
//    {sections.map((section,index)=>{
//     const title=(section.title||"Project").toLowerCase();
//     const wedding=title.includes("wedding"),bridal=title.includes("bridal"),baby=title.includes("baby")||title.includes("baptism");
//     const headings=section.headings?.length?section.headings:DEFAULT_HEADINGS;
//     const descriptions=section.descriptions?.length?section.descriptions:DEFAULT_DESCRIPTIONS;
//     return <article className="project" key={section._id||index}>
//      <header className="project-head"><div><small>PROJECT {String(index+1).padStart(2,"0")}</small><h2>{section.names?.trim()||section.title}</h2></div><span>{section.date||"CINEMATIC STORY"}</span></header>
//      {wedding?<Wedding section={section} headings={headings} descriptions={descriptions}/>:bridal?<Bridal section={section} headings={headings} descriptions={descriptions}/>:baby?<Baby section={section} headings={headings} descriptions={descriptions}/>:<Default section={section}/>}
//     </article>
//    })}
//   </section>
//   <Lightbox open={open} close={()=>setOpen(false)} slides={[]}/>
//   <Footer/>
//  </main>
// }

// function Wedding({section,headings,descriptions}){
//  const imgs=section.images||[];
//  return <div className="cinematic-grid">
//   {imgs.slice(0,10).map((img,i)=><div className={`shot shot-${i+1}`} key={i}>
//    <div className="shot-image"><ProtectedImage src={img} alt={section.title} className="photo" showLogoOnly={true}/></div>
//    <div className="shot-copy"><small>{String(i+1).padStart(2,"0")} / {headings[i]||"Cinematic Moment"}</small><p>{descriptions[i]||""}</p></div>
//   </div>)}
//   <div className="project-button"><Link to={`/gallery/${generateSlug(section.title)}`}>VIEW FULL GALLERY <span>→</span></Link></div>
//  </div>
// }

// function Bridal({section,headings,descriptions}){
//  const imgs=section.images||[];
//  return <div className="editorial-grid">
//   {imgs.map((img,i)=><div className={`editorial-card ${i%3===1?"tall":""}`} key={i}>
//    <div><ProtectedImage src={img} alt={section.title} className="photo" showLogoOnly={true}/><span>{String(i+1).padStart(2,"0")}</span></div>
//    <h3>{headings[i]||`Precious Moment ${i+1}`}</h3><p>{descriptions[i]||"A beautiful moment preserved in time."}</p>
//   </div>)}
//   <div className="project-button"><Link to={`/gallery/${generateSlug(section.title)}`}>VIEW FULL GALLERY <span>→</span></Link></div>
//  </div>
// }

// function Baby({section,headings,descriptions}){
//  const imgs=section.images||[];
//  return <div className="film-list">
//   {imgs.map((img,i)=><div className="film-row" key={i}>
//    <div className="film-number">{String(i+1).padStart(2,"0")}</div>
//    <div className="film-photo"><ProtectedImage src={img} alt={section.title} className="photo" showLogoOnly={true}/></div>
//    <div className="film-copy"><small>CHAPTER {String(i+1).padStart(2,"0")}</small><h3>{headings[i]||`Precious Moment ${i+1}`}</h3><p>{descriptions[i]||"A story captured with warmth and emotion."}</p></div>
//   </div>)}
//   <div className="project-button"><Link to={`/gallery/${generateSlug(section.title)}`}>VIEW FULL GALLERY <span>→</span></Link></div>
//  </div>
// }

// function Default({section}){
//  const imgs=section.images||[];
//  return <div className="default-project">
//   <div className="default-copy"><small>CURATED PROJECT</small><h3>{section.title}</h3><p>{section.desc||section.description}</p><Link to={`/gallery/${generateSlug(section.title)}`}>EXPLORE PROJECT →</Link></div>
//   <div className="default-images">{imgs.slice(0,4).map((img,i)=><div key={i}><ProtectedImage src={img} alt={section.title} className="photo" showLogoOnly={true}/></div>)}</div>
//  </div>
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error(
//           "Projects loading error:",
//           error
//         );

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length
//         ? 0
//         : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden">

//             <div className="relative h-[62vh] min-h-[480px] max-h-[820px] w-full sm:h-[68vh] lg:h-[78vh]">

//               {/* IMAGE */}

//               <ProtectedImage
//                 src={featuredImage}
//                 alt="Featured film production"
//                 className="absolute inset-0 h-full w-full object-cover"
//                 showLogoOnly={true}
//               />

//               {/* OVERLAY */}

//               <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/20" />

//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

//               {/* TOP LABEL */}

//               <div className="absolute left-5 top-6 z-10 sm:left-8 sm:top-8 lg:left-14 lg:top-12">

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* MAIN TEXT */}

//               <div className="absolute bottom-28 left-5 z-10 max-w-[650px] sm:bottom-32 sm:left-8 lg:bottom-36 lg:left-14">

//                 <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                   Wedding • Events • Cinematic Production
//                 </p>

//                 <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                   Stories.

//                   <br />

//                   <span className="italic text-[#e2c58b]">
//                     Captured.
//                   </span>

//                   <br />

//                   Forever.

//                 </h1>

//                 <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                   <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                     Every frame tells a story. We preserve
//                     the emotion, elegance and unforgettable
//                     moments of your most important days.
//                   </p>

//                 </div>

//               </div>

//               {/* CONTROLS */}

//               <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:bottom-9 sm:right-8 lg:bottom-12 lg:right-14">

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   aria-label="Previous image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   ←
//                 </button>

//                 <div className="min-w-[75px] text-center">

//                   <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                   <span className="mx-1 text-xs text-white/40">
//                     /
//                   </span>

//                   <span className="text-xs text-white/50">
//                     {String(allImages.length).padStart(2, "0")}
//                   </span>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   aria-label="Next image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   →
//                 </button>

//               </div>

//               {/* PROGRESS */}

//               <div className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-white/10">

//                 <span
//                   className="block h-full bg-[#d6b36a] transition-all duration-500"
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <main className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date ||
//                           "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (

//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />

//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (

//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />

//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (

//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />

//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (

//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />

//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </main>

//       {/* LIGHTBOX */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 /{" "}
//               {headings[0] ||
//                 "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] ||
//                 "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 lg:order-2 aspect-[16/10]"
//           />

//         </div>

//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const index = i + 6;

//             return (

//               <div
//                 key={`chapter-${index}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${
//                   i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"
//                 }`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[index] ||
//                       DEFAULT_HEADINGS[index]}
//                   </h3>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const index = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${index}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <div className="aspect-[4/5] overflow-hidden bg-white/5">

//                     <ProtectedImage
//                       src={img}
//                       alt={section.title}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                       showLogoOnly={true}
//                     />

//                   </div>

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(index + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[index] ||
//                         DEFAULT_HEADINGS[index] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {

//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`group relative block w-full overflow-hidden bg-[#111] text-left ${className}`}
//     >

//       <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
//         showLogoOnly={true}
//       />

//       <span className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-lg backdrop-blur-md transition duration-300 group-hover:border-[#d6b36a] group-hover:bg-[#d6b36a] group-hover:text-black">
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             <div className="overflow-hidden bg-white/5">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
//                 showLogoOnly={true}
//               />

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`aspect-[4/3] ${
//                 i % 2 === 1
//                   ? "lg:order-2"
//                   : ""
//               }`}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {

//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="group inline-flex items-center gap-5 border-b border-[#d6b36a]/50 pb-3 text-[10px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white"
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error(
//           "Projects loading error:",
//           error
//         );

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length
//         ? 0
//         : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden">

//             <div className="relative h-[62vh] min-h-[480px] max-h-[820px] w-full sm:h-[68vh] lg:h-[78vh]">

//               {/* BIG CROPPED HERO IMAGE */}

//               <ProtectedImage
//                 src={featuredImage}
//                 alt="Featured film production"
//                 className="absolute inset-0 h-full w-full object-cover"
//                 showLogoOnly={true}
//               />

//               {/* OVERLAY */}

//               <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/20" />

//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

//               {/* TOP LABEL */}

//               <div className="absolute left-5 top-6 z-10 sm:left-8 sm:top-8 lg:left-14 lg:top-12">

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* MAIN TEXT */}

//               <div className="absolute bottom-28 left-5 z-10 max-w-[650px] sm:bottom-32 sm:left-8 lg:bottom-36 lg:left-14">

//                 <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                   Wedding • Events • Cinematic Production
//                 </p>

//                 <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                   Stories.

//                   <br />

//                   <span className="italic text-[#e2c58b]">
//                     Captured.
//                   </span>

//                   <br />

//                   Forever.

//                 </h1>

//                 <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                   <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                     Every frame tells a story. We preserve
//                     the emotion, elegance and unforgettable
//                     moments of your most important days.
//                   </p>

//                 </div>

//               </div>

//               {/* CONTROLS */}

//               <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:bottom-9 sm:right-8 lg:bottom-12 lg:right-14">

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   aria-label="Previous image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   ←
//                 </button>

//                 <div className="min-w-[75px] text-center">

//                   <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                   <span className="mx-1 text-xs text-white/40">
//                     /
//                   </span>

//                   <span className="text-xs text-white/50">
//                     {String(allImages.length).padStart(2, "0")}
//                   </span>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   aria-label="Next image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   →
//                 </button>

//               </div>

//               {/* PROGRESS */}

//               <div className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-white/10">

//                 <span
//                   className="block h-full bg-[#d6b36a] transition-all duration-500"
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date ||
//                           "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </section>

//       {/* LIGHTBOX */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-20">

//       {/* ===================================================
//           FEATURE IMAGE
//       =================================================== */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 /{" "}
//               {headings[0] ||
//                 "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] ||
//                 "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 lg:order-2 aspect-[16/10]"
//           />

//         </div>

//       )}

//       {/* ===================================================
//           EDITORIAL GRID
//           SMALLER IMAGES INSIDE CLEAN FRAMES
//       =================================================== */}

//       {images.length > 1 && (

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               {/* FRAME */}

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//                 contain={true}
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* ===================================================
//           SECOND FEATURE
//       =================================================== */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* ===================================================
//           CHAPTERS
//       =================================================== */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${
//                   i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"
//                 }`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* ===================================================
//           FINAL CUT
//       =================================================== */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   {/* SMALL FRAME */}

//                   <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-[#111] p-3 transition duration-500 group-hover:border-[#d6b36a]/50">

//                     <div className="h-full w-full overflow-hidden bg-black">

//                       <ProtectedImage
//                         src={img}
//                         alt={section.title}
//                         className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
//                         showLogoOnly={true}
//                       />

//                     </div>

//                   </div>

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE

//    contain = true
//    -> image stays SMALL inside frame
//    -> NO CROPPING
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
//   contain = false,
// }) {

//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`group relative block w-full overflow-hidden bg-[#111] text-left ${className}`}
//     >

//       {/* OUTER FRAME */}

//       {contain ? (

//         <div className="absolute inset-0 z-0 border border-white/10 bg-[#0b0b0b] p-4 transition duration-500 group-hover:border-[#d6b36a]/50 sm:p-5">

//           <div className="relative h-full w-full overflow-hidden bg-black">

//             <ProtectedImage
//               src={src}
//               alt={alt}
//               className="h-full w-full object-contain p-2 transition duration-700 ease-out group-hover:scale-[1.03]"
//               showLogoOnly={true}
//             />

//           </div>

//         </div>

//       ) : (

//         <>
//           {/* IMAGE */}

//           <ProtectedImage
//             src={src}
//             alt={alt}
//             className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
//             showLogoOnly={true}
//           />

//           {/* DARK OVERLAY */}

//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />
//         </>

//       )}

//       {/* PLUS BUTTON */}

//       <span className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-lg backdrop-blur-md transition duration-300 group-hover:border-[#d6b36a] group-hover:bg-[#d6b36a] group-hover:text-black">
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             {/* FRAME */}

//             <div className="overflow-hidden border border-white/10 bg-[#111] p-3 transition duration-500 group-hover:border-[#d6b36a]/50">

//               <div className="overflow-hidden bg-black">

//                 <ProtectedImage
//                   src={img}
//                   alt={section.title}
//                   className="h-auto max-h-[600px] w-full object-contain transition duration-700 group-hover:scale-[1.02]"
//                   showLogoOnly={true}
//                 />

//               </div>

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`aspect-[4/3] ${
//                 i % 2 === 1
//                   ? "lg:order-2"
//                   : ""
//               }`}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//               contain={true}
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {

//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="group inline-flex items-center gap-5 border-b border-[#d6b36a]/50 pb-3 text-[10px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white"
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error(
//           "Projects loading error:",
//           error
//         );

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length
//         ? 0
//         : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

//             {/* OUTER FRAME */}

//             <div className="relative overflow-hidden border border-white/10 bg-[#111] shadow-2xl">

//               {/* GOLD FRAME LINE */}

//               <div className="pointer-events-none absolute inset-3 z-30 border border-[#d6b36a]/30 sm:inset-4 lg:inset-5" />

//               <div className="relative flex h-[58vh] min-h-[430px] max-h-[760px] w-full items-center justify-center bg-[#0d0d0d] sm:h-[64vh] lg:h-[72vh]">

//                 {/* IMAGE FRAME */}

//                 <div className="relative h-[calc(100%-32px)] w-[calc(100%-32px)] overflow-hidden sm:h-[calc(100%-42px)] sm:w-[calc(100%-42px)] lg:h-[calc(100%-52px)] lg:w-[calc(100%-52px)]">

//                   {/* subtle background */}

//                   <div className="absolute inset-0 bg-[#111]" />

//                   {/* IMAGE */}

//                   <ProtectedImage
//                     src={featuredImage}
//                     alt="Featured film production"
//                     className="relative z-10 h-full w-full object-contain object-center"
//                     showLogoOnly={true}
//                   />

//                   {/* SOFT OVERLAY */}

//                   <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />

//                   <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/5" />

//                 </div>

//                 {/* TOP LABEL */}

//                 <div className="absolute left-7 top-7 z-40 sm:left-10 sm:top-10 lg:left-16 lg:top-14">

//                   <div className="flex items-center gap-3">

//                     <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                     <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                       YOSIEAL FILM PRODUCTION
//                     </span>

//                   </div>

//                 </div>

//                 {/* MAIN TEXT */}

//                 <div className="absolute bottom-24 left-7 z-40 max-w-[620px] sm:bottom-28 sm:left-10 lg:bottom-32 lg:left-16">

//                   <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     Wedding • Events • Cinematic Production
//                   </p>

//                   <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                     Stories.

//                     <br />

//                     <span className="italic text-[#e2c58b]">
//                       Captured.
//                     </span>

//                     <br />

//                     Forever.

//                   </h1>

//                   <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                     <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                       Every frame tells a story. We preserve
//                       the emotion, elegance and unforgettable
//                       moments of your most important days.
//                     </p>

//                   </div>

//                 </div>

//                 {/* CONTROLS */}

//                 <div className="absolute bottom-7 right-7 z-50 flex items-center gap-3 sm:bottom-9 sm:right-10 lg:bottom-12 lg:right-16">

//                   <button
//                     type="button"
//                     onClick={previousFeatured}
//                     aria-label="Previous image"
//                     className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                   >
//                     ←
//                   </button>

//                   <div className="min-w-[75px] text-center">

//                     <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                       {String(featured + 1).padStart(2, "0")}
//                     </span>

//                     <span className="mx-1 text-xs text-white/40">
//                       /
//                     </span>

//                     <span className="text-xs text-white/50">
//                       {String(allImages.length).padStart(2, "0")}
//                     </span>

//                   </div>

//                   <button
//                     type="button"
//                     onClick={nextFeatured}
//                     aria-label="Next image"
//                     className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                   >
//                     →
//                   </button>

//                 </div>

//                 {/* PROGRESS */}

//                 <div className="absolute bottom-0 left-0 z-50 h-[2px] w-full bg-white/10">

//                   <span
//                     className="block h-full bg-[#d6b36a] transition-all duration-500"
//                     style={{
//                       width: `${
//                         ((featured + 1) /
//                           allImages.length) *
//                         100
//                       }%`,
//                     }}
//                   />

//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <main className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date ||
//                           "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (

//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>

//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (

//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />

//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (

//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />

//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (

//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />

//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (

//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />

//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </main>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    IMPORTANT:
//    - object-contain
//    - no cropping
//    - image stays completely visible
//    - elegant frame
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {

//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`group relative block w-full overflow-hidden bg-[#111] text-left ${className}`}
//     >

//       {/* OUTER FRAME */}

//       <div className="absolute inset-0 z-30 pointer-events-none border border-white/10" />

//       {/* INNER GOLD FRAME */}

//       <div className="absolute inset-2 z-30 pointer-events-none border border-[#d6b36a]/20 sm:inset-3" />

//       {/* IMAGE BACKGROUND */}

//       <div className="absolute inset-0 bg-[#0e0e0e]" />

//       {/* IMAGE */}

//       <div className="absolute inset-3 flex items-center justify-center overflow-hidden sm:inset-4">

//         <ProtectedImage
//           src={src}
//           alt={alt}
//           className="h-full w-full object-contain object-center"
//           showLogoOnly={true}
//         />

//       </div>

//       {/* SOFT GRADIENT */}

//       <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//       {/* PLUS BUTTON */}

//       <span className="absolute bottom-5 right-5 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-lg backdrop-blur-md transition duration-300 group-hover:border-[#d6b36a] group-hover:bg-[#d6b36a] group-hover:text-black">
//         +
//       </span>

//     </button>

//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 /{" "}
//               {headings[0] ||
//                 "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] ||
//                 "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 lg:order-2 aspect-[16/10]"
//           />

//         </div>

//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${
//                   i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"
//                 }`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );

//           })}

//         </div>

//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#111]">

//                     <div className="absolute inset-2 z-20 border border-[#d6b36a]/20 pointer-events-none" />

//                     <div className="absolute inset-4 flex items-center justify-center overflow-hidden">

//                       <ProtectedImage
//                         src={img}
//                         alt={section.title}
//                         className="h-full w-full object-contain object-center"
//                         showLogoOnly={true}
//                       />

//                     </div>

//                   </div>

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );

//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden border border-white/10 bg-[#111] p-2">

//               <div className="pointer-events-none absolute inset-3 z-20 border border-[#d6b36a]/20" />

//               <div className="flex items-center justify-center bg-[#0e0e0e]">

//                 <ProtectedImage
//                   src={img}
//                   alt={section.title}
//                   className="h-auto max-h-[650px] w-full object-contain"
//                   showLogoOnly={true}
//                 />

//               </div>

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`aspect-[4/3] ${
//                 i % 2 === 1
//                   ? "lg:order-2"
//                   : ""
//               }`}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {

//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {

//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="group inline-flex items-center gap-5 border-b border-[#d6b36a]/50 pb-3 text-[10px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white"
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    IMAGE FRAME
//    IMPORTANT:
//    object-contain = NEVER CROP THE IMAGE
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div
//       className={`
//         relative
//         overflow-hidden
//         bg-[#0d0d0d]
//         border
//         border-white/10
//         ${className}
//       `}
//     >
//       {/* subtle inner frame */}
//       <div className="pointer-events-none absolute inset-[5px] z-20 border border-white/10" />

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           h-full
//           w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//         "
//         showLogoOnly={true}
//       />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error(
//           "Projects loading error:",
//           error
//         );

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length
//         ? 0
//         : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO SLIDER
//           IMAGE IS NEVER CROPPED
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">

//             <div
//               className="
//                 relative
//                 mx-auto
//                 w-full
//                 overflow-hidden
//                 border
//                 border-white/10
//                 bg-[#0b0b0b]
//                 shadow-2xl
//                 h-[58vh]
//                 min-h-[430px]
//                 max-h-[780px]
//                 sm:h-[64vh]
//                 lg:h-[72vh]
//               "
//             >

//               {/* IMAGE FRAME */}

//               <ProtectedImage
//                 src={featuredImage}
//                 alt="Featured film production"
//                 className="
//                   absolute
//                   inset-0
//                   h-full
//                   w-full
//                   object-contain
//                   object-center
//                 "
//                 showLogoOnly={true}
//               />

//               {/* OUTER DARK VIGNETTE */}

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/15 to-black/10" />

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

//               {/* INNER FRAME */}

//               <div className="pointer-events-none absolute inset-4 z-20 border border-white/15 sm:inset-6 lg:inset-8" />

//               {/* TOP LABEL */}

//               <div className="absolute left-8 top-8 z-30 sm:left-12 sm:top-10 lg:left-16 lg:top-12">

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* MAIN TEXT */}

//               <div className="absolute bottom-24 left-8 z-30 max-w-[560px] sm:bottom-28 sm:left-12 lg:bottom-32 lg:left-16">

//                 <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                   Wedding • Events • Cinematic Production
//                 </p>

//                 <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                   Stories.

//                   <br />

//                   <span className="italic text-[#e2c58b]">
//                     Captured.
//                   </span>

//                   <br />

//                   Forever.

//                 </h1>

//                 <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                   <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                     Every frame tells a story. We preserve
//                     the emotion, elegance and unforgettable
//                     moments of your most important days.
//                   </p>

//                 </div>

//               </div>

//               {/* CONTROLS */}

//               <div className="absolute bottom-7 right-8 z-30 flex items-center gap-3 sm:bottom-9 sm:right-12 lg:bottom-12 lg:right-16">

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   aria-label="Previous image"
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/30
//                     text-lg
//                     text-white
//                     backdrop-blur-md
//                     transition
//                     duration-300
//                     hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:h-12
//                     sm:w-12
//                   "
//                 >
//                   ←
//                 </button>

//                 <div className="min-w-[75px] text-center">

//                   <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                   <span className="mx-1 text-xs text-white/40">
//                     /
//                   </span>

//                   <span className="text-xs text-white/50">
//                     {String(allImages.length).padStart(2, "0")}
//                   </span>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   aria-label="Next image"
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/30
//                     text-lg
//                     text-white
//                     backdrop-blur-md
//                     transition
//                     duration-300
//                     hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:h-12
//                     sm:w-12
//                   "
//                 >
//                   →
//                 </button>

//               </div>

//               {/* PROGRESS */}

//               <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/10">

//                 <span
//                   className="block h-full bg-[#d6b36a] transition-all duration-500"
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <main className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date ||
//                           "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </main>

//       {/* LIGHTBOX */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 /{" "}
//               {headings[0] ||
//                 "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] ||
//                 "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 lg:order-2 aspect-[16/10]"
//           />

//         </div>

//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const index = i + 6;

//             return (

//               <div
//                 key={`chapter-${index}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${
//                   i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"
//                 }`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[index] ||
//                       DEFAULT_HEADINGS[index]}
//                   </h3>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const index = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${index}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <ImageFrame
//                     src={img}
//                     alt={section.title}
//                     className="aspect-[4/5]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(index + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[index] ||
//                         DEFAULT_HEADINGS[index] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    NO CROP
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`
//         group
//         relative
//         block
//         w-full
//         overflow-hidden
//         bg-[#0d0d0d]
//         text-left
//         ${className}
//       `}
//     >

//       {/* IMAGE */}

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           h-full
//           w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//           group-hover:scale-[1.02]
//         "
//         showLogoOnly={true}
//       />

//       {/* DARK GRADIENT */}

//       <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

//       {/* BEAUTIFUL INNER FRAME */}

//       <div className="pointer-events-none absolute inset-2 z-20 border border-white/15 transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-3" />

//       {/* OPEN BUTTON */}

//       <span className="
//         absolute
//         bottom-4
//         right-4
//         z-30
//         flex
//         h-9
//         w-9
//         items-center
//         justify-center
//         rounded-full
//         border
//         border-white/30
//         bg-black/40
//         text-lg
//         backdrop-blur-md
//         transition
//         duration-300
//         group-hover:border-[#d6b36a]
//         group-hover:bg-[#d6b36a]
//         group-hover:text-black
//       ">
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             {/* AUTO HEIGHT = NO CROPPING */}

//             <div className="
//               relative
//               overflow-hidden
//               border
//               border-white/10
//               bg-[#0d0d0d]
//             ">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="
//                   block
//                   h-auto
//                   w-full
//                   object-contain
//                   transition
//                   duration-700
//                   group-hover:scale-[1.02]
//                 "
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-2 border border-white/15" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) {
//     return null;
//   }

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`
//                 aspect-[4/3]
//                 ${i % 2 === 1
//                   ? "lg:order-2"
//                   : ""}
//               `}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT{" "}
//                 {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="
//           group
//           inline-flex
//           items-center
//           gap-5
//           border-b
//           border-[#d6b36a]/50
//           pb-3
//           text-[10px]
//           tracking-[0.25em]
//           text-[#d6b36a]
//           transition
//           hover:border-[#d6b36a]
//           hover:text-white
//         "
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    IMAGE FRAME
//    IMPORTANT:
//    - NO CROPPING
//    - KEEP ORIGINAL IMAGE RATIO
//    - CENTER IMAGE
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div
//       className={`
//         relative
//         flex
//         items-center
//         justify-center
//         overflow-hidden
//         bg-[#0d0d0d]
//         border
//         border-white/10
//         ${className}
//       `}
//     >
//       <div className="pointer-events-none absolute inset-[5px] z-20 border border-white/10" />

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//         "
//         showLogoOnly={true}
//       />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           /*
//            * BACKEND FORMAT:
//            * main description ||DESCS|| descriptions || headings
//            */
//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error(
//           "Projects loading error:",
//           error
//         );

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length ? 0 : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO SLIDER
//           NO IMAGE CROPPING
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">

//             <div
//               className="
//                 relative
//                 flex
//                 h-[58vh]
//                 min-h-[430px]
//                 max-h-[780px]
//                 w-full
//                 items-center
//                 justify-center
//                 overflow-hidden
//                 border
//                 border-white/10
//                 bg-[#0b0b0b]
//                 shadow-2xl
//                 sm:h-[64vh]
//                 lg:h-[72vh]
//               "
//             >

//               {/* IMAGE - NO CROP */}

//               <ProtectedImage
//                 src={featuredImage}
//                 alt="Featured film production"
//                 className="
//                   block
//                   h-auto
//                   w-auto
//                   max-h-full
//                   max-w-full
//                   object-contain
//                   object-center
//                 "
//                 showLogoOnly={true}
//               />

//               {/* DARK VIGNETTE */}

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/15 to-black/10" />

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

//               {/* INNER FRAME */}

//               <div className="pointer-events-none absolute inset-4 z-20 border border-white/15 sm:inset-6 lg:inset-8" />

//               {/* TOP LABEL */}

//               <div className="absolute left-8 top-8 z-30 sm:left-12 sm:top-10 lg:left-16 lg:top-12">

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* MAIN TEXT */}

//               <div className="absolute bottom-24 left-8 z-30 max-w-[560px] sm:bottom-28 sm:left-12 lg:bottom-32 lg:left-16">

//                 <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                   Wedding • Events • Cinematic Production
//                 </p>

//                 <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                   Stories.

//                   <br />

//                   <span className="italic text-[#e2c58b]">
//                     Captured.
//                   </span>

//                   <br />

//                   Forever.

//                 </h1>

//                 <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                   <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                     Every frame tells a story. We preserve
//                     the emotion, elegance and unforgettable
//                     moments of your most important days.
//                   </p>

//                 </div>

//               </div>

//               {/* CONTROLS */}

//               <div className="absolute bottom-7 right-8 z-30 flex items-center gap-3 sm:bottom-9 sm:right-12 lg:bottom-12 lg:right-16">

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   aria-label="Previous image"
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/30
//                     text-lg
//                     text-white
//                     backdrop-blur-md
//                     transition
//                     duration-300
//                     hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:h-12
//                     sm:w-12
//                   "
//                 >
//                   ←
//                 </button>

//                 <div className="min-w-[75px] text-center">

//                   <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                   <span className="mx-1 text-xs text-white/40">
//                     /
//                   </span>

//                   <span className="text-xs text-white/50">
//                     {String(allImages.length).padStart(2, "0")}
//                   </span>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   aria-label="Next image"
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/30
//                     text-lg
//                     text-white
//                     backdrop-blur-md
//                     transition
//                     duration-300
//                     hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:h-12
//                     sm:w-12
//                   "
//                 >
//                   →
//                 </button>

//               </div>

//               {/* PROGRESS */}

//               <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/10">

//                 <span
//                   className="block h-full bg-[#d6b36a] transition-all duration-500"
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date ||
//                           "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </section>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING SECTION
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 / {headings[0] || "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] || "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 aspect-[16/10] lg:order-2"
//           />

//         </div>

//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${
//                   i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"
//                 }`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                   <p className="mt-4 text-sm leading-7 text-white/40">
//                     {descriptions[imageIndex] ||
//                       DEFAULT_DESCRIPTIONS[imageIndex]}
//                   </p>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <ImageFrame
//                     src={img}
//                     alt={section.title}
//                     className="aspect-[4/5]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    IMPORTANT:
//    - ORIGINAL RATIO
//    - NO CROP
//    - IMAGE CENTERED
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`
//         group
//         relative
//         flex
//         w-full
//         items-center
//         justify-center
//         overflow-hidden
//         bg-[#0d0d0d]
//         text-left
//         ${className}
//       `}
//     >

//       {/* IMAGE */}

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//           group-hover:scale-[1.01]
//         "
//         showLogoOnly={true}
//       />

//       {/* DARK GRADIENT */}

//       <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

//       {/* INNER FRAME */}

//       <div className="pointer-events-none absolute inset-2 z-20 border border-white/15 transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-3" />

//       {/* OPEN BUTTON */}

//       <span
//         className="
//           absolute
//           bottom-4
//           right-4
//           z-30
//           flex
//           h-9
//           w-9
//           items-center
//           justify-center
//           rounded-full
//           border
//           border-white/30
//           bg-black/40
//           text-lg
//           backdrop-blur-md
//           transition
//           duration-300
//           group-hover:border-[#d6b36a]
//           group-hover:bg-[#d6b36a]
//           group-hover:text-black
//         "
//       >
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden border border-white/10 bg-[#0d0d0d]">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="
//                   block
//                   h-auto
//                   w-full
//                   object-contain
//                   object-center
//                   transition
//                   duration-700
//                   group-hover:scale-[1.01]
//                 "
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-2 border border-white/15" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`aspect-[4/3] ${
//                 i % 2 === 1 ? "lg:order-2" : ""
//               }`}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="
//           group
//           inline-flex
//           items-center
//           gap-5
//           border-b
//           border-[#d6b36a]/50
//           pb-3
//           text-[10px]
//           tracking-[0.25em]
//           text-[#d6b36a]
//           transition
//           hover:border-[#d6b36a]
//           hover:text-white
//         "
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    IMAGE FRAME
//    - ORIGINAL IMAGE RATIO
//    - NO CROPPING
//    - NO SCALE
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div className={`relative flex items-center justify-center overflow-hidden border border-white/10 bg-[#0d0d0d] ${className}`}>
//       <div className="pointer-events-none absolute inset-[5px] z-20 border border-white/10" />

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="block h-full w-full object-contain object-center"
//         showLogoOnly={true}
//       />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts = section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images.map(fixImageUrl).filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error("Projects loading error:", error);

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images) ? section.images : []
//     );
//   }, [sections]);

//   /* =======================================================
//      KEEP FEATURED INDEX VALID
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length ? 0 : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({ src }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO SLIDER
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="relative w-full bg-[#070707]">

//           <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">

//             <div className="relative mx-auto flex h-[58vh] min-h-[430px] max-h-[780px] w-full items-center justify-center overflow-hidden border border-white/10 bg-[#0b0b0b] shadow-2xl sm:h-[64vh] lg:h-[72vh]">

//               {/* IMAGE
//                   IMPORTANT:
//                   IMAGE NEVER CROPPED
//                   IMAGE NEVER SCALED
//               */}

//               <ProtectedImage
//                 src={featuredImage}
//                 alt="Featured film production"
//                 className="block h-full w-full object-contain object-center"
//                 showLogoOnly={true}
//               />

//               {/* VIGNETTE */}

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/15 to-black/10" />

//               <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

//               {/* INNER FRAME */}

//               <div className="pointer-events-none absolute inset-4 z-20 border border-white/15 sm:inset-6 lg:inset-8" />

//               {/* TOP LABEL */}

//               <div className="absolute left-8 top-8 z-30 sm:left-12 sm:top-10 lg:left-16 lg:top-12">

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span className="text-[9px] font-medium tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* HERO TEXT */}

//               <div className="absolute bottom-24 left-8 z-30 max-w-[560px] sm:bottom-28 sm:left-12 lg:bottom-32 lg:left-16">

//                 <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#d6b36a] sm:text-[10px]">
//                   Wedding • Events • Cinematic Production
//                 </p>

//                 <h1 className="font-serif text-4xl font-light leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

//                   Stories.

//                   <br />

//                   <span className="italic text-[#e2c58b]">
//                     Captured.
//                   </span>

//                   <br />

//                   Forever.

//                 </h1>

//                 <div className="mt-6 max-w-md border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                   <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                     Every frame tells a story. We preserve
//                     the emotion, elegance and unforgettable
//                     moments of your most important days.
//                   </p>

//                 </div>

//               </div>

//               {/* CONTROLS */}

//               <div className="absolute bottom-7 right-8 z-30 flex items-center gap-3 sm:bottom-9 sm:right-12 lg:bottom-12 lg:right-16">

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   aria-label="Previous image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   ←
//                 </button>

//                 <div className="min-w-[75px] text-center">

//                   <span className="font-serif text-lg text-[#d6b36a] sm:text-xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                   <span className="mx-1 text-xs text-white/40">
//                     /
//                   </span>

//                   <span className="text-xs text-white/50">
//                     {String(allImages.length).padStart(2, "0")}
//                   </span>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   aria-label="Next image"
//                   className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 hover:border-[#d6b36a] hover:bg-[#d6b36a] hover:text-black sm:h-12 sm:w-12"
//                 >
//                   →
//                 </button>

//               </div>

//               {/* PROGRESS */}

//               <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/10">

//                 <span
//                   className="block h-full bg-[#d6b36a] transition-all duration-500"
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">

//               Stories

//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>

//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[120px_1fr_100px]">

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY / {section.date || "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {/* WEDDING */}

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BRIDAL */}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {/* BABY */}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {/* DEFAULT */}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </section>

//               );
//             })}

//           </div>

//         )}

//       </section>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING SECTION
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 / {headings[0] || "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] || "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] || DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 aspect-[16/10] lg:order-2"
//           />

//         </div>

//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="aspect-[4/5]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] || DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="aspect-[16/10]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] || DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] || DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-8 lg:grid-cols-3 ${i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-3"}`}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[imageIndex] || DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                   <p className="mt-4 text-sm leading-7 text-white/40">
//                     {descriptions[imageIndex] || DEFAULT_DESCRIPTIONS[imageIndex]}
//                   </p>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="aspect-[4/3] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <ImageFrame
//                     src={img}
//                     alt={section.title}
//                     className="aspect-[4/5]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[imageIndex] || DEFAULT_HEADINGS[imageIndex] || "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    - FRAME KEEPS ITS SIZE
//    - IMAGE NEVER CROPPED
//    - IMAGE NEVER ZOOMED
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`group relative flex w-full items-center justify-center overflow-hidden bg-[#0d0d0d] text-left ${className}`}
//     >

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="block h-full w-full object-contain object-center"
//         showLogoOnly={true}
//       />

//       {/* DARK GRADIENT */}

//       <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />

//       {/* INNER FRAME */}

//       <div className="pointer-events-none absolute inset-2 z-20 border border-white/15 sm:inset-3" />

//       {/* OPEN BUTTON */}

//       <span className="absolute bottom-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-lg backdrop-blur-md">
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden border border-white/10 bg-[#0d0d0d]">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="block h-auto w-full object-contain object-center"
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-2 border border-white/15" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] || `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] || "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (

//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`aspect-[4/3] ${i % 2 === 1 ? "lg:order-2" : ""}`}
//             />

//             <div className={i % 2 === 1 ? "lg:order-1" : ""}>

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] || `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] || "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="aspect-[4/5]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (

//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="group inline-flex items-center gap-5 border-b border-[#d6b36a]/50 pb-3 text-[10px] tracking-[0.25em] text-[#d6b36a] transition hover:border-[#d6b36a] hover:text-white"
//       >

//         <span>
//           {label}
//         </span>

//         <strong className="text-base">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    IMAGE FRAME
//    NO CROPPING
//    ORIGINAL IMAGE RATIO
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div
//       className={`
//         relative
//         flex
//         min-h-0
//         min-w-0
//         items-center
//         justify-center
//         overflow-hidden
//         bg-[#0b0b0b]
//         border
//         border-white/10
//         ${className}
//       `}
//     >
//       <div className="pointer-events-none absolute inset-[5px] z-20 border border-white/10" />

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//         "
//         showLogoOnly={true}
//       />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      FETCH PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error("Projects loading error:", error);

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      FEATURED INDEX
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length ? 0 : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   /* =======================================================
//      SLIDER
//   ======================================================= */

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({
//         src,
//       }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       <Hero />

//       {/* =====================================================
//           FEATURED HERO
//       ===================================================== */}

//       {allImages.length > 0 && (
//         <section className="w-full bg-[#070707]">

//           <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

//             <div
//               className="
//                 relative
//                 flex
//                 min-h-[520px]
//                 w-full
//                 items-center
//                 overflow-hidden
//                 border
//                 border-white/10
//                 bg-[#090909]
//                 shadow-2xl
//                 sm:min-h-[580px]
//                 lg:min-h-[680px]
//                 xl:min-h-[740px]
//               "
//             >

//               {/* =================================================
//                   IMAGE AREA
//                   IMAGE IS NEVER CROPPED
//               ================================================= */}

//               <div
//                 className="
//                   absolute
//                   inset-0
//                   flex
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   bg-[#090909]
//                 "
//               >

//                 <ProtectedImage
//                   src={featuredImage}
//                   alt="Featured film production"
//                   className="
//                     block
//                     h-auto
//                     w-auto
//                     max-h-full
//                     max-w-full
//                     object-contain
//                     object-center
//                   "
//                   showLogoOnly={true}
//                 />

//               </div>

//               {/* =================================================
//                   CINEMATIC OVERLAY
//               ================================================= */}

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   z-10
//                   bg-gradient-to-r
//                   from-black/85
//                   via-black/35
//                   to-black/5
//                 "
//               />

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   z-10
//                   bg-gradient-to-t
//                   from-black/80
//                   via-transparent
//                   to-black/15
//                 "
//               />

//               {/* =================================================
//                   INNER FRAME
//               ================================================= */}

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-4
//                   z-20
//                   border
//                   border-white/15
//                   sm:inset-6
//                   lg:inset-8
//                 "
//               />

//               {/* =================================================
//                   TOP BRAND
//               ================================================= */}

//               <div
//                 className="
//                   absolute
//                   left-8
//                   top-8
//                   z-30
//                   sm:left-12
//                   sm:top-10
//                   lg:left-16
//                   lg:top-12
//                 "
//               >

//                 <div className="flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#d6b36a] sm:w-12" />

//                   <span
//                     className="
//                       text-[9px]
//                       font-medium
//                       tracking-[0.35em]
//                       text-[#d6b36a]
//                       sm:text-[10px]
//                     "
//                   >
//                     YOSIEAL FILM PRODUCTION
//                   </span>

//                 </div>

//               </div>

//               {/* =================================================
//                   PROFESSIONAL HERO CONTENT
//               ================================================= */}

//               <div
//                 className="
//                   absolute
//                   inset-x-8
//                   bottom-24
//                   z-30
//                   flex
//                   items-end
//                   justify-between
//                   gap-8
//                   sm:inset-x-12
//                   sm:bottom-28
//                   lg:inset-x-16
//                   lg:bottom-32
//                 "
//               >

//                 {/* LEFT TEXT */}

//                 <div className="max-w-[620px]">

//                   <p
//                     className="
//                       mb-4
//                       text-[9px]
//                       uppercase
//                       tracking-[0.35em]
//                       text-[#d6b36a]
//                       sm:text-[10px]
//                     "
//                   >
//                     Wedding • Events • Cinematic Production
//                   </p>

//                   <h1
//                     className="
//                       font-serif
//                       text-4xl
//                       font-light
//                       leading-[0.9]
//                       tracking-tight
//                       text-white
//                       sm:text-6xl
//                       md:text-7xl
//                       lg:text-8xl
//                     "
//                   >
//                     Stories.
//                     <br />

//                     <span className="italic text-[#e2c58b]">
//                       Captured.
//                     </span>

//                     <br />

//                     Forever.
//                   </h1>

//                   <div className="mt-6 max-w-xl border-l border-[#d6b36a]/60 pl-4 sm:mt-8">

//                     <p className="text-xs font-light leading-6 text-white/70 sm:text-sm">
//                       Every frame tells a story. We preserve
//                       the emotion, elegance and unforgettable
//                       moments of your most important days.
//                     </p>

//                   </div>

//                 </div>

//                 {/* =================================================
//                     IMAGE NAVIGATION — RIGHT SIDE
//                 ================================================= */}

//                 <div
//                   className="
//                     hidden
//                     shrink-0
//                     items-center
//                     gap-3
//                     lg:flex
//                   "
//                 >

//                   <button
//                     type="button"
//                     onClick={previousFeatured}
//                     aria-label="Previous image"
//                     className="
//                       flex
//                       h-12
//                       w-12
//                       items-center
//                       justify-center
//                       border
//                       border-white/25
//                       bg-black/35
//                       text-lg
//                       text-white
//                       backdrop-blur-md
//                       transition
//                       duration-300
//                       hover:border-[#d6b36a]
//                       hover:bg-[#d6b36a]
//                       hover:text-black
//                     "
//                   >
//                     ←
//                   </button>

//                   <div className="min-w-[75px] text-center">

//                     <span className="font-serif text-xl text-[#d6b36a]">
//                       {String(featured + 1).padStart(2, "0")}
//                     </span>

//                     <span className="mx-1 text-xs text-white/40">
//                       /
//                     </span>

//                     <span className="text-xs text-white/50">
//                       {String(allImages.length).padStart(2, "0")}
//                     </span>

//                   </div>

//                   <button
//                     type="button"
//                     onClick={nextFeatured}
//                     aria-label="Next image"
//                     className="
//                       flex
//                       h-12
//                       w-12
//                       items-center
//                       justify-center
//                       border
//                       border-white/25
//                       bg-black/35
//                       text-lg
//                       text-white
//                       backdrop-blur-md
//                       transition
//                       duration-300
//                       hover:border-[#d6b36a]
//                       hover:bg-[#d6b36a]
//                       hover:text-black
//                     "
//                   >
//                     →
//                   </button>

//                 </div>

//               </div>

//               {/* =================================================
//                   MOBILE CONTROLS
//               ================================================= */}

//               <div
//                 className="
//                   absolute
//                   bottom-7
//                   right-8
//                   z-30
//                   flex
//                   items-center
//                   gap-3
//                   lg:hidden
//                 "
//               >

//                 <button
//                   type="button"
//                   onClick={previousFeatured}
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/40
//                     text-lg
//                     backdrop-blur-md
//                   "
//                 >
//                   ←
//                 </button>

//                 <span className="text-xs text-white/60">
//                   {String(featured + 1).padStart(2, "0")}
//                   {" / "}
//                   {String(allImages.length).padStart(2, "0")}
//                 </span>

//                 <button
//                   type="button"
//                   onClick={nextFeatured}
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     items-center
//                     justify-center
//                     border
//                     border-white/30
//                     bg-black/40
//                     text-lg
//                     backdrop-blur-md
//                   "
//                 >
//                   →
//                 </button>

//               </div>

//               {/* =================================================
//                   PROGRESS BAR
//               ================================================= */}

//               <div
//                 className="
//                   absolute
//                   bottom-0
//                   left-0
//                   z-30
//                   h-[2px]
//                   w-full
//                   bg-white/10
//                 "
//               >

//                 <span
//                   className="
//                     block
//                     h-full
//                     bg-[#d6b36a]
//                     transition-all
//                     duration-500
//                   "
//                   style={{
//                     width: `${
//                       ((featured + 1) /
//                         allImages.length) *
//                       100
//                     }%`,
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section
//         className="
//           mx-auto
//           w-full
//           max-w-7xl
//           px-5
//           py-24
//           sm:px-8
//           lg:px-12
//           lg:py-32
//         "
//       >

//         <div
//           className="
//             grid
//             gap-10
//             lg:grid-cols-[180px_1fr]
//           "
//         >

//           <div className="flex items-start gap-3 lg:flex-col">

//             <span className="h-px w-10 bg-[#d6b36a] lg:mt-3 lg:w-16" />

//             <span className="text-[10px] tracking-[0.35em] text-[#d6b36a]">
//               OUR WORK
//             </span>

//           </div>

//           <div className="max-w-4xl">

//             <h2
//               className="
//                 font-serif
//                 text-4xl
//                 font-light
//                 leading-tight
//                 sm:text-5xl
//                 lg:text-7xl
//               "
//             >
//               Stories
//               <span className="italic text-[#d6b36a]">
//                 {" "}in Motion
//               </span>
//             </h2>

//             <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//               Every frame is crafted with intention,
//               emotion and cinematic precision.
//               From intimate weddings to unforgettable
//               celebrations, we turn real moments into
//               timeless visual stories.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section
//         className="
//           mx-auto
//           w-full
//           max-w-7xl
//           px-5
//           pb-24
//           sm:px-8
//           lg:px-12
//         "
//       >

//         {loading ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-white/50">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[300px] items-center justify-center">

//             <span className="text-xs tracking-[0.3em] text-white/40">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <section
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* PROJECT HEADER */}

//                   <div
//                     className="
//                       mb-12
//                       grid
//                       gap-8
//                       border-b
//                       border-white/10
//                       pb-8
//                       lg:grid-cols-[120px_1fr_100px]
//                     "
//                   >

//                     <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#d6b36a]">

//                       <span>
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-8 bg-[#d6b36a]/50" />

//                       <span>
//                         PROJECT
//                       </span>

//                     </div>

//                     <div>

//                       <span className="text-[9px] tracking-[0.3em] text-white/40">
//                         EVENT STORY /{" "}
//                         {section.date || "FEATURED PROJECT"}
//                       </span>

//                       <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h2>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <div className="hidden items-start justify-end text-[9px] tracking-[0.3em] text-white/30 lg:flex">
//                       FILM
//                     </div>

//                   </div>

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </section>
//               );
//             })}

//           </div>
//         )}

//       </section>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING SECTION
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (
//     <div className="space-y-20">

//       {/* FEATURE */}

//       {images[0] && (
//         <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.6fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               01 / {headings[0] || "The Story Begins"}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[0] || "The Story Begins"}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="
//               order-1
//               min-h-[360px]
//               lg:order-2
//               lg:min-h-[520px]
//             "
//           />

//         </div>
//       )}

//       {/* EDITORIAL GRID */}

//       {images.length > 1 && (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (
//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="min-h-[320px]"
//               />

//               <div className="mt-4">

//                 <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                   {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/70">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (
//         <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="min-h-[400px] lg:min-h-[520px]"
//           />

//           <div>

//             <span className="text-[10px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-white/50">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>
//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (
//         <div className="space-y-16">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (
//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`
//                   grid
//                   items-center
//                   gap-8
//                   lg:grid-cols-3
//                   ${i % 2 === 0
//                     ? ""
//                     : "lg:[&>*:first-child]:order-3"}
//                 `}
//               >

//                 <div>

//                   <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-3 font-serif text-2xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                   <p className="mt-4 text-sm leading-7 text-white/40">
//                     {descriptions[imageIndex] ||
//                       DEFAULT_DESCRIPTIONS[imageIndex]}
//                   </p>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="min-h-[350px] lg:col-span-2 lg:min-h-[480px]"
//                 />

//               </div>
//             );
//           })}

//         </div>
//       )}

//       {/* FINAL CUT */}

//       {images.length > 10 && (
//         <div>

//           <div className="mb-8">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-2 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (
//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <ImageFrame
//                     src={img}
//                     alt={section.title}
//                     className="min-h-[320px]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-1 text-sm text-white/70">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>
//               );
//             })}

//           </div>

//         </div>
//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    IMPORTANT:
//    NO ASPECT RATIO
//    NO CROPPING
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`
//         group
//         relative
//         flex
//         min-h-[300px]
//         w-full
//         items-center
//         justify-center
//         overflow-hidden
//         border
//         border-white/10
//         bg-[#0d0d0d]
//         text-left
//         ${className}
//       `}
//     >

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//         "
//         showLogoOnly={true}
//       />

//       <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

//       <div className="pointer-events-none absolute inset-2 z-20 border border-white/15 transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-3" />

//       <span
//         className="
//           absolute
//           bottom-4
//           right-4
//           z-30
//           flex
//           h-9
//           w-9
//           items-center
//           justify-center
//           rounded-full
//           border
//           border-white/30
//           bg-black/40
//           text-lg
//           backdrop-blur-md
//           transition
//           duration-300
//           group-hover:border-[#d6b36a]
//           group-hover:bg-[#d6b36a]
//           group-hover:text-black
//         "
//       >
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (
//     <div className="space-y-10">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BRIDAL SHOWER CELEBRATION
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (
//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-6 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden border border-white/10 bg-[#0d0d0d]">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="
//                   block
//                   h-auto
//                   w-full
//                   object-contain
//                   object-center
//                   transition
//                   duration-700
//                 "
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-2 border border-white/15" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[9px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/40">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>
//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (
//     <div className="space-y-16">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       <div className="space-y-16">

//         {images.map((img, i) => (
//           <article
//             key={`baby-${i}`}
//             className="grid items-center gap-8 lg:grid-cols-2"
//           >

//             <CinematicImage
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className={`
//                 min-h-[350px]
//                 ${i % 2 === 1 ? "lg:order-2" : ""}
//               `}
//             />

//             <div
//               className={
//                 i % 2 === 1
//                   ? "lg:order-1"
//                   : ""
//               }
//             >

//               <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//                 MOMENT {String(i + 1).padStart(2, "0")}
//               </span>

//               <h3 className="mt-3 font-serif text-3xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-white/50">
//                 {descriptions[i] ||
//                   "Celebrating the joy and warmth of this special journey."}
//               </p>

//             </div>

//           </article>
//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (
//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/50">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (
//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="min-h-[320px]"
//             />
//           ))}

//         </div>
//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (
//     <div className="pt-4">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="
//           group
//           inline-flex
//           items-center
//           gap-5
//           border-b
//           border-[#d6b36a]/50
//           pb-3
//           text-[10px]
//           tracking-[0.25em]
//           text-[#d6b36a]
//           transition
//           hover:border-[#d6b36a]
//           hover:text-white
//         "
//       >

//         <span>{label}</span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    SAFE IMAGE
//    NO CROPPING
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div
//       className={`
//         relative flex h-full w-full items-center justify-center
//         overflow-hidden bg-[#0b0b0b]
//         ${className}
//       `}
//     >
//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//         "
//         showLogoOnly={true}
//       />

//       <div className="pointer-events-none absolute inset-3 border border-white/[0.12] sm:inset-4" />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      LOAD PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error("Projects loading error:", error);

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      FEATURED IMAGE
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length ? 0 : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({ src }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       {/* =====================================================
//           NAV / HERO
//       ===================================================== */}

//       <Hero />

//       {/* =====================================================
//           CINEMATIC FEATURE
//       ===================================================== */}

//       {featuredImage && (
//         <section className="relative border-b border-white/[0.08] bg-[#080808]">

//           <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-10">

//             <div className="relative grid min-h-[620px] overflow-hidden border border-white/[0.08] bg-[#0b0b0b] lg:grid-cols-[1fr_390px]">

//               {/* IMAGE SIDE */}

//               <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-[#090909] lg:min-h-[720px]">

//                 <ProtectedImage
//                   src={featuredImage}
//                   alt="Featured film production"
//                   className="
//                     block
//                     h-auto
//                     w-auto
//                     max-h-full
//                     max-w-full
//                     object-contain
//                     object-center
//                   "
//                   showLogoOnly={true}
//                 />

//                 {/* subtle overlays */}

//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/35" />

//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//                 <div className="pointer-events-none absolute inset-5 border border-white/[0.12] sm:inset-7 lg:inset-9" />

//                 {/* image number */}

//                 <div className="absolute left-7 top-7 z-20 sm:left-10 sm:top-10">

//                   <span className="font-serif text-5xl font-light text-white/20 sm:text-7xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                 </div>

//                 {/* open image */}

//                 <button
//                   type="button"
//                   onClick={() => openGallery(allImages)}
//                   className="
//                     absolute bottom-7 left-7 z-30
//                     flex items-center gap-3
//                     border border-white/20
//                     bg-black/30 px-4 py-3
//                     text-[9px] tracking-[0.25em]
//                     text-white/80 backdrop-blur-md
//                     transition hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:left-10
//                   "
//                 >
//                   VIEW GALLERY
//                   <span className="text-base">↗</span>
//                 </button>

//               </div>

//               {/* TEXT SIDE */}

//               <div className="relative flex flex-col justify-between border-t border-white/[0.08] bg-[#0a0a0a] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">

//                 <div>

//                   <div className="mb-12 flex items-center gap-3">

//                     <span className="h-px w-10 bg-[#d6b36a]" />

//                     <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//                       YOSIEAL FILM PRODUCTION
//                     </span>

//                   </div>

//                   <p className="text-[9px] uppercase tracking-[0.35em] text-white/35">
//                     Wedding • Events • Cinematic
//                   </p>

//                   <h1 className="mt-5 font-serif text-5xl font-light leading-[0.92] sm:text-6xl lg:text-7xl">

//                     Stories

//                     <span className="block italic text-[#d6b36a]">
//                       Worth
//                     </span>

//                     Remembering.

//                   </h1>

//                   <div className="mt-8 h-px w-20 bg-[#d6b36a]/60" />

//                   <p className="mt-7 max-w-sm text-sm leading-7 text-white/50">
//                     We transform real emotions,
//                     beautiful celebrations and
//                     unforgettable moments into
//                     cinematic visual stories.
//                   </p>

//                 </div>

//                 {/* CONTROLS */}

//                 <div className="mt-12">

//                   <div className="mb-5 flex items-end justify-between">

//                     <div>

//                       <span className="text-[8px] tracking-[0.3em] text-white/30">
//                         CURRENT FRAME
//                       </span>

//                       <div className="mt-1 font-serif text-2xl text-[#d6b36a]">
//                         {String(featured + 1).padStart(2, "0")}
//                         <span className="mx-2 text-white/20">
//                           /
//                         </span>
//                         <span className="text-sm text-white/40">
//                           {String(allImages.length).padStart(2, "0")}
//                         </span>
//                       </div>

//                     </div>

//                     <div className="flex gap-2">

//                       <button
//                         type="button"
//                         onClick={previousFeatured}
//                         aria-label="Previous image"
//                         className="
//                           flex h-11 w-11 items-center
//                           justify-center border border-white/20
//                           text-lg text-white/70
//                           transition hover:border-[#d6b36a]
//                           hover:bg-[#d6b36a]
//                           hover:text-black
//                         "
//                       >
//                         ←
//                       </button>

//                       <button
//                         type="button"
//                         onClick={nextFeatured}
//                         aria-label="Next image"
//                         className="
//                           flex h-11 w-11 items-center
//                           justify-center border border-white/20
//                           text-lg text-white/70
//                           transition hover:border-[#d6b36a]
//                           hover:bg-[#d6b36a]
//                           hover:text-black
//                         "
//                       >
//                         →
//                       </button>

//                     </div>

//                   </div>

//                   <div className="h-px w-full bg-white/10">

//                     <span
//                       className="block h-px bg-[#d6b36a] transition-all duration-500"
//                       style={{
//                         width: `${
//                           ((featured + 1) /
//                             allImages.length) *
//                           100
//                         }%`,
//                       }}
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-12 lg:grid-cols-[220px_1fr]">

//           <div className="flex items-start gap-3">

//             <span className="mt-2 h-px w-12 bg-[#d6b36a]" />

//             <div>

//               <p className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//                 OUR PHILOSOPHY
//               </p>

//               <p className="mt-3 text-[9px] leading-5 tracking-[0.15em] text-white/25">
//                 EMOTION
//                 <br />
//                 LIGHT
//                 <br />
//                 STORY
//               </p>

//             </div>

//           </div>

//           <div className="max-w-5xl">

//             <h2 className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-7xl">

//               We don't just

//               <span className="italic text-[#d6b36a]">
//                 {" "}capture
//               </span>

//               <br />

//               moments.

//             </h2>

//             <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
//               We preserve the feeling behind them.
//               Every wedding, celebration and special
//               occasion becomes a visual story crafted
//               with cinematic composition, natural
//               emotion and timeless detail.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-[1400px] px-5 pb-28 sm:px-8 lg:px-12">

//         {/* section title */}

//         <div className="mb-20 flex flex-col justify-between gap-8 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               SELECTED WORK
//             </span>

//             <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//               Our Stories
//             </h2>

//           </div>

//           <p className="max-w-xs text-xs leading-6 text-white/35">
//             A collection of moments,
//             celebrations and stories
//             captured by Yosieal.
//           </p>

//         </div>

//         {/* loading */}

//         {loading ? (

//           <div className="flex min-h-[350px] items-center justify-center">

//             <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] text-white/40">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[350px] items-center justify-center border border-white/[0.08]">

//             <span className="text-[9px] tracking-[0.3em] text-white/30">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <article
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   {/* project heading */}

//                   <div className="mb-12 grid gap-7 border-b border-white/[0.08] pb-8 lg:grid-cols-[90px_1fr_auto] lg:items-end">

//                     <div className="flex items-center gap-3">

//                       <span className="font-serif text-3xl font-light text-[#d6b36a]">
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="hidden h-px w-8 bg-white/20 sm:block" />

//                     </div>

//                     <div>

//                       <span className="text-[8px] tracking-[0.3em] text-white/30">
//                         EVENT STORY
//                         {" / "}
//                         {section.date || "FEATURED PROJECT"}
//                       </span>

//                       <h3 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h3>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <span className="hidden text-[8px] tracking-[0.3em] text-white/20 lg:block">
//                       YOSIEAL / FILM
//                     </span>

//                   </div>

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </article>

//               );
//             })}

//           </div>

//         )}

//       </section>

//       {/* =====================================================
//           CTA
//       ===================================================== */}

//       <section className="border-y border-white/[0.08] bg-[#0a0a0a]">

//         <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-28">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               YOUR STORY STARTS HERE
//             </span>

//             <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
//               Let's create something
//               <span className="italic text-[#d6b36a]">
//                 {" "}unforgettable.
//               </span>
//             </h2>

//           </div>

//           <Link
//             to="/contact"
//             className="
//               group inline-flex w-fit items-center gap-6
//               border border-[#d6b36a]/60
//               px-7 py-4
//               text-[9px] tracking-[0.3em]
//               text-[#d6b36a]
//               transition
//               hover:bg-[#d6b36a]
//               hover:text-black
//             "
//           >
//             GET IN TOUCH
//             <span className="text-base transition group-hover:translate-x-2">
//               →
//             </span>
//           </Link>

//         </div>

//       </section>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-24">

//       {/* FEATURE */}

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               01 / THE BEGINNING
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl lg:text-5xl">
//               {headings[0] || "The Story Begins"}
//             </h3>

//             <p className="mt-6 text-sm leading-7 text-white/40">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//             <button
//               type="button"
//               onClick={() => openGallery(images)}
//               className="
//                 mt-8 border-b border-[#d6b36a]/50
//                 pb-2 text-[9px] tracking-[0.25em]
//                 text-[#d6b36a] transition
//                 hover:border-[#d6b36a] hover:text-white
//               "
//             >
//               OPEN STORY →
//             </button>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 min-h-[400px] lg:order-2"
//           />

//         </div>

//       )}

//       {/* GRID */}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="min-h-[360px]"
//               />

//               <div className="mt-4">

//                 <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//                   FRAME {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/60">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* SECOND FEATURE */}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="min-h-[450px]"
//           />

//           <div>

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-6 text-sm leading-7 text-white/40">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {/* CHAPTERS */}

//       {images.length > 6 && (

//         <div className="space-y-20">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-10 lg:grid-cols-3 ${
//                   i % 2 === 1
//                     ? "lg:[&>div:first-child]:order-2"
//                     : ""
//                 }`}
//               >

//                 <div>

//                   <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-4 font-serif text-3xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                   <p className="mt-5 text-sm leading-7 text-white/40">
//                     {descriptions[imageIndex] ||
//                       DEFAULT_DESCRIPTIONS[imageIndex]}
//                   </p>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="min-h-[380px] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {/* FINAL */}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-3 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <CinematicImage
//                     src={img}
//                     alt={section.title}
//                     onClick={() => openGallery(images)}
//                     className="min-h-[350px]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-2 text-sm text-white/65">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    IMPORTANT: NO CROPPING
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`
//         group relative flex w-full
//         items-center justify-center
//         overflow-hidden bg-[#0b0b0b]
//         text-left
//         ${className}
//       `}
//     >

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//           group-hover:scale-[1.015]
//         "
//         showLogoOnly={true}
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />

//       <div className="pointer-events-none absolute inset-3 border border-white/[0.12] transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-4" />

//       <span
//         className="
//           absolute bottom-5 right-5 z-20
//           flex h-10 w-10 items-center
//           justify-center rounded-full
//           border border-white/25
//           bg-black/40 text-lg
//           backdrop-blur-md
//           transition duration-300
//           group-hover:border-[#d6b36a]
//           group-hover:bg-[#d6b36a]
//           group-hover:text-black
//         "
//       >
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-14">

//       <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">

//         <div>

//           <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//             BRIDAL CELEBRATION
//           </span>

//           <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//             A Celebration of Elegance
//           </h3>

//         </div>

//         <p className="max-w-2xl text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-7 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden bg-[#0b0b0b]">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="
//                   block
//                   h-auto
//                   w-full
//                   object-contain
//                   object-center
//                   transition
//                   duration-700
//                   group-hover:scale-[1.015]
//                 "
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-3 border border-white/[0.12]" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/35">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-20">

//       <div className="max-w-3xl">

//         <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       {images.map((img, i) => (

//         <article
//           key={`baby-${i}`}
//           className="grid items-center gap-10 lg:grid-cols-2"
//         >

//           <CinematicImage
//             src={img}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className={`min-h-[400px] ${
//               i % 2 === 1 ? "lg:order-2" : ""
//             }`}
//           />

//           <div
//             className={
//               i % 2 === 1
//                 ? "lg:order-1"
//                 : ""
//             }
//           >

//             <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//               MOMENT {String(i + 1).padStart(2, "0")}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[i] ||
//                 `Precious Moment ${i + 1}`}
//             </h3>

//             <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
//               {descriptions[i] ||
//                 "Celebrating the joy and warmth of this special journey."}
//             </p>

//           </div>

//         </article>

//       ))}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT PROJECT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="min-h-[350px]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (

//     <div className="pt-2">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="
//           group inline-flex items-center gap-5
//           border-b border-[#d6b36a]/50
//           pb-3 text-[9px]
//           tracking-[0.3em]
//           text-[#d6b36a]
//           transition
//           hover:border-[#d6b36a]
//           hover:text-white
//         "
//       >

//         <span>{label}</span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import ProtectedImage from "../components/ProtectedImage";

// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_DESCRIPTIONS = [
//   "01. The Beginning of Forever — Our First Look",
//   "02. A Tender Moment Caught in Time",
//   "03. Walking Hand in Hand Towards Tomorrow",
//   "04. Joy and Laughter Shared with Loved Ones",
//   "05. The Grand Celebration and Vows",
//   "06. Unforgettable Emotions of the Day",
//   "07. Elegance in Every Single Detail",
//   "08. Dancing Under the Evening Lights",
//   "09. Sweet Whispers and Quiet Glances",
//   "10. Cherished Memories to Last a Lifetime",
//   "11. A Magical Evening Full of Grace",
//   "12. Smiles That Brighten the Whole World",
//   "13. Embracing the Warmth of Family",
//   "14. Looking Into Each Other's Eyes",
//   "15. The Perfect Ending to a Perfect Day",
// ];

// const DEFAULT_HEADINGS = [
//   "The Story Begins",
//   "Tender Highlight",
//   "Walking Together",
//   "Shared Laughter",
//   "Featured Memory",
//   "Pure Emotion",
//   "Elegant Detail",
//   "Evening Magic",
//   "Quiet Glance",
//   "Cherished Moment",
//   "Graceful Evening",
//   "Bright Smile",
//   "Family Warmth",
//   "Deep Connection",
//   "Grand Finale",
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// const generateSlug = (titleText) => {
//   if (!titleText) return "";

//   return titleText
//     .toLowerCase()
//     .replace(/["']/g, "")
//     .replace(/&/g, "and")
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };

// const fixImageUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("localhost:5000")) {
//     return url.replace(
//       "http://localhost:5000",
//       "https://habesha-film-production-server.onrender.com"
//     );
//   }

//   return url;
// };

// /* =========================================================
//    SAFE IMAGE
//    NO CROPPING
// ========================================================= */

// function ImageFrame({
//   src,
//   alt = "",
//   className = "",
//   children,
// }) {
//   if (!src) return null;

//   return (
//     <div
//       className={`
//         relative flex h-full w-full items-center justify-center
//         overflow-hidden bg-[#0b0b0b]
//         ${className}
//       `}
//     >
//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//         "
//         showLogoOnly={true}
//       />

//       <div className="pointer-events-none absolute inset-3 border border-white/[0.12] sm:inset-4" />

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HOME
// ========================================================= */

// function Home() {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [currentImages, setCurrentImages] = useState([]);

//   const [featured, setFeatured] = useState(0);

//   /* =======================================================
//      LOAD PROJECTS
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadProjects = async () => {
//       try {
//         const response = await fetch(
//           "https://habesha-film-production-server.onrender.com/api/projects"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load projects");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Projects response is not an array");
//         }

//         const processedData = data.map((section) => {
//           let parsedDescriptions = [];
//           let parsedHeadings = [];

//           let mainDesc =
//             section.desc ||
//             section.description ||
//             "";

//           if (
//             typeof section.description === "string" &&
//             section.description.includes("||DESCS||")
//           ) {
//             const parts =
//               section.description.split("||DESCS||");

//             mainDesc = parts[0] || "";

//             try {
//               parsedDescriptions = parts[1]
//                 ? JSON.parse(parts[1])
//                 : [];
//             } catch {
//               parsedDescriptions = [];
//             }

//             try {
//               parsedHeadings = parts[2]
//                 ? JSON.parse(parts[2])
//                 : [];
//             } catch {
//               parsedHeadings = [];
//             }
//           }

//           const fixedImages = Array.isArray(section.images)
//             ? section.images
//                 .map(fixImageUrl)
//                 .filter(Boolean)
//             : [];

//           return {
//             ...section,
//             images: fixedImages,
//             desc: mainDesc,
//             descriptions: parsedDescriptions,
//             headings: parsedHeadings,
//           };
//         });

//         if (mounted) {
//           setSections(processedData);
//         }
//       } catch (error) {
//         console.error("Projects loading error:", error);

//         if (mounted) {
//           setSections([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =======================================================
//      ALL IMAGES
//   ======================================================= */

//   const allImages = useMemo(() => {
//     return sections.flatMap((section) =>
//       Array.isArray(section.images)
//         ? section.images
//         : []
//     );
//   }, [sections]);

//   /* =======================================================
//      FEATURED IMAGE
//   ======================================================= */

//   useEffect(() => {
//     if (!allImages.length) {
//       setFeatured(0);
//       return;
//     }

//     setFeatured((current) =>
//       current >= allImages.length ? 0 : current
//     );
//   }, [allImages.length]);

//   const featuredImage =
//     allImages[featured] || allImages[0];

//   const nextFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current + 1) % allImages.length
//     );
//   };

//   const previousFeatured = () => {
//     if (!allImages.length) return;

//     setFeatured(
//       (current) =>
//         (current - 1 + allImages.length) %
//         allImages.length
//     );
//   };

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const openGallery = (images) => {
//     if (!Array.isArray(images) || !images.length) {
//       return;
//     }

//     const slides = images
//       .filter(Boolean)
//       .map((src) => ({ src }));

//     if (!slides.length) return;

//     setCurrentImages(slides);
//     setOpen(true);
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

//       {/* =====================================================
//           NAV / HERO
//       ===================================================== */}

//       <Hero />

//       {/* =====================================================
//           CINEMATIC FEATURE
//       ===================================================== */}

//       {featuredImage && (
//         <section className="relative border-b border-white/[0.08] bg-[#080808]">

//           <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-10">

//             <div className="relative grid min-h-[620px] overflow-hidden border border-white/[0.08] bg-[#0b0b0b] lg:grid-cols-[1fr_390px]">

//               {/* =================================================
//                   IMAGE SIDE

//                   MOBILE:
//                   image comes FIRST

//                   DESKTOP:
//                   stays on the LEFT
//               ================================================= */}

//               <div className=" order-1
//                   relative
//                   flex
//                   min-h-[480px]
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   bg-[#090909]
//                   lg:order-1
//                   lg:min-h-[720px]
//                 "
                 
//               >

//                 <ProtectedImage
//                   src={featuredImage}
//                   alt="Featured film production"
//                   className="
//                     block
//                     h-auto
//                     w-auto
//                     max-h-full
//                     max-w-full
//                     object-contain
//                     object-center
//                   "
//                   showLogoOnly={true}
//                 />

//                 {/* subtle overlays */}

//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/35" />

//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//                 <div className="pointer-events-none absolute inset-5 border border-white/[0.12] sm:inset-7 lg:inset-9" />

//                 {/* image number */}

//                 <div className="absolute left-7 top-7 z-20 sm:left-10 sm:top-10">

//                   <span className="font-serif text-5xl font-light text-white/20 sm:text-7xl">
//                     {String(featured + 1).padStart(2, "0")}
//                   </span>

//                 </div>

//                 {/* open image */}

//                 <button
//                   type="button"
//                   onClick={() => openGallery(allImages)}
//                   className="
//                     absolute bottom-7 left-7 z-30
//                     flex items-center gap-3
//                     border border-white/20
//                     bg-black/30 px-4 py-3
//                     text-[9px] tracking-[0.25em]
//                     text-white/80 backdrop-blur-md
//                     transition hover:border-[#d6b36a]
//                     hover:bg-[#d6b36a]
//                     hover:text-black
//                     sm:left-10
//                   "
//                 >
//                   VIEW GALLERY
//                   <span className="text-base">↗</span>
//                 </button>

//                     <div className="flex gap-2">

//                       <button
//                         type="button"
//                         onClick={previousFeatured}
//                         aria-label="Previous image"
//                         className="
//                           flex h-11 w-11 items-center
//                           justify-center border border-white/20
//                           text-lg text-white/70
//                           transition hover:border-[#d6b36a]
//                           hover:bg-[#d6b36a]
//                           hover:text-black
//                         "
//                       >
//                         ←
//                       </button>

//                       <button
//                         type="button"
//                         onClick={nextFeatured}
//                         aria-label="Next image"
//                         className="
//                           flex h-11 w-11 items-center
//                           justify-center border border-white/20
//                           text-lg text-white/70
//                           transition hover:border-[#d6b36a]
//                           hover:bg-[#d6b36a]
//                           hover:text-black
//                         "
//                       >
//                         →
//                       </button>

//                     </div>

//               </div>

//               {/* =================================================
//                   TEXT SIDE

//                   MOBILE:
//                   moves BELOW the image

//                   DESKTOP:
//                   stays on the RIGHT
//               ================================================= */}

//               <div
//                 className="
//                   order-2
//                   relative
//                   flex
//                   flex-col
//                   justify-between
//                   border-t
//                   border-white/[0.08]
//                   bg-[#0a0a0a]
//                   p-7
//                   sm:p-10
//                   lg:order-2
//                   lg:border-l
//                   lg:border-t-0
//                   lg:p-12
//                 "
//               >

//                 <div>

//                   <div className="mb-12 flex items-center gap-3">

//                     <span className="h-px w-10 bg-[#d6b36a]" />

//                     <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//                       YOSIEAL FILM PRODUCTION
//                     </span>

//                   </div>

//                   <p className="text-[9px] uppercase tracking-[0.35em] text-white/35">
//                     Wedding • Events • Cinematic
//                   </p>

//                   <h1 className="mt-5 font-serif text-5xl font-light leading-[0.92] sm:text-6xl lg:text-7xl">

//                     Stories

//                     <span className="block italic text-[#d6b36a]">
//                       Worth
//                     </span>

//                     Remembering.

//                   </h1>

//                   <div className="mt-8 h-px w-20 bg-[#d6b36a]/60" />

//                   <p className="mt-7 max-w-sm text-sm leading-7 text-white/50">
//                     We transform real emotions,
//                     beautiful celebrations and
//                     unforgettable moments into
//                     cinematic visual stories.
//                   </p>

//                 </div>

//                 {/* CONTROLS */}

//                 <div className="mt-12">

//                   <div className="mb-5 flex items-end justify-between">

//                     <div>

//                       <span className="text-[8px] tracking-[0.3em] text-white/30">
//                         CURRENT FRAME
//                       </span>

//                       <div className="mt-1 font-serif text-2xl text-[#d6b36a]">
//                         {String(featured + 1).padStart(2, "0")}

//                         <span className="mx-2 text-white/20">
//                           /
//                         </span>

//                         <span className="text-sm text-white/40">
//                           {String(allImages.length).padStart(2, "0")}
//                         </span>
//                       </div>

//                     </div>

//                   </div>

//                   <div className="h-px w-full bg-white/10">

//                     <span
//                       className="block h-px bg-[#d6b36a] transition-all duration-500"
//                       style={{
//                         width: `${
//                           ((featured + 1) /
//                             allImages.length) *
//                           100
//                         }%`,
//                       }}
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>
//       )}

//       {/* =====================================================
//           INTRO
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

//         <div className="grid gap-12 lg:grid-cols-[220px_1fr]">

//           <div className="flex items-start gap-3">

//             <span className="mt-2 h-px w-12 bg-[#d6b36a]" />

//             <div>

//               <p className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//                 OUR PHILOSOPHY
//               </p>

//               <p className="mt-3 text-[9px] leading-5 tracking-[0.15em] text-white/25">
//                 EMOTION
//                 <br />
//                 LIGHT
//                 <br />
//                 STORY
//               </p>

//             </div>

//           </div>

//           <div className="max-w-5xl">

//             <h2 className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-7xl">

//               We don't just

//               <span className="italic text-[#d6b36a]">
//                 {" "}capture
//               </span>

//               <br />

//               moments.

//             </h2>

//             <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
//               We preserve the feeling behind them.
//               Every wedding, celebration and special
//               occasion becomes a visual story crafted
//               with cinematic composition, natural
//               emotion and timeless detail.
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section className="mx-auto w-full max-w-[1400px] px-5 pb-28 sm:px-8 lg:px-12">

//         <div className="mb-20 flex flex-col justify-between gap-8 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               SELECTED WORK
//             </span>

//             <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//               Our Stories
//             </h2>

//           </div>

//           <p className="max-w-xs text-xs leading-6 text-white/35">
//             A collection of moments,
//             celebrations and stories
//             captured by Yosieal.
//           </p>

//         </div>

//         {loading ? (

//           <div className="flex min-h-[350px] items-center justify-center">

//             <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] text-white/40">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b36a]" />

//               PREPARING THE STORIES...

//             </div>

//           </div>

//         ) : sections.length === 0 ? (

//           <div className="flex min-h-[350px] items-center justify-center border border-white/[0.08]">

//             <span className="text-[9px] tracking-[0.3em] text-white/30">
//               NO STORIES AVAILABLE
//             </span>

//           </div>

//         ) : (

//           <div className="space-y-32">

//             {sections.map((section, index) => {

//               const titleLower =
//                 section.title
//                   ? section.title.toLowerCase()
//                   : "";

//               const isWedding =
//                 titleLower.includes("wedding");

//               const isBridal =
//                 titleLower.includes("bridal");

//               const isBaby =
//                 titleLower.includes("baby") ||
//                 titleLower.includes("baptism");

//               const headings =
//                 section.headings?.length
//                   ? section.headings
//                   : DEFAULT_HEADINGS;

//               const descriptions =
//                 section.descriptions?.length
//                   ? section.descriptions
//                   : DEFAULT_DESCRIPTIONS;

//               const displayHeading =
//                 section.names?.trim() ||
//                 section.title ||
//                 "Untitled Project";

//               return (

//                 <article
//                   key={section._id || `project-${index}`}
//                   className="relative"
//                 >

//                   <div className="mb-12 grid gap-7 border-b border-white/[0.08] pb-8 lg:grid-cols-[90px_1fr_auto] lg:items-end">

//                     <div className="flex items-center gap-3">

//                       <span className="font-serif text-3xl font-light text-[#d6b36a]">
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="hidden h-px w-8 bg-white/20 sm:block" />

//                     </div>

//                     <div>

//                       <span className="text-[8px] tracking-[0.3em] text-white/30">
//                         EVENT STORY
//                         {" / "}
//                         {section.date || "FEATURED PROJECT"}
//                       </span>

//                       <h3 className="mt-3 font-serif text-4xl font-light sm:text-5xl lg:text-6xl">
//                         {displayHeading}
//                       </h3>

//                       {section.desc && (
//                         <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
//                           {section.desc}
//                         </p>
//                       )}

//                     </div>

//                     <span className="hidden text-[8px] tracking-[0.3em] text-white/20 lg:block">
//                       YOSIEAL / FILM
//                     </span>

//                   </div>

//                   {isWedding && (
//                     <WeddingSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding && isBridal && (
//                     <BridalSection
//                       section={section}
//                       headings={headings}
//                       descriptions={descriptions}
//                       openGallery={openGallery}
//                     />
//                   )}

//                   {!isWedding &&
//                     !isBridal &&
//                     isBaby && (
//                       <BabySection
//                         section={section}
//                         headings={headings}
//                         descriptions={descriptions}
//                         openGallery={openGallery}
//                       />
//                     )}

//                   {!isWedding &&
//                     !isBridal &&
//                     !isBaby && (
//                       <DefaultSection
//                         section={section}
//                         openGallery={openGallery}
//                       />
//                     )}

//                 </article>

//               );
//             })}

//           </div>

//         )}

//       </section>

//       {/* =====================================================
//           CTA
//       ===================================================== */}

//       <section className="border-y border-white/[0.08] bg-[#0a0a0a]">

//         <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-28">

//           <div>

//             <span className="text-[9px] tracking-[0.35em] text-[#d6b36a]">
//               YOUR STORY STARTS HERE
//             </span>

//             <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
//               Let's create something

//               <span className="italic text-[#d6b36a]">
//                 {" "}unforgettable.
//               </span>

//             </h2>

//           </div>

//           <Link
//             to="/contact"
//             className="
//               group inline-flex w-fit items-center gap-6
//               border border-[#d6b36a]/60
//               px-7 py-4
//               text-[9px] tracking-[0.3em]
//               text-[#d6b36a]
//               transition
//               hover:bg-[#d6b36a]
//               hover:text-black
//             "
//           >
//             GET IN TOUCH

//             <span className="text-base transition group-hover:translate-x-2">
//               →
//             </span>

//           </Link>

//         </div>

//       </section>

//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={currentImages}
//       />

//       <Footer />

//     </main>
//   );
// }

// /* =========================================================
//    WEDDING
// ========================================================= */

// function WeddingSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-24">

//       {images[0] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr]">

//           <div className="order-2 lg:order-1">

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               01 / THE BEGINNING
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl lg:text-5xl">
//               {headings[0] || "The Story Begins"}
//             </h3>

//             <p className="mt-6 text-sm leading-7 text-white/40">
//               {descriptions[0] ||
//                 DEFAULT_DESCRIPTIONS[0]}
//             </p>

//             <button
//               type="button"
//               onClick={() => openGallery(images)}
//               className="
//                 mt-8 border-b border-[#d6b36a]/50
//                 pb-2 text-[9px] tracking-[0.25em]
//                 text-[#d6b36a] transition
//                 hover:border-[#d6b36a] hover:text-white
//               "
//             >
//               OPEN STORY →
//             </button>

//           </div>

//           <CinematicImage
//             src={images[0]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="order-1 min-h-[400px] lg:order-2"
//           />

//         </div>

//       )}

//       {images.length > 1 && (

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(1, 5).map((img, i) => (

//             <div
//               key={`wedding-grid-${i}`}
//               className="group"
//             >

//               <CinematicImage
//                 src={img}
//                 alt={section.title}
//                 onClick={() => openGallery(images)}
//                 className="min-h-[360px]"
//               />

//               <div className="mt-4">

//                 <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//                   FRAME {String(i + 2).padStart(2, "0")}
//                 </span>

//                 <p className="mt-2 text-sm text-white/60">
//                   {headings[i + 1] ||
//                     DEFAULT_HEADINGS[i + 1]}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//       {images[5] && (

//         <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">

//           <CinematicImage
//             src={images[5]}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className="min-h-[450px]"
//           />

//           <div>

//             <span className="text-[9px] tracking-[0.3em] text-[#d6b36a]">
//               06 / FEATURED MEMORY
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[5] ||
//                 DEFAULT_HEADINGS[5]}
//             </h3>

//             <p className="mt-6 text-sm leading-7 text-white/40">
//               {descriptions[5] ||
//                 DEFAULT_DESCRIPTIONS[5]}
//             </p>

//           </div>

//         </div>

//       )}

//       {images.length > 6 && (

//         <div className="space-y-20">

//           {images.slice(6, 10).map((img, i) => {

//             const imageIndex = i + 6;

//             return (

//               <div
//                 key={`chapter-${imageIndex}`}
//                 className={`grid items-center gap-10 lg:grid-cols-3 ${
//                   i % 2 === 1
//                     ? "lg:[&>div:first-child]:order-2"
//                     : ""
//                 }`}
//               >

//                 <div>

//                   <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//                     CHAPTER{" "}
//                     {String(imageIndex + 1).padStart(2, "0")}
//                   </span>

//                   <h3 className="mt-4 font-serif text-3xl font-light">
//                     {headings[imageIndex] ||
//                       DEFAULT_HEADINGS[imageIndex]}
//                   </h3>

//                   <p className="mt-5 text-sm leading-7 text-white/40">
//                     {descriptions[imageIndex] ||
//                       DEFAULT_DESCRIPTIONS[imageIndex]}
//                   </p>

//                 </div>

//                 <CinematicImage
//                   src={img}
//                   alt={section.title}
//                   onClick={() => openGallery(images)}
//                   className="min-h-[380px] lg:col-span-2"
//                 />

//               </div>

//             );
//           })}

//         </div>

//       )}

//       {images.length > 10 && (

//         <div>

//           <div className="mb-8">

//             <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//               FINAL CUT
//             </span>

//             <h3 className="mt-3 font-serif text-3xl font-light">
//               Album Highlights
//             </h3>

//           </div>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//             {images.slice(10, 14).map((img, i) => {

//               const imageIndex = i + 10;

//               return (

//                 <button
//                   type="button"
//                   key={`final-${imageIndex}`}
//                   onClick={() => openGallery(images)}
//                   className="group text-left"
//                 >

//                   <CinematicImage
//                     src={img}
//                     alt={section.title}
//                     onClick={() => openGallery(images)}
//                     className="min-h-[350px]"
//                   />

//                   <div className="mt-3">

//                     <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
//                       FRAME{" "}
//                       {String(imageIndex + 1).padStart(2, "0")}
//                     </span>

//                     <h4 className="mt-2 text-sm text-white/65">
//                       {headings[imageIndex] ||
//                         DEFAULT_HEADINGS[imageIndex] ||
//                         "Precious Memory"}
//                     </h4>

//                   </div>

//                 </button>

//               );
//             })}

//           </div>

//         </div>

//       )}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    CINEMATIC IMAGE
//    IMPORTANT: NO CROPPING
// ========================================================= */

// function CinematicImage({
//   src,
//   alt,
//   className = "",
//   onClick,
// }) {
//   if (!src) return null;

//   return (

//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={`Open ${alt || "image"}`}
//       className={`
//         group relative flex w-full
//         items-center justify-center
//         overflow-hidden bg-[#0b0b0b]
//         text-left
//         ${className}
//       `}
//     >

//       <ProtectedImage
//         src={src}
//         alt={alt}
//         className="
//           block
//           h-auto
//           w-auto
//           max-h-full
//           max-w-full
//           object-contain
//           object-center
//           transition
//           duration-700
//           ease-out
//           group-hover:scale-[1.015]
//         "
//         showLogoOnly={true}
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />

//       <div className="pointer-events-none absolute inset-3 border border-white/[0.12] transition duration-500 group-hover:border-[#d6b36a]/60 sm:inset-4" />

//       <span
//         className="
//           absolute bottom-5 right-5 z-20
//           flex h-10 w-10 items-center
//           justify-center rounded-full
//           border border-white/25
//           bg-black/40 text-lg
//           backdrop-blur-md
//           transition duration-300
//           group-hover:border-[#d6b36a]
//           group-hover:bg-[#d6b36a]
//           group-hover:text-black
//         "
//       >
//         +
//       </span>

//     </button>
//   );
// }

// /* =========================================================
//    BRIDAL
// ========================================================= */

// function BridalSection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-14">

//       <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">

//         <div>

//           <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//             BRIDAL CELEBRATION
//           </span>

//           <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//             A Celebration of Elegance
//           </h3>

//         </div>

//         <p className="max-w-2xl text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "A beautiful celebration filled with emotion, elegance and unforgettable moments."}
//         </p>

//       </div>

//       <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">

//         {images.map((img, i) => (

//           <button
//             type="button"
//             key={`bridal-${i}`}
//             onClick={() => openGallery(images)}
//             className="group mb-7 block w-full break-inside-avoid text-left"
//           >

//             <div className="relative overflow-hidden bg-[#0b0b0b]">

//               <ProtectedImage
//                 src={img}
//                 alt={section.title}
//                 className="
//                   block
//                   h-auto
//                   w-full
//                   object-contain
//                   object-center
//                   transition
//                   duration-700
//                   group-hover:scale-[1.015]
//                 "
//                 showLogoOnly={true}
//               />

//               <div className="pointer-events-none absolute inset-3 border border-white/[0.12]" />

//             </div>

//             <div className="mt-4">

//               <span className="text-[8px] tracking-[0.25em] text-[#d6b36a]">
//                 FRAME {String(i + 1).padStart(2, "0")}
//               </span>

//               <h4 className="mt-2 font-serif text-xl font-light">
//                 {headings[i] ||
//                   `Precious Moment ${i + 1}`}
//               </h4>

//               <p className="mt-2 text-xs leading-6 text-white/35">
//                 {descriptions[i] ||
//                   "A beautiful moment captured with emotion and elegance."}
//               </p>

//             </div>

//           </button>

//         ))}

//       </div>

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    BABY
// ========================================================= */

// function BabySection({
//   section,
//   headings,
//   descriptions,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   if (!images.length) return null;

//   return (

//     <div className="space-y-20">

//       <div className="max-w-3xl">

//         <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//           BABY SHOWER / BAPTISM
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "Celebrating the joy and warmth of this special journey."}
//         </p>

//       </div>

//       {images.map((img, i) => (

//         <article
//           key={`baby-${i}`}
//           className="grid items-center gap-10 lg:grid-cols-2"
//         >

//           <CinematicImage
//             src={img}
//             alt={section.title}
//             onClick={() => openGallery(images)}
//             className={`min-h-[400px] ${
//               i % 2 === 1 ? "lg:order-2" : ""
//             }`}
//           />

//           <div
//             className={
//               i % 2 === 1
//                 ? "lg:order-1"
//                 : ""
//             }
//           >

//             <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//               MOMENT {String(i + 1).padStart(2, "0")}
//             </span>

//             <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
//               {headings[i] ||
//                 `Precious Moment ${i + 1}`}
//             </h3>

//             <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
//               {descriptions[i] ||
//                 "Celebrating the joy and warmth of this special journey."}
//             </p>

//           </div>

//         </article>

//       ))}

//       <GalleryButton title={section.title} />

//     </div>
//   );
// }

// /* =========================================================
//    DEFAULT PROJECT
// ========================================================= */

// function DefaultSection({
//   section,
//   openGallery,
// }) {
//   const images = Array.isArray(section.images)
//     ? section.images
//     : [];

//   return (

//     <div className="space-y-12">

//       <div className="max-w-2xl">

//         <span className="text-[8px] tracking-[0.3em] text-[#d6b36a]">
//           CURATED PROJECT
//         </span>

//         <p className="mt-5 text-sm leading-7 text-white/40">
//           {section.desc ||
//             section.description ||
//             "A curated visual story captured with cinematic detail."}
//         </p>

//       </div>

//       {images.length > 0 && (

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {images.slice(0, 4).map((img, i) => (

//             <CinematicImage
//               key={`default-${i}`}
//               src={img}
//               alt={section.title}
//               onClick={() => openGallery(images)}
//               className="min-h-[350px]"
//             />

//           ))}

//         </div>

//       )}

//       <GalleryButton
//         title={section.title}
//         label="EXPLORE PROJECT"
//       />

//     </div>
//   );
// }

// /* =========================================================
//    GALLERY BUTTON
// ========================================================= */

// function GalleryButton({
//   title,
//   label = "VIEW FULL GALLERY",
// }) {
//   return (

//     <div className="pt-2">

//       <Link
//         to={`/gallery/${generateSlug(title)}`}
//         className="
//           group inline-flex items-center gap-5
//           border-b border-[#d6b36a]/50
//           pb-3 text-[9px]
//           tracking-[0.3em]
//           text-[#d6b36a]
//           transition
//           hover:border-[#d6b36a]
//           hover:text-white
//         "
//       >

//         <span>{label}</span>

//         <strong className="text-base transition duration-300 group-hover:translate-x-2">
//           →
//         </strong>

//       </Link>

//     </div>
//   );
// }

// export default Home;


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
      "https://habesha-film-production-server.onrender.com"
    )
    .replace(
      "http://localhost:4000",
      "https://habesha-film-production-server.onrender.com"
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
          "https://habesha-film-production-server.onrender.com/api/projects"
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