import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // íconos de hamburguesa

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <nav className="bg-ferreBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
                <span className="text-ferreYellow font-bold text-xl">🔧 FerreMax</span>
            </Link>
            </div>

          {/* Botón hamburguesa (móvil) */}
            <div className="flex md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-ferreYellow focus:outline-none"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            </div>

          {/* Menú en pantallas grandes */}
            <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-ferreYellow">Inicio</Link>
            <Link to="/catalogo" className="hover:text-ferreYellow">Catálogo</Link>
            <Link to="/nosotros" className="hover:text-ferreYellow">Nosotros</Link>
            <Link to="/contacto" className="hover:text-ferreYellow">Contacto</Link>
            <Link to="/carrito" className="hover:text-ferreYellow">Carrito 🛒</Link>
            </div>
        </div>
        </div>

      {/* Menú desplegable en móvil */}
        {isOpen && (
        <div className="md:hidden bg-ferreBlue px-4 pb-4 space-y-2">
            <Link to="/" className="block hover:text-ferreYellow">Inicio</Link>
            <Link to="/catalogo" className="block hover:text-ferreYellow">Catálogo</Link>
            <Link to="/nosotros" className="block hover:text-ferreYellow">Nosotros</Link>
            <Link to="/contacto" className="block hover:text-ferreYellow">Contacto</Link>
            <Link to="/carrito" className="block hover:text-ferreYellow">Carrito 🛒</Link>
        </div>
        )}
    </nav>
    );
}

export default Navbar;
