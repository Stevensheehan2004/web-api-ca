import React, { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router";

const styles = {
  page: { 
    display: 'flex', 
    justifyContent: 'center', 
    padding: '3rem 1rem', 
    minHeight: '80vh' 
  },
  card: { 
    background: 'white', 
    border: '0.5px solid rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    padding: '2rem', 
    maxWidth: '420px', 
    width: '100%' 
  },
  avatarRow: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '14px', 
    marginBottom: '1rem' 
  },
  avatar: { 
    width: '64px', 
    height: '64px', 
    borderRadius: '50%', 
    background: 'linear-gradient(135deg, #ff2ec4, #4b0082)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: 'white', 
    fontSize: '24px', 
    fontWeight: 500, 
    flexShrink: 0 
  },
  name: { 
    fontSize: '20px', 
    fontWeight: 500, 
    margin: '0 0 4px' 
  },
  label: { 
    fontSize: '13px', 
    color: '#666', 
    margin: 0 
  },
  row: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    padding: '12px 0', 
    borderTop: '0.5px solid rgba(0,0,0,0.08)', 
    fontSize: '14px', 
    color: '#c020a0', 
    cursor: 'pointer',
    textDecoration: 'none',
  },
  rowIcon: { 
    fontSize: '18px', 
    color: '#c020a0' 
  },
  notLogged: { 
    textAlign: 'center', 
    padding: '1rem 0' 
  },
  notLoggedText: { 
    color: '#666', 
    marginBottom: '1rem' 
  },
  btn: { 
    padding: '9px 28px', 
    border: 'none', 
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #ff2ec4, #4b0082)', 
    color: 'white', 
    fontSize: '14px', 
    fontWeight: 500, 
    cursor: 'pointer' 
  },
};

const ProfilePage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {context.isAuthenticated ? (
          <>
            <div style={styles.avatarRow}>
              <div style={styles.avatar}>{context.userName.charAt(0).toUpperCase()}</div>
              <div>
                <p style={styles.name}>{context.userName}</p>
                <p style={styles.label}>Logged in</p>
              </div>
            </div>
            <div style={styles.row} onClick={() => navigate('/movies/favorites')}>
              <span style={styles.rowIcon}>⭐</span> Favorites
            </div>
            <div style={styles.row} onClick={() => navigate('/watchlist')}>
              <span style={styles.rowIcon}>🔖</span> Watchlist
            </div>
            <div style={styles.row} onClick={() => navigate('/reviews/form')}>
              <span style={styles.rowIcon}>✏️</span> My reviews
            </div>
          </>
        ) : (
          <div style={styles.notLogged}>
            <div style={{ ...styles.avatar, margin: '0 auto 1rem' }}>👤</div>
            <p style={styles.notLoggedText}>You must log in to see your profile.</p>
            <button style={styles.btn} onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;