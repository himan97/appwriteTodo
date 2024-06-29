import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import Github from './components/Github.jsx'
import About from './components/About.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children : [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'about',
        element:<About/>
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:'github',
        element:<Github/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'signup',
        element:<Signup/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
