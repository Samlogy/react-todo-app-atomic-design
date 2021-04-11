import { Fragment, useState, useContext } from 'react';
import axios from 'axios';

import { TodoContext } from '../../Contexts/todoContext';

import { Header, Input, Label, Button, Span } from '../Atoms';
import { Form, FormInput } from '../Molecules';
import { Notification } from './';

import '../../styles/add.scss';


const TodoForm = props => {
    const { data, label, action } = props;
    const { dispatch } = useContext(TodoContext);

    const initState = () => {
        const { userId, id, title, desc, username, role, completed } = data;

        return {
            userId: userId ? userId : '',
            id: id ? id : '', 
            title: title ? title : '',
            desc: desc , desc : '',
            username: username ? username : '', 
            role: role ? role : 'both',
            completed: completed ? completed : false
        };
    };
    // data ? iniState : { userId: '', id: '', title: '', desc: '', username: '', role: 'both', completed: false }
    const [todo, setTodo] = useState({ userId: '', id: '', title: '', desc: '', username: '', role: 'both', completed: false }); // single todo

    const completed = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ];

    const submitForm = (e, data) => {
        e.preventDefault();

        if(action == 'edit') { // PUT
            const url = `https://jsonplaceholder.typicode.com/posts/postId=${data.id}`;

            // edit todo from store
            dispatch({ type: 'EDIT_TODO', payload: todo });

            // edit todo in back-end
            axios.patch(url, todo)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
        } else { // POST
            const url = `https://jsonplaceholder.typicode.com/posts`;

            // add todo to store
            dispatch({ type: 'ADD_TODO', payload: todo });

            // add todo to back-end
            axios.post(url, todo).then(res => console.log(res.data))
            .catch(err => console.error(err));
        }
    };
    
    return  <div className='todo__container'>
                <Header style='todo__header' type='h2' label={label} />
                
                <Form style='todo__form' submit={e => submitForm(e, data)}>
                    <FormInput>
                        <Label id='title' label='Title' />
                        <Input type='text' name='title' placeholder='Enter Title'
                                onChange={e => setTodo({...todo, title: e.target.value})} value={todo.title} id='title' />
                    </FormInput>

                    <FormInput>
                        <Label id='desc' label='Description' />
                        <Input type='textarea' name='desc' placeholder='Enter Description'
                                onChange={e => setTodo({...todo, desc: e.target.value})} value={todo.desc} id='desc' />
                    </FormInput>

                    <FormInput>
                        <Label id='username' label='username' />
                        <Input type='text' name='username' placeholder='Enter Username'
                                onChange={e => setTodo({...todo, username: e.target.value})} value={todo.desc} id='username' />
                    </FormInput>

                    <FormInput>
                        <Label id='desc' label='Description' />

                        <select name='role' onChange={e => setTodo({...todo, role: e.target.value})} value={todo.role} id='role'> 
                            <option> Role </option>
                            <option value='both'> Both </option>
                            <option value='lead'> Lead </option>
                            <option value='executor'> Exc</option>
                        </select>
                    </FormInput>

                    <FormInput>
                        <Label id='completed' label='Completed' />
                            {completed.map(el => 
                               <Fragment key={el.label}>
                                    <Span label={el.label} />
                                    <Input type='radio' name='completed' value={el.value} checked={el.value === todo.completed}
                                            onChange={e => setTodo({...todo, completed: e.target.value})} id='completed' />
                               </Fragment>) }
                    </FormInput>

                    <Button type='submit' label={action == 'add' ? 'ADD Todo' : 'EDIT Todo'} />
                </Form>
            </div>
}

export default TodoForm;