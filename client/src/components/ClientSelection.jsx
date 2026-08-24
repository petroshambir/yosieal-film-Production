

import React, { useState, useEffect } from 'react';
import Navbar from './Nabar';
import Footer from './Footer';
import ProtectedImage from './ProtectedImage';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const fixImageUrl = (imgObjOrUrl) => {
  if (!imgObjOrUrl) return { original: '', compressed: '' };

  // ምስቲ ሰርቨር ስኪማ (Object: original & compressed) ብንጹር ይተሓሓዝ
  if (typeof imgObjOrUrl === 'string') {
    let url = imgObjOrUrl;
    if (url.includes('localhost:5000')) {
      url = url.replace('http://localhost:5000', 'https://habesha-film-production-server.onrender.com');
    }
    return { original: url, compressed: url };
  }

  const originalUrl = imgObjOrUrl.original || imgObjOrUrl.url || '';
  const compressedUrl = imgObjOrUrl.compressed || originalUrl;

  return {
    original: originalUrl.includes('localhost:5000') 
      ? originalUrl.replace('http://localhost:5000', 'https://habesha-film-production-server.onrender.com') 
      : originalUrl,
    compressed: compressedUrl.includes('localhost:5000') 
      ? compressedUrl.replace('http://localhost:5000', 'https://habesha-film-production-server.onrender.com') 
      : compressedUrl
  };
};

