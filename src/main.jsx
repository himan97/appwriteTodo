import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home,Contact,Github,About,Login,Signup,Verify} from './components/index.js'
import store from './store/store.js'
import { Provider } from 'react-redux'


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
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/github',
        element:<Github/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
     
    ]

  },
  {
  path:'/verify',
  element:<Verify/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
