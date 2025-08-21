function Footer() {
    return (
    <footer className="bg-ferreBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sección 1: Logo y nombre */}
            <div>
            <h2 className="text-ferreYellow font-bold text-xl">🔧 FerreMax</h2>
            <p className="mt-2 text-sm">
                Tu ferretería de confianza, con todo lo que necesitas para tus proyectos.
            </p>
            </div>

          {/* Sección 2: Navegación */}
            <div>
            <h3 className="text-ferreYellow font-semibold mb-2">Enlaces</h3>
            <ul className="space-y-1 text-sm">
                <li><a href="/" className="hover:text-ferreYellow">Inicio</a></li>
                <li><a href="/catalogo" className="hover:text-ferreYellow">Catálogo</a></li>
                <li><a href="/nosotros" className="hover:text-ferreYellow">Nosotros</a></li>
                <li><a href="/contacto" className="hover:text-ferreYellow">Contacto</a></li>
            </ul>
            </div>

          {/* Sección 3: Contacto */}
            <div>
            <h3 className="text-ferreYellow font-semibold mb-2">Contáctanos</h3>
            <p className="text-sm">📍 Av. Principal 123, Lima - Perú</p>
            <p className="text-sm">📞 +51 999 888 777</p>
            <p className="text-sm">📧 contacto@ferremax.com</p>
            </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-ferreYellow mt-6 pt-4 text-center text-sm">
            © {new Date().getFullYear()} FerreMax. Todos los derechos reservados.
        </div>
        </div>
    </footer>
    );
}

export default Footer;
