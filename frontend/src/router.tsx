import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/public/Home";
import LoginPage from "./pages/public/Login";
import RedirectPage from "./pages/public/RedirectPage";
import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/redirect",
      element: <RedirectPage />,
    },
    {
      path: "/admin",
      element: <Dashboard />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
    },
  },
);

export default router;
