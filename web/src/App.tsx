import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { Testimonials } from "./pages/Testimonials";
import { Contact } from "./pages/Contact";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listings" element={<Listings />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
