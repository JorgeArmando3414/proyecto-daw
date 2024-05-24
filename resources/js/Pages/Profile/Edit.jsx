import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateFotoForm from './Partials/UpdateFotoForm.jsx';
import { Head } from '@inertiajs/react';


export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Editar Perfil</h2>}
        >
            <Head title="Perfil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ">
                    <div className="px-4 py-4  bg-transparent sm:rounded-lg w-[100%] flex justify-between items-center">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl w-[47%] rounded-xl px-4 py-4 bg-black/[0.6]"
                        />
                        <UpdatePasswordForm className="max-w-xl w-[47%] rounded-xl px-4 py-4 bg-black/[0.6]" />
                    </div>

                    <div className="px-4 py-4 bg-transparent sm:rounded-lg w-[100%] flex justify-between items-center">
                        <UpdateFotoForm className="max-w-xl w-[47%] rounded-xl px-4 py-4 bg-black/[0.6]" />
                        <DeleteUserForm className="max-w-xl w-[47%] rounded-xl px-4 py-4 bg-black" />
                    </div>

                    {/*<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-[100%] flex justify-between items-center">*/}
                    {/*    <UpdatePasswordForm className="max-w-xl w-[80%]" />*/}
                    {/*</div>*/}

                    {/*<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-[50%] flex justify-center items-center">*/}
                    {/*    <DeleteUserForm className="max-w-xl w-[80%]" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
