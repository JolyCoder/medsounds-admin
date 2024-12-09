import { Outlet } from "react-router";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.pageContainer}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
