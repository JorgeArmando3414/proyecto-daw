import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        username: user.username,
        email: user.email,
        desc: user.desc || "",
        // foto: "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Información del Perfil</h2>

                <p className="mt-1 text-sm text-white">
                    Actualiza tus datos de usuario
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 text-black">
                <div>
                    <InputLabel htmlFor="username" value="Nombre de usuario" />
                    <TextInput
                        id="username"
                        name="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        name="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="desc" value="Descripción" />
                    <TextInput
                        id="desc"
                        name="desc"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.desc}
                        onChange={(e) => setData('desc', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.desc} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-white">Datos actualizados</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
