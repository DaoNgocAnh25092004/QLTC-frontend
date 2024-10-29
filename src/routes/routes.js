//  Desc: Routes configuration file
import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/Layouts';

// Pages
import Home from '~/pages/Home';
import Pant from '~/pages/Pant';
import Shirt from '~/pages/Shirt';
import Login from '~/pages/Login';

// Routes public
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.shirt,
        component: Shirt,
    },
    {
        path: config.routes.pant,
        component: Pant,
    },
    {
        path: config.routes.login,
        component: Login,
    },
];

// Routes private
const privateRoutes = [];

export { publicRoutes, privateRoutes };
