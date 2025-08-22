import { createContext, useContext, useReducer, useEffect } from "react";
import productosData from "../service/productos"; // 📦 tu lista base

const CarritoContext = createContext();

// 🔹 Estado inicial (lee carrito y productos desde localStorage si existen)
const initialState = {
  items: JSON.parse(localStorage.getItem("carrito")) || [],
  productos:
    JSON.parse(localStorage.getItem("productos")) ||
    productosData.map((p) => ({ ...p }))
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { id } = action.payload;
      const producto = state.productos.find((p) => p.id === id);

      // 🚫 Si no hay stock, no agregar
      if (!producto || producto.stock <= 0) return state;

      // 🔹 Reducir stock
      const nuevosProductos = state.productos.map((p) =>
        p.id === id ? { ...p, stock: p.stock - 1 } : p
      );

      // 🔹 Si ya está en el carrito, sumar cantidad
      const exist = state.items.find((i) => i.id === id);
      let nuevosItems;
      if (exist) {
        nuevosItems = state.items.map((i) =>
          i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      } else {
        nuevosItems = [...state.items, { ...action.payload, cantidad: 1 }];
      }

      return { ...state, items: nuevosItems, productos: nuevosProductos };
    }

    case "DECREASE_ITEM": {
      const id = action.payload;
      const exist = state.items.find((i) => i.id === id);
      if (!exist) return state;

      let nuevosItems;
      if (exist.cantidad > 1) {
        nuevosItems = state.items.map((i) =>
          i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
        );
      } else {
        nuevosItems = state.items.filter((i) => i.id !== id);
      }

      // 🔹 Devolver 1 al stock
      const nuevosProductos = state.productos.map((p) =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      );

      return { ...state, items: nuevosItems, productos: nuevosProductos };
    }

    case "REMOVE_ITEM": {
      const id = action.payload;
      const exist = state.items.find((i) => i.id === id);
      if (!exist) return state;

      // 🔹 Devolver todo el stock de ese producto
      const nuevosProductos = state.productos.map((p) =>
        p.id === id ? { ...p, stock: p.stock + exist.cantidad } : p
      );

      return {
        ...state,
        items: state.items.filter((i) => i.id !== id),
        productos: nuevosProductos
      };
    }

    case "CLEAR_CART": {
      // 🔹 Restaurar todos los stocks
      const restaurados = state.productos.map((p) => {
        const enCarrito = state.items.find((i) => i.id === p.id);
        return enCarrito
          ? { ...p, stock: p.stock + enCarrito.cantidad }
          : p;
      });
      return { items: [], productos: restaurados };
    }

    default:
      return state;
  }
}

export function CarritoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔹 Guardar carrito Y productos en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(state.items));
    localStorage.setItem("productos", JSON.stringify(state.productos));
  }, [state.items, state.productos]);

  const addItem = (producto) =>
    dispatch({ type: "ADD_ITEM", payload: producto });

  const decreaseItem = (id) =>
    dispatch({ type: "DECREASE_ITEM", payload: id });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CarritoContext.Provider
      value={{
        items: state.items,
        productos: state.productos, // ahora productos también son persistentes
        addItem,
        decreaseItem,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
