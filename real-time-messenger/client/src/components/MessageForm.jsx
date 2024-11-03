// src/components/MessageForm.jsx
import React, { useState } from 'react';
import { sendMessage } from '../services/api';



const MessageForm = () => {
  const [to, setTo] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMessage({ to, body });
      setResponse('Message sent successfully!');
    } catch (error) {
      setResponse(`Error: ${error.response?.data?.error}`);
    }
  };

  return (
    <div className='msg-form'>
    <form onSubmit={handleSendMessage}>
      <div>
        <label htmlFor="recipientNumber">Recipient's Phone Number</label>
        <input
          id="recipientNumber"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          placeholder='Enter Phone Number'
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          className='msg-text'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder=' Type your Message'
        ></textarea>
      </div>
      <button type="submit" className='msg-btn'>Send Message</button>
    </form>
    {response && <p>{response}</p>}
  </div>
  );
}
  

export default MessageForm;
