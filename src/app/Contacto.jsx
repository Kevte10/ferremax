import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

function Contacto() {
    const { items, clearCart } = useCarrito();
    const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    entrega: "domicilio",
    });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
        alert("⚠️ Tu carrito está vacío, agrega productos antes de hacer un pedido.");
        return;
    }

    // Construir mensaje de WhatsApp
    let mensaje = `🛒 *Nuevo Pedido FerreMax* \n\n`;
    mensaje += `👤 Cliente: ${form.nombre}\n`;
    mensaje += `📧 Correo: ${form.correo}\n`;
    mensaje += `📍 Dirección: ${form.direccion}\n`;
    mensaje += `🚚 Entrega: ${form.entrega === "domicilio" ? "A domicilio" : "Recojo en tienda"}\n\n`;
    mensaje += `📦 *Productos:*\n`;

    let total = 0;
    items.forEach((item) => {
      mensaje += `- ${item.nombre} (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
      total += item.precio * item.cantidad;
    });

    mensaje += `\n💰 *Total: S/ ${total.toFixed(2)}*`;

    const telefono = "51923922914"; // cámbialo por el real
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    clearCart();
    };

    return (
    <div className="max-w-lg mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-ferreBlue text-center">
        Contacto y Pedido 📞
        </h1>

        <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md border"
        >
        <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-ferreBlue"
        />
        <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-ferreBlue"
        />
        <input
            type="text"
            name="direccion"
            placeholder="Dirección de entrega"
            value={form.direccion}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-ferreBlue"
        />
        <select
            name="entrega"
            value={form.entrega}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-ferreBlue"
        >
            <option value="domicilio">Entrega a domicilio</option>
            <option value="tienda">Recojo en tienda</option>
        </select>

        <button
            type="submit"
            className="bg-green-600 text-white px-4 py-3 rounded w-full font-semibold hover:bg-green-700 transition"
        >
            Enviar Pedido por WhatsApp 📲
        </button>
        </form>

      {/* Información adicional */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-ferreBlue mb-2">📍 Nuestra Tienda</h2>
        <p className="text-gray-700">Av. Los Constructores 123, Lima - Perú</p>
        <p className="text-gray-700">Teléfono: +51 923 922 914</p>
        <p className="text-gray-700">Correo: contacto@ferremax.com</p>
        </div>
    </div>
    );
}

export default Contacto;
