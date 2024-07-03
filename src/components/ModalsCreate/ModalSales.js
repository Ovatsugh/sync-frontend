import { useState, useEffect } from "react";
import api from "@/utils/api";
import Notification from "../Notifier/Notification";
import Cookies from 'js-cookie';

export default function Modal({ onSale }) {
    const token = Cookies.get('token');
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [isService, setIsService] = useState(2); 
    const [sale, setSale] = useState({
        price: '',
        qtd: "",
        name: "", 
        customer: "",
    });

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

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        handleDatas(storedToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let dataToSend = {
                price: sale.price,
                customer: sale.customer,
                name: sale.name, // Envia o nome do produto ou serviço
            };

            if (isService === 1) {
                // Se for um serviço, define o nome do serviço
                dataToSend.name = sale.name;
                dataToSend.type = sale.type
            } else if (isService === 0) {
                // Se for um produto, define o nome do produto
                dataToSend.name = sale.name;
                dataToSend.qtd = sale.qtd;
                dataToSend.type = sale.type
            }

            if (sale.qtd > 0) {
                dataToSend.price = sale.qtd * sale.price;
            }

            const res = await api.post("/sales/create", dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (onSale) {
                onSale({ ...sale, id: res.data.sale.id, price: dataToSend.price});
            }
            Notification('success', 'Venda cadastrada com sucesso');
            setSale({ price: '', qtd: '', name: '', customer: '' });
            setIsService(2);
            handleClose()

        } catch (error) {
            console.error("Erro ao salvar venda:", error);
        }
    }

    const handleChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (event) => {
        const selectedOption = parseInt(event.target.value);
        setIsService(selectedOption);
        if(selectedOption === 0) {
            setSale({ ...sale, name: '', price: '', qtd: '', type: 0});
        } else if(selectedOption === 1) {
            setSale({ ...sale, name: '', price: '', qtd: '', type: 1});
        }
        
    }

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

    return (
        <>
            <button
                type="button"
                className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpen}
            >
                Nova Venda
            </button>

            {isOpen && (
                <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastrar Venda</h1>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleSubmit} className="modal-body">

                                <div className="mb-3">
                                    <label className="form-label font-bold">É um produto ou serviço?</label>
                                    <select
                                        className="form-select"
                                        value={isService}
                                        onChange={handleOptionChange}
                                        required
                                    >
                                        <option value="2" disabled>Selecione um tipo</option>
                                        <option value="0">
                                            Produto
                                        </option>
                                        <option value="1">
                                            Serviço
                                        </option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label font-bold">Cliente</label>
                                    <select
                                        className="form-select"
                                        value={clients.find(client => client.name === sale.customer)?.id || ""}
                                        onChange={handleClientChange}
                                        required
                                    >
                                        <option value="" disabled>Selecione um cliente</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {isService === 1 && (
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

                                {isService === 0 && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label font-bold">Produto</label>
                                            <select
                                                className="form-select"
                                                value={products.find(product => product.name === sale.name)?.id || ""}
                                                onChange={handleProductChange}
                                                required
                                            >
                                                <option value="" disabled>Selecione um produto</option>
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
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Fechar</button>
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
