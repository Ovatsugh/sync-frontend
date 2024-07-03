import { Poppins } from 'next/font/google'
import ModalShop from '../../../components/ModalsCreate/ModalShop'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Escolha os pesos que você precisa
});


export default function Shop() {
  return (
    <>
      <div className='pb-4'>
        <ModalShop />
      </div>
      <table className="table">
        <thead className={poppins.className}>
          <tr>

            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>

            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>

            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
