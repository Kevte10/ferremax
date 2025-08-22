import { Link } from "react-router-dom";
import { Truck, DollarSign, Wrench } from "lucide-react";
import productos from "../service/productos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const categorias = [
    { nombre: "Herramientas", icono: "🔨" },
    { nombre: "Electricidad", icono: "💡" },
    { nombre: "Pintura", icono: "🎨" },
    { nombre: "Seguridad", icono: "🦺" },
    { nombre: "Plomería", icono: "🚰" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Banner principal */}
      <section className="bg-gradient-to-r from-ferreBlue to-blue-600 text-white text-center py-20 rounded-lg shadow">
        <h1 className="text-4xl md:text-5xl font-bold">
          Bienvenido a <span className="text-ferreYellow">FerreMax</span> 🚀
        </h1>
        <p className="mt-4 text-lg">Tu ferretería de confianza ahora en línea</p>
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
      <section className="p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-ferreBlue">
          Productos destacados
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 }, // móviles
            640: { slidesPerView: 2 }, // tablets
            1024: { slidesPerView: 4 }, // laptops
            1280: { slidesPerView: 5 }, // pantallas grandes
          }}
          className="pb-10"
        >
          {productos.map((prod) => (
            <SwiperSlide key={prod.id}>
              <div className="border-2 border-ferreYellow rounded-lg shadow p-4 text-center bg-white hover:shadow-lg transition">
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="w-full h-40 object-cover rounded"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Beneficios rápidos */}
      <section className="bg-gray-100 py-12 mt-6 rounded-lg shadow">
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
            <p className="text-gray-600">
              Todo lo que necesitas en un solo lugar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
