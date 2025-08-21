import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-hot-toast";

function CardProducto({ producto }) {
  const { addItem, items } = useCarrito();

  const stockBajo = producto.stock <= 5 && producto.stock > 0;
  const agotado = producto.stock === 0;

  // Buscar si el producto ya está en el carrito
  const enCarrito = items.find((i) => i.id === producto.id);
  const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
      {/* Imagen con etiquetas */}
      <div className="relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-40 object-contain rounded bg-white"
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

      {/* Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
        <p className="text-ferreBlue font-bold">
          S/ {producto.precio.toFixed(2)}
        </p>
        <p
          className={`mt-1 font-medium ${
            agotado
              ? "text-red-700 font-bold"
              : stockBajo
              ? "text-red-500"
              : "text-gray-600"
          }`}
        >
          {agotado
            ? "❌ Agotado"
            : `Stock: ${producto.stock} ${stockBajo ? "⚠️ Bajo" : ""}`}
        </p>
      </div>

      {/* Botones */}
      <div className="mt-3 flex justify-between gap-2">
        <Link
          to={`/producto/${producto.id}`}
          className="bg-ferreBlue text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition flex-1 text-center"
        >
          Ver detalle
        </Link>
        <button
          onClick={() => {
            if (agotado) {
              toast.error("Este producto está agotado ❌");
              return;
            }
            if (cantidadEnCarrito >= producto.stock) {
              toast.error("Ya agregaste todas las unidades disponibles ⚠️");
              return;
            }
            addItem(producto);
            toast.success(`${producto.nombre} agregado al carrito 🛒`);
          }}
          disabled={agotado || cantidadEnCarrito >= producto.stock}
          className={`px-3 py-2 rounded text-sm font-semibold flex-1 transition ${
            agotado || cantidadEnCarrito >= producto.stock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-ferreYellow text-ferreBlue hover:bg-yellow-400"
          }`}
        >
          {agotado
            ? "No disponible"
            : cantidadEnCarrito >= producto.stock
            ? "Stock limitado"
            : "Agregar"}
        </button>
      </div>
    </div>
  );
}

export default CardProducto;
