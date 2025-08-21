function Buscador({ search, setSearch }) {
    return (
    <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-4 py-2 w-full mb-4"
    />
    );
}

export default Buscador;
