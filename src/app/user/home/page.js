"use client"

import api from "@/utils/api";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";



export default function Home() {
    const [currency, setCurrency] = useState(0)
    const [name, setName] = useState('')
    const [products, setProducts] = useState(0)
    const [services, setServices] = useState(0)
    const [sales, setSales] = useState(0)




    const formattedCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(currency);


    useEffect(() => {
        const token = Cookies.get('token');

        api.get('users/usercurrence', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setCurrency(res.data.currency)
            setName(res.data.name)
            setProducts(res.data.products)
            setSales(res.data.sales)
            setServices(res.data.services)
        })
    }, [])


    return (
        <div id="app-layout" className="w-full flex flex-col items-start">
            <div id="app-layout-content" className="w-full">
                <div className="px-8 py-6 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-xl font-bold">Bem vindo, {name}</h1>
                        <Link className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded" href='/user/sales'>Cadastrar venda</Link>
                        
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h4>Carteira</h4>
                                </div>
                                <div className="mt-4 flex flex-col gap-0 text-base">
                                    <h2 className="text-xl font-bold">{formattedCurrency}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h4>Produtos</h4>
                                </div>
                                <div className="mt-4 flex flex-col gap-0 text-base">
                                    <h2 className="text-xl font-bold">{products}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h4>Serviços</h4>
                                </div>
                                <div className="mt-4 flex flex-col gap-0 text-base">
                                    <h2 className="text-xl font-bold">{services}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h4>Vendas</h4>
                                </div>
                                <div className="mt-4 flex flex-col gap-0 text-base">
                                    <h2 className="text-xl font-bold">{sales}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
