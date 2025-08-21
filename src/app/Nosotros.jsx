function Nosotros() {
    return (
    <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-ferreBlue text-center">
        Sobre Nosotros 🏪
        </h1>

        <p className="mb-4 text-gray-700 leading-relaxed">
        En <span className="font-bold">FerreMax</span> tenemos más de{" "}
        <span className="font-semibold">15 años de experiencia</span> en el rubro
        de ferretería, ofreciendo soluciones prácticas y confiables para hogares,
        negocios y grandes proyectos.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
        Nos especializamos en herramientas, electricidad, pintura, seguridad y
        plomería. Trabajamos con <span className="font-semibold">marcas
        reconocidas</span> y garantizamos la mejor relación entre calidad y precio.
        </p>

        <p className="mb-6 text-gray-700 leading-relaxed">
        Nuestro compromiso es brindar <span className="font-semibold">asesoría
        personalizada y atención cercana</span>, porque sabemos que cada cliente
        necesita soluciones a la medida de sus proyectos.
        </p>

      {/* Valores de la empresa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-ferreBlue">🔧 Calidad</h3>
            <p className="text-gray-600 mt-2">
            Productos duraderos de marcas confiables.
            </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-ferreBlue">🤝 Confianza</h3>
            <p className="text-gray-600 mt-2">
            Atención cercana y soporte en cada compra.
            </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-ferreBlue">🚚 Rapidez</h3>
            <p className="text-gray-600 mt-2">
            Compras fáciles y entregas oportunas.
            </p>
        </div>
        </div>

      {/* Sección de llamada a la acción */}
        <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-ferreBlue">
            💡 Tu proyecto es nuestra misión
        </h2>
        <p className="text-gray-700 mt-2">
            En FerreMax encontrarás todo lo que necesitas para construir y mejorar.
        </p>
        </div>
    </div>
    );
}

export default Nosotros;
