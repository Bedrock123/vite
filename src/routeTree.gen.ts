/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const InvoicesRouteLazyImport = createFileRoute('/invoices')()
const IndexLazyImport = createFileRoute('/')()
const InvoicesMeLazyImport = createFileRoute('/invoices/me')()
const AboutMeLazyImport = createFileRoute('/about/me')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const InvoicesRouteLazyRoute = InvoicesRouteLazyImport.update({
  path: '/invoices',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/invoices/route.lazy').then((d) => d.Route),
)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const InvoicesMeLazyRoute = InvoicesMeLazyImport.update({
  path: '/me',
  getParentRoute: () => InvoicesRouteLazyRoute,
} as any).lazy(() => import('./routes/invoices/me.lazy').then((d) => d.Route))

const AboutMeLazyRoute = AboutMeLazyImport.update({
  path: '/me',
  getParentRoute: () => AboutLazyRoute,
} as any).lazy(() => import('./routes/about.me.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/invoices': {
      preLoaderRoute: typeof InvoicesRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/about/me': {
      preLoaderRoute: typeof AboutMeLazyImport
      parentRoute: typeof AboutLazyImport
    }
    '/invoices/me': {
      preLoaderRoute: typeof InvoicesMeLazyImport
      parentRoute: typeof InvoicesRouteLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  InvoicesRouteLazyRoute.addChildren([InvoicesMeLazyRoute]),
  AboutLazyRoute.addChildren([AboutMeLazyRoute]),
])

/* prettier-ignore-end */
