import React, { useEffect } from 'react';
import { Outlet, Router, RouterProvider, createRoute, createRootRoute, useRouter } from '@tanstack/react-router';
import ModernPreJoin from './components/ModernPreJoin';
import ModernRoom from './components/ModernRoom';
import LoginPage from './components/auth/LoginPage';
import useRoomState from '../hooks/useRoomState/useRoomState';
import { useAppState } from '../state';

const RootComponent = () => {
  const router = useRouter();
  const roomState = useRoomState();
  const { user, isAuthReady } = useAppState();
  const requiresAuth = Boolean(process.env.REACT_APP_SET_AUTH);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    const currentPath = router.state.location.pathname;

    if (requiresAuth && !user) {
      if (currentPath !== '/login') {
        router.navigate({ to: '/login' }).catch(() => undefined);
      }
      return;
    }

    if (currentPath === '/login' && user) {
      router.navigate({ to: '/' }).catch(() => undefined);
      return;
    }

    const target = roomState === 'disconnected' ? '/' : '/room';
    if (currentPath !== target) {
      router.navigate({ to: target }).catch(() => undefined);
    }
  }, [isAuthReady, requiresAuth, roomState, router, user]);

  return <Outlet />;
};

const rootRoute = createRootRoute({
  component: RootComponent,
});

const preJoinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ModernPreJoin,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/room',
  component: ModernRoom,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([preJoinRoute, roomRoute, loginRoute]);

export const appRouter = new Router({
  routeTree,
  defaultPreload: 'intent',
});

export function ModernRouterProvider() {
  return <RouterProvider router={appRouter} />;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof appRouter;
  }
}
