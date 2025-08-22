// import React, { use } from 'react';
// import { AuthContext } from '../contexts/AuthContext/AuthContext';

// const UseAuth = () => {
//   const authInfo = use(AuthContext);
//   return authInfo;
// };

// export default UseAuth;




import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const UseAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default UseAuth;
