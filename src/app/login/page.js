"use client"

import { useState } from "react"
import api from "@/utils/api"
import { useRouter } from 'next/navigation';
import Notification from "@/components/Notifier/Notification"
import Cookies from 'js-cookie';

export default function login() {

    const router = useRouter()
    const [user, setUser] = useState({})
   


    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })

    }


    async function login(data) {
        try {
            const user = await api.post('/users/login', data)
            Cookies.set('token', user.data.token);
            api.defaults.headers.Authorization = `Bearer ${user.token}`;
            Notification('success', 'Logado com sucesso!');
        
            router.push('/user/home');
        } catch (err) {
            if (!err.response.data.message) {
                console.log(err);
            } else {
                Notification('error', err.response.data.message);
            }
        }
    }


    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (

        <main
            className="mx-auto flex mt-56 items-center justify-center text-white h-64 w-200"
        >
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-gray-900 text-4xl font-bold">BEM VINDO</div>

                <form  className="flex w-[30rem] flex-col space-y-10" onSubmit={handleSubmit}>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="email"
                            placeholder="Email "
                            className="w-full text-black  bg-transparent outline-none placeholder:italic focus:outline-none"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full text-black   bg-transparent outline-none placeholder:italic focus:outline-none"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="Entrar"  className="transform rounded-sm bg-gray-900 py-2 font-bold duration-300 hover:bg-gray-700" />
                </form>

                <a
                    href="#"
                    className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
                >ESQUECEU A SENHA?</a
                >

            </section>
        </main>

    )
}