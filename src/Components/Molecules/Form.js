
const Form = props => {
    const { style, children, submit } = props;
    
    return <form method='POST' className={style} onSubmit={submit}> {children} </form>
}

export default Form;