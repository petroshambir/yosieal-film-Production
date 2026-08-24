

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ProtectedImage from '../components/ProtectedImage'; // 🔒 መከላኸሊ ኮምፖነንት

function Gallery() {
  const { category } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateSlug = (title) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/["']/g, '')
      .replace(/&/g, 'and')
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    setLoading(true);
    fetch('https://habesha-film-production-server.onrender.com/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => {
          const itemSlug = generateSlug(item.title);
          return itemSlug === category?.toLowerCase().trim() || item._id === category;
        });

        setProjectData(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gallery:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-xl tracking-widest uppercase text-amber-400 animate-pulse">Loading Gallery...</p>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-serif text-amber-300 mb-4">Gallery Not Found</h2>
        <p className="text-zinc-400 mb-8 text-center">Sorry, the gallery you are looking for does not exist or was removed.</p>
        <Link 
          to="/" 
          className="text-xs uppercase tracking-[0.3em] text-zinc-300 border border-zinc-700 px-6 py-3 rounded hover:bg-white hover:text-black transition"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  let descriptions = [];
  try {
    if (projectData?.description && projectData.description.includes('||DESCS||')) {
      const cleanDesc = projectData.description.split('||DESCS||')[1];
      descriptions = JSON.parse(cleanDesc);
    }
  } catch (e) {
    descriptions = [];
  }

  const slides = projectData?.images?.map((img, index) => ({ 
    src: img,
    description: descriptions[index] || "" 
  })) || [];

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] text-white px-3 py-12 md:px-20 select-none"
      onContextMenu={(e) => e.preventDefault()} 
    >
      <div className="mb-10 pt-16 md:pt-4">
        <Link 
          to="/" 
          className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white border border-zinc-800 px-4 py-2 rounded transition"
        >
          &larr; Back to Home
        </Link>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif italic text-amber-300 capitalize mb-4">
          {projectData?.names || projectData?.title}
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          {projectData?.description && !projectData.description.includes('||DESCS||') 
            ? projectData.description 
            : `Explore the complete collection of ${projectData?.title} moments captured with elegance.`}
        </p>
      </div>

      {/* 📱 ሞባይል 2 ኮሎም | 🖥️ ላፕቶፕ/ዓቢ ስክሪን 4 ኮሎም */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {projectData?.images && projectData.images.length > 0 ? (
          projectData.images.map((img, index) => (
            <div key={index} className="aspect-[2/3] overflow-hidden bg-zinc-900 rounded-md md:rounded-lg border border-zinc-800 shadow-lg relative group">
              <ProtectedImage 
                src={img} 
                alt={`${projectData.title} ${index + 1}`} 
                className="w-full h-full cursor-pointer"
                onClick={() => { setCurrentIndex(index); setOpen(true); }}
              />
              <div 
                onClick={() => { setCurrentIndex(index); setOpen(true); }}
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer pointer-events-auto z-30"
              >
                <span className="text-white text-[10px] md:text-xs uppercase tracking-widest bg-black/60 px-2 py-1 rounded">View</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-zinc-500">
            <p>No images uploaded in this gallery yet.</p>
          </div>
        )}
      </div>

      {/* 🔍 Lightbox */}
      <Lightbox 
        open={open} 
        close={() => setOpen(false)} 
        slides={slides} 
        index={currentIndex}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full flex items-center justify-center p-2 md:p-6 select-none" onContextMenu={(e) => e.preventDefault()}>
              <div className="relative flex items-center justify-center w-full h-full max-w-[90vw] max-h-[85vh]">
                <ProtectedImage 
                  src={slide.src} 
                  alt="Lightbox Protected" 
                  className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl mx-auto"
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  );
}

export default Gallery;