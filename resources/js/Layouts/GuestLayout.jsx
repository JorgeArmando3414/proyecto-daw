import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen min-w-full px-6 py-4 bg-gray-800">
            {children}
        </div>
        // <div className="min-h-screen flex flex-col justify-center bg-gray-800">
        //     {/*<div>*/}
        //     {/*    <Link href="/">*/}
        //     {/*        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />*/}
        //     {/*    </Link>*/}
        //     {/*</div>*/}
        //
        //
        // </div>
    );
}
