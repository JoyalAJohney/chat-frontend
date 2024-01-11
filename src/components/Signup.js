import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username,
        password
      });
      console.log(response)
      if (response.data.error) {
        console.log(response.data)
        setErrorMessage(response.data.message || 'Signup failed, Please try again.');
        return;
      }
      console.log('Signup successful', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="bg-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    <div className="form-container">
      <form onSubmit={handleSubmit} className='form'>
        <h1>Signup</h1>
        <div className='form-input-box'>
          <input type="text" className='form-input' value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" className='form-input' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button type="submit" className='form-button'>Signup</button>
      </form>
    </div>
    </div>
  );
}

export default Signup;
