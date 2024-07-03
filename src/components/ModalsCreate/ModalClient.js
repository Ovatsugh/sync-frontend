"use client"
import { useState } from "react"
import api from "@/utils/api"
import Notification from "../Notifier/Notification"
import Cookies from 'js-cookie'

export default function Modal({ onCliente }) {
    const [cliente, setCliente] = useState({ name: '', email: '', phone: '', cpf: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    }

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post('/customers/create', cliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (onCliente) {
                onCliente({ ...cliente, id: res.data.customer.id });
            }
            Notification('success', 'cliente cadastrado!');
            setCliente({ name: '', email: '', phone: '', cpf: '' });
            handleCloseModal();
        } catch (err) {
            if (err.response.data.message) {
                return Notification('error', err.response.data.message)
            }

            Notification('error', 'Erro ao cadastrar cliente')

        }
    }

    return (
        <>
            <button type="button" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
                Novo Cliente
            </button>

            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastrar Cliente</h1>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <form className="modal-body" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        name="name"
                                        value={cliente.name}
                                        type="text"
                                        className="form-control"
                                        placeholder="nome do cliente"
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        value={cliente.email}
                                        type="text"
                                        className="form-control"
                                        placeholder="email do cliente"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Telefone</label>
                                    <input
                                        name="phone"
                                        value={cliente.phone}
                                        type="text"
                                        className="form-control"
                                        placeholder="telefone do cliente"
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        name="cpf"
                                        value={cliente.cpf}
                                        type="text"
                                        className="form-control"
                                        placeholder="cpf do cliente"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
                                <button type="submit" className="btn btn-primary" value="Save changes" >Cadastrar </button>
                            </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
