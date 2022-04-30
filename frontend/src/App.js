import React from 'react';
import './App.css';
import userReducer from './Store/UserStore';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Components/StaticComponents/Signin';
import Signup from './Components/StaticComponents/Signup';

const msgStore = createStore(userReducer)

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ 
            <Provider store={msgStore}>
              <Signin/> 
            </Provider>
          }></Route>
            <Route path='/signup' element={ 
              <Provider store={msgStore}>
                <Signup/> 
              </Provider>
            }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
