import {router, useForm} from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function Index({ auth, lista, user, setShowModalComentarios}){
    const [comentarios, setComentarios] = useState([]);
    const { data, setData, errors, post, reset } = useForm({
        id_lista: lista.id,
        id_autor: user.id,
        contenido: "",
        fecha_publicacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("comentarios.store"), {
            data,
            onSuccess: () => {
                console.log("comentado");
                fetchComentarios();
                reset();
            },
        });
    };

    useEffect(() => {
        fetchComentarios();
    }, [lista]);

    const fetchComentarios = async () => {
        try {
            const response = await fetch(`/ver/comentarios?lista_id=${lista.id}`);
            const data = await response.json();
            setComentarios(data);
        } catch (error) {
            console.error('Error fetching comentarios:', error);
        }
    };

    const borrarComentario = (comentario) =>{
        if(!window.confirm("Estas seguro?")){
            return;
        }else{
            router.delete(route("comentarios.destroy", comentario.id));
        }
    }

    const perfilUrl = (id) => {
        return route('profile.show', { user: id });
    }

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 ">
                <div className="modal-container bg-black border-2 border-white p-4 rounded-lg overflow-y-auto max-h-[80vh] max-w-[50vw]">
                    <div className="modal-header h-[20%] flex flex-row justify-between border-b-2 sticky-top-0 border-black items-center">
                        <h2 className="text-lg font-semibold">{lista.nombre}</h2>
                        <button className={"btn rounded-full"} onClick={() => setShowModalComentarios(false)}>X</button>
                    </div>
                    <div className="modal-body bg-gray-600 text-white my-4 p-4 rounded-lg max-h-[80%] gap-4 flex flex-col overflow-x-clip text-wrap">
                        {comentarios.map(comentario => (
                            <>
                                <div className={'flex flex-row items-center gap-4 bg-gray-800 rounded-2xl max-w-[93%] w-fit p-2'}>
                                    <a href={perfilUrl(comentario.id_autor)} className="min-w-[60px] block h-[60px] rounded-full overflow-hidden hover:border-4 duration-300 hover:origin-center hover:rotate-360 hover:border-green-500">
                                        <img className={'object-cover w-full h-full'} src={`storage/${comentario.autor.foto}`} alt="Foto de perfil"/>
                                    </a>
                                    <div className={'max-w-[90%]'}>
                                        <p className={'h-min text-xs text-gray-400'}>@{comentario.autor.username} - {comentario.fecha_publicacion}</p>
                                        <p className={'h-min break-all flex max-w-full'} key={comentario.id}>{comentario.contenido}</p>
                                    </div>
                                    {user.id === comentario.autor.id && <button onClick={()=>borrarComentario(comentario)} className={'btn btn-error rounded-full'}>X</button>}
                                </div>
                            </>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-row gap-2 w-full items-end justify-between sticky-bottom-0">
                            <a href={perfilUrl(user.id)} className="w-[60px] block h-[60px] mt-4 rounded-full overflow-hidden hover:border-4 duration-300 hover:origin-center hover:rotate-360 hover:border-green-500">
                                <img className={'object-cover w-full h-full'} src={`storage/${user.foto}`} alt="Foto de perfil"/>
                            </a>
                            <div className={'flex flex-col w-[70%]'}>
                                <label htmlFor="contenido">Comentario:</label>
                                <input type="text" id="contenido" name="contenido" value={data.contenido} onChange={handleInputChange} className="mt-1 text-black p-1 border-gray-300 rounded-md w-full" />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
