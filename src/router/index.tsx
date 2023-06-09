import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Alternative from "../pages/alternative/List";
import Create from "../pages/alternative/Create";
import Edit from "../pages/alternative/Edit";

import Criteria from "../pages/criteria/List";
import CreateCriteria from "../pages/criteria/Create";
import EditCriteria from "../pages/criteria/Edit";

import Calculate from "../pages/calculate/Calculate";
import UpdateMatrix from "../pages/calculate/Create";
import Results from "../pages/calculate/Results";

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Alternative /> },
        { path: "alternative", element: <Alternative /> },
        { path: "alternative/create", element: <Create /> },
        { path: "alternative/edit/:id", element: <Edit /> },
        { path: "criteria", element: <Criteria /> },
        { path: "criteria/create", element: <CreateCriteria /> },
        { path: "criteria/edit/:id", element: <EditCriteria /> },
        { path: "calculate", element: <Calculate /> },
        { path: "calculate/update/:id", element: <UpdateMatrix /> },
        { path: "result", element: <Results /> },
      ],
      
    },
  ]);
  return element;
}
