import React from 'react';
import './App.css';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux'
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from './pages/home'
import Test from './pages/test';

export const router = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/test",
    element: <Test/>
  }
]

function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <PersistGate persistor={ persistor }>
          <Routes>
            {
              router.map((item, index)=>{
                return <Route path={item.path} element={item.element} />
              })
            }
          </Routes>
        </PersistGate>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
