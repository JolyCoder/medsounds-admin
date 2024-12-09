import { Outlet } from "react-router";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";

function App() {
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
