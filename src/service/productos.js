import martillo from '../images/martillo.jpg';
import taladro from '../images/taladro.jpg';
import cable from '../images/cable.jpg';
import pintura from '../images/pintura.png';
import guantes from '../images/guantes.jpg';

const productos = [
    { id: 1, nombre: "Martillo de acero", categoria: "Herramientas", precio: 25.50, stock: 10, imagen: martillo },
    { id: 2, nombre: "Taladro eléctrico", categoria: "Herramientas", precio: 199.90, stock: 5, imagen: taladro },
    { id: 3, nombre: "Cable eléctrico 10m", categoria: "Electricidad", precio: 15.00, stock: 20, imagen: cable },
    { id: 4, nombre: "Pintura blanca 1L", categoria: "Pintura", precio: 35.00, stock: 15, imagen: pintura },
    { id: 5, nombre: "Guantes de seguridad", categoria: "Seguridad", precio: 12.00, stock: 30, imagen: guantes }
];


export default productos;
