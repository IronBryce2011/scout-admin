
import './App.css'
import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import AnnouncementForm from './announcements';
function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://scout-backend-yuyg.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for cookies/session
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setLoggedIn(true);
      } else {
        window.location.href = 'https://troop423.netlify.app';
      }
    } catch (err) {
      setError('Network error');
    }
  }

  async function handleLogout() {
    await fetch('https://scout-backend-yuyg.onrender.com/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setLoggedIn(false);
    setPassword('');
  }

  if (loggedIn) {
    return (
      <div className="container center">
        <h2>Welcome to the Admin Panel!</h2>
        <AnnouncementForm />
        <PhotoUpload />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <form className="container center" onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<AdminLogin />

    </>
  )
}

export default App
