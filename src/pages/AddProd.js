import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/SideNav';
import AddProdComp from '../components/AddProdComp';
import UniversalCode from '../CodeStorage/UniversalCode';
import axios from 'axios';

const AddProd = () => {
  const {produrl, countPC, setCountPC, pc, phone, setCountPhone, countPhone, consGame, countConsGame, setCountConsGame} = UniversalCode();

  useEffect(() => {
    axios.get(produrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          const pcImg = data.data.filter(pc);
          const phoneImg = data.data.filter(phone);
          const consGameImg = data.data.filter(consGame);
          setCountPC(pcImg.length);
          setCountPhone(phoneImg.length); 
          setCountConsGame(consGameImg.length);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
  }, [produrl, pc, setCountPC, phone, setCountPhone, consGame, setCountConsGame]);

  return (
  
    <>
      <Nav />
      <div className='d-flex'>
      <Sidebar countPC={countPC} countPhone={countPhone} countConsGame={countConsGame} />
      <AddProdComp />
      </div>
    </>
  );
}

export default AddProd;
