import React from "react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./finance/Navbar";
import FinanceRoutes from "./finance/FinanceRoutes";

function App() {
  return (
    <BrowserRouter>
      <div style={styles.appContainer}>
        <Sidebar />

        <div style={styles.mainContent}>
          <Navbar />

          <FinanceRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
  },

  mainContent: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};

export default App;