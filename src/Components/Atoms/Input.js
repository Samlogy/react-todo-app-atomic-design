import { useState } from 'react';
// import './style.css';

const Input = props => {
    const { type, placeholder, name, value, onChange, id } = props;
    // const [inputValue, setInputValue] = useState(value);

    const handleChange = val => {
        // setInputValue(val);
        if(onChange) onChange(val); 
    };

    const checkType = () => {
        if(type === 'textarea') return <textarea placeholder={placeholder} name={name} value={value} id={id} onChange={onChange}> </textarea>
        else return <input type={type} placeholder={placeholder} name={name} id={id} value={value} onChange={handleChange} />
    };
    
    return checkType(type);
}

export default Input;