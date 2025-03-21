import { lazy } from "react";

const routes = [
  {
    path: "/tempobook/*",
    element: lazy(() => import("./tempobook/dynamic/src/stories")),
  },
];

export default routes;
