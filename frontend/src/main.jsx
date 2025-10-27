import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'
import Welcome from './screens/Welcome.jsx'
import Homescreen from './screens/Homescreen.jsx'
import Signup from './screens/Signup.jsx'
import Signin from './screens/Signin.jsx'
import Profilescreen from './screens/Profilescreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Viewblogscreen from './screens/Viewblogscreen.jsx'
import Postblogscreen from './screens/Postblogscreen.jsx'
import Blogscreen from './screens/Blogscreen.jsx'
import Updateblogscreen from './screens/Updateblogscreen.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },   // Landing page
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },

      {
        element: <PrivateRoute />,  // Protects routes below
        children: [
          { path: 'home', element: <Homescreen /> },
          { path: 'profile', element: <Profilescreen /> },
          {path: 'blogs/:id', element: <Viewblogscreen />},
          {path: 'create-post', element: <Postblogscreen />},
          {path: 'blogs', element: <Blogscreen />},
          {path: 'update/:id', element: <Updateblogscreen />}
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
