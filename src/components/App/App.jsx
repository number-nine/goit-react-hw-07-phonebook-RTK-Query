import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { Notify } from 'notiflix';

import SharedLayout from 'components/SharedLayout';
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';
// import * as contactsAPI from 'redux/contactOperations';
import {
  useGetAllContactsQuery,
  useDeleteContactByIdMutation,
} from 'redux/contactsApi';
import { selectAuth } from 'redux/selectors';
import SplashScreen from 'components/SplashScreen';

export default function App() {
  const { isLoggedIn, error } = useSelector(selectAuth);
  const { isFetching } = useGetAllContactsQuery();

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {isFetching && <SplashScreen />}
      {error && Notify.info(error)}
    </>
  );
}
