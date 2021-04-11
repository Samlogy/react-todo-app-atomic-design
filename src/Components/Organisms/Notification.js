import { useState } from "react";
import { GrFormClose } from "react-icons/gr";

import '../../styles/notification.scss';

const Notification = props => {
  const { type, title, msg , pos } = props;
  const [notif, setNotif] = useState(true);

  // positionning on screen (default: top-left)
  let position = pos ? pos : 't-l';

  // set icon according to type
  const Icon = () => {
    return  type == 'success' ? 'success' :
            type == 'error' ? 'error' : 
            type == 'warning' ? 'warning' :
            type == 'info' ? 'info' : ''
    
  }

  return (
    <div
      className={
        notif ? `notification-container-${type} ${position}` : "notification-container-hide"
      }
    >
      <div className="header-container">
        <GrFormClose
          className="close-icon"
          onClick={() => setNotif(!notif)}
        />
      </div>

      <div className="body-container">
        <h3> {title} </h3>
        <p> {msg} </p>
        { type ? Icon() : '' }
      </div>
    </div>
  );
};
export default Notification;
