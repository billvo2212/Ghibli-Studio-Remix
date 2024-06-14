import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,

} from "@remix-run/react";

import type { LinksFunction,MetaFunction } from "@remix-run/node";
import styles from "./tailwindcss.css";

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Studio Ghibli" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* <div id='detail'>
          <Outlet/>
        </div> */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }){
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta/>
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        {error.message}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
