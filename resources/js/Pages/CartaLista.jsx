import {useState} from "react";

export default function CartaLista({user, lista, openModal, borrarLista}){
    const [visible , setVisible] = useState(false);
    const fotoDefault = '/fotos/default.gif'
    const fotoUser = `storage/${lista.usuario.foto}`;
    const perfilUrl = route('profile.show', { user: lista.usuario.id });

    const cambiaVista = () =>{
        setVisible(!visible);
    }

    return(
        <>
            <div className={'flex flex-row w-full justify-center items-start'}>
                <a href={perfilUrl} className="w-[80px] h-[80px] mt-4 rounded-full overflow-hidden hover:border-4 duration-300 hover:origin-center hover:rotate-360 hover:border-green-500">
                    <img className={'object-cover w-full h-full'} src={`${lista.usuario.foto?fotoUser:fotoDefault}`} alt="Foto de perfil"/>
                </a>
                <div key={lista.id} className={`border-4 border-green-500 rounded-2xl text-white my-4 ml-2 w-[75%]`}>
                    <div className={`${visible? " border-b-4 border-green-500 rounded-t-xl ":" rounded-xl "} w-full flex flex-row justify-between bg-black`}>
                        <div className={'flex flex-col items-start'}>
                            <h3 className={'text-2xl font-bold ml-4 text-nowrap'}>{lista.nombre}</h3>
                            <p className={'ml-4'}>@{lista.usuario.username} - {lista.formateado_created_at}</p>
                        </div>
                        <div className={'flex justify-end w-[30%]'}>
                            { user.id === lista.creado_por && <div className={'flex flex-row justify-center w-[80%]'}>
                                <button onClick={openModal} className="btn btn-info rounded-none h-full">Editar</button>
                                <button onClick={borrarLista} className="btn btn-error rounded-none h-full">Borrar</button>
                            </div>}
                            <button
                                onClick={() => cambiaVista()}
                                className="swap swap-rotate h-[100%] w-[20%] rounded-full hover:bg-gray-800 focus:outline-none flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-full w-full transition-transform duration-300 ${visible? 'transform rotate-180' : ''}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={`${visible? "block ":" hidden "} rounded-b-xl overflow-hidden`}>
                        <table className="table rounded-lg table-zebra w-full text-left text-white">
                            <thead>
                            <tr className="bg-black">
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Álbum</th>
                                <th className="px-4 py-2">Artista</th>
                                <th className="px-4 py-2">Género</th>
                            </tr>
                            </thead>
                            <tbody>
                            {lista.cancions.map(cancion => (
                                <tr key={cancion.id} className="bg-gray-700">
                                    <td className="px-4 py-2">{cancion.nombre}</td>
                                    <td className="px-4 py-2">{cancion.album}</td>
                                    <td className="px-4 py-2">{cancion.artista}</td>
                                    <td className="px-4 py-2">{cancion.genero}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*<div className="w-10 h-10 mt-4">*/}
            {/*    <img className={'rounded-full w-full h-full'} src={`${lista.usuario.foto?fotoUser:fotoDefault}`} alt="Foto de perfil"/>*/}
            {/*</div>*/}
            {/*<div key={lista.id} className={`border-4 border-green-500 rounded-2xl text-white my-4 ml-2 w-[70%]`}>*/}
            {/*    <div className={`${visible? " border-b-4 border-green-500 rounded-t-xl ":" rounded-xl "} w-full flex flex-row justify-between bg-black`}>*/}
            {/*        <div className={'flex flex-col items-start'}>*/}
            {/*            <h3 className={'text-2xl font-bold ml-4 text-nowrap'}>{lista.nombre}</h3>*/}
            {/*            <p className={'ml-4'}>@{lista.usuario.username} - {lista.formateado_created_at}</p>*/}
            {/*        </div>*/}
            {/*        <div className={'flex justify-end w-[30%]'}>*/}
            {/*            { user.id === lista.creado_por && <div className={'flex flex-row justify-center w-[80%]'}>*/}
            {/*                <button onClick={openModal} className="btn btn-info rounded-none h-full">Editar</button>*/}
            {/*                <button onClick={borrarLista} className="btn btn-error rounded-none h-full">Borrar</button>*/}
            {/*            </div>}*/}
            {/*            <button*/}
            {/*                onClick={() => cambiaVista()}*/}
            {/*                className="swap swap-rotate h-[100%] w-[20%] rounded-full hover:bg-gray-800 focus:outline-none flex items-center justify-center"*/}
            {/*            >*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-full w-full transition-transform duration-300 ${visible? 'transform rotate-180' : ''}`}>*/}
            {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={`${visible? "block ":" hidden "} rounded-b-xl overflow-hidden`}>*/}
            {/*        <table className="table rounded-lg table-zebra w-full text-left text-white">*/}
            {/*            <thead>*/}
            {/*            <tr className="bg-black">*/}
            {/*                <th className="px-4 py-2">Nombre</th>*/}
            {/*                <th className="px-4 py-2">Álbum</th>*/}
            {/*                <th className="px-4 py-2">Artista</th>*/}
            {/*                <th className="px-4 py-2">Género</th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {lista.cancions.map(cancion => (*/}
            {/*                <tr key={cancion.id} className="bg-gray-700">*/}
            {/*                    <td className="px-4 py-2">{cancion.nombre}</td>*/}
            {/*                    <td className="px-4 py-2">{cancion.album}</td>*/}
            {/*                    <td className="px-4 py-2">{cancion.artista}</td>*/}
            {/*                    <td className="px-4 py-2">{cancion.genero}</td>*/}
            {/*                </tr>*/}
            {/*            ))}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
