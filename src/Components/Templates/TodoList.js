import { useState, useContext } from 'react'
// import { GrFormClose } from 'react-icons/gr'
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { Link } from "react-router-dom";
// import axios from 'axios';

import { TodoContext } from '../../Contexts/todoContext';

import { Spinner } from '../Molecules';
import { Item, Header, Span } from '../Atoms';
import { FilterTodo } from './';
import '../../styles/list.scss';

const TodoList = () => {
    const { todos } = useContext(TodoContext);   
    const [isModalopen, setIsModalOpen] = useState(false);

    // Modal
    const openModal = () => setIsModalOpen(true); // Open
    
    return <div className='todo__list'>
                <Header style='todo__header' type='h2' label='Todo List' />
                <FilterTodo data={todos} />

                <ul>
                    {Array.isArray(todos) && todos.length > 0 ? 
                        <div className='todo-list__labels'>
                            <Span label='user id' />
                            <Span label='id' />
                            <Span label='title' />
                            <Span label='completed' />
                            <Span label='actions' />
                        </div> : '' }
                    
                    { Array.isArray(todos) && todos.length > 0 ? todos.map( (todo, index) =>
                        <div className='todo-list__data' key={index}>
                            <Item label={todo.userId} />
                            <Item label={todo.id} />
                            <Item label={todo.title} />
                            <Item label={todo.completed} />

                            <div className='todo-list__group-btn'>
                                <Link to={`/edit/${todo.id}`}> <BsPencilSquare className='icon' /> </Link>
                                <Link to={`/remove/${todo.id}`} onClick={() => openModal()}> <BsTrashFill className='icon' /> </Link>
                            </div>
                        </div> ) : <Spinner /> }
                </ul>
            </div>
}

export default TodoList; 