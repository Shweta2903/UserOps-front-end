import { createBrowserRouter } from "react-router-dom";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

const router = createBrowserRouter([
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
