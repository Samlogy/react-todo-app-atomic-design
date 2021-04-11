import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// AuthContext
import { AuthContext } from '../../Contexts/AuthContext';

import { Button, Input, Label} from '../Atoms';
import { FormInput } from '../Molecules';
import { Notification } from '../Organisms';

import '../../styles/login.scss';


const Login = () => {
  const [auth, setAuth] = useState({ email: '', password: '', loading: false });
  const [notif, setNotif] = useState({ type: '', msg: '', title: '' });
  const history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const Submit = async e =>  {
    e.preventDefault();

    try {
      setAuth({...auth, loading: true});
      setNotif({ type: '', msg: '', title: '' });

      await dispatch({ type: 'LOGIN', payload: { email: auth.email, password: auth.password } });
      setAuth({...auth, loading: true});
      setNotif({ type: 'success', msg: 'Successfully Logged !', title: 'Succes' });

      history.push("/dashboard");
    } catch {
      setNotif({ type: 'error', msg: 'Failed to log in', title: 'Error' });
    }

    setAuth({...auth, loading: false});
  };

    return (
        <div className='login-container'>
            <div className="">
                <h2> Sign In </h2>

                { notif && <Notification type={notif.type} msg={notif.msg} title={notif.title} /> }

                <form method='POST' onSubmit={Submit} className='form-login'>
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

                    <Button type='submit' className='btn' label='Login' disabled={auth.loading} /> {/* loading */}
                </form>
            </div>
      
            <div className="">
                Need an account? <Link to="/signup"> Sign Up </Link>
            </div>
        </div>
    )
}

export default Login;