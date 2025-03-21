import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import RentalPage from "./components/RentalPage";
import WhyUsPage from "./components/WhyUsPage";
import ProductPage from "./components/ProductPage";
import ContactPage from "./components/ContactPage";
import routes from "./tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import PageTransition from "./components/PageTransition";

function App() {
  // Properly handle Tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <PageTransition>
          {tempoRoutes}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rental" element={<RentalPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
        </PageTransition>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
