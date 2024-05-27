import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {InertiaLink} from "@inertiajs/inertia-react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [query, setQuery] = useState('');
    const { auth } = usePage().props;

    return (
        <div className="min-h-[93vh] bg-[#7a0101]">
            <nav className="bg-sky-400 top-0 fixed h-[7%] w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/inicio">
                                    <img className={'block h-16 w-auto'} src="/fotos/logoApp.png" alt="logo"/>
                                    {/*<ApplicationLogo className="block h-20 w-auto fill-current text-gray-800" />*/}
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Inicio
                                </NavLink>
                                <NavLink href={route('lista.index')} active={route().current('lista.index')}>
                                    Mis Listas
                                </NavLink>
                                <NavLink href={route('profile.show', {user: auth.user.id})} active={route().current('profile.show')}>
                                    Perfil
                                </NavLink>
                            </div>
                        </div>

                        <div className={'w-[50%] items-center flex justify-between'}>
                            <input className={'w-[80%] focus:outline-transparent focus:ring-0 rounded-xl shadow-none border-0 focus:shadow-md focus:shadow-sky-600 text-black'} placeholder={'Busca una lista o usuario'} type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                            <a className={'btn btn-warning hover:text-white'} href={`/resultados?query=${encodeURIComponent(query)}`}>Buscar</a>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 flex flex-row gap-6">
                                <div>
                                    {user.rol === 'admin' && <InertiaLink href={route('admin.users.index')} method="get" as="button"
                                                  className="btn btn-secondary hover:text-white">Administrar</InertiaLink>}
                                </div>
                                <div>
                                    <InertiaLink href={route('logout')} method="post" as="button" className="btn btn-error hover:text-white">Salir</InertiaLink>
                                </div>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-0 space-y-1 bg-gray-100">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Inicio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('lista.index')} active={route().current('lista.index')}>
                            Mis Listas
                        </ResponsiveNavLink>
                        {user.rol === 'admin' && <ResponsiveNavLink href={route('admin.users.index')} active={route().current('admin.users.index')}>
                            Administrar
                        </ResponsiveNavLink>}
                        <ResponsiveNavLink href={route('profile.show', {user: auth.user.id})} active={route().current('profile.show')}>
                            Perfil
                        </ResponsiveNavLink>
                        <ResponsiveNavLink className={'bg-red-200'} method="post" href={route('logout')} as="button">
                            Salir
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-black shadow mt-[7vh]">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-white">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
