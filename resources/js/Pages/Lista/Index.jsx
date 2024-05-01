import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import Edit from './Edit.jsx';
import Create from './Create.jsx'
import {all} from "axios";

export default function Index({ auth, userListas, allCanciones}) {

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedLista, setSelectedLista] = useState(null);

    const openModal = (lista) => {
        setSelectedLista(lista);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedLista(null);
    };

    const borrarLista = (lista) => {
        if(!window.confirm("Estas seguro?")){
            return;
        }else{
            router.delete(route("lista.destroy", lista.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mis Listas</h2>}
        >
            <Head title="Mis Listas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center">
                        <div className="p-6 text-gray-900 flex flex-row justify-between w-[73%]">
                            <h3>Mis Listas!</h3>
                            <button onClick={()=> setShowModal2(true)} className={'btn btn-success text-white'}>Nueva Lista</button>
                        </div>
                        {userListas.map(lista => (
                            <div key={lista.id} className={'bg-gray-600 border-2 rounded-xl text-white my-4 ml-2 w-[70%]'}>
                                <div className={"w-full flex flex-row justify-between bg-black border-b-2 border-white"}>
                                    <h2 className={'text-2xl font-bold ml-4 text-nowrap'}>{lista.nombre}</h2>
                                    <div className={'flex flex-row justify-center w-[40%]'}>
                                        <button onClick={() => openModal(lista)} className="btn btn-info rounded-none">Editar</button>
                                        <button onClick={() => borrarLista(lista)} className="btn btn-error rounded-none">Borrar</button>
                                    </div>
                                </div>

                                <ul className={'ml-8'}>
                                    {lista.cancions.map(cancion => (
                                        <li key={cancion.id}>- {cancion.nombre} - {cancion.album} - {cancion.artista} - {cancion.genero}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {showModal && <Edit selectedLista={selectedLista} setShowModal={setShowModal} allCanciones={allCanciones}/>}
                    {showModal2 && <Create setShowModal2={setShowModal2} allCanciones={allCanciones}/>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
