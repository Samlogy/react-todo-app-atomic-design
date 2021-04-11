import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import logo from './logo.svg';
// import { Spinner } from './Components/Molecules';


// import contexts
import { TodoContextProvider, AuthProvider } from './Contexts';

import { Nav } from './Components/Organisms';
import { TodoList, AddTodo, EditTodo, RemoveTodo } from './Components/Templates';
import { Login, Register, Dashboard, NotMatchRoute, ForgotPassword, EditProfile } from './Components/Pages';

import PrivateRoute from './helpers/PrivateRoute';

import './App.scss';
// const { TodoList, AddTodo, EditTodo, RemoveTodo } = lazy(() => import('./Components/Templates'));
// const NotMatchRoute = lazy(() => import('./Components/Pages/NotMatchRoute'));
// const Nav = lazy(() => import('./Components/Organisms/Nav'));


const App = () => {

  return (
    
      <Router>
          <div className='todo-container'>
            <Nav />

            <TodoContextProvider>
              <AuthProvider>
                  <Switch>
                    {/* <Suspense fallback={<h6> Loading... </h6>}> */}
                    
                      {/* Todo Features */}
                      <PrivateRoute path="/" exact component={TodoList} />
                      <PrivateRoute path="/tasks" exact component={TodoList} />
                      <PrivateRoute path="/add" component={AddTodo} />
                      <PrivateRoute path="/edit/:id" component={EditTodo} />
                      <PrivateRoute path="/remove/:id" component={RemoveTodo} />

                      {/* Auth */}
                      <Route path='/login' component={Login} />
                      <Route path='/register' component={Register} />

                      <PrivateRoute path="/dashboard" component={Dashboard} />
                      <PrivateRoute path="/editProfile" component={EditProfile} />

                      <Route path='/forgotPassword' component={ForgotPassword} />


                    {/* </Suspense> */}

                    {/* Not Found Route --> 404 */}
                    <Route path="*" component={NotMatchRoute} />
                  </Switch>
              </AuthProvider>
            </TodoContextProvider>
          </div>
      </Router>
      
  )
}

export default App;