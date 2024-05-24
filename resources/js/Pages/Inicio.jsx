import {Link, Head} from '@inertiajs/react';
import Login from "@/Pages/Auth/Login.jsx";
import Register from "@/Pages/Auth/Register.jsx";
import {useRef} from "react";
export default function Welcome({ auth }) {

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const registroRef = useRef(null);

    return (
        <>
            <Head title="Inicio" />
            <div className="bg-black text-white/50 h-[100vh]">
                <main className={'bg-black'}>
                    {!auth.user ?<div className={"text-black"}><Login registroRef={registroRef}/><br/><div ref={registroRef}><Register/></div></div>
                        :<Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Dashboard
                        </Link>}
                </main>
            </div>
        </>
    );
}
