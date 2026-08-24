

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Welcome from './components/Welcome'; // ሓድሽ ኮምፖነንትካ
// import Gallery from './components/Gallery'; // ኣብዚ ኮምፖነንት ኣሎ
// import AdminLogin from './components/AdminLogin'; // ኣብዚ ኮምፖነንት ኣሎ
// import AdminDashboard from './components/AdminDashboard'; // ኣብዚ ኮምፖነንት ኣሎ

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* መጀመርታ ናብ ዌልካም ቪዲዮ ይኣትዉ */}
//         <Route path="/" element={<Welcome />} />
        
//         {/* ምስ ተወድአ ወይ ክሊክ ምስ ገበሩ ናብ Home ይሓልፉ */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/gallery/:category" element={<Gallery />} /> 
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-panel" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Price from './pages/Price';               // ሓድሽ: ናይ Price ኮምፖነንት
// import Contact from './pages/Contact';           // ሓድሽ: ናይ Contact ኮምፖነንት
// import Welcome from './components/Welcome'; // ሓድሽ ኮምፖነንትካ
// import Gallery from './components/Gallery'; // ኣብዚ ኮምፖነንት ኣሎ
// import AdminLogin from './components/AdminLogin'; // ኣብዚ ኮምፖነንት ኣሎ
// import AdminDashboard from './components/AdminDashboard'; // ኣብዚ ኮምፖነንት ኣሎ
// import ClientSelection from './components/ClientSelection';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* መጀመርታ ናብ ዌልካም ቪዲዮ ይኣትዉ */}
//         <Route path="/" element={<Welcome />} />
        
//         {/* ምስ ተወድአ ወይ ክሊክ ምስ ገበሩ ናብ Home ይሓልፉ */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/price" element={<Price />} />         {/* ሓድሽ Route */}
//         <Route path="/contact" element={<Contact />} />     {/* ሓድሽ Route */}
//         <Route path="/gallery/:category" element={<Gallery />} /> 
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-panel" element={<AdminDashboard />} />
//         <Route path="/client-selection" element={<ClientSelection />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Price from './pages/Price';             
// import Contact from './pages/Contact';         
// import Welcome from './components/Welcome'; 
// import Gallery from './components/Gallery'; 
// import AdminLogin from './components/AdminLogin'; 
// import AdminDashboard from './components/AdminDashboard'; 
// import ClientSelection from './components/ClientSelection';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/price" element={<Price />} />         
//         <Route path="/contact" element={<Contact />} />     
        
//         {/* ሓደ ኮይኑ ንኩሉ ዓይነት ጋለሪ ብቑዕ ዝዀነ Route */}
//         <Route path="/gallery/:category" element={<Gallery />} /> 

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-panel" element={<AdminDashboard />} />
//         <Route path="/client-selection" element={<ClientSelection />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Price from './pages/Price';              
import Contact from './pages/Contact';         
import Welcome from './components/Welcome'; 
import Gallery from './components/Gallery'; 
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard'; 
import ClientSelection from './components/ClientSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Price />} />        
        <Route path="/contact" element={<Contact />} />    
        
        {/* ሓደ ኮይኑ ንኩሉ ዓይነት ጋለሪ ብቑዕ ዝዀነ Route */}
        {/* <Route path="/gallery/:category" element={<Gallery />} />  */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminDashboard />} />
        {/* <Route path="/client-selection" element={<ClientSelection />} /> */}
        <Route path="/client-selection" element={<ClientSelection />} />
<Route path="/gallery/:category" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;