import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { useEffect } from "react";
import { PATHS } from "./consts";

const DEFAULT_ROUTE = PATHS.ADD_POST;

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.values(PATHS).includes(location.pathname)) {
      navigate(DEFAULT_ROUTE);
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.pageContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
