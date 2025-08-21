import { createContext, useContext, useReducer, useEffect } from "react";

const CarritoContext = createContext();

// 🔹 Estado inicial (intenta cargar de localStorage)
const initialState = {
    items: JSON.parse(localStorage.getItem("carrito")) || []
};

function reducer(state, action) {
    switch (action.type) {                                     
        case "ADD_ITEM":
            const exist = state.items.find((i) => i.id === action.payload.id);
            if (exist) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id
                            ? { ...i, cantidad: i.cantidad + 1 }
                            : i
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, cantidad: 1 }]
            };
        
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload)
            };
        
        case "CLEAR_CART":
            return { items: [] };
        
        default:
        return state;
    }
}

export function CarritoProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 🔹 Guardar en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (producto) =>
        dispatch({ type: "ADD_ITEM", payload: producto });

    const removeItem = (id) =>
        dispatch({ type: "REMOVE_ITEM", payload: id });

    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    return (
        <CarritoContext.Provider
        value={{ items: state.items, addItem, removeItem, clearCart }}
        >
        {children}
        </CarritoContext.Provider>
    );
}

export const useCarrito = () => useContext(CarritoContext);
