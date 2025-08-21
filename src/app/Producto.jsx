import { useParams } from "react-router-dom";
import productos from "../service/productos";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-hot-toast"; // ✅ Importar

function Producto() {
    const { id } = useParams();
    const producto = productos.find((p) => p.id === parseInt(id));
    const { addItem } = useCarrito();

    if (!producto) {
        return <p className="p-6 text-center text-red-600">Producto no encontrado ❌</p>;
    }

    return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
        <div className="flex justify-center">
        <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-80 h-80 object-cover rounded-lg shadow-md"
        />
        </div>

      {/* Información */}
        <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-ferreBlue">{producto.nombre}</h2>
        <p className="text-gray-600 mt-2">
            Categoría: <span className="font-medium">{producto.categoria}</span>
        </p>
        <p className="text-gray-600">
            Stock disponible: <span className="font-medium">{producto.stock}</span>
        </p>
        <p className="text-2xl font-semibold text-ferreBlue mt-4">
            S/ {producto.precio.toFixed(2)}
        </p>

        {/* Botón grande */}
        <button
            onClick={() => {
            addItem(producto);
            toast.success(`${producto.nombre} agregado al carrito 🛒`); // ✅ Notificación
            }}
            className="bg-ferreYellow text-ferreBlue font-bold px-6 py-3 rounded-lg mt-6 hover:bg-yellow-400 transition w-full md:w-auto"
        >
            Agregar al carrito 🛒
        </button>
        </div>
    </div>
    );
}

export default Producto;
