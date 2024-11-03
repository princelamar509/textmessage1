import React from 'react';
import MessagePreloaderSVG from '../assets/MessagePreloader.svg'; // Adjust path as needed


const MessagePreloader = () => {
  return (
    <div className="preloader-container">
      <img src={MessagePreloaderSVG} alt="Loading..." className="preloader-svg" />
    </div>
  );
};

export default MessagePreloader;
