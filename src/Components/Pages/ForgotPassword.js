import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// AuthContext
import { AuthContext } from '../../Contexts/AuthContext';

import { Button, Input, Label} from '../Atoms';
import { FormInput } from '../Molecules';
import { Notification } from '../Organisms';

import '../../styles/forgotPassword.scss';

const ForgotPassword = () => {
    const [forgot, setForgot] = useState({ email: '', password: '', loading: false });
    const [notif, setNotif] = useState({ type: '', msg: '', title: '' });
    const history = useHistory();

    const { resetPassword } = useContext(AuthContext);

    const Submit = async e => {
        e.preventDefault();

        try {
            setNotif({ type: '', msg: '', title: '' });
            setForgot({...forgot, loading: true});

            await resetPassword(forgot.email);
            
            setNotif({ type: 'success', msg: 'Check your inbox for further instructions', title: 'Success' });
            history.push("/login");
        } catch {
            setNotif({ type: 'error', msg: 'Failed to reset password', title: 'Error' });
        }
        setForgot({...forgot, loading: false});
    };

  return (
    <div className='forgot-password-container'>
        <h2> Password Reset </h2>

        { notif && <Notification type={notif.type} msg={notif.msg} title={notif.title} /> }

        <form method="POST" onSubmit={Submit}>
            <FormInput>
                <Label label='Email' />
                <Input type="email" placeholder='Enter Email' name='email' id='Email'
                        value={forgot.email} onChange={e => setForgot({...forgot, email: e.target.value})} />
            </FormInput>

            <Button type="submit" className="btn" label='Reset Password' disabled={forgot.loading}  />
        </form>

        <div className="">
            <Link to="/login">Login</Link>
        </div>

        <div className="">
            Need an account? <Link to="/signup"> Sign Up </Link>
        </div>
    </div>
  )
}

export default ForgotPassword;