import { RouterProvider } from '@tanstack/react-router';
import useAuth from './hooks/useAuth';
import router from './routes/router';

function App() {
  const { auth } = useAuth();

  return (
    <>
      <RouterProvider
        router={router}
        context={{ isAuth: auth.isAuthenticated }}
      />
    </>
  );
}

export default App;
