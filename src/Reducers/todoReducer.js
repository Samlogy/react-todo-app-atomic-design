import { v4 as uuidv4 } from 'uuid'; // generate id

export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS': 
      return [...action];

    case 'ADD_TODO':
      return [...state, {
            title: action.todo.title, 
            author: action.todo.author, 
            id: uuidv4()
        }
      ];

    case 'EDIT_TODO': {
      let editTodo = state.filter(todo => todo.id === action.id);

      editTodo.title = action.todo.title;
      editTodo.completed = action.todo.comleted;

      return [...state, {...editTodo}]
    };

    case 'REMOVE_TODO': 
      return state.filter(todo => todo.id !== action.id);
      
    default: return state;
  }
} 