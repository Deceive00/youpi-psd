import "./App.css";
import { router } from "@lib/routes/routes";
import AuthContextProvider from "./context/auth-context";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="font-restart">
        <AuthContextProvider>
          <RouterComponent />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

function RouterComponent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      {router.map((route: any) => {
        return <Route path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}

export default App;
