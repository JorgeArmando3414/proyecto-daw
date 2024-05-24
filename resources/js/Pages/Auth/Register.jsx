import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            {/*<GuestLayout>*/}
            {/*    <Head title="Register" />*/}
                <div className={'h-[100vh] flex flex-col justify-center items-center bg-[#7a0101] gap-4'}>
                    <h2 className={'text-xl text-white font-bold'}>Registro</h2>
                    <form onSubmit={submit} className={'w-[35%] h-[50%] bg-black/[0.5] py-6 px-4 rounded-xl flex flex-col items-center justify-between'}>
                        <div className={'w-[70%]'}>
                            <InputLabel htmlFor="username" value="Nombre de Usuario" />
                            <TextInput
                                id="username"
                                name="text"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                            />
                            {/*<InputError message={errors.name} className="mt-2" />*/}
                        </div>

                        <div className="mt-4 w-[70%]">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4 w-[70%]">
                            <InputLabel htmlFor="password" value="Contraseña" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 w-[70%]">
                            <InputLabel htmlFor="password_confirmation" value="Repetir Contraseña" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <button className="ms-4 btn btn-info" disabled={processing}>
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            {/*</GuestLayout>*/}
        </>
    );
}
