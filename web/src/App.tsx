import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Contact } from "./pages/Contact";

export function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings" element={<Listings />} />
          <Route path="listings/:id" element={<PropertyDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
