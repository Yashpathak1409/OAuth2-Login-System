import React, { useState } from 'react';
import './login.css'; 
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '902519970329-lrr56abglk2pltrq0obg4g18n5cmv3vd.apps.googleusercontent.com';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        // Store token on successful login
        localStorage.setItem('authToken', 'manual-login-token');
        alert('Login successful!');
        setError('');
        navigate('/home');
      } else {
        setError('Invalid credentials.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('http://localhost:5014/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store token or user info in localStorage
        localStorage.setItem('authToken', credentialResponse.credential); // Or data.token if your backend returns it
        alert(`Welcome ${data.name}!`);
        console.log('User info from backend:', data);
        setError('');
        navigate('/home');
      } else {
        setError(data.message || 'Google login failed on server.');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="google-login-section">
            <p>Or login with</p>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
            />
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
