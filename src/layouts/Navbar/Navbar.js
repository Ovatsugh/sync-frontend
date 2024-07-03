
"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";


export default function Navbar() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);



    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
        <nav className="navbar navbar-dark bg-slate-800 fixed-top ">
            <div className="container-fluid text-xl" >

                <Link className="navbar-brand flex" href="/">
                    {/* <img src="/mylogo.svg" alt="Logo" className="h-10 w-10 " /> */}
                    <img src="/myylogo.svg" alt="Logo" className="h-8 w-8 " />
                    <span className="pl-2">SyncManage</span>
                </Link>


                {/* <ul className="flex space-x-4">
                    <li className="flex-1">
                        <button className="px-4 py-2 text-base text-white font-medium rounded-lg">
                            Perfil
                        </button>
                    </li>

                    <li className="flex-1">
                        <button className="px-4 py-2 text-base text-white font-medium rounded-lg">
                            Sair
                        </button>
                    </li>
                </ul> */}


                {isMobile && <>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Sidebar />
                </>}
            </div>
        </nav>
    )
}