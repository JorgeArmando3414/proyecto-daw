import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Index({auth, users}){

    users.map(usuario=>{
        console.log(usuario.foto);
    })

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administrar Usuarios</h2>}
        >
            <Head title="Administrar Usuarios" />
            <div className={'py-12'}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-950 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center pb-6 gap-4">
                        <table className={'table'}>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Creado el</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(usuario=>(
                                <tr key={usuario.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={usuario.foto ? `/storage/${usuario.foto}` : '/fotos/default.gif'}  alt="foto usuario"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{usuario.username}</div>
                                                <div className="text-sm opacity-50">{usuario.rol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{ new Date(usuario.created_at).toISOString().slice(0, 19).replace('T', ' ')}</p>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
