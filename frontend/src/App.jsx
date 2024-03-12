import { Navigate, useRoutes } from "react-router-dom";
import About from "./pages/About";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import Privacy from "./pages/Privacy";
import Reports from "./pages/Reports";
import Salaries from "./pages/Salaries";
import Terms from "./pages/Terms";
import Layout from "./components/layouts/Layout";
import Login from "./pages/Login";
import ReportDetails from "./pages/ReportDetails";
import { useSelector } from "react-redux";
import EmployeeStats from "./pages/EmployeeStats";

function App() {
  const isLoggedIn = useSelector((state) => state?.auth?.value);
  const routes = isLoggedIn
    ? [
        {
          path: "/",
          element: <Layout />,
          children: [
            { index: true, element: <Navigate to="/home" /> },
            { path: "home", element: <Home /> },
            { path: "loans", element: <Loans /> },
            { path: "salaries", element: <Salaries /> },
            { path: "employees", element: <Employees /> },
            { path: "employees/:itemId", element: <Employees /> },
            { path: "reports", element: <Reports /> },
            { path: "reports/details", element: <ReportDetails /> },
            { path: "reports/details/:id", element: <EmployeeStats /> },
            { path: "about", element: <About /> },
            { path: "terms", element: <Terms /> },
            { path: "privacy", element: <Privacy /> },
            { path: "*", element: <Navigate to="/home" /> },
          ],
        },
      ]
    : [
        {
          path: "/login",
          element: <Login />,
        },
        { path: "*", element: <Navigate to="/login" /> },
      ];
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