function ClientSelection() {
  const [portals, setPortals] = useState([]);
  const [project, setProject] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]); // Array of objects [{original, compressed}]
  const [loading, setLoading] = useState(false);
  const [fetchingPortals, setFetchingPortals] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [selectedPortalForPasscode, setSelectedPortalForPasscode] = useState(null);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const response = await fetch('https://habesha-film-production-server.onrender.com/api/client/portals');
      if (response.ok) {
        const data = await response.json();
        setPortals(data);
      } else {
        setError('ፖርታልስ ከተጽውዕ ኣይከኣለን።');
      }
    } catch (err) {
      console.error("Error fetching portals:", err);
      setError('ሰርቨር ጌጋ ኣጋጢሙ ኣሎ።');
    } finally {
      setFetchingPortals(false);
    }
  };

  const handleSelectClient = (portal) => {
    setSelectedPortalForPasscode(portal);
    setEnteredPasscode('');
    setPasscodeError('');
  };

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    if (!enteredPasscode.trim()) return;

    setVerifying(true);
    setPasscodeError('');

    try {
      const response = await fetch('https://habesha-film-production-server.onrender.com/api/client/verify-client-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: enteredPasscode.trim() })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const fixedImages = Array.isArray(data.project.images) 
          ? data.project.images.map(img => fixImageUrl(img))
          : [];
        
        const fixedSelectedImages = Array.isArray(data.project.selectedImages)
          ? data.project.selectedImages.map(img => fixImageUrl(img))
          : [];

        setProject({
          ...data.project,
          portalId: selectedPortalForPasscode?._id,
          images: fixedImages,
          selectedImages: fixedSelectedImages
        });
        setSelectedImages(fixedSelectedImages);
        setSelectedPortalForPasscode(null);
      } else {
        setPasscodeError(data.message || 'ዝኣተውዎ ፓስኮድ ጌጋ እዩ።');
      }
    } catch (err) {
      console.error("Passcode verification error:", err);
      setPasscodeError('ሰርቨር ጌጋ ኣጋጢሙ ኣሎ።');
    } finally {
      setVerifying(false);
    }
  };

  const handleCheckboxChange = (imgObj) => {
    const isAlreadySelected = selectedImages.some(item => item.original === imgObj.original);
    if (isAlreadySelected) {
      setSelectedImages(selectedImages.filter(item => item.original !== imgObj.original));
    } else {
      setSelectedImages([...selectedImages, imgObj]);
    }
  };

  const handleSubmitSelection = async () => {
    if (selectedImages.length === 0) {
      alert('ብዘይውሕድ ሓደ ስእሊ ክትመርጽ ኣለካ!');
      return;
    }

    setLoading(true);
    try {
      const targetId = project._id || project.portalId;

      const response = await fetch(`https://habesha-film-production-server.onrender.com/api/client/submit-selection/${targetId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedImages }), // [{original, compressed}]
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        alert('ምልኣክ ኣይከኣለን። ደጊምካ ፈትን።');
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const lightboxSlides = project?.images?.map((imgObj) => ({
    src: imgObj.original,
    compressed: imgObj.compressed,
  })) || [];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#dfb557]/30 selection:text-[#dfb557] overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-24">
        {selectedPortalForPasscode && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-950 p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-[#dfb557]/40 text-center relative">
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-2">
                Secure Portal
              </span>
              <h3 className="text-2xl font-serif font-bold text-zinc-100 mb-2">Enter Portal Passcode</h3>
              <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto mb-3"></div>
              <p className="text-xs md:text-sm text-zinc-400 mb-6 font-light">
                ናብ <b className="text-zinc-200">{selectedPortalForPasscode.clientName}</b> ፖርታል ንምእታው በጃኹም እቲ ካብ ስቱድዮ ዝተዋህበኩም 4-ቁጽሪ ኮድ ኣእትዉ።
              </p>

              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <input
                  type="password"
                  maxLength="4"
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  placeholder="****"
                  className="bg-zinc-900 border border-[#dfb557]/50 p-3 rounded-xl w-full text-center text-2xl tracking-widest text-zinc-100 font-mono focus:outline-none focus:border-[#dfb557] shadow-inner placeholder-zinc-600"
                  required
                />
                {passcodeError && <p className="text-red-400 text-xs font-medium">{passcodeError}</p>}
               
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPortalForPasscode(null)}
                    className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all w-1/2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="bg-[#dfb557] text-black px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#c99f45] transition-all w-1/2 disabled:opacity-50 shadow-lg"
                  >
                    {verifying ? 'Checking...' : 'Verify & Enter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {!project ? (
          <div className="bg-zinc-950 p-8 md:p-12 shadow-2xl border-2 border-[#dfb557]/30 rounded-2xl max-w-xl w-full text-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-2">
              Client Portal
            </span>
            <h2 className="text-2xl md:text-3xl font-serif mb-2 text-zinc-100">Client Photo Selection Portals</h2>
            <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto mb-3"></div>
            <p className="text-xs md:text-sm text-zinc-400 mb-6 font-light">በጃኹም ንምርጫ ስእሊታት ናይቲ ስቱድዮ ሽምኩም ጠውቑ።</p>

            {fetchingPortals ? (
              <p className="text-sm text-zinc-500 py-6 font-light">Loading portals...</p>
            ) : error ? (
              <p className="text-red-400 text-xs py-4 font-medium">{error}</p>
            ) : portals.length === 0 ? (
              <p className="text-sm text-zinc-500 py-6 font-light">ዝተዳለወ ፖርታል የለን።</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-1 scrollbar-thin">
                {portals.map((portal) => (
                  <button
                    key={portal._id}
                    onClick={() => handleSelectClient(portal)}
                    className="p-4 border border-[#dfb557]/20 bg-zinc-900/50 hover:bg-[#dfb557] hover:text-black transition-all text-left flex flex-col justify-between rounded-xl group shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#dfb557] group-hover:text-black/70">Portal #{portal.portalNumber}</span>
                      <h3 className="text-base font-serif font-bold text-zinc-100 group-hover:text-black mt-1">{portal.clientName}</h3>
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-black mt-3 flex items-center gap-1 font-semibold">
                      Enter Passcode &rarr;
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : submitted ? (
          <div className="bg-zinc-950 p-10 shadow-2xl border-2 border-[#dfb557]/40 rounded-2xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-[#dfb557]/20 text-[#dfb557] border border-[#dfb557]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">✓</div>
            <h2 className="text-2xl font-serif mb-2 text-zinc-100">ምርጫኹም ብዕወት ተሰዲዱ ኣሎ!</h2>
            <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto mb-3"></div>
            <p className="text-xs md:text-sm text-zinc-400 mb-6 font-light">
              ንሕና ነቲ ዝመረጽኩዎም <b className="text-zinc-200">{selectedImages.length}</b> ስእሊታት ተቐቢልና ኤዲቲንግ ክንጅምር ኢና።
            </p>
            <button
              onClick={() => { setProject(null); setSubmitted(false); }}
              className="bg-[#dfb557] text-black px-6 py-3 text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#c99f45] transition-all rounded-xl shadow-lg"
            >
              Back to Portals
            </button>
          </div>
        ) : (
          <div className="max-w-7xl w-full mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-zinc-800 pb-6 sticky top-20 bg-[#050505]/95 backdrop-blur-md z-10 py-4">
              <div>
                <button
                  onClick={() => setProject(null)}
                  className="text-xs uppercase font-bold tracking-widest text-zinc-400 hover:text-[#dfb557] mb-2 flex items-center gap-1 transition-colors"
                >
                  &larr; Back to Client List
                </button>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#dfb557] block">Welcome, {project.clientName}</span>
                <h1 className="text-2xl md:text-3xl font-serif text-zinc-100">Portal #{project.portalNumber} - Photo Selection</h1>
              </div>
             
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="bg-zinc-900 border border-[#dfb557]/30 text-zinc-200 px-6 py-3 rounded-xl shadow-inner text-sm font-medium">
                  Selected Images: <span className="text-[#dfb557] font-bold text-lg">{selectedImages.length}</span>
                </div>
                <button
                  onClick={handleSubmitSelection}
                  disabled={loading || selectedImages.length === 0}
                  className="bg-[#dfb557] text-black px-6 py-3 text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#c99f45] transition-all disabled:opacity-50 shadow-lg rounded-xl flex items-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send to Studio'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {project.images && project.images.length > 0 ? (
                project.images.map((imgObj, index) => {
                  const isSelected = selectedImages.some(item => item.original === imgObj.original);
                  const displayUrl = imgObj.compressed || imgObj.original;

                  return (
                    <div
                      key={index}
                      onClick={() => handleCheckboxChange(imgObj)}
                      className={`relative group overflow-hidden border-2 rounded-xl transition-all aspect-square bg-zinc-900 cursor-pointer ${
                        isSelected ? 'border-[#dfb557] shadow-2xl scale-[0.98]' : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <div className="w-full h-full">
                        <ProtectedImage
                          src={displayUrl}
                          alt={`Client photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          showLogoOnly={false} 
                        />
                      </div>
                     
                      <div className="absolute top-2 right-2 z-10 bg-black/60 rounded-lg p-1.5 backdrop-blur-md border border-white/10 pointer-events-none">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#dfb557] cursor-pointer"
                        />
                      </div>

                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="absolute bottom-2 left-2 z-10 bg-black/60 hover:bg-black text-[9px] uppercase tracking-wider text-zinc-300 px-2 py-1 rounded backdrop-blur-md cursor-pointer border border-white/10"
                      >
                        🔍 Zoom
                      </div>

                      {isSelected && (
                        <div className="absolute inset-0 bg-[#dfb557]/20 pointer-events-none flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-[#dfb557] text-black text-[10px] uppercase font-bold px-2.5 py-1 tracking-widest shadow-md rounded-md">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 text-zinc-500 font-light">
                  <p className="text-sm">ኣብዚ ፖርታል እዚ ዝተሰቐለ ስእሊ የለን።</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentIndex}
        plugins={[Zoom]}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        on={{ view: ({ index }) => setCurrentIndex(index) }}
        render={{
          slide: ({ slide }) => {
            const currentImgObj = project?.images.find(item => item.original === slide.src);
            const isCurrentSelected = currentImgObj && selectedImages.some(item => item.original === currentImgObj.original);

            return (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-2 select-none" onContextMenu={(e) => e.preventDefault()}>
                <div className="relative flex items-center justify-center w-full flex-grow">
                  <ProtectedImage
                    src={slide.src}
                    alt="Lightbox Protected"
                    className="max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl mx-auto"
                    showLogoOnly={false}
                  />
                </div>
                <div className="mt-2 mb-4 z-50">
                  <button
                    onClick={() => currentImgObj && handleCheckboxChange(currentImgObj)}
                    className={`px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-lg ${
                      isCurrentSelected 
                        ? 'bg-red-500/80 text-white hover:bg-red-600' 
                        : 'bg-[#dfb557] text-black hover:bg-[#c99f45]'
                    }`}
                  >
                    {isCurrentSelected ? 'Remove Selection (-)' : 'Select This Photo (+)'}
                  </button>
                </div>
              </div>
            );
          }
        }}
      />

      <Footer />
    </div>
  );
}

export default ClientSelection;