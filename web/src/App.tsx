import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { LegalPage } from "./pages/LegalPage";
import { NotFound } from "./pages/NotFound";
import { PropertyDetail } from "./pages/PropertyDetail";

export function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings/:id" element={<PropertyDetail />} />
          <Route path="accessibility" element={<LegalPage doc="accessibility" />} />
          <Route path="privacy" element={<LegalPage doc="privacy" />} />
          <Route path="terms" element={<LegalPage doc="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
