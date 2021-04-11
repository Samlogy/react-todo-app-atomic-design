import { useReducer, useState, useEffect, createContext } from "react";

import { auth } from "../firebase";
import { authReducer } from '../Reducers/authReducer';

export const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext)
// };

const AuthProvider = ({ children }) => {
  const [currentUser, dispatch] = useReducer(authReducer, {});
  const [loading, setLoading] = useState(true);

  // const signup = (email, password) => {
  //   return auth.createUserWithEmailAndPassword(email, password)
  // };

  // const login = (email, password) => {
  //   return auth.signInWithEmailAndPassword(email, password)
  // };

  // const logout = () => {
  //   return auth.signOut()
  // };

  // const resetPassword = (email) => {
  //   return auth.sendPasswordResetEmail(email)
  // };

  // const updateEmail = (email) => {
  //   return currentUser.updateEmail(email)
  // };

  // const updatePassword = (password) => {
  //   return currentUser.updatePassword(password)
  // };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // setCurrentUser(user)
      dispatch({ type: 'SET_STATE', payload: user });
      setLoading(false);
    })

    return unsubscribe
  }, []);

  // const value = {
  //   currentUser,
  //   login,
  //   signup,
  //   logout,
  //   resetPassword,
  //   updateEmail,
  //   updatePassword
  // }

  return (
    <AuthContext.Provider value={currentUser, dispatch}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;