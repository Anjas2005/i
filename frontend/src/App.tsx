import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";

function App() {
  const isAuthenticated = false; // Replace with your auth check

  return isAuthenticated ? <Home/> : <RegisterUser />;
}

export default App;
