import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect the user to the dashboard after successful login
      navigate('/dashboard');
    } else {
      loginWithRedirect(); // If not authenticated, retry login
    }
  }, [isAuthenticated, navigate, loginWithRedirect]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Callback;
