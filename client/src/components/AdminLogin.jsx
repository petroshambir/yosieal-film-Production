import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // ኢሜይል ንምጽራይ (trim() ንስፔስ የጥፍእ)
    const loginData = { 
      email: email.trim(), 
      password: password 
    };

    try {
      const response = await fetch('https://habesha-film-production-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        // ሎጊን ምስ ሰለጠ
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', 'true');
        
        // ናብ Admin Panel ይወስድ
        navigate('/admin-panel');
      } else {
        // ሰርቨርካ "Invalid credentials" እንተ ኢልካዮ እዚ መልእኽቲ ይወጽእ
        alert(data.message || 'Invalid Credentials!');
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert('Server connection error. Make sure the backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-10 rounded-lg border border-zinc-800 w-96">
        <h2 className="text-2xl text-white mb-6">Admin Login</h2>
        
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-black border border-zinc-700 text-white rounded" 
          placeholder="Email" 
          required
        />
        
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-black border border-zinc-700 text-white rounded" 
          placeholder="Password" 
          required
        />
        
        <button 
          type="submit" 
          className="w-full bg-amber-500 text-black p-3 font-bold uppercase rounded hover:bg-amber-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;