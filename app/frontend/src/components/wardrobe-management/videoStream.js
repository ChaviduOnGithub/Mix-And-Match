import React from 'react';

const VideoStream = () => {
  return (
    <div>
      <h1>Live Try-On</h1>
      <img src="http://localhost:5000/video_feed" alt="Live Try-On" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoStream;
