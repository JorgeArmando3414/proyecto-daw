import {useForm} from "@inertiajs/react";

export default function Edit ({selectedLista, allCanciones, setShowModal}) {

    console.log(selectedLista.id);

    const { data, setData, errors, post, put } = useForm({
        id: selectedLista.id,
        nombre: selectedLista.nombre,
        creado_por: selectedLista.creado_por,
        created_at: selectedLista.created_at,
        updated_at: selectedLista.updated_at,
        canciones: selectedLista.cancions.map(c => c.id),
        _method: "PUT",
    });

    // Function to handle form data changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCancionToggle = (cancionId) => {
        // Toggle associated cancion in formData
        setData((prevData) => ({
            ...prevData,
            canciones: prevData.canciones.includes(cancionId)
                ? prevData.canciones.filter(id => id !== cancionId)
                : [...prevData.canciones, cancionId],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send request to update lista data including associated canciones
        put(route('lista.update', selectedLista.id),  {
            data,
            onSuccess: () => {
                // Handle success, close modal, etc.
                setShowModal(false);
            },
        });

    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
                <div className="modal-container bg-gray-800 w-96 p-4 rounded-lg  w-[80vw]">
                    <div className="modal-header flex flex-row justify-between border-b-2 border-black items-center">
                        <h2 className="text-lg font-semibold">Editar Lista: {selectedLista.nombre}</h2>
                        <button className={"btn rounded-full"} onClick={() => setShowModal(false)}>&times;</button>
                    </div>
                    <div className="modal-body my-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 text-gray-4  00">Nombre</label>
                                <input type="text" id="nombre" name="nombre" value={data.nombre} onChange={handleInputChange} className="mt-1 p-1 border-gray-300 rounded-md w-full" />
                            </div>
                            <div>
                                <h3>Canciones:</h3>
                                <ul>
                                    {allCanciones.map(cancion => (
                                        <li key={cancion.id}>
                                            <input type="checkbox" id={`cancion-${cancion.id}`} name={`cancion-${cancion.id}`} checked={data.canciones.includes(cancion.id)} onChange={() => handleCancionToggle(cancion.id)} />
                                            <label htmlFor={`cancion-${cancion.id}`}>{cancion.nombre} - {cancion.album} - {cancion.artista} - {cancion.genero}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
