import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import MessageForm from './components/MessageForm';
import CallForm from './components/CallForm';
import MessagePreloader from './components/MessagePreloader';
import './App.css';
import SvgGrid from './components/SvgGrid';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <MessagePreloader />
      ) : (
        <div className="form">
          <SvgGrid />
         
          <h1>Real-Time Messaging and Calling App</h1>

          <section>
            <h2>Send a Message</h2>
            <MessageForm />
          </section>

          <section>
            <h2>Make a Call</h2>
            <CallForm />
          </section>

          <div className="footer">
            <p>© 2024 Chat App. All Rights Reserved.</p>
            <p className="powered-by">
              Powered by: <a href="https://www.twilio.com/" target="_blank" rel="noopener noreferrer">Twilio</a>
            </p>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
