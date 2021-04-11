import { useState } from 'react';

import { AddTodo, EditTodo, RemoveTodo, TodoList } from '../Templates';
import Nav from '../Organisms/Nav';


const Todo = () => {
    const [label, setLabel] = useState('all'); // label for Cpt
    const [todo, setTodo] = useState({ userId: '', id: '', title: 'titre', completed: false }); // single todo
    const [isModalOpen, setIsModalOpen] = useState(false); // modal box

    const clearForm = () => {
        setTodo({ userId: '', id: '', title: '', completed: '' });
    };

    // const AddFeature = label => {
    //     clearForm(); setLabel(label);
    // };

    // Display Component according to user's choices
    const showCpt = label => {
        switch(label){
            case 'all': return <TodoList setLabel={setLabel} setTodo={setTodo} setIsModalOpen={setIsModalOpen} />;
            case 'add': return <AddTodo />
            case 'edit': return <EditTodo todo={todo} />;
        }
    };

    return  <div className="todo-container">
                {/* <Nav setLabel={setLabel} AddFeature={AddFeature} /> */}

                <div className='container'>
                    { (label && label) && showCpt(label) }
                    { isModalOpen && <RemoveTodo setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setTodo={setTodo} /> }
                </div>
            </div>
}

export default Todo;