import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inicio</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {listasOfFollowedUsers.map(lista => (
                            <h3 key={lista.id}>{lista.nombre}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
