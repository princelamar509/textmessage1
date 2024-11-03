import React, { useState } from 'react';
import { makeCall } from '../services/api';

const CallForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleMakeCall = async (e) => {
    e.preventDefault();
    console.log('Phone number to call:', phoneNumber); // Log the phone number
  
    try {
      const response = await makeCall({ to: phoneNumber }); // Use makeCall from api.js
  
      if (response.data && response.data.success) {
        setResponseMessage('Call initiated successfully!');
      } else {
        setResponseMessage('Error: Unable to initiate call');
      }
    } catch (error) {
      console.error('Error making call:', error);
      // Provide detailed error information
      setResponseMessage(`Error: ${error.response?.data?.error || error.message || 'An unknown error occurred'}`);
    }
  };
  
  return (
    <div className='call-form'>
    <form onSubmit={handleMakeCall}>
      <div>
        <label htmlFor="phoneNumber">Recipient's Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          placeholder='Enter phone number'
        />
      </div>
      <button className='btn' type="submit">Make Call</button>
    </form>
    {responseMessage && <p>{responseMessage}</p>}
  </div>
  );
}
  
export default CallForm;
