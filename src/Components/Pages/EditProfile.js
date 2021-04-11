import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// AuthContext
import { AuthContext } from '../../Contexts/AuthContext';

import { Input, Label, Button } from '../Atoms';
import { FormInput } from '../Molecules';
import { Notification } from '../Organisms';

import '../../styles/editProfile.scss';

const EditProfile = () => {
    const { currentUser, updatePassword, updateEmail } = useContext(AuthContext);
    // dispacth
    // dispatch({ type: 'EDIT_EMAIL', payload: {auth.email} });
    // dispatch({ type: 'EDIT_PASSWORD', payload: {auth.password} });

    const [auth, setAuth] = useState({ email: currentUser.email, password: '', confirmPassword: '', loading: false });
    const [notif, setNotif] = useState({ type: '', msg: '', title: '' });

    const history = useHistory();


  const Submit = e => {
    e.preventDefault();

    if (auth.password !== auth.confirmPassword) return setNotif({ type: 'error', msg: 'Passwords do not match', title: 'Error' });

    const promises = [];
    setAuth({...auth, loading: true});
    setNotif({ type: '', msg: '', title: '' });

    if (auth.email !== currentUser.email) promises.push(updateEmail(auth.email))
    if (auth.password) promises.push(updatePassword(auth.password))

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setNotif({ type: 'error', msg: 'Failed to update account', title: 'Error' });
      })
      .finally(() => {
        setAuth({...auth, loading: false})
      })
  };

  return (
    <div className='edit-profile-container'>
        <h2> Edit Profile </h2>
        
        { notif && <Notification type={notif.type} msg={notif.msg} title={notif.title} /> }

        <form method="POST" onSubmit={Submit} className='edit-profile-form'>
            <FormInput>
                <Label label='Email' />
                <Input type="email" placeholder='Enter Email' name='email' id='Email'
                        value={auth.email} onChange={e => setAuth({...auth, email: e.target.value})} />
            </FormInput>

            <FormInput>
                <Label label='Password' />
                <Input type="password" placeholder="Leave blank to keep the same" name='password' id='Password'
                        value={auth.password} onChange={e => setAuth({...auth, password: e.target.value})} />
            </FormInput>

            <FormInput>
                <Label label='Confirm Password' />
                <Input type="password" placeholder="Leave blank to keep the same" name='confirmPassword' id='confirmPassword'
                        value={auth.confirmPassword} onChange={e => setAuth({...auth, confirmPassword: e.target.value})} />
            </FormInput>

            <Button type="submit" className="btn" label='Edit' disabled={auth.loading} />
        </form>

      <div className="">
        <Link to="/dashboard"> Cancel </Link>
      </div>
    </div>
  )
}

export default EditProfile;