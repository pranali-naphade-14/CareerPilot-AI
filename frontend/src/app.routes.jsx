import {createBrowserRouter} from "react-router";
import Login from "./features/authentication/pages/Login.jsx";
import Register from "./features/authentication/pages/Register.jsx";
import Protected from "./features/authentication/components/Protected.jsx";
import Home from "./features/ai/pages/Home.jsx";
import Interview from "./features/ai/pages/Interview.jsx";

export const router=createBrowserRouter([
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/Register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
])