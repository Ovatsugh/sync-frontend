"use client";

import { useState, useEffect } from "react";
import SidebarDesk from "../SidebarDesk/SidebarDesk";
import { usePathname } from 'next/navigation'
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/navigation";

export default function MainContent({ children }) {

    const router = useRouter()
    const pathname = usePathname()
    const isNotFoundPage = router.isFallback || router.asPath === '/404';
    const noSidebarRoutes = ['/login', '/signup'];


    const [isMobile, setIsMobile] = useState(false);
    const [classMain, setClassMain] = useState('flex-1 ml-44 p-4 mt-12');

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        // Set the initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setClassMain(isMobile ? 'mt-20 w-full ml-2' : 'flex-1 ml-44 p-4 mt-12');
    }, [isMobile]);

    if (isNotFoundPage) {
        return (
            <div >
                {children}
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex">
                {!noSidebarRoutes.includes(pathname) && !isMobile && <SidebarDesk />}
                <div className={classMain}>
                    {children}
                </div>
            </div>
        </>
    );
}
