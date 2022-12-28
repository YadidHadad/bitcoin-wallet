import { useState } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { FaDollarSign } from 'react-icons/fa'
import { FaBtc } from 'react-icons/fa'
import { FaBitcoin } from 'react-icons/fa'

import { userService } from '../services/user.service';

export function Home(props) {
  const getBitcoin = async () => {
    try {
      let bitcoin = await bitcoinService.getBitcoin(loggedInUser.balance)
      if (bitcoin)
        setBitcoin(bitcoin)
    } catch (err) {
      console.log(err)
    }
  }
  const [loggedInUser, setUser] = useState({});
  const [bitcoin, setBitcoin] = useState([]);

  getBitcoin()
  if (isNaN(bitcoin)) getBitcoin()


  setTimeout(() => {
    if (!loggedInUser.fullname) setUser(userService.getLoggedInUser())
  }, 1000);





  const style = { backgroundImage: `url(${loggedInUser.imgUrl})` }
  if (!loggedInUser.fullname) return <div className="loader flex auto-center"><FaBitcoin /></div>
  return (
    <section className="home flex auto-center">

      <div className="loggedInUser-section flex column gap-rem auto-center">
        <div className="img " style={style}></div>

        <h1>Hello {loggedInUser.fullname}!</h1>
        <h2 >Your balance:</h2>
        <h1 className='flex auto-center'>{`${(loggedInUser.balance * (100 / bitcoin)).toFixed(2)}`} USD <FaDollarSign /> | {loggedInUser.balance}<FaBtc /></h1>
        <h2>Current rate:</h2>
        <h1 className='flex auto-center'>1 USD <FaDollarSign /> | {bitcoin} <FaBtc /></h1>
      </div>
    </section>
  )

}


