import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function Resultados ({auth, users, listas}){
    const [usuariosSeguidos,setUsuariosSeguidos] = useState([]);

    useEffect(()=>{
        const fetchUsuariosSeguidos = async () =>{
            const response = await axios.get(`/siguiendo/${auth.user.id}`);
            const ids = response.data.map(user => user.usuario_seguido);
            setUsuariosSeguidos(ids);
        };
        fetchUsuariosSeguidos();
    }, []);

    const estaSiguiendo = (userId) => {
        return usuariosSeguidos.includes(userId);
    };

    const followUser = async (userId) => {
        const response = await axios.post('/follow', {userId});
        setUsuariosSeguidos([...usuariosSeguidos, userId]);
    };

    const unfollowUser = async (userId) => {
        const response = await axios.post("/unfollow", {userId});
        setUsuariosSeguidos(usuariosSeguidos.filter((id) => id !== userId));
    };

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resultados</h2>}
        >
            <Head title="Resultados"/>
            {listas.length>0 || users.length>0 ?
                (<div className={'mx-auto max-w-7xl mt-[5vh] gap-4 grid grid-flow-col'}>
                    {listas.map(lista => (
                        <h3 key={lista.id}>{lista.nombre}</h3>
                    ))}
                    {users.map(user => (
                        <div key={user.id} className={` ${auth.user.id===user.id?"hidden ":" "} w-[12vw] rounded-xl flex flex-col bg-black text-green-500 font-bold text-center h-[22vh] justify-end`}>
                            <h3>{user.username}</h3>
                            {estaSiguiendo(user.id)?(<button className="btn bg-red-600 rounded-t-none text-white border-none" onClick={() => unfollowUser(user.id)}>Unfollow</button>):(<button className="btn border-none rounded-t-none bg-blue-600 text-white" onClick={() => followUser(user.id)}>Follow</button>)}
                        </div>
                    ))}
                </div>) :
                (<div className={'mx-auto mt-[5vh] max-w-7xl'}>
                    <h3>No hay resultados...</h3>
                </div>)}
        </AuthenticatedLayout>
    )
}
