import { useContext } from 'react';
import { GrFormClose } from 'react-icons/gr';
import axios from 'axios';

import { TodoContext } from '../../Contexts/todoContext';
import { Modal } from '../Molecules';
import '../../styles/remove.scss';


const RemoveTodo = props => {
    const { data, setIsModalOpen, isModalOpen } = props;
    const { dispatch } = useContext(TodoContext);
    const todo = { userId: '', id: '', title: '', completed: false };

    /* Modal Open-Close */
    const closeModal = () => setIsModalOpen(false);

    // API Calls
    const remove = todo => {
        const url = `https://jsonplaceholder.typicode.com/posts/postId=${todo.id}`;

        // remove todo from store (Context)
        // dispatch({ type: 'REMOVE_TODO', payload: todo });
 
        // remove data from back-end
        axios.delete(url)
        .then(res => dispatch({ type: 'REMOVE_TODO', payload: res.data }) )
        .catch(err => console.error(err));
        
        closeModal();
    };

    return <Modal isModalOpen={isModalOpen} closeModal={closeModal} className='modalStyle'>
                <div className='modal__header'>
                    <h4 style={{margin: '0'}}> Remove Task </h4>  
                    <GrFormClose style={{cursor: 'pointer'}} size={24} onClick={closeModal} />
                </div>

                <hr />

                <div className='modal__body'>
                    <p> Are you sure that you want to remove this item ? </p>
                </div>

                <hr />

                <div className='modal__footer'>
                    <button className='btn btn-remove' onClick={() => remove(todo)}>
                        Remove
                    </button>
                    <button className='btn btn-outline' onClick={closeModal}>
                        Close
                    </button>
                </div>
            </Modal>

}

export default RemoveTodo;