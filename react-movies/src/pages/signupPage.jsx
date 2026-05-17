import React, { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';

const styles = {
  page: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    padding: '3rem 1rem', 
    minHeight: '80vh' 
  },
  card: { 
    background: 'white', 
    border: '0.5px solid rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    padding: '2rem', 
    width: '100%', 
    maxWidth: '420px' 
  },
  icon: { 
    width: '48px', 
    height: '48px', 
    borderRadius: '50%', 
    background: 'linear-gradient(135deg, #ff2ec4, #4b0082)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: 'white', 
    fontSize: '20px', 
    marginBottom: '1.25rem' 
  },
  title: { 
    fontSize: '22px', 
    fontWeight: 500, 
    margin: '0 0 0.5rem' 
  },
  subtitle: { 
    fontSize: '14px', 
    color: '#666', 
    margin: '0 0 1.5rem', 
    lineHeight: 1.5 
  },
  input: { 
    width: '100%', 
    boxSizing: 'border-box', 
    padding: '10px 14px', 
    border: '0.5px solid #ccc', 
    borderRadius: '8px', 
    fontSize: '14px', 
    marginBottom: '12px', 
    outline: 'none' 
  },
  btn: { 
    width: '100%', 
    padding: '11px', 
    border: 'none', 
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #ff2ec4, #4b0082)', 
    color: 'white', 
    fontSize: '15px', 
    fontWeight: 500, 
    cursor: 'pointer', 
    marginTop: '4px' 
  },
};

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegEx.test(password) && password === passwordAgain) {
      const result = await context.register(userName, password);
      if (result) {
        await context.authenticate(userName, password);
      }
      setRegistered(result);
    }
  };

  if (registered === true) return <Navigate to="/" />;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✨</div>
        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Passwords must be 8+ characters with at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).</p>
        <input style={styles.input} value={userName} placeholder="Username" onChange={e => setUserName(e.target.value)} />
        <input style={styles.input} value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input style={styles.input} value={passwordAgain} type="password" placeholder="Confirm password" onChange={e => setPasswordAgain(e.target.value)} />
        <button style={styles.btn} onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default SignUpPage;