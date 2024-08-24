import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './index';
import { account } from '../appwrite/config';
import { login as authLogin, logout as authLogout } from '../store/authSlice';

function ProtectedRouteLayer({ children, authentication = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await account.getSession('current');
        if (session) {
          const userData = await account.get();
          dispatch(authLogin({ userData }));
          if (!authentication) {
            navigate("/");
          }
        } else {
          dispatch(authLogout());
          if (authentication) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        dispatch(authLogout());
        if (authentication) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [authentication, navigate, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return authStatus === authentication ? children : null;
}

export default ProtectedRouteLayer;