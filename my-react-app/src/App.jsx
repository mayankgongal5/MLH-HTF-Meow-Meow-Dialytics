// // src/App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
// import CallRecordings from './components/CallRecordings.jsx';
// function App() {
//   return (
//     <Router>
//       <div>
//         <Sidebar />
//         <div style={{ marginLeft: '250px', marginTop: '80px' }}>
//           <Header />
//           <Routes> {/* Replace Switch with Routes */}
//             <Route path="/" element={<Dashboard />} /> {/* Replace component with element */}
//             <Route path="/call-logs" element={<CallLogTable />} />
//             <Route path="/call-recordings" element={<CallRecordings />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
// import { useState } from 'react';
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
// import CallRecordings from './components/CallRecordings.jsx';
// import SpeechToTextAndSentiment from './components/CallLogVisualization.jsx';
// import AnalyzePage from './components/AnalyzePage.jsx';
// import Employee from './components/employee.jsx';
// import Login from './components/LoginPage.jsx';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const isUserAuthenticated = () => {
//     return !!localStorage.getItem('userEmail');
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Login />} />

//           {/* Protected Routes */}
//           {isUserAuthenticated() ? (
//             <>
//               <Route 
//                 path="/dashboard" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <Dashboard />
//                     </div>
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/call-logs" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <CallLogTable />
//                     </div>
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/call-recordings" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <CallRecordings />
//                     </div>
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/call-ai" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <SpeechToTextAndSentiment />
//                     </div>
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/analyze" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <AnalyzePage />
//                     </div>
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/team" 
//                 element={
//                   <>
//                     <Sidebar isOpen={isSidebarOpen} />
//                     <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                       <Employee />
//                     </div>
//                   </>
//                 } 
//               />
//             </>
//           ) : (
//             <Navigate to="/" />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
// import { useState } from 'react';
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
// import CallRecordings from './components/CallRecordings.jsx';
// import SpeechToTextAndSentiment from './components/CallLogVisualization.jsx';
// import AnalyzePage from './components/AnalyzePage.jsx';
// import Employee from './components/employee.jsx';
// import Login from './components/LoginPage.jsx';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Function to toggle the sidebar
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Function to check if user is authenticated
//   const isUserAuthenticated = () => {
//     return !!localStorage.getItem('userEmail'); // Return true if email exists
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Login />} />

//           {/* Redirect to login if email does not exist in local storage */}
//           <Route 
//             path="/dashboard" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <Dashboard />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//           <Route 
//             path="/call-logs" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <CallLogTable />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//           <Route 
//             path="/call-recordings" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <CallRecordings />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//           <Route 
//             path="/call-ai" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <SpeechToTextAndSentiment />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//           <Route 
//             path="/analyze" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <AnalyzePage />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//           <Route 
//             path="/team" 
//             element={isUserAuthenticated() ? (
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <Employee />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/" />
//             )} 
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
// import CallRecordings from './components/CallRecordings.jsx';
// import SpeechToTextAndSentiment from './components/CallLogVisualization.jsx';
// import AnalyzePage from './components/AnalyzePage.jsx';
// import Employee from './components/employee.jsx';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Function to toggle the sidebar
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route 
//             path="/" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <Dashboard />
//                 </div>
//               </>
//             }
//           />
//           <Route 
//             path="/call-logs" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <CallLogTable />
//                 </div>
//               </>
//             }
//           />
//           <Route 
//             path="/call-recordings" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <CallRecordings />
//                 </div>
//               </>
//             }
//           />
//           <Route 
//             path="/call-ai" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <SpeechToTextAndSentiment />
//                 </div>
//               </>
//             }
//           />
//           <Route 
//             path="/analyze" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <AnalyzePage />
//                 </div>
//               </>
//             }
//           />
//           <Route 
//             path="/team" 
//             element={
//               <>
//                 <Sidebar isOpen={isSidebarOpen} />
//                 <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                   <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//                   <Employee />
//                 </div>
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useState } from 'react'; // Ensure useState is imported
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
// import CallRecordings from './components/CallRecordings.jsx';
// import SpeechToTextAndSentiment from './components/CallLogVisualization.jsx';
// import AnalyzePage from './components/AnalyzePage.jsx';
// import Employee from './components/Employee.jsx';

// function App() {
//   const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/dashboard" />
//               ) : (
//                 <button onClick={() => loginWithRedirect()}>Login</button>
//               )
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               isAuthenticated ? (
//                 <>
//                   <Sidebar isOpen={isSidebarOpen} />
//                   <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
//                     <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
//                     <Dashboard />
//                   </div>
//                 </>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           {/* Repeat for other protected routes */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react'; // Ensure useState is imported
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import CallLogTable from './components/CallLogTable/CallLogTable.jsx';
import CallRecordings from './components/CallRecordings.jsx';
import SpeechToTextAndSentiment from './components/CallLogVisualization.jsx';
import AnalyzePage from './components/AnalyzePage.jsx';
import Employee from './components/Employee.jsx';

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <div style={loginPageStyles.container}>
                  <div style={loginPageStyles.card}>
                    <h2 style={loginPageStyles.title}>Welcome to Dialytics Admin</h2>
                    <p style={loginPageStyles.subtitle}>Please log in to access the dashboard</p>
                    <button
                      onClick={() => loginWithRedirect()}
                      style={loginPageStyles.loginButton}
                    >
                      Login with Auth0
                    </button>
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <Dashboard />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/call-logs"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <CallLogTable />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/call-recordings"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <CallRecordings />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/speech-to-text"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <SpeechToTextAndSentiment />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/analyze"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <AnalyzePage />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/team"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar isOpen={isSidebarOpen} />
                  <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} logout={() => logout({ returnTo: window.location.origin })} />
                    <Employee />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* Add any other protected routes here */}
        </Routes>
      </div>
    </Router>
  );
}

// Styles for the login page
const loginPageStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#777',
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
};

export default App;























