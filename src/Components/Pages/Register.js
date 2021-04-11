import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// AuthContext
import { AuthContext } from '../../Contexts/AuthContext';

import { Button, Input, Label } from '../Atoms';
import { FormInput } from '../Molecules';
import { Notification } from '../Organisms';

import '../../styles/register.scss';

const Register = () => {
    const [auth, setAuth] = useState({ email: '', password: '', confirmPassword: '', loading: false });
    const [notif, setNotif] = useState({ type: '', msg: '', title: '' });
    const history = useHistory();

    const { dispatch } = useContext(AuthContext);

    const Submit = async e => {
        e.preventDefault();
    
        if (auth.password !== auth.confirmPassword) return setAuth({...auth, error: 'Passwords do not match'});
    
        try {
          setAuth({...auth, loading: true});
          setNotif({ type: '', msg: '', title: '' });

          await dispatch({ type: 'REGISTER', payload: {email: auth.email, password: auth.password} });
          setNotif({ type: 'success', msg: 'Successfully Registered !', title: 'Success' });

          history.push("/login");
        } catch {
          setNotif({ type: 'error', msg: 'Failed to create an account !', title: 'Error' });
        }
    
        setAuth({...auth, loading: false});
        setNotif({ type: '', msg: '', title: '' });
    };

    return(
        <div className='register-container'>
            <div className="">
                <h2> Sign Up </h2>

                { notif && <Notification type={notif.type} msg={notif.msg} title={notif.title} /> }

                <form method='POST' onSubmit={Submit} className='form-register'>
                    <FormInput id="email">
                        <Label label='Email' />
                        <Input type="email" placeholder='Enter Email' name='email' id='Email'
                                value={auth.email} onChange={e => setAuth({...auth, email: e.target.value})} />
                    </FormInput>

                    <FormInput id="password">
                        <Label label='Password' />
                        <Input type="password" placeholder='Enter Password' name='password' id='Password'
                                value={auth.password} onChange={e => setAuth({...auth, password: e.target.value})}  />
                    </FormInput>

                    <FormInput id="confirmPassword">
                        <Label label='Password Confirmation' />
                        <Input type="password" placeholder='Enter Confirm Password' name='confirmPassword' id='confirmPassword'
                                value={auth.confirmPassword} onChange={e => setAuth({...auth, confirmPassword: e.target.value})} />
                    </FormInput>

                    <Button type='submit' className='btn' label='Register' disabled={auth.loading} /> {/* loading */}
                </form>
            </div>
      
            <div className="">
                Already have an account? <Link to="/login"> Log In </Link>
            </div>
        </div>
    )
}

export default Register;