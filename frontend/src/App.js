import React from "react";
import AppRouter from "./AppRouter";
import NavBar from './components/NavBar';
import './Styles.css';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;