import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { PropertyDetail } from "./pages/PropertyDetail";

export function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings/:id" element={<PropertyDetail />} />
        </Route>
      </Routes>
    </>
  );
}
