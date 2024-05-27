import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import {useForm, usePage} from "@inertiajs/react";
import {useEffect} from "react";

export default function UpdateFotoForm ({className = '' }){
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful,reset } = useForm({
        foto: "",
    });

    useEffect(() => {
        return () => {
            reset('foto');
        };
    }, []);
    const submit = (e) => {
        e.preventDefault();
        post(route('profile.updatefoto'), {
            _method:'patch',
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Personalización del Perfil</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType={"multipart/form-data"}>
                <div>
                    <InputLabel htmlFor="foto" value="Foto de perfil" />
                    <TextInput
                        id={"foto"}
                        name={"foto"}
                        type={"file"}
                        className="mt-1 block w-full border-info file-input file-input-bordered file-input-info"
                        onChange={(e) => setData('foto', e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.foto} />
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
                        <p className="text-sm text-white">Foto actualizada</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
