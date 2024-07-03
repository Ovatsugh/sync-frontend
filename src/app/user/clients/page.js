"use client"

import React, { useState, useEffect } from 'react';
import ModalClient from '../../../components/ModalsCreate/ModalClient'
import api from '@/utils/api';
import Pagination from '../../../components/Pagination/Pagination';
import Notification from '@/components/Notifier/Notification';
import Cookies from 'js-cookie';
import ModalEdit from '../../../components/ModalsEdit/ModalEditClient'
import ModalInfo from '../../../components/ModaslInfo/ModalInfo'

const Home = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const totalPages = Math.ceil((clients && clients.length ? clients.length : 0) / 10);  
  const [itemsPage, setItemsPage] = useState([]);



  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleSearchItems = () => {
    if (search === '') {
      handleClients(token);
    } else {
      setClients(clients.filter(client => client.name.includes(search)));
    }
  };

  const handleDeletClient = async (id) => {
    api.delete(`customers/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,

      }
    }).then(() => {
      Notification('info', 'Cliente deletado com sucesso')
      setClients(clients.filter(client => client.id !== id))
    })

  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClients = async (token) => {
    try {
      const res = await api.get('/customers/usercustomers', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setClients(res.data.customer);
    } catch (err) {
      console.log(err);
      Notification('error', 'Erro ao carregar clientes')
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    setToken(storedToken);
    handleClients(storedToken);
  }, []);

  useEffect(() => {
    const listItems = () => {
      let count = (currentPage * 10) - 10;
      let delimiter = count + 10;
      const newItemsPage = [];

      if (currentPage <= totalPages) {
        for (let i = count; i < delimiter; i++) {
          if (clients[i]) {
            newItemsPage.push(clients[i]);
          }
        }
      }

      return newItemsPage;
    };

    setItemsPage(listItems());
  }, [currentPage, clients, totalPages]);

  const handleClientCreated = (newClient) => {
    setClients((prevClients) => {
      const existingClientIndex = prevClients.findIndex((client) => client.id === newClient.id);

      if (existingClientIndex !== -1) {
        const updatedClients = [...prevClients];
        updatedClients[existingClientIndex] = newClient;
        return updatedClients;
      } else {
        return [...prevClients, newClient];
      }
    });
  };



  return (
    <>
      <div className='flex items-center justify-between pb-4'>
        <ModalClient onCliente={handleClientCreated} />
        <nav className="flex space-x-2 ml-auto">
          <input className="border border-gray-300 rounded py-2 px-3" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} value={search} />
          <button className="border border-green-500 py-2 px-4 rounded hover:bg-green-500" onClick={handleSearchItems}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </nav>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">telefone</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itemsPage.length > 0 && (
            itemsPage.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>

                  <div>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeletClient(client.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    </button>
                    <ModalEdit onClient={handleClientCreated} userclient={client} />
                    <ModalInfo data={client} name={'Cliente'} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Home;
