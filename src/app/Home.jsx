import { Link } from "react-router-dom";
import { Truck, DollarSign, Wrench } from "lucide-react";
import productos from "../service/productos";

function Home() {
  // tomamos los primeros 3 productos como destacados
    const destacados = productos.slice(0, 3);

    const categorias = [
        { nombre: "Herramientas", icono: "🔨" },
        { nombre: "Electricidad", icono: "💡" },
        { nombre: "Pintura", icono: "🎨" },
        { nombre: "Seguridad", icono: "🦺" },
        { nombre: "Plomería", icono: "🚰" },
    ];

    return (
    <div>
      {/* Banner principal */}
        <section className="bg-gradient-to-r from-ferreBlue to-blue-600 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold">
            Bienvenido a <span className="text-ferreYellow">FerreMax</span> 🚀
        </h1>
        <p className="mt-4 text-lg">
            Tu ferretería de confianza ahora en línea
        </p>
        <Link
            to="/catalogo"
            className="mt-6 inline-block bg-ferreYellow text-ferreBlue font-semibold px-6 py-3 rounded shadow hover:bg-yellow-300 transition"
        >
            Ver Catálogo
        </Link>
        </section>

      {/* Categorías */}
        <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-ferreBlue">
            Categorías destacadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {categorias.map((cat, idx) => (
            <Link
                key={idx}
                to="/catalogo"
                className="border-2 border-ferreBlue rounded-lg p-6 shadow hover:bg-blue-100 hover:scale-105 transition transform"
            >
                <span className="text-3xl">{cat.icono}</span>
                <p className="mt-2 font-semibold">{cat.nombre}</p>
            </Link>
            ))}
        </div>
        </section>

      {/* Productos destacados */}
        <section className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-ferreBlue">
            Productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destacados.map((prod) => (
            <div
                key={prod.id}
                className="border-2 border-ferreYellow rounded-lg shadow p-4 text-center hover:shadow-lg transition"
            >
                <img
                src={prod.imagen}
                alt={prod.nombre}
                className="w-full h-40 object-contain rounded bg-white"
                />
                <h3 className="text-lg font-semibold mt-2">{prod.nombre}</h3>
                <p className="text-ferreBlue font-bold">
                S/ {prod.precio.toFixed(2)}
                </p>
                <Link
                to={`/producto/${prod.id}`}
                className="mt-2 inline-block bg-ferreBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                Ver detalle
                </Link>
            </div>
            ))}
        </div>
        </section>

      {/* Beneficios rápidos */}
        <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
            <Truck className="mx-auto text-ferreBlue mb-2" size={40} />
            <h3 className="font-bold">Entrega Rápida</h3>
            <p className="text-gray-600">Recibe tus productos sin demoras.</p>
            </div>
            <div>
            <DollarSign className="mx-auto text-ferreBlue mb-2" size={40} />
            <h3 className="font-bold">Precios Competitivos</h3>
            <p className="text-gray-600">Los mejores precios del mercado.</p>
            </div>
            <div>
                <Wrench className="mx-auto text-ferreBlue mb-2" size={40} />
                <h3 className="font-bold">Variedad de Herramientas</h3>
                <p className="text-gray-600">Todo lo que necesitas en un solo lugar.</p>
            </div>
        </div>
        </section>
    </div>
    );
}

export default Home;
