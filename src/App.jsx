import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Pages from "./Pages";
import { Navbar } from "./Navbar";
import { NotFoundPage } from "./NotFoundPage";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <Pages />,
          errorElement: <NotFoundPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
