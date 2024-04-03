import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home.jsx";
import { Login } from "./views/Login.jsx";
import { Register } from "./views/Register.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
