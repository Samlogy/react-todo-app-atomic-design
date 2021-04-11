// import { Item } from '../Atoms'

const ListItem = props => {
    const { style, children } = props;
    
    return  <ul className={style ? style : 'list'}> 
                {/* { data.map((el, index) => <Item label={el.label} onclick={el.onclick} key={index} />) } */}
                {children}
            </ul>
}

export default ListItem;