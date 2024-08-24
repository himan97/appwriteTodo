import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Spinner, Authlayer } from './components/index.js'
import store from './store/store.js'
import { Provider } from 'react-redux'

const Todo = lazy(() => import('./components/Todo.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Github = lazy(() => import('./components/Github.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Login = lazy(() => import('./components/Login.jsx'))
const Signup = lazy(() => import('./components/Signup.jsx'))
const Verify = lazy(() => import('./components/Verify.jsx'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication>
              <Todo/>
            </Authlayer>
          </Suspense>
        )
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication>
              <About/>
            </Authlayer>
          </Suspense>
        )
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication>
              <Contact/>
            </Authlayer>
          </Suspense>
        )
      },
      {
        path: '/github',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication>
              <Github/>
            </Authlayer>
          </Suspense>
        )
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication={false}>
              <Login/>
            </Authlayer>
          </Suspense>
        )
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<Spinner />}>
            <Authlayer authentication={false}>
              <Signup/>
            </Authlayer>
          </Suspense>
        )
      },
    ]
  },
  {
    path: '/verify',
    element: (
      <Suspense fallback={<Spinner />}>
        <Verify/>
      </Suspense>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
