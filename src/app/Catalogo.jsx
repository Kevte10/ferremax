import { useState } from "react";
import CardProducto from "../components/CardProducto";
import Buscador from "../components/Buscador";
import { useCarrito } from "../context/CarritoContext"; // 🔹 usar productos dinámicos

function Catalogo() {
  const { productos } = useCarrito(); // 🔹 ya no importamos desde service/productos
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [productosPorPagina, setProductosPorPagina] = useState(8);
  const [orden, setOrden] = useState("nombre-asc");

  // Generar categorías dinámicas desde los productos
  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  // Filtrar por búsqueda y categoría
  const filtrados = productos.filter((prod) => {
    const coincideBusqueda = prod.nombre
      .toLowerCase()
      .includes(search.toLowerCase());
    const coincideCategoria = filtro === "Todos" || prod.categoria === filtro;
    return coincideBusqueda && coincideCategoria;
  });

  // Ordenar según el criterio
  const ordenados = [...filtrados].sort((a, b) => {
    switch (orden) {
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre);
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre);
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  // Paginación
  const totalPaginas = Math.ceil(ordenados.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const visibles = ordenados.slice(inicio, inicio + productosPorPagina);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-ferreBlue text-center mb-6">
        Catálogo de Productos 📦
      </h1>

      {/* Buscador + Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <Buscador search={search} setSearch={setSearch} />

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFiltro(cat);
                setPagina(1);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition ${
                filtro === cat
                  ? "bg-ferreBlue text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <div>
          <select
            value={orden}
            onChange={(e) => {
              setOrden(e.target.value);
              setPagina(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="nombre-asc">Nombre A-Z</option>
            <option value="nombre-desc">Nombre Z-A</option>
            <option value="precio-asc">Precio menor a mayor</option>
            <option value="precio-desc">Precio mayor a menor</option>
            <option value="stock-desc">Stock: más disponibles</option>
            <option value="stock-asc">Stock: menos disponibles</option>
          </select>
        </div>

        {/* Selector productos por página */}
        <div>
          <select
            value={productosPorPagina}
            onChange={(e) => {
              setProductosPorPagina(Number(e.target.value));
              setPagina(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value={8}>8 por página</option>
            <option value={12}>12 por página</option>
            <option value={16}>16 por página</option>
            <option value={24}>24 por página</option>
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      {visibles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibles.map((prod) => (
              <CardProducto key={prod.id} producto={prod} />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
              disabled={pagina === 1}
              className={`px-4 py-2 rounded ${
                pagina === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-ferreBlue text-white hover:bg-blue-700"
              }`}
            >
              ◀
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1)
              .filter((num) => {
                return (
                  num === 1 ||
                  num === totalPaginas ||
                  (num >= pagina - 2 && num <= pagina + 2)
                );
              })
              .map((num, idx, arr) => {
                const prev = arr[idx - 1];
                return (
                  <div key={num} className="flex items-center">
                    {prev && num - prev > 1 && <span className="px-2">...</span>}
                    <button
                      onClick={() => setPagina(num)}
                      className={`px-3 py-2 rounded font-semibold ${
                        pagina === num
                          ? "bg-ferreYellow text-ferreBlue"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {num}
                    </button>
                  </div>
                );
              })}

            <button
              onClick={() =>
                setPagina((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={pagina === totalPaginas}
              className={`px-4 py-2 rounded ${
                pagina === totalPaginas
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-ferreBlue text-white hover:bg-blue-700"
              }`}
            >
              ▶
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">
          No se encontraron productos con esos criterios 🔍
        </p>
      )}
    </div>
  );
}

export default Catalogo;
