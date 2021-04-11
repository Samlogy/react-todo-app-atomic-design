import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// AuthContext
import { AuthContext } from '../../Contexts/AuthContext';

import { Notification } from '../Organisms';
import { Button } from '../Atoms';

import '../../styles/dashboard.scss';


const Dashboard = () => {
  const [notif, setNotif] = useState({ type: '', msg: '', title: '' });
  const history = useHistory();

  const { currentUser, dispatch } = useContext(AuthContext);

  const Logout = async () => {
    setNotif({ type: '', msg: '', title: '' });

    try {
      await dispatch({ type: 'LOGOUT' });
      setNotif({ type: 'success', msg: 'Successfully logged out !', title: 'Success' });

      history.push("/login");
    } catch {
      setNotif({ type: 'error', msg: 'Failed to log out !', title: 'Error' });
    }
  };

  return (
    <div className='dashboard-container'>
        <div className='dashboard-container'>
            <h2> Profile </h2>

            { notif && <Notification type={notif.type} msg={notif.msg} title={notif.title} /> }
            <strong> Email: </strong> {currentUser.email}

            <Link to="/editProfile" className="btn">
              Edit My Profile
            </Link>
        </div>

        <div className="">
            <Button style="btn" label='Log Out' onClick={() => Logout()} />
        </div>
    </div>
  )
}

export default Dashboard;