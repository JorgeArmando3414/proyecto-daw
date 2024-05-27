import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useState} from "react";

export default function Index({auth, users: initialUsers}){
    const [users, setUsers] = useState(initialUsers);
    const [file, setFile] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/subir-canciones', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            document.getElementById('my_modal_3').close()
            setMensaje(response.data);
        } catch (error) {
            console.error('Error uploading JSON file:', error.response ? error.response.data : error.message);
        }
    };

    const updateUserRole = (userId, newRole) => {
        setUsers(users.map(user => user.id === userId ? { ...user, rol: newRole } : user));
    };

    const darAdmin = async (user) => {
        try {
            const response = await axios.post(`/admin/users/${user.id}/asignar-rol`);
            updateUserRole(user.id, 'admin');
        } catch (error) {
            console.error("Error assigning admin role:", error.response ? error.response.data : error.message);
        }
    };

    const quitarAdmin = async (user) => {
        try {
            const response = await axios.post(`/admin/users/${user.id}/quitar-rol`);
            updateUserRole(user.id, 'user');
        } catch (error) {
            console.error("Error removing admin role:", error.response ? error.response.data : error.message);
        }
    };

    const handleCancelar = () => {
        modalRef.current.close();
    };

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Administrar Usuarios y Canciones</h2>}
        >
            <Head title="Administrar Usuarios" />
            <div className={'py-12'}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className={'flex flex-row items-center mb-4 gap-2'}>
                        <button onClick={()=>document.getElementById('my_modal_3').showModal()} className={'btn btn-success'}>Subir Canciones</button>
                        <h3>{mensaje}</h3>
                    </div>
                    <div className="bg-gray-950 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center pb-6 gap-4">
                        <table className={'table'}>
                            <thead className={'text-white'}>
                                <tr>
                                    <th className={'font-light'}>Usuario</th>
                                    <th className={'font-light'}>Creado el</th>
                                    <th className={'font-light'}>Cambiar rol</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(usuario=>(
                                auth.user.id !== usuario.id && (<tr key={usuario.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={usuario.foto ? `/storage/${usuario.foto}` : '/fotos/fotoDefault.jpg'}
                                                     alt="foto usuario"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{usuario.username}</div>
                                            <div className="text-sm opacity-50">{usuario.rol}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{new Date(usuario.created_at).toISOString().slice(0, 19).replace('T', ' ')}</p>
                                </td>
                                <td>
                                    {usuario.rol === 'admin' && <button onClick={()=>quitarAdmin(usuario)} className={'btn btn-error'}>Quitar Admin</button>}
                                    {usuario.rol === 'user' && <button onClick={()=>darAdmin(usuario)} className={'btn btn-success'}>Dar Admin</button>}
                                </td>
                            </tr>)
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal w-[90%]">
                <div className="modal-box bg-black text-white">
                    <form method="post" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="file">Archivo JSON con nuevas canciones:</label>
                            <input type="file" id="file" accept=".json" onChange={handleFileChange} className="file-input file-input-bordered file-input-info w-full" />
                            <p className={'text-sm'}>Las canciones deben tener nombre, album, artista y género</p>
                        </div>
                        <div className={'flex flex-row w-full justify-between mt-4'}>
                            <button type="submit" className={'btn btn-success'}>Aceptar</button>
                            <button type="button" onClick={()=>document.getElementById('my_modal_3').close()} className={'btn btn-error'}>Cancelar</button>
                        </div>
                    </form>

                </div>
            </dialog>
        </AuthenticatedLayout>
    )
}
