//  Desc: Routes configuration file
import config from '~/config';

// Layouts
import { HeaderOnly } from '~/Layouts';

// Pages
import Home from '~/pages/Home';
import Pant from '~/pages/Pant';
import Shirt from '~/pages/Shirt';

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
];

// Routes private
const privateRoutes = [];

export { publicRoutes, privateRoutes };
