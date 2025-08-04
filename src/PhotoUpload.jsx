import React, { useState } from 'react';

export default function PhotoUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      const res = await fetch('https://scout-backend-yuyg.onrender.com/api/upload', {
        method: 'POST',
        credentials: 'include', // send cookies with request
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Upload successful!');
        setCaption('');
        setImage(null);
        // Optionally, clear file input:
        e.target.reset();
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (err) {
      setMessage('Upload failed: ' + err.message);
    }
  };

  return (
    <div className="container center">
      <h2>Upload a Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <br />
        <button type="submit">Upload</button>
      </form>
      {/* Live Preview */}
      {(image || caption) && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3>Preview</h3>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', marginBottom: '1rem' }}
            />
          )}
          {caption && <p style={{ fontStyle: 'italic', color: '#555' }}>{caption}</p>}
        </div>
      )}
      {message && <p className={message.includes('fail') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}
