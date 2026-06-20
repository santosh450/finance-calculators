import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import CalculatorsPage from "./pages/CalculatorsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import SipCalculatorPage from "./pages/SipCalculatorPage";
import LumpsumCalculatorPage from "./pages/LumpsumCalculatorPage";
import FdCalculatorPage from "./pages/FdCalculatorPage";
import EmiCalculatorPage from "./pages/EmiCalculatorPage";
import CagrCalculatorPage from "./pages/CagrCalculatorPage";
import RdCalculatorPage from "./pages/RdCalculatorPage";
import PpfCalculatorPage from "./pages/PpfCalculatorPage";
import ScrollToTop from "./components/ScrollToTop";
import StepUpSipCalculatorPage from "./pages/SipStepUpCalculatorPage";
import SipLumpSumCalculatorPage from "./pages/SipLumpSumCalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sip-calculator" element={<SipCalculatorPage />} />
          <Route path="/fd-calculator" element={<FdCalculatorPage />} />
          <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
          <Route path="/cagr-calculator" element={<CagrCalculatorPage />} />
          <Route path="/ppf-calculator" element={<PpfCalculatorPage />} />
          <Route
            path="/lumpsum-calculator"
            element={<LumpsumCalculatorPage />}
          />
          <Route path="/rd-calculator" element={<RdCalculatorPage />} />
          <Route
            path="/step-up-sip-calculator"
            element={<StepUpSipCalculatorPage />}
          />
          <Route
            path="/sip-lumpsum-calculator"
            element={<SipLumpSumCalculatorPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
