import { useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-hot-toast";

function Producto() {
  const { id } = useParams();
  const { productos, addItem } = useCarrito(); // 🔹 productos dinámicos
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <p className="p-6 text-center text-red-600">Producto no encontrado ❌</p>
    );
  }

  const stockBajo = producto.stock <= 5 && producto.stock > 0;
  const agotado = producto.stock === 0;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
      <div className="relative flex justify-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-80 h-80 object-cover rounded-lg shadow-md"
        />
        {agotado && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Agotado
          </span>
        )}
        {stockBajo && !agotado && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Stock bajo
          </span>
        )}
      </div>

      {/* Información */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-ferreBlue">{producto.nombre}</h2>
        <p className="text-gray-600 mt-2">
          Categoría: <span className="font-medium">{producto.categoria}</span>
        </p>
        <p
          className={`text-gray-600 ${
            agotado
              ? "text-red-700 font-bold"
              : stockBajo
              ? "text-red-500"
              : ""
          }`}
        >
          Stock disponible:{" "}
          {agotado
            ? "❌ Agotado"
            : `${producto.stock} ${stockBajo ? "⚠️ Bajo" : ""}`}
        </p>
        <p className="text-2xl font-semibold text-ferreBlue mt-4">
          S/ {producto.precio.toFixed(2)}
        </p>

        {/* Botón grande */}
        <button
          onClick={() => {
            if (agotado) {
              toast.error("Este producto está agotado ❌");
              return;
            }
            if (producto.stock <= 0) {
              toast.error("Ya no hay más stock disponible ❌");
              return;
            }
            addItem(producto);
            toast.success(`${producto.nombre} agregado al carrito 🛒`);
          }}
          disabled={agotado || producto.stock <= 0}
          className={`px-6 py-3 rounded-lg mt-6 font-bold transition w-full md:w-auto ${
            agotado || producto.stock <= 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-ferreYellow text-ferreBlue hover:bg-yellow-400"
          }`}
        >
          {agotado
            ? "No disponible"
            : producto.stock <= 0
            ? "Stock agotado"
            : "Agregar al carrito 🛒"}
        </button>
      </div>
    </div>
  );
}

export default Producto;
