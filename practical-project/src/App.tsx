import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Notfound from "./pages/404";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
