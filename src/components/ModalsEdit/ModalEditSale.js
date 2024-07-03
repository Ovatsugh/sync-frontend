"use client"
import { useState, useEffect } from "react";
import api from "@/utils/api";
import Notification from "../Notifier/Notification";
import Cookies from 'js-cookie';

export default function ModalEdit({ onSale, userSale}) {
    const [sale, setSale] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clients, setClients] = useState({});
    const [products, setProducts] = useState({});
    const [services, setServices] = useState({});
    
    const [token, setToken] = useState(Cookies.get('token'))

    useEffect(() => {
        setSale(userSale);
    }, []);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        setToken(storedToken);
        handleDatas(storedToken);
    }, []);
    



    const handleChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    }

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    

        const handleDatas = async (token) => {
        try {
            const productsRes = await api.get('/products/userproducts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const clientsRes = await api.get('/customers/usercustomers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const servicesRes = await api.get('/services/userservices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setClients(clientsRes.data.customer);
            setProducts(productsRes.data.products);
            setServices(servicesRes.data.service);
        } catch (err) {
            console.log(err);
        }
    };



    const handleClientChange = (event) => {
        const clientId = event.target.value;
        const client = clients.find(client => client.id == clientId);
        if (client) {
            setSale(prevSale => ({
                ...prevSale,
                customer: client.name 
            }));
        }
    };

    const handleServiceChange = (event) => {
        const serviceId = event.target.value;
        const service = services.find(service => service.id == serviceId);
        if (service) {
            setSale({
                ...sale,
                name: service.name,
                price: service.price,
            });
        }
    };

    const handleProductChange = (event) => {
        const productId = event.target.value;
        const product = products.find(product => product.id == productId);
        if (product) {
            setSale({
                ...sale,
                name: product.name,
                price: product.price,
            });
        }
    };



    async function handleSubmit(e) {
        e.preventDefault();
        try {
             await api.put(`/sales/edit/${userSale.id}`, sale, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (onSale) {
                onSale({ ...sale, id: sale.id });
            }

            Notification('success', 'Venda editada!');
            setSale({ name: '', price: '', customer: '', type: ''});
            handleCloseModal();
        } catch (err) {
            if(err.response.data.message) {
                return  Notification('error', err.response.data.message)
              }
              
              Notification('error', 'Erro ao editar venda')
          
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
                                <h1 className="modal-title fs-5" id="editModal">Editar Venda</h1>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <form onSubmit={handleSubmit} className="modal-body">


                                <div className="mb-3">
                                    <label className="form-label font-bold">Cliente</label>
                                    <select
                                        className="form-select"
                                        value={clients.find(client => client.name === sale.customer)?.id || ""}
                                        onChange={handleClientChange}
                                        required
                                    >
                                        <option value="" disabled>{sale.customer}</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {sale.type === 1 && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label font-bold">Serviço</label>
                                            <select
                                                className="form-select"
                                                value={services.find(service => service.name === sale.name)?.id || ""}
                                                onChange={handleServiceChange}
                                                required
                                            >
                                                <option value="" disabled>Selecione um serviço</option>
                                                {services.map((service) => (
                                                    <option key={service.id} value={service.id}>
                                                        {service.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {sale.type === 0 && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label font-bold">Produto</label>
                                            <select
                                                className="form-select"
                                                value={products.find(product => product.name === sale.name)?.id || ""}
                                                onChange={handleProductChange}
                                                required
                                            >
                                                <option value="" disabled>{sale.name}</option>
                                                {products.map((product) => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label font-bold">Quantidade</label>
                                            <input
                                                name="qtd"
                                                type="number"
                                                className="form-control"
                                                placeholder="Quantidade vendida"
                                                value={sale.qtd}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="priceInput" className="form-label font-bold">Preço</label>
                                    <input
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        placeholder="Preço do produto"
                                        value={sale.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
