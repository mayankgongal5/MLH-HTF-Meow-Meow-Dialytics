
  

// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

function Header({ toggleSidebar, isSidebarOpen }) {
  const [userEmail, setUserEmail] = useState('');
  const { logout, user } = useAuth0(); // Destructure logout and user from useAuth0 hook

  useEffect(() => {
    // Retrieve the email from localStorage or Auth0's user object
    if (user) {
      setUserEmail(user.email);
    } else {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    }
  }, [user]);

  // Handle logout action
  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Redirect to the homepage after logout
  };

  return (
    <div style={styles.header}>
      <div style={styles.leftSection}>
        <button onClick={toggleSidebar} style={styles.toggleButton}>
          {isSidebarOpen ? '☰' : '☰'}
        </button>
        <p style={styles.pageText}>Admin Panel 🔰</p>
      </div>

      <div style={styles.userSection}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6BAHlIuDPK6lkExHi1DWN6cdzB2OJkmSSMNxEhQXpLnHQ3fslHw7AqUJsZEDvu85xhWw&usqp=CAU" // Replace with actual user image URL
          alt="User"
          style={styles.userImage}
        />
        <p style={styles.userEmail}>{userEmail}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    height: '50px',
    width: '100%',
    backgroundColor: '#ffff',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30px',
  },
  toggleButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: 'rgb(66, 133, 244)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  pageText: {
    marginLeft: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userEmail: {
    marginRight: '15px',
    fontSize: '14px',
    color: '#333',
  },
  logoutButton: {
    padding: '10px 15px',
    fontSize: '14px',
    backgroundColor: '#dc5858',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Header;





