"use client"
import { useState } from "react"
import api from "@/utils/api"
import Notification from "../Notifier/Notification"
import Cookies from 'js-cookie'

export default function Modal({ onService }) {
    const [service, setService] = useState({ name: '', price: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value });
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
            const res = await api.post('/services/create', service, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (onService) {
                onService({ ...service, id: res.data.service.id });
            }
            Notification('success', 'Serviço criado!');
            setService({ name: '', price: '', qtd: '' });
            handleCloseModal();
        } catch (err) {
            if(err.response.data.message) {
              return Notification('error', err.response.data.message)
            }
            
            Notification('error', 'Erro ao cadastrar serviço');
        }
    }

    return (
        <>
            <button type="button" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
                Novo Serviço
            </button>

            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastrar Serviço</h1>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        name="name"
                                        value={service.name}
                                        type="text"
                                        className="form-control"
                                        placeholder="nome do serviço"
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Preço</label>
                                    <input
                                        name="price"
                                        value={service.price}
                                        type="number"
                                        className="form-control"
                                        placeholder="preço do serviço"
                                        onChange={handleChange}
                                        required />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
                                <button onClick={handleSubmit} className="btn btn-primary" value="Save changes">Cadastrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
