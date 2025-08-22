import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Carrito() {
  const { items, removeItem, clearCart, decreaseItem, addItem, productos } = useCarrito();

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Carrito de Compras 🛒</h2>
        <p className="mb-4 text-gray-600">No hay productos en el carrito</p>
        <Link
          to="/catalogo"
          className="bg-ferreBlue text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-ferreBlue">
        Carrito de Compras 🛍️
      </h2>

      {/* Lista de productos */}
      <ul className="space-y-4">
        {items.map((item) => {
          const producto = productos.find((p) => p.id === item.id);
          const stockDisponible = producto ? producto.stock : 0;

          const agotado = stockDisponible === 0;
          const stockBajo = stockDisponible <= 5 && stockDisponible > 0;

          return (
            <li
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <p className="text-gray-600">
                    Precio: S/ {item.precio.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      agotado
                        ? "text-red-700 font-bold"
                        : stockBajo
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    {agotado
                      ? "❌ Agotado"
                      : `Stock disponible: ${stockDisponible} ${
                          stockBajo ? "⚠️ Bajo" : ""
                        }`}
                  </p>

                  <p className="text-gray-600 flex items-center gap-2">
                    Cantidad:
                    {/* Controles de cantidad */}
                    <button
                      onClick={() => {
                        if (item.cantidad > 1) {
                          decreaseItem(item.id);
                          toast.success("Cantidad reducida ➖");
                        }
                      }}
                      disabled={item.cantidad <= 1}
                      className={`px-2 py-1 rounded ${
                        item.cantidad <= 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      ➖
                    </button>
                    <span className="font-medium">{item.cantidad}</span>
                    <button
                      onClick={() => {
                        if (stockDisponible <= 0) {
                          toast.error("No hay más stock disponible ❌");
                          return;
                        }
                        addItem(item);
                        toast.success("Cantidad aumentada ➕");
                      }}
                      disabled={agotado}
                      className={`px-2 py-1 rounded ${
                        agotado
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      ➕
                    </button>
                  </p>

                  <p className="font-bold text-ferreBlue">
                    Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Botón quitar */}
              <button
                onClick={() => {
                  removeItem(item.id, true);
                  toast.error(`${item.nombre} eliminado ❌`);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Quitar
              </button>
            </li>
          );
        })}
      </ul>

      {/* Resumen total */}
      <div className="mt-8 border-t pt-6 text-right">
        <h3 className="text-2xl font-bold text-ferreBlue">
          Total: S/ {total.toFixed(2)}
        </h3>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => {
              clearCart();
              toast.success("Carrito vacío 🧹");
            }}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
          >
            Vaciar carrito
          </button>
          <button
            onClick={() => toast.success("Compra finalizada ✅")}
            className="bg-ferreYellow text-ferreBlue font-bold px-6 py-2 rounded hover:bg-yellow-400 transition"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
