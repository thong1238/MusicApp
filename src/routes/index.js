import Home from '~/pages/Home';
import Favorate from '~/pages/Favorate';
import Menu from '~/pages/Menu';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/favorate', component: Favorate },
    { path: '/menu', component: Menu },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
