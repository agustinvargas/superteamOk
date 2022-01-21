import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route {...rest}>
      {!auth.isLogged() ? <Component /> : <Redirect to='/buscar' />}
    </Route>
  );
}
