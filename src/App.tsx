import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { SignInPage } from "./pages/SignInPage";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home-page" element={<HomePage />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
