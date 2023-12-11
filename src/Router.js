import { createBrowserRouter } from "react-router-dom";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import UserSignUp from "./UserSignUp";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <UserSignUp />,
  },
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/create-user",
    element: <CreateUser />,
  },
  {
    path: "/:userID",
    element: <UpdateUser />,
  },
]);

export default router;
