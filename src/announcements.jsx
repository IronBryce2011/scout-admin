import React, { useState } from 'react';
import axios from 'axios';  


function AnnouncementForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
axios.defaults.withCredentials = true
  const submitAnnouncement = async () => {
    if (!content.trim()) {
      setMessage('Announcement cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken'); // or wherever you store your admin token

      const res = await axios.post(
        'http://localhost:3000/api/announcement',
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
      setContent('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error posting announcement');
    }
  };

  return (
    <div className="container center">
      <h2>Post Announcement</h2>
      <textarea
        rows={5}
        placeholder="Type your announcement here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={submitAnnouncement}>
        Post Announcement
      </button>
      {message && <p className={message.includes('error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}

export default AnnouncementForm
