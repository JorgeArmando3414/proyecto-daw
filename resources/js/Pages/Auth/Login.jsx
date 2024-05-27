import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, registroRef }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const handleScrollToRegistro = () => {
        if (registroRef && registroRef.current) {
            registroRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        // <GuestLayout>
        <>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className={'h-[100vh] w-full box-border flex flex-row bg-[#7a0101]'}>
                <div className={'flex flex-col w-[40%] h-full bg-[#420101] py-12 justify-between items-center'}>
                    <form onSubmit={submit} className={'w-[60%] h-[40%] rounded-xl bg-black/[0.5] py-6 px-4 flex flex-col justify-between'}>
                            <div>
                                <InputLabel htmlFor="login" value="Nombre de Usuario" />
                                <TextInput
                                    id="login"
                                    type="text"
                                    name="login"
                                    value={data.login}
                                    className="mt-1 block w-full"
                                    autoComplete="login"
                                    isFocused={true}
                                    onChange={(e) => setData('login', e.target.value)}
                                />
                                <InputError message={errors.username} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full bg-white"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center  justify-center mt-4">
                                <button className="ms-4 btn btn-info" disabled={processing}>
                                    Entrar
                                </button>
                            </div>
                        </form>
                    <div className={'flex flex-row items-center gap-4'}>
                        <h3 className={'text-white font-semibold'}>Aun no estás registrado?</h3>
                        <button onClick={handleScrollToRegistro} className={'btn btn-warning'}>Registrate</button>
                    </div>
                </div>
                <div className={'flex flex-col w-[60%] h-full items-center justify-start'}>
                    <div className={'w-full flex flex-row items-end justify-center my-16'}>
                        <img className={'w-[30%]'} src="/fotos/logoApp.png" alt="logo"/>
                        <p className={'text-7xl text-white font-bold'}>TrackHub</p>
                    </div>
                    <h1 className={'text-5xl text-white font-semibold w-[90%] p-4 bg-black/[0.4] rounded-xl'}>Inicia sesión para compartir tu gusto musical con el mundo</h1>
                </div>
            </div>
        </>
        // {/*</GuestLayout>*/}
    );
}
