import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "/assets/img/logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { addEmployee } from "../../store/slices/employeesSlice";
import { toast } from "react-hot-toast";
import { GET_EMPLOYEES } from "../../const/endpoints";
import { httpService } from "../../services/httpService";

const Layout = () => {
  const { pathname } = useLocation();
  const isUpdated = useSelector((state) => state.employees?.isUpdate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getEmployees = async () => {
    try {
      const res = await httpService.get(GET_EMPLOYEES);
      dispatch(addEmployee(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [isUpdated]);

  return (
    <div className="wrapper">
      <header className="my-header" role="banner">
        <div className="container">
          <div className="navbar navbar__container">
            <NavLink to="/home">
              <img src={logo} alt="EMS Mars logo" className="logo" />
            </NavLink>
            <ul className="navbar__menu">
              <li className={pathname === "/home" ? "active" : ""}>
                <NavLink to="/home"> Home </NavLink>
              </li>

              <li className={pathname === "/employees" ? "active" : ""}>
                <NavLink to="/employees"> Employees </NavLink>
              </li>

              <li className={pathname === "/reports" ? "active" : ""}>
                <NavLink to="/reports"> Reports </NavLink>
              </li>

              <li className={pathname === "/loans" ? "active" : ""}>
                <NavLink to="/loans"> Loans </NavLink>
              </li>

              <li className={pathname === "/salaries" ? "active" : ""}>
                <NavLink to="/salaries"> Salaries </NavLink>
              </li>

              <li className={pathname === "/about" ? "active" : ""}>
                <NavLink to="/about"> About </NavLink>
              </li>
            </ul>
            <li to="/login" onClick={onLogout} className="navbar__links">
              Sign out
            </li>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
