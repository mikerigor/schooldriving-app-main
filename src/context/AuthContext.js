import React, {
  useState,
  createContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import config from '../utility/api';

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { children } = props
  useEffect(() => {
  });

  const payload = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>;
};

AuthProvider.defaultProps = {};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
