import { Link } from 'react-router-dom';

import { ListItem } from '../Molecules'
import '../../styles/nav.scss'

const Nav = props => {
    const { setLabel, AddFeature } = props;
    const data = [
        { label: 'All Tasks', onclick: () => setLabel('all'), link: 'tasks'},
        { label: 'Add Task', onclick: () => AddFeature('add'), link: 'add'}
    ]
    
    return( <ListItem style='menu'> 
                {  data.map(el => <Link to={el.link} key={el.link}> {el.label} </Link>) }
            </ListItem> )
}

export default Nav;