import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineRoutes } from "@remix-run/dev/dist/config/routes";
//import flatRoutes from 'remix-flat-routes';
import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
});

//const { flatRoutes } = require('remix-flat-routes');

// module.exports = {
//   // ignore all files in routes folder to prevent
//   // default remix convention from picking up routes
//   ignoredRouteFiles: ['**/*'],
//   routes: async defineRoutes => {
//     return flatRoutes('routes', defineRoutes)
//   },
// }

// function flatRoutes(
//   routeDir: string | string[],
//   defineRoutes: DefineRouteFunction,
//   options: FlatRoutesOptions,
// )

// type FlatRoutesOptions = {
//   appDir?: string // optional app directory (defaults to app)
//   basePath?: string // optional base path (default is '/')
//   paramPrefixChar?: string // optional param prefix (default is '$')
//   ignoredRouteFiles?: string[] // optional files to ingore as routes (same as Remix config option)
//   //visitFiles?: VisitFilesFunction // optional visitor (useful for tests to provide files without file system)
// }