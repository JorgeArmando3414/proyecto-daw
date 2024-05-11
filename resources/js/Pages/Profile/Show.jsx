import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";


export default function Show({auth, foto, desc, listN}){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
        >
            <Head title="Perfil" />
            <div className="py-12 flex flex-row mx-[7%] px-8 justify-between">
                <div className="w-[25%] h-[35vh]">
                    <img className={'rounded-xl w-full h-full'} src={foto} alt="Foto de perfil"/>
                </div>
                <div className={'flex flex-col w-[70%] h-[35vh] gap-2'}>
                    <div className={'h-[55%] w-full bg-white text-black px-2 py-4 flex flex-row justify-between'}>
                        <ul className={'flex flex-col justify-around h-full w-[50%]'}>
                            <li><b>Nombre de Usuario:</b> {auth.user.username}</li>
                            <li><b>Listas Creadas:</b> {listN}</li>
                            <li><b>Seguidores:</b> </li>
                            <li><b>Siguiendo:</b> </li>
                        </ul>
                        <div>
                            <a href={route('profile.edit')} className={'btn btn-success text-white'}>Editar</a>
                        </div>
                    </div>
                    <p className={'p-2 rounded-xl bg-gray-500 h-[43%] text-white'}>{desc}</p>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
