

const Header = props => {
    const { type, style, label } = props;

    const checkType = type => {
        switch(type){
            case 'h1': return <h1 className={style}> {label} </h1> 
            case 'h2': return <h2 className={style}> {label} </h2> 
            case 'h3': return <h3 className={style}> {label} </h3> 
            case 'h4': return <h4 className={style}> {label} </h4> 
        }
    }
    
    return checkType(type); 
}

export default Header