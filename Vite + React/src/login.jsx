import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import './index.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve password from localStorage if available
    const savedPassword = localStorage.getItem('password');
    const savedEmail = localStorage.getItem('email');

    if (savedPassword) {
      setPassword(savedPassword);
      setRememberMe(true); // Set checkbox as checked if a password was saved
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '20px',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#333333',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '30px',
      boxSizing: 'border-box',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '1.5rem',
      marginRight: '150px', // Added margin-right
    },
    checkboxLabel: {
      marginLeft: '4px', // Adjust the space between checkbox and label
      fontSize: '20px', // Changed font size
      fontWeight: 'bold', // Make text bold
      color: '#6c757d',
      whiteSpace: 'nowrap',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    },
    button: {
      width: 'auto',
      padding: '12px 24px',
      fontSize: '16px',
      backgroundColor: '#28a745',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://localhost:44379/api/Users/Login', {
        mail: email,
        password: password,
      });

      if (response.data.ResponseCode === '200') {
        // Save password and email in localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('password', password);
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('password');
          localStorage.removeItem('email');
        }

        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.title}>Sign In</div>
        {error && <div style={styles.error}>{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <Label htmlFor="email1" value="Mail" />
            <TextInput
              id="email1"
              type="email"
              placeholder="name@surname.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <Label htmlFor="password1" value="Password" />
            <TextInput
              id="password1"
              type="password"
              placeholder="*******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxContainer}>
            <Checkbox
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Label htmlFor="remember" style={styles.checkboxLabel}>
              Remember Me
            </Label>
          </div>
          <div style={styles.buttonContainer}>
            <Button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              LOGIN
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
