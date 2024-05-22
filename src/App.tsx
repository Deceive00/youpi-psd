import "./App.css";
import { router } from "@lib/routes/routes";
import AuthContextProvider from "./context/auth-context";
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <div className="font-restart">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
