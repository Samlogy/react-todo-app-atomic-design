import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

import { todoReducer } from '../Reducers/todoReducer';

// create a context
export const TodoContext = createContext();

const TodoContextProvider = props => {
   const { children } = props;

  // get todos from localStorage if exist
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });

  const getAllTodos = limit => {
    // setTodos({...todos, loading: true });
    const url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;
    
    // get data from the back-end
    axios.get(url, { timeout: 5000 })
    .then(res => dispatch({ type:'SET_TODOS', payload: res.data }) ) // set todos to the store
    .catch(err => { /* Error Handling */
        if (err.response) {
            // Server responded with a status other than 200 range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if (err.response.status === 404) alert('Error: Page Not Found');
        } else if (err.request) console.error(err.request); // Request was made but no response
        else console.error(err.message);
    });
    
  };

  // useEffect(() => {  getAllTodos(10) }, []); // set limit (nbr max of items to render)

  // set new value in loacalStorage when todos edited
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    // wrap content with provider
    <TodoContext.Provider value={{ todos, dispatch }}>
      { children }
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;