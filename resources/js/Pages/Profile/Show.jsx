import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";


export default function Show({auth, user, foto, desc, listN}){
    const [usuariosSeguidos,setUsuariosSeguidos] = useState([]);
    const [usuariosSiguiendo,setUsuariosSiguiendo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUsuariosSeguidos = async () =>{
            const response = await axios.get(`/siguiendo/${auth.user.id}`);
            const ids = response.data.map(user => user.usuario_seguido);
            setUsuariosSeguidos(ids);
        };
        const fetchUsuariosSiguiendo = async () =>{
            const response = await axios.get(`/seguidores/${auth.user.id}`);
            const ids = response.data.map(user => user.usuario_siguiendo);
            setUsuariosSiguiendo(ids);
        };
        fetchUsuariosSiguiendo();
        fetchUsuariosSeguidos();
        const fetchData = async () => {
            // Simulating data fetching
            await new Promise(resolve => setTimeout(resolve, 600)); // Simulate data fetching time

            setLoading(false);
        };

        fetchData()
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
        >
            <Head title="Perfil" />
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ):(
                <div className="py-12 flex flex-row mx-[7%] px-8 justify-between">
                    <div className="w-[25%] h-[35vh]">
                        <img className={'object-cover rounded-xl w-full h-full'} src={foto} alt="Foto de perfil"/>
                    </div>
                    <div className={'flex flex-col w-[70%] h-[35vh] gap-2'}>
                        <div className={'h-[55%] w-full bg-white text-black px-2 py-4 flex flex-row justify-between'}>
                            <ul className={'flex flex-col justify-around h-full w-[50%]'}>
                                <li><b>Nombre de Usuario:</b> {user[0].username}</li>
                                <li><b>Listas Creadas:</b> {listN}</li>
                                <li><b>Seguidores:</b> {usuariosSiguiendo.length}</li>
                                <li><b>Siguiendo:</b> {usuariosSeguidos.length}</li>
                            </ul>
                            <div>
                                {auth.user.id === user[0].id && <a href={route('profile.edit')} className={'btn btn-success text-white'}>Editar</a>}
                            </div>
                        </div>
                        <p className={'p-2 rounded-xl bg-gray-500 h-[43%] text-white'}>{desc}</p>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    )
}
