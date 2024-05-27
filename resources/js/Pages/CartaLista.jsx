import {useEffect, useState} from "react";
import {router, useForm} from "@inertiajs/react";
import ComentIndex from './Comentario/Index.jsx';

export default function CartaLista({user, lista, openModal, borrarLista, oculta}){
    const [loading, setLoading] = useState(true);
    const [visible , setVisible] = useState(false);
    const fotoDefault = '/fotos/fotoDefault.jpg'
    const fotoUser =lista.usuario.foto ? `/storage/${lista.usuario.foto}`:'/fotos/fotoDefault.jpg';
    const perfilUrl = route('profile.show', { user: lista.usuario.id });
    const autorizado = user.id === lista.creado_por;
    const [showModalComentarios, setShowModalComentarios] = useState(false);
    const [puntuacionesOfLista, setPuntuacionesOfLista] = useState([]);
    const [puntuacion,setPuntuacion] = useState(0);
    const { data: ratingData, setData: setRatingData, post: postRating } = useForm({
        id_lista: lista.id,
        id_usuario: user.id,
        puntuacion: 0,
    });
    const handleRatingChange = (rating) => {
        setPuntuacion(rating);
        setRatingData({ ...ratingData, puntuacion: rating });
    };
    const fetchPuntuaciones = async () => {
        try {
            const response = await fetch(`/listas/${lista.id}/puntuaciones`);
            const data = await response.json();
            setPuntuacionesOfLista(data);
        } catch (error) {
            console.error('Error fetching puntuaciones:', error);
        }
    };
    useEffect(()=>{
        if (ratingData.puntuacion > 0) {
            postRating(route("puntuaciones.store"), {
                data: ratingData,
                onSuccess: () => {
                    console.log("Puntuación creada");
                },
                onError: (error) => {
                    console.log(error);
                }
            });
        }
        fetchPuntuaciones();
    }, [ratingData]);

    useEffect(() => {
        if (puntuacionesOfLista.user_puntuacion >=0) {
            setPuntuacion(puntuacionesOfLista.user_puntuacion);
            setLoading(false);
        }
    }, [puntuacionesOfLista]);

    useEffect(() => {
        fetchPuntuaciones();
    }, []);
    const cambiaVista = () =>{
        setVisible(!visible);
    };
    const openModalComentarios = () => {
        setShowModalComentarios(true);
    };

    if (loading) {
        return <div className={'skeleton h-[5vh] rounded-2xl w-[75%] flex justify-center items-center text-white'}>Cargando...</div>;
    }

    return(
        <>
            <div className={`${oculta?' hidden ':' '} flex flex-row w-full justify-center items-start`}>
                <a href={perfilUrl} className="w-[80px] h-[80px] mt-2 rounded-full overflow-hidden hover:border-4 duration-300 hover:origin-center hover:rotate-360 hover:border-green-500">
                    <img className={'object-cover w-full h-full'} src={fotoUser} alt="Foto de perfil"/>
                </a>
                <div key={lista.id} className={`border-4 border-green-500 rounded-2xl text-white my-4 ml-2 w-[75%]`}>
                    <div className={`${visible? " border-b-4 border-green-500 rounded-t-xl ":" rounded-xl "} w-full flex flex-row justify-between bg-black`}>
                        <div className={'flex flex-col items-start'}>
                            <h3 className={'text-2xl font-bold ml-4 text-nowrap'}>{lista.nombre}</h3>
                            <p className={'ml-4'}>@{lista.usuario.username} - {lista.formateado_created_at} - Media Valoración: {puntuacionesOfLista.average_puntuacion}</p>
                        </div>
                        <div className={'flex justify-end w-[50%]'}>
                            <div className={'flex flex-row justify-center w-[90%] items-center'}>
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <input
                                            key={rating}
                                            type="radio"
                                            className="mask mask-star-2 bg-green-500 checked:bg-green-500"
                                            checked={rating===puntuacion}
                                            onClick={() => handleRatingChange(rating)}
                                            readOnly
                                        />
                                    ))}
                                </div>
                                {/*<button className={'btn bg-orange-500 border-0 text-black hover:bg-orange-600 rounded-none h-full'}>Puntuar</button>*/}
                                <button onClick={()=>openModalComentarios()} className="btn bg-purple-500 border-0 text-black hover:bg-purple-600 rounded-none h-full ml-2">Comentarios</button>
                                {autorizado && <button onClick={openModal}
                                         className="btn btn-info rounded-none h-full">Editar</button>}
                                {autorizado && <button onClick={borrarLista}
                                         className="btn btn-error rounded-none h-full">Borrar</button>}
                            </div>
                            <button
                                onClick={() => cambiaVista()}
                                className="swap swap-rotate h-[100%] w-[10%] rounded-full hover:bg-gray-800 focus:outline-none flex items-center justify-center"
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
            {showModalComentarios && <ComentIndex lista={lista} user={user} setShowModalComentarios={setShowModalComentarios}/>}
        </>
    )
}
