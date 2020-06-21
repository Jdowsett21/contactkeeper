import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
function Logout(props) {
  const authContext = useContext(AuthContext);

  const onSubmit = () => {};
  return (
    <div onSubmit>
      <input type='submit' />
    </div>
  );
}

export default Logout;
