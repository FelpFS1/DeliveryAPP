import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/public/Home";
import LoginPage from "./pages/public/Login";

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
