import React, { useEffect } from 'react';
import NavBar from '../components/Nav';
import Sidebar from '../components/SideNav';
import PCcomp from '../components/PCcomp';
import UniversalCode from '../CodeStorage/UniversalCode';
import axios from 'axios';

const PC = () => {
  const {produrl, countPC, setCountPC,
     pc, phone, setCountPhone, 
     countPhone, countConsGame, consGame, setCountConsGame} = UniversalCode();
  
  useEffect(() => {
    axios.get(produrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          const pcImg = data.data.filter(pc);
          const phoneImg = data.data.filter(phone);
          const consGameImg = data.data.filter(consGame);
          setCountPhone(phoneImg.length); 
          setCountPC(pcImg.length); 
          setCountConsGame(consGameImg.length);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
  }, [produrl, pc, setCountPC, phone, setCountPhone, consGame, setCountConsGame ]);

  return (
   <>
   <NavBar />
   <div className='d-flex'>
   <Sidebar countPC={countPC} countPhone={countPhone} countConsGame={countConsGame} />
   <PCcomp />
   </div>
   </>
   
  )
}

export default PC;