import {useForm} from "@inertiajs/react";


export default function Edit ({setShowModal2, allCanciones}) {
    const { data, setData, errors, post, put } = useForm({
        nombre: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        canciones: [],
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
        setData((prevData) => ({
            ...prevData,
            canciones: prevData.canciones.includes(cancionId)
                ? prevData.canciones.filter(id => id !== cancionId)
                : [...prevData.canciones, cancionId],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("lista.store"), {
            data,
                onSuccess: () => {
                setShowModal2(false);
            },
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
                <div className="modal-container bg-black p-4 rounded-lg  w-[40vw] h-[50vh] border-2 border-success">
                    <div className="modal-header flex flex-row justify-between border-b-2 border-black items-center h-[10%]">
                        <h2 className="text-lg font-semibold text-white">Crear Lista</h2>
                        <button className={"btn btn-error btn-circle hover:text-white"} onClick={() => setShowModal2(false)}>X</button>
                    </div>
                    <div className="modal-body my-4 h-[90%] text-white">
                        <form onSubmit={handleSubmit} className={'h-full flex flex-col justify-between items-center'}>
                            <div className="mb-4 h-[15%] w-full">
                                <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
                                <input type="text" id="nombre" name="nombre" onChange={handleInputChange} className="mt-1 p-1 text-black focus:shadow-success focus:border-success focus:ring-success focus:outline-offset-success rounded-md w-full" />
                            </div>
                            <h3>Canciones:</h3>
                            <div className={'h-[60%] overflow-y-auto overflow-x-auto'}>
                                <table className="table table-zebra overflow-x-auto">
                                    <thead className={'sticky top-0 bg-black text-white'}>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Album</th>
                                            <th>Artista</th>
                                            <th>Genero</th>
                                            <th>Añadir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {allCanciones.map(cancion => (
                                        <tr key={cancion.id}>
                                            <td>
                                                {cancion.nombre}
                                            </td>
                                            <td>
                                                {cancion.album}
                                            </td>
                                            <td>
                                                {cancion.artista}
                                            </td>
                                            <td>
                                                {cancion.genero}
                                            </td>
                                            <td>
                                                <input className="checkbox checkbox-success" type="checkbox" id={`cancion-${cancion.id}`} name={`cancion-${cancion.id}`} onChange={() => handleCancionToggle(cancion.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit" className="btn btn-success h-[5%] w-[60%] my-4">Crear Lista</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
