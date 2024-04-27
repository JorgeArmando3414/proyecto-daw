import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useState} from "react";

export default function Index({ auth, userListas, allCanciones }) {
    console.log(allCanciones);

    const [showModal, setShowModal] = useState(false);
    const [selectedLista, setSelectedLista] = useState(null);



    const openModal = (lista) => {
        setSelectedLista(lista);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listas</h2>}
        >
            <Head title="Listas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Mis Listas!</div>
                        {userListas.map(lista => (
                            <div key={lista.id} className={'bg-gray-600 border-2 rounded-xl text-white'}>
                                <h2 className={'text-2xl font-bold ml-4'}>{lista.nombre}</h2>
                                <button onClick={() => openModal(lista)} className="btn btn-info">Edit</button>
                                <ul className={'ml-8'}>
                                    {lista.cancions.map(cancion => (
                                        <li key={cancion.id}>- {cancion.nombre} - {cancion.album} - {cancion.artista} - {cancion.genero}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                            <div className="modal-container bg-white w-96 p-4 rounded-lg">
                                <div className="modal-header">
                                    <h2 className="text-lg font-semibold">Edita Lista: {selectedLista.nombre}</h2>
                                    <button onClick={() => setShowModal(false)}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    {allCanciones.map((cancion, index)=>(
                                        <ul>
                                            <li key={index}>{cancion.nombre}</li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
