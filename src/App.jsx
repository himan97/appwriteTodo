import React, { useEffect, useMemo, useCallback } from "react";
import { Header, Footer, Spinner } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin, setLoading } from "./store/authSlice";
import { account, database } from "./appwrite/config";
import { Query } from "appwrite";

const LoadingSpinner = () => <Spinner />;

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);

  const checkAuth = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const session = await account.getSession('current');
      if (session) {
        const userData = await account.get();
        dispatch(authLogin({ userData }));
        
        // Preload first batch of todos
        const { documents } = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [
            Query.equal("userId", userData.$id),
            Query.orderDesc("createdAt"),
            Query.limit(10)
          ]
        );
        dispatch({ type: 'SET_TODOS', payload: documents });
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const memoizedContent = useMemo(() => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ), []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return memoizedContent;
}

export default App;