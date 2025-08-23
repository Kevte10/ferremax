import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";

function Carrito() {
  const { items, removeItem, clearCart, decreaseItem, addItem, productos } = useCarrito();

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const generarComprobante = () => {
    const doc = new jsPDF();

    // === ENCABEZADO EMPRESA ===
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("FERRETERÍA FERREMAX", 20, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("RUC: 20101001010", 20, 26);
    doc.text("Dirección: Av. Principal 123, Lima - Perú", 20, 32);
    doc.text("Tel: 999888777 | Email: contacto@ferremax.com", 20, 38);

    // === RECUADRO DE BOLETA ===
    doc.setFontSize(12);
    doc.rect(140, 15, 60, 25); // cuadro derecho
    doc.text("BOLETA DE VENTA", 145, 25);
    doc.text("ELECTRÓNICA", 145, 32);
    doc.text("N° B001 - 000123", 145, 39);

    // === DATOS DEL CLIENTE ===
    doc.setFontSize(10);
    doc.text("Cliente: ****** *****", 20, 55);
    doc.text("DNI: ********", 20, 61);
    doc.text("Fecha emisión: 25/08/2025", 20, 67);
    doc.line(20, 70, 200, 70); // línea separadora

    // === TABLA PRODUCTOS ===
    let startY = 80;

    // Encabezados
    doc.setFont("helvetica", "bold");
    doc.text("Cant.", 22, startY);
    doc.text("Descripción", 45, startY);
    doc.text("P. Unit.", 140, startY);
    doc.text("Importe", 180, startY);

    doc.setFont("helvetica", "normal");

    // Productos dinámicos
    startY += 10;
    items.forEach((item) => {
      doc.text(String(item.cantidad), 25, startY);
      doc.text(item.nombre, 45, startY);
      doc.text(item.precio.toFixed(2), 145, startY, { align: "right" });
      doc.text((item.precio * item.cantidad).toFixed(2), 190, startY, { align: "right" });
      startY += 8;
    });

    // === TOTALES ===
    const subtotal = total / 1.18; // suponiendo IGV 18%
    const igv = total - subtotal;

    startY += 10;
    doc.line(20, startY, 200, startY);
    startY += 10;
    doc.setFontSize(10);
    doc.text("Op. Gravada (S/)", 140, startY);
    doc.text(subtotal.toFixed(2), 190, startY, { align: "right" });
    startY += 6;
    doc.text("IGV (18%)", 140, startY);
    doc.text(igv.toFixed(2), 190, startY, { align: "right" });
    startY += 6;
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", 140, startY);
    doc.text(total.toFixed(2), 190, startY, { align: "right" });

    // === PIE DE PÁGINA ===
    startY += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Representación impresa de la Boleta de Venta Electrónica", 20, startY);
    doc.text("Autorizado por SUNAT", 20, startY + 6);

    // Mostrar en nueva pestaña para imprimir
    doc.output("dataurlnewwindow");
  };




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
            onClick={generarComprobante}
            className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Cotizar / Imprimir
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
