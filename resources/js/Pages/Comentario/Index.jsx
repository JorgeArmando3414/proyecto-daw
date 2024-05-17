import {useForm} from "@inertiajs/react";
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

    const perfilUrl = (id) => {
        return route('profile.show', { user: id });
    }

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
                <div className="modal-container bg-gray-800 p-4 rounded-lg max-h-[80vh]  w-[80vw]">
                    <div className="modal-header h-[20%] flex flex-row justify-between border-b-2 border-black items-center">
                        <h2 className="text-lg font-semibold">Lista: {lista.nombre}</h2>
                        <button className={"btn rounded-full"} onClick={() => setShowModalComentarios(false)}>&times;</button>
                    </div>
                    <div className="modal-body my-4 h-[80%]">
                        {comentarios.map(comentario => (
                            <>
                                <div className={'flex flex-row items-center gap-4'}>
                                    <a href={perfilUrl(comentario.id_autor)} className="w-[60px] block h-[60px] mt-4 rounded-full overflow-hidden hover:border-4 duration-300 hover:origin-center hover:rotate-360 hover:border-green-500">
                                        <img className={'object-cover w-full h-full'} src={`storage/${comentario.autor.foto}`} alt="Foto de perfil"/>
                                    </a>
                                    <p className={'h-min'} key={comentario.id}>@{comentario.autor.username} - {comentario.contenido}</p>
                                </div>
                            </>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 text-gray-4  00">Comentario</label>
                            <input type="text" id="contenido" name="contenido" value={data.contenido} onChange={handleInputChange} className="mt-1 p-1 border-gray-300 rounded-md w-full" />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </form>
                </div>
            </div>
        </>
    )
}
