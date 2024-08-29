import React, { useEffect } from 'react';
import ConsGame from '../components/ConsGame';
import Nav from '../components/Nav';
import Sidebar from '../components/SideNav';
import UniversalCode from '../CodeStorage/UniversalCode';
import axios from 'axios';
const ConsGamePage = () => {
    const {produrl, countPhone, setCountPhone, 
        phone, countPC, setCountPC, pc, 
        countConsGame, setCountConsGame, consGame} = UniversalCode();

    useEffect(() => {
      axios.get(produrl)
        .then((response) => {
          const data = response.data;
          if (data && Array.isArray(data.data)) {
            const phoneImg = data.data.filter(phone);
            const pcImg = data.data.filter(pc);
            const consGameImg = data.data.filter(consGame);
            setCountPC(pcImg.length); 
            setCountPhone(phoneImg.length); 
            setCountConsGame(consGameImg.length);
          } else {
            console.error("Expected an array but got:", data);
          }
        })
    }, [produrl, pc, phone, consGame, setCountPC, setCountConsGame, setCountPhone]);
  return (
   <>
   <Nav />
    <div className='d-flex'>
    <Sidebar countPhone={countPhone} countPC={countPC} countConsGame={countConsGame} />
    <ConsGame />
    </div>
   </>
  )
}

export default ConsGamePage;