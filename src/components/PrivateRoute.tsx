import { ReactNode, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from 'src/contexts/AuthContext';

type Props = {
  children: ReactNode;
  [x: string]: any;
};

export default function PrivateRoute({ children, ...rest }: Props) {
  let auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.loadingUser && auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
