import React, { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router";

const styles = {
  page: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '3rem 1rem', 
    minHeight: '80vh' 
  },
  card: { 
    background: 'white', 
    border: '0.5px solid rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    padding: '2.5rem 2rem', 
    maxWidth: '480px', 
    width: '100%', 
    textAlign: 'center' 
  },
  icon: { 
    fontSize: '48px', 
    marginBottom: '1rem' 
  },
  title: { 
    fontSize: '22px', 
    fontWeight: 500, 
    margin: '0 0 0.75rem' 
  },
  text: { 
    fontSize: '15px', 
    color: '#666', 
    lineHeight: 1.6, 
    margin: '0 0 1.5rem' 
  },
  btnRow: { 
    display: 'flex', 
    gap: '10px', 
    justifyContent: 'center' 
  },
  btnPrimary: { 
    padding: '9px 22px', 
    borderRadius: '8px', 
    fontSize: '14px', 
    fontWeight: 500, 
    cursor: 'pointer', 
    background: 'linear-gradient(135deg, #ff2ec4, #4b0082)', 
    color: 'white', 
    border: 'none' 
  },
  btnSecondary: { 
    padding: '9px 22px', 
    borderRadius: '8px', 
    fontSize: '14px', 
    fontWeight: 500, 
    cursor: 'pointer', 
    background: 'transparent', 
    border: '0.5px solid #ccc', 
    color: '#333' 
  },
};

const StartPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🎬</div>
        {context.isAuthenticated ? (
          <>
            <h2 style={styles.title}>Welcome back, {context.userName}!</h2>
            <p style={styles.text}>Ready to explore? Browse now playing movies or check your profile.</p>
            <div style={styles.btnRow}>
              <button style={styles.btnPrimary} onClick={() => navigate('/movies/nowplaying')}>Now playing</button>
              <button style={styles.btnSecondary} onClick={() => navigate('/profile')}>My profile</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.title}>TMDB Client</h2>
            <p style={styles.text}>Log in or sign up to browse movies and write reviews.</p>
            <div style={styles.btnRow}>
              <button style={styles.btnPrimary} onClick={() => navigate('/login')}>Login</button>
              <button style={styles.btnSecondary} onClick={() => navigate('/signup')}>Sign up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StartPage;