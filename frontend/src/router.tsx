import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/public/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;