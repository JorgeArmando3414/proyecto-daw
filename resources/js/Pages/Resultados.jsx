import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Resultados ({auth, users, listas}){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resultados</h2>}
        >
            {listas.map(lista => (
                <h3>{lista.nombre}</h3>
            ))}
            {users.map(user => (
                <h3>{user.username}</h3>
            ))}
        </AuthenticatedLayout>
    )
}
