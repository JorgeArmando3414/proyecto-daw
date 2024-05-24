import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import Edit from './Edit.jsx';
import Create from './Create.jsx'
import {all} from "axios";
import CartaLista from "@/Pages/CartaLista.jsx";

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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Mis Listas</h2>}
        >
            <Head title="Mis Listas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-950/[0.7] min-h-[70vh] overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center pb-6 gap-4">
                        <div className="px-28 py-6 text-gray-900 flex flex-row justify-between w-[100%]">
                            <h3 className={'font-bold text-3xl text-white'}>Mis Listas!</h3>
                            <button onClick={()=> setShowModal2(true)} className={'btn btn-success hover:text-white'}>Nueva Lista</button>
                        </div>
                        {userListas.map(lista => (
                            <CartaLista key={lista.id} user={auth.user} lista={lista} openModal={()=>openModal(lista)} borrarLista={()=>borrarLista(lista)}/>
                        ))}
                    </div>

                    {showModal && <Edit selectedLista={selectedLista} setShowModal={setShowModal} allCanciones={allCanciones}/>}
                    {showModal2 && <Create setShowModal2={setShowModal2} allCanciones={allCanciones}/>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
