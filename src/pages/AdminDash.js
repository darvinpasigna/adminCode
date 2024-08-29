import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/SideNav';
import Dashcont from '../components/Dashcont';
import UniversalCode from '../CodeStorage/UniversalCode';
import axios from 'axios';
import Shipcont from '../components/Shipcont';
import Cancelcont from '../components/Cancelcont';
import RegUser from '../components/RegUser';

const AdminDash = () => {
  const {produrl, countPC, 
    setCountPC, pc, phone, 
    setCountPhone, countPhone,
     consGame, countConsGame, 
     setCountConsGame, orderUrl, 
     countPending, setCountPending, 
     setOrderArr, orderArr, CustmerUrl, shipUrl, ship, cancel } = UniversalCode();

    const [showPending, setShowPending] = useState(true);
    const [showShip, setShowShip] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [userArr, setUserArr] = useState([]);
    const [userCount, setUsercount] = useState(0);
    const [shipCount, setShipCount] = useState(0);
    const [CancelCount, setCancelCount] = useState(0);
    const [shipArr, setShipArr] = useState([]);
    const [cancelArr, setCancelArr] = useState([]);

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

      axios.get(orderUrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setCountPending(data.data.length);
          setOrderArr(data.data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })

      axios.get(CustmerUrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setUsercount(data.data.length);
          setUserArr(data.data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })

      axios.get(shipUrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          const ShpmentCount = data.data.filter(ship);
          const CanclCount = data.data.filter(cancel);
          setShipCount(ShpmentCount.length);
          setCancelCount(CanclCount.length);
          setShipArr(ShpmentCount);
          setCancelArr(CanclCount);
        } else {
          console.error("Expected an array but got:", data);
        }
      });
    
  }, [shipUrl, setShipCount, setCancelCount, orderUrl]);

  return (
    <>
      <Nav />
      <div className='d-flex'>
        <Sidebar countPC={countPC} countPhone={countPhone} countConsGame={countConsGame} />

        <RegUser showUser={showUser} setShowCancel={setShowCancel} 
        setShowShip={setShowShip} setShowPending={setShowPending}
        countPending={countPending} orderArr={orderArr} setShowUser={setShowUser}
        userArr={userArr} userCount={userCount} setUsercount={setUsercount} setUserArr={setUserArr} 
        shipCount={shipCount} CancelCount={CancelCount}  setShipCount={setShipCount} setCancelCount={setCancelCount}
        />

        <Dashcont showPending={showPending} setShowPending={setShowPending} 
        setShowShip={setShowShip} setShowCancel={setShowCancel} userCount={userCount} setCountPending={setCountPending}
        countPending={countPending} orderArr={orderArr} setShowUser={setShowUser} setOrderArr={setOrderArr} 
        CancelCount={CancelCount} shipCount={shipCount} setShipCount={setShipCount} setCancelCount={setCancelCount}
        /> 

        <Shipcont showShip={showShip} setShowPending={setShowPending} 
        setShowShip={setShowShip} setShowCancel={setShowCancel} userCount={userCount}
        countPending={countPending} orderArr={orderArr} setShowUser={setShowUser} 
        shipCount={shipCount} CancelCount={CancelCount} shipArr={shipArr} />

        <Cancelcont showCancel={showCancel} setShowCancel={setShowCancel} 
        setShowShip={setShowShip} setShowPending={setShowPending} userCount={userCount}
        countPending={countPending} orderArr={orderArr} setShowUser={setShowUser}
        shipCount={shipCount} CancelCount={CancelCount} cancelArr={cancelArr}
        />
      </div>
    </>
  );
};

export default AdminDash;
