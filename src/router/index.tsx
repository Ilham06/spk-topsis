import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Alternative from "../pages/alternative/List";
import Create from "../pages/alternative/Create";
import Edit from "../pages/alternative/Edit";

import Criteria from "../pages/criteria/List";
import CreateCriteria from "../pages/criteria/Create";
import EditCriteria from "../pages/criteria/Edit";

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "alternative", element: <Alternative /> },
        { path: "alternative/create", element: <Create /> },
        { path: "alternative/edit/:id", element: <Edit /> },
        { path: "criteria", element: <Criteria /> },
        { path: "criteria/create", element: <CreateCriteria /> },
        { path: "criteria/edit/:id", element: <EditCriteria /> },
      ],
      
    },
  ]);
  return element;
}
