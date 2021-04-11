
import { auth } from "../firebase";

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': return auth.signInWithEmailAndPassword(action.email, action.password);
    case 'REGISTER': return auth.createUserWithEmailAndPassword(action.email, action.password);
    case 'LOGOUT': return auth.signOut();
    case 'RESET_PASSWORD': return auth.sendPasswordResetEmail(action.email);
    case 'EDIT_EMAIL': return state.updateEmail(action.email);
    case 'EDIT_PASSWORD': return state.updatePassword(action.password);
    default: return state;
  }
} 