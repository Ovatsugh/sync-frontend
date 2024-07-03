"use client"
import { useState, useEffect } from "react";
import api from "@/utils/api";
import Notification from "../Notifier/Notification";
import Cookies from 'js-cookie';

export default function ModalEdit({ onClient, userclient }) {
    const [client, setClient] = useState({ name: '', email: '', phone: '', cpf: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');

    useEffect(() => {
        setClient(userclient);
    }, [userclient]);

    function handleChange(e) {
        setClient({ ...client, [e.target.name]: e.target.value });
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
            const res = await api.put(`/customers/edit/${client.id}`, client, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (onClient) {
                onClient({ ...client, id: client.id });
            }

            Notification('success', 'Cliente editado!');
            setClient({ name: '', price: '', qtd: '' });
            handleCloseModal();
        } catch (err) {
            if(err.response.data.message) {
                return  Notification('error', err.response.data.message)
              }
              
              Notification('error', 'Erro ao editar cliente')
        }
    }

    return (
        <>
            <button type="button" className="btn btn-info ml-4" onClick={handleOpenModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </button>

            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="editModal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editModal">Editar Cliente</h1>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        name="name"
                                        value={client.name}
                                        type="text"
                                        className="form-control"
                                        placeholder="nome do cliente"
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">email</label>
                                    <input
                                        name="price"
                                        value={client.email}
                                        type="email"
                                        className="form-control"
                                        placeholder="email do cliente"
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">phone</label>
                                    <input
                                        name="qtd"
                                        value={client.phone}
                                        type="text"
                                        className="form-control"
                                        placeholder="Telefone do produto"
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        name="price"
                                        value={client.cpf}
                                        type="text"
                                        className="form-control"
                                        placeholder="cpf do cliente"
                                        onChange={handleChange}
                                    />
                                </div>



                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
                                <button onClick={handleSubmit} className="btn btn-primary" value="Save changes" > Atualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
