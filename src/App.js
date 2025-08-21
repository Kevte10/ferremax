import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Catalogo from "./app/Catalogo";
import Producto from "./app/Producto";
import Carrito from "./app/Carrito";
import Contacto from "./app/Contacto";
import Nosotros from "./app/Nosotros";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import WhatsappBtn from "./components/WhatsappBtn";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <CarritoProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/producto/:id" element={<Producto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
            </Routes> 
          </main>
          <Footer />
        </div>
        {/* Botón flotante de WhatsApp */}
        <WhatsappBtn />
      </Router>
      
      {/* ✅ Toaster global (notificaciones) */}
      <Toaster position="bottom-right" />
    </CarritoProvider>
  );
}

export default App;
