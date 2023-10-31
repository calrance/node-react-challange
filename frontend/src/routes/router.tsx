import {
  Route,
  Router,
  RouterContext,
  lazyRouteComponent,
  redirect
} from '@tanstack/react-router';
import Login from '../pages/Login';

interface AuthRouterContext {
  isAuth: boolean;
}

const authContext = new RouterContext<AuthRouterContext>();
const rootRoute = authContext.createRootRoute();

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <div>
      <Login />
    </div>
  );
}

// Route
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazyRouteComponent(() => import('../pages/Login')),
});

const dashboardRoute = new Route({
  id: 'dashboard',
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: async ({ context }: { context: any }) => {
    if (!context.isAuth) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: lazyRouteComponent(() => import('../pages/Dashboard')),
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);

const router = new Router({
  routeTree: routeTree,
  context: {
    isAuth: false,
  },
});

// Register router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
