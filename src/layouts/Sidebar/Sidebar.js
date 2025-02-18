import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'], // Escolha os pesos que você precisa
});


export default function Sidebar() {
    return (
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/user/home">Home</a>
                    </li>
                   

                    <li className="mb-2 flex items-center  p-1 rounded-md text-white">
                        <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.49774 1.50031H12.502C15.0527 1.50031 16.4927 2.94706 16.5002 5.49781V12.5028C16.5002 15.0528 15.0527 16.5003 12.502 16.5003H5.49774C2.94699 16.5003 1.50024 15.0528 1.50024 12.5028V5.49781C1.50024 2.94706 2.94699 1.50031 5.49774 1.50031ZM9.03704 13.3953C9.36029 13.3953 9.62954 13.1553 9.65954 12.8328V5.1903C9.68954 4.9578 9.57779 4.72455 9.37529 4.5978C9.16454 4.4703 8.90954 4.4703 8.70779 4.5978C8.50454 4.72455 8.39279 4.9578 8.41454 5.1903V12.8328C8.45279 13.1553 8.72204 13.3953 9.03704 13.3953ZM12.4878 13.3953C12.8028 13.3953 13.072 13.1553 13.1103 12.8328V10.3728C13.132 10.1321 13.0203 9.90781 12.817 9.78031C12.6153 9.65281 12.3603 9.65281 12.1503 9.78031C11.947 9.90781 11.8353 10.1321 11.8653 10.3728V12.8328C11.8953 13.1553 12.1645 13.3953 12.4878 13.3953ZM6.16452 12.8328C6.13452 13.1553 5.86527 13.3953 5.54202 13.3953C5.21952 13.3953 4.94952 13.1553 4.92027 12.8328V7.6503C4.89777 7.41705 5.00952 7.1853 5.21277 7.0578C5.41452 6.9303 5.67027 6.9303 5.87277 7.0578C6.07452 7.1853 6.18777 7.41705 6.16452 7.6503V12.8328Z" fill="#707FDD" />
                        </svg>
                        <Link className='hover:bg-customText ' href='/user/sales'>Vendas</Link>
                        
                    </li>

                   

                    <li className="mb-2 flex items-center  p-1 rounded-md text-white">
                        <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.49774 1.50031H12.502C15.0527 1.50031 16.4927 2.94706 16.5002 5.49781V12.5028C16.5002 15.0528 15.0527 16.5003 12.502 16.5003H5.49774C2.94699 16.5003 1.50024 15.0528 1.50024 12.5028V5.49781C1.50024 2.94706 2.94699 1.50031 5.49774 1.50031ZM9.03704 13.3953C9.36029 13.3953 9.62954 13.1553 9.65954 12.8328V5.1903C9.68954 4.9578 9.57779 4.72455 9.37529 4.5978C9.16454 4.4703 8.90954 4.4703 8.70779 4.5978C8.50454 4.72455 8.39279 4.9578 8.41454 5.1903V12.8328C8.45279 13.1553 8.72204 13.3953 9.03704 13.3953ZM12.4878 13.3953C12.8028 13.3953 13.072 13.1553 13.1103 12.8328V10.3728C13.132 10.1321 13.0203 9.90781 12.817 9.78031C12.6153 9.65281 12.3603 9.65281 12.1503 9.78031C11.947 9.90781 11.8353 10.1321 11.8653 10.3728V12.8328C11.8953 13.1553 12.1645 13.3953 12.4878 13.3953ZM6.16452 12.8328C6.13452 13.1553 5.86527 13.3953 5.54202 13.3953C5.21952 13.3953 4.94952 13.1553 4.92027 12.8328V7.6503C4.89777 7.41705 5.00952 7.1853 5.21277 7.0578C5.41452 6.9303 5.67027 6.9303 5.87277 7.0578C6.07452 7.1853 6.18777 7.41705 6.16452 7.6503V12.8328Z" fill="#707FDD" />
                        </svg>
                        <Link className='hover:bg-customText ' href='/user/clients'>Clientes</Link>
                        
                    </li>

                    <li className="mb-2 flex items-center  p-1 rounded-md text-white">
                        <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.49774 1.50031H12.502C15.0527 1.50031 16.4927 2.94706 16.5002 5.49781V12.5028C16.5002 15.0528 15.0527 16.5003 12.502 16.5003H5.49774C2.94699 16.5003 1.50024 15.0528 1.50024 12.5028V5.49781C1.50024 2.94706 2.94699 1.50031 5.49774 1.50031ZM9.03704 13.3953C9.36029 13.3953 9.62954 13.1553 9.65954 12.8328V5.1903C9.68954 4.9578 9.57779 4.72455 9.37529 4.5978C9.16454 4.4703 8.90954 4.4703 8.70779 4.5978C8.50454 4.72455 8.39279 4.9578 8.41454 5.1903V12.8328C8.45279 13.1553 8.72204 13.3953 9.03704 13.3953ZM12.4878 13.3953C12.8028 13.3953 13.072 13.1553 13.1103 12.8328V10.3728C13.132 10.1321 13.0203 9.90781 12.817 9.78031C12.6153 9.65281 12.3603 9.65281 12.1503 9.78031C11.947 9.90781 11.8353 10.1321 11.8653 10.3728V12.8328C11.8953 13.1553 12.1645 13.3953 12.4878 13.3953ZM6.16452 12.8328C6.13452 13.1553 5.86527 13.3953 5.54202 13.3953C5.21952 13.3953 4.94952 13.1553 4.92027 12.8328V7.6503C4.89777 7.41705 5.00952 7.1853 5.21277 7.0578C5.41452 6.9303 5.67027 6.9303 5.87277 7.0578C6.07452 7.1853 6.18777 7.41705 6.16452 7.6503V12.8328Z" fill="#707FDD" />
                        </svg>
                        <Link className='hover:bg-customText ' href='/user/services'>Serviços</Link>
                        
                    </li>

                    <li className="mb-2 flex items-center  p-1 rounded-md text-white">
                        <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.49774 1.50031H12.502C15.0527 1.50031 16.4927 2.94706 16.5002 5.49781V12.5028C16.5002 15.0528 15.0527 16.5003 12.502 16.5003H5.49774C2.94699 16.5003 1.50024 15.0528 1.50024 12.5028V5.49781C1.50024 2.94706 2.94699 1.50031 5.49774 1.50031ZM9.03704 13.3953C9.36029 13.3953 9.62954 13.1553 9.65954 12.8328V5.1903C9.68954 4.9578 9.57779 4.72455 9.37529 4.5978C9.16454 4.4703 8.90954 4.4703 8.70779 4.5978C8.50454 4.72455 8.39279 4.9578 8.41454 5.1903V12.8328C8.45279 13.1553 8.72204 13.3953 9.03704 13.3953ZM12.4878 13.3953C12.8028 13.3953 13.072 13.1553 13.1103 12.8328V10.3728C13.132 10.1321 13.0203 9.90781 12.817 9.78031C12.6153 9.65281 12.3603 9.65281 12.1503 9.78031C11.947 9.90781 11.8353 10.1321 11.8653 10.3728V12.8328C11.8953 13.1553 12.1645 13.3953 12.4878 13.3953ZM6.16452 12.8328C6.13452 13.1553 5.86527 13.3953 5.54202 13.3953C5.21952 13.3953 4.94952 13.1553 4.92027 12.8328V7.6503C4.89777 7.41705 5.00952 7.1853 5.21277 7.0578C5.41452 6.9303 5.67027 6.9303 5.87277 7.0578C6.07452 7.1853 6.18777 7.41705 6.16452 7.6503V12.8328Z" fill="#707FDD" />
                        </svg>
                        <Link className='hover:bg-customText ' href='/user/products'>Produtos</Link>
                        
                    </li>

                </ul>
            </div>
        </div>
    );
}
