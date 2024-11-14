//  Desc: Routes configuration file
import config from '~/config';

// Layouts
import { HeaderOnly } from '~/Layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Library from '~/pages/Library';
import Store from '~/pages/Store';
import Profile from '~/pages/Profile';

// Routes public
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.library,
        component: Library,
    },
    {
        path: config.routes.store,
        component: Store,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: HeaderOnly,
    },
];

// Routes private
const privateRoutes = [];

export { publicRoutes, privateRoutes };
