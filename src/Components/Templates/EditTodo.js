import { TodoForm } from '../Organisms';

const EditTodo = props => {
    const { todo } = props;
    
    return <TodoForm label='Edit Todo' data={todo} action='edit' /> 
}

export default EditTodo;