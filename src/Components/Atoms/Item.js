
// import './style.css';

const Item = props => {
    const { label, onclick } = props;
    
    return <li className='list__item' onClick={onclick}> {label} </li>
}

export default Item;