import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Todo,Contact,Github,About,Login,Signup,Verify, Authlayer} from './components/index.js'
import store from './store/store.js'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children : [
      {
        path:'/',
        element:(
        <Authlayer authentication>
        <Todo/>
      </Authlayer>)
      },
      {
        path:'/about',
        element:(
          <Authlayer authentication>
            <About/>
          </Authlayer>)
      },
      {
        path:'/contact',
        element:(
          <Authlayer authentication>
            <Contact/>
          </Authlayer>)
      },
      {
        path:'/github',
        element:(
        <Authlayer authentication>
          <Github/>
        </Authlayer>)
      },
      {
        path:'/login',
        element:(
        <Authlayer authentication= {false} >
          <Login/>
        </Authlayer>)
      },
      {
        path:'/signup',
        element:(
        <Authlayer authentication= {false} >
          <Signup/>
        </Authlayer>)
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
