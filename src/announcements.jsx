import React, { useState } from 'react';

function AnnouncementForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const submitAnnouncement = async () => {
    if (!content.trim()) {
      setMessage('Announcement cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');

      const res = await fetch('http://localhost:3000/api/announcement', {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Announcement posted!');
        setContent('');
      } else {
        setMessage(data.error || 'Error posting announcement');
      }
    } catch (err) {
      setMessage('Error posting announcement: ' + err.message);
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
      <button onClick={submitAnnouncement}>Post Announcement</button>
      {message && <p className={message.includes('error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}

export default AnnouncementForm;
