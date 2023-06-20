import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import SharedLayout from 'components/SharedLayout';
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';
import { useGetAllContactsQuery } from 'redux/contactsApi';
import { selectAuth } from 'redux/selectors';
import SplashScreen from 'components/SplashScreen';

export default function App() {
  const { isLoggedIn } = useSelector(selectAuth);
  const { isFetching, isError } = useGetAllContactsQuery();

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
      {isError && Notify.info('Try again later')}
    </>
  );
}
