
// import './style.css';

const Button = props => {
    const { type, style, label, icon, disabled } = props;
    
    return  <button type={type} className={style} disabled={disabled ? disabled : false}> 
                {icon ? icon : ''} {label}
            </button> 
}

export default Button