import { Link } from 'react-router-dom';

import '../../styles/notFound.scss';

const NotMatchRoute = () => {

    return(
            <div className='notFound-container'>
                <h1> 404 Not Found </h1>
                <Link to='/'> Go Home </Link>
            </div>
    )
}

export default NotMatchRoute;