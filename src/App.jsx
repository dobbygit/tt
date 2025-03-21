import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WhyUsPage from "./pages/WhyUsPage";
import RentalPage from "./pages/RentalPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
