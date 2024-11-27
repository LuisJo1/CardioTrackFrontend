import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PageInitialRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return null; // Este componente no renderiza nada, solo se usa para la redirección inicial
}

export default PageInitialRoute;