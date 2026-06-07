import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import CalculatorsPage from "./pages/CalculatorsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import SipCalculatorPage from "./pages/SipCalculatorPage";
import LumpsumCalculatorPage from "./pages/LumpsumCalculatorPage";
import FdCalculatorPage from "./pages/FdCalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sip-calculator" element={<SipCalculatorPage />} />
          <Route path="/fd-calculator" element={<FdCalculatorPage />} />
          <Route
            path="/lumpsum-calculator"
            element={<LumpsumCalculatorPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
