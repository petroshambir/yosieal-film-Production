

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeVideo from '../assets/videos/YOSIEL_LOGO_WZ_P.N (1).mp4'; // ከም ቫሪያብል ኢምፖርት ግበር

function Welcome() {
  const navigate = useNavigate();

  const handleEnter = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true'); // ዝኽሪ ክንገብር
    navigate('/home');
  };

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenWelcome')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <video 
        autoPlay muted playsInline 
        onEnded={handleEnter}
        className="w-full h-full object-cover"
        src={welcomeVideo} // ኣብዚ ቫሪያብል ተጠቐም
      />
      <button 
        onClick={handleEnter}
        className="absolute bottom-12 text-white border border-white/50 px-8 py-3 hover:bg-white hover:text-black transition-all bg-gray-800"
      >
        Enter Website
      </button>
    </div>
  );
}

export default Welcome;