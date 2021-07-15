
import Categories from 'src/pages/categories/Categories';
import Sourses from 'src/pages/sourses/index.js';
import Users from 'src/pages/users/Users';
import Layout from 'src/pages/layout/Layout';
import Error from 'src/pages/error/Error';
// import Login from './pages/login/Login';
// nay t chua lam, set lai cai routes cho t voi
const routes = [
    {
        path:'/',
        exec: true,
        element:<Layout/>,
        children:[
            {
                path: 'categories',
                exact: true,
                component: Categories,
                // element:<Categories/>
            },
            {
                path: 'sourses',
                exact: true,
                component: Sourses,
                // element:<Sourses/>
            },
            {
                path: 'users',
                exact: true,
                component: Users,
                // element:<Users/>
            },
            {
                path: '*',
                exact: true,
                component: Error,
                // element:<Error/>
            },
        ]
        }//cai error dau 

]
export default routes;