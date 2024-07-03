"use client"

import React, { useState, useEffect } from 'react';
import ModalProduct from '../../../components/ModalsCreate/ModalProducts';
import api from '@/utils/api';
import Pagination from '../../../components/Pagination/Pagination';
import Notification from '@/components/Notifier/Notification';
import Cookies from 'js-cookie';
import ModalEdit from '../../../components/ModalsEdit/ModalEditProduct'
import ModalInfo from '../../../components/ModaslInfo/ModalInfo'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const totalPages = Math.ceil((products && products.length ? products.length : 0) / 10);  
  const [itemsPage, setItemsPage] = useState([]);



  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleSearchItems = () => {
    if (search === '') {
      handleProducts(token);
    } else {
      setProducts(products.filter(product => product.name.includes(search)));
    }
  };

  const handleDeleteProduct = async (id) => {
    api.delete(`products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,

      }
    }).then(() => {
      Notification('info', 'Produto deletado com sucesso')
      setProducts(products.filter(product => product.id !== id))
    })

  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProducts = async (token) => {
    try {
      const res = await api.get('/products/userproducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
      Notification('error', 'Erro ao carregar produtos')
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    setToken(storedToken);
    handleProducts(storedToken);
  }, []);

  useEffect(() => {
    const listItems = () => {
      let count = (currentPage * 10) - 10;
      let delimiter = count + 10;
      const newItemsPage = [];

      if (currentPage <= totalPages) {
        for (let i = count; i < delimiter; i++) {
          if (products[i]) {
            newItemsPage.push(products[i]);
          }
        }
      }

      return newItemsPage;
    };

    setItemsPage(listItems());
  }, [currentPage, products, totalPages]);

  const handleProductCreated = (newProduct) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((product) => product.id === newProduct.id);

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = newProduct;
        return updatedProducts;
      } else {
        return [...prevProducts, newProduct];
      }
    });
  };



  return (
    <>
      <div className='flex items-center justify-between pb-4'>
        <ModalProduct onProduct={handleProductCreated} />
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
            <th scope="col">Preço</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itemsPage.length > 0 && (
            itemsPage.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.qtd}</td>
                <td>

                  <div>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    </button>
                    <ModalEdit onProduct={handleProductCreated} userproduct={product} />
                    <ModalInfo data={product} name={'Produto'} />
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
