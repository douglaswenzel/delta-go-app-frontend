import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading/Loading';

const Home = lazy(() => import('../screens/Home/home'));
const Login = lazy(() => import('../screens/Login/login'));
const PasswordRecovery = lazy(() => import('../screens/PasswordRecovery/PasswordRecovery'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<PasswordRecovery />} />  
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
