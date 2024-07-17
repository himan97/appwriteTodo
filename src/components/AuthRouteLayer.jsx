import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Spinner} from './index';


function ProtectedRouteLayer({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    
    if (authStatus !== authentication) {
      navigate(authentication ? "/login" : "/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  
  return loading ? <Spinner/> : <>{children}</>;
}

export default ProtectedRouteLayer;
