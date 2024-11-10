// // src/components/Sidebar.js
// import { Link } from 'react-router-dom';

// function Sidebar() {
//   return (
//     <div style={styles.sidebar}>
//       <h2>Admin Panel</h2>
//       <ul>
//         <li><Link to="/">Dashboard</Link></li>
//         <li><Link to="/call-logs">Call Logs</Link></li>
//         <li><Link to="/call-recordings">Call Recordings</Link></li>
//         <li><Link to="/call-visualization">Call Visualization</Link></li>
//         <li><Link to="/logout">Logout</Link></li>
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   sidebar: {
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     height: '100%',
//     width: '250px',
//     backgroundColor: '#2c3e50',
//     color: '#fff',
//     paddingTop: '20px',
//     paddingLeft: '20px',
//   },
// };

// export default Sidebar;


// import { Link } from 'react-router-dom';

// function Sidebar() {
//   return (
//     <div style={styles.sidebar}>
//       <h2 style={styles.heading}>Admin Panel</h2>
//       <ul style={styles.list}>
//         <li style={styles.listItem}><Link to="/" style={styles.link}>Dashboard</Link></li>
//         <li style={styles.listItem}><Link to="/call-logs" style={styles.link}>Call Logs</Link></li>
//         <li style={styles.listItem}><Link to="/call-recordings" style={styles.link}>Call Recordings</Link></li>
//         <li style={styles.listItem}><Link to="/call-visualization" style={styles.link}>Call Visualization</Link></li>
//         <li style={styles.listItem}><Link to="/logout" style={styles.link}>Logout</Link></li>
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   sidebar: {
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     height: '100%',
//     width: '230px',
//     backgroundColor: '#ffffff', // White background
//     color: '#333', // Dark text color for better contrast
//     paddingTop: '20px',
//     paddingLeft: '20px',
//     boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Adds a shadow effect
//     borderRight: '1px solid #eaeaea', // Adds a light border for separation
//   },
//   heading: {
//     fontSize: '24px',
//     marginBottom: '40px',
//     color: '#2c3e50',
//     fontWeight: 'bold',
//     marginTop: '3px',
//   },
//   list: {
//     listStyleType: 'none',
//     padding: 0,
//   },
//   listItem: {
//     marginBottom: '15px',
//   },
//   link: {
//     textDecoration: 'none',
//     color: '#2c3e50',
//     fontSize: '18px',
//     padding: '10px 15px',
//     display: 'block',
//     borderRadius: '8px', // Rounded corners
//     transition: 'background-color 0.3s ease', // Smooth hover effect
//   },
//   linkHover: {
//     backgroundColor: '#f1f1f1',
//   },
// };

// export default Sidebar;


// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 to use Auth0 functions

function Sidebar({ isOpen }) {
  // State to track the currently selected link
  const [selectedLink, setSelectedLink] = useState('/');
  const navigate = useNavigate(); // Hook to access navigation
  const { logout } = useAuth0(); // Destructure logout from Auth0

  // Function to handle link click and set the selected link
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  // Function to handle logout with Auth0
  const handleLogout = () => {
    // Logout using Auth0
    logout({ returnTo: window.location.origin });
  };

  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      <div style={styles.logoContainer}>
        {/* Image Logo */}
        <img
          src="l.png" // Replace with your desired image URL
          alt="TeleTrack Logo"
          style={styles.logo}
        />
        <h2 style={styles.heading}>Dialytics</h2>
      </div>
      
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link
            to="/dashboard"
            style={{
              ...styles.link,
              ...(selectedLink === '/dashboard' ? styles.selectedLink : {}),
            }}
            onClick={() => handleLinkClick('/dashboard')}
          >
            Dashboard
          </Link>
        </li>
       
        <li style={styles.listItem}>
          <Link
            to="/call-logs"
            style={{
              ...styles.link,
              ...(selectedLink === '/call-logs' ? styles.selectedLink : {}),
            }}
            onClick={() => handleLinkClick('/call-logs')}
          >
            Call Logs
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link
            to="/team"
            style={{
              ...styles.link,
              ...(selectedLink === '/team' ? styles.selectedLink : {}),
            }}
            onClick={() => handleLinkClick('/team')}
          >
            Employees
          </Link>
        </li>
      </ul>
      <div style={styles.profileSection}>
        <p style={styles.profileText}>Profile</p>
        <button
          onClick={handleLogout} // Call handleLogout when clicking the button
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '250px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    paddingTop: '5px',
    paddingLeft: '0px',
    boxShadow: '2px 0 15px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  logo: {
    width: '60px',
    height: '60px',
    marginRight: '10px',
  },
  heading: {
    fontSize: '25px',
    color: '#4285f4',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '5px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '17px',
    padding: '20px 35px',
    display: 'block',
    transition: 'background-color 0.3s ease',
  },
  selectedLink: {
    backgroundColor: '#4285f4',
    color: '#fff',
  },
  profileSection: {
    marginTop: '30px',
    borderTop: '1px solid #eaeaea',
    paddingTop: '10px',
  },
  profileText: {
    fontSize: '14px',
    color: '#999',
    marginLeft: '20px',
    marginBottom: '10px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '20px',
    marginBottom: '10px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Sidebar;



