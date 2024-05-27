import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";
import CartaLista from "@/Pages/CartaLista.jsx";

export default function Resultados ({auth,query, users, listas, listasCanciones}){
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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Resultados de '{query}':</h2>}
        >
            <Head title="Resultados"/>
            {listasCanciones.length>0 || listas.length>0 || users.length>0 ?
                (<div className={'mx-auto max-w-7xl mt-[5vh] gap-4 grid grid-flow-row'}>
                    {listas.length>0 && listas.map(lista => (
                        <CartaLista key={lista.id} lista={lista} user={auth.user} oculta={auth.user.id===lista.usuario.id}/>
                    ))}
                    <div className={'mx-auto max-w-7xl mt-[5vh] gap-4 grid grid-flow-col grid-cols-4'}>
                        {users.length>0 && users.map(user => (
                            <div key={user.id} className={` ${auth.user.id===user.id?"hidden ":" "} w-[12vw] rounded-xl flex flex-col bg-black text-sky-500 font-bold text-center h-[22vh] justify-end`}>
                                <img className={'object-cover w-full h-[70%] rounded-t-xl'} src={user.foto ? `/storage/${user.foto}`:'/fotos/default.gif'} alt="foto perfil"/>
                                <div className={'h-[30%]'}>
                                    <h3>{user.username}</h3>
                                    {estaSiguiendo(user.id)?(<button className="btn bg-red-600 hover:bg-red-800 rounded-xl text-white border-none min-h-0 w-full rounded-t-none h-[65%]" onClick={() => unfollowUser(user.id)}>Unfollow</button>):(<button className="btn border-none rounded-lg bg-blue-600 hover:bg-blue-800 text-white min-h-0 w-full rounded-t-none h-[65%]" onClick={() => followUser(user.id)}>Follow</button>)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className={'text-white'}>Si hay alguna lista que contenga la cancion que buscas, se mostrará a continuación:</h3>
                    {listasCanciones.length>0 && listasCanciones.map(listac =>(
                        <>
                            <CartaLista key={listac.id} lista={listac} user={auth.user} oculta={auth.user.id===listac.usuario.id}/>
                        </>
                    ))}
                </div>) :
                (<div className={'mx-auto mt-[5vh] max-w-7xl text-white'}>
                    <h3>No hay resultados... intenta buscar con otras palabras</h3>
                </div>)}
        </AuthenticatedLayout>
    )
}
