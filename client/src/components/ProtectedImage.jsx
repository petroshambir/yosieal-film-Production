 


import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/YOSIEL_LOGO.png'; 

const ProtectedImage = ({ src, alt, className, onClick, showLogoOnly = false }) => {
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'PrintScreen' || 
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's')
      ) {
        e.preventDefault();
        alert("⚠️ Screenshots are protected on this gallery!");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden select-none group ${className || ''}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setTimeout(() => setIsTouched(false), 1500)}
    >
      {/* 1. እቲ ትክክለኛ ምስሊ */}
      <img 
        src={src} 
        alt={alt || "Protected Image"} 
        className={`w-full h-full object-cover pointer-events-none transition-all duration-300 ${
          isTouched ? 'blur-sm brightness-75' : '' 
        }`}
      />

      {/* 2. መከላኸሊ ባዶ ምስሊ (Transparent Layer) */}
      <img 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" 
        alt="Protection Layer" 
        className="absolute inset-0 w-full h-full opacity-0 z-10"
      />

      {/* 3. ዋተርማርክ (ሎጎን ኣብ ክልተ ቦታ ዝደግም ጸሊም ጽሑፍን) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 p-4">
        {showLogoOnly ? (
          <div className="flex flex-col items-center justify-center select-none opacity-40 group-hover:opacity-75 transition-opacity duration-300">
            <img 
              src={Logo} 
              alt="Yosieal Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between items-center py-6 select-none opacity-50 group-hover:opacity-85 transition-opacity duration-300">
            
            {/* 🌟 እቲ ቀዳማይ (ኣብ ላዕሊ - ብጸሊም ሕብሪ) */}
            <div className="flex flex-col items-center text-center transform -rotate-6">
              <img 
                src={Logo} 
                alt="Yosieal Logo" 
                className="w-5 h-5 md:w-7 md:h-7 object-contain mb-1 drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
              />
              <h2 className="text-sm md:text-xl font-serif font-bold tracking-[0.25em] uppercase text-zinc-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Yosieal Pictures
              </h2>
              <p className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-900 font-bold mt-0.5">
                Protected Gallery
              </p>
            </div>

            {/* 🌟 እቲ ካልኣይ (ኣብ ታሕቲ - ብጸሊም ሕብሪ) */}
            <div className="flex flex-col items-center text-center transform -rotate-6">
              <img 
                src={Logo} 
                alt="Yosieal Logo" 
                className="w-5 h-5 md:w-7 md:h-7 object-contain mb-1 drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
              />
              <h2 className="text-sm md:text-xl font-serif font-bold tracking-[0.25em] uppercase text-zinc-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Yosieal Pictures
              </h2>
              <p className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-900 font-bold mt-0.5">
                Protected Gallery
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProtectedImage;