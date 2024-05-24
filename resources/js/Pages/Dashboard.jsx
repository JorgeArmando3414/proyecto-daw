import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";
import CartaLista from "@/Pages/CartaLista.jsx";

export default function Dashboard({ auth }) {
    const [listasOfFollowedUsers, setListasOfFollowedUsers] = useState([]);

    useEffect(() => {
        const fetchListas = async () => {
            const listas = await fetchListasOfFollowedUsers();
            setListasOfFollowedUsers(listas);
        };

        fetchListas();
    }, []);
    const fetchListasOfFollowedUsers = async () => {
        const response = await axios.get(`/listas/followed`);
        return response.data;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Inicio</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black py-4 min-h-[20vh] overflow-hidden shadow-sm sm:rounded-lg flex justify-center flex-col">
                        {listasOfFollowedUsers.map(lista => (
                            <CartaLista key={lista.id} user={auth.user} lista={lista}/>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
