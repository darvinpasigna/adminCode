import { useState } from 'react';

const UniversalCode = () => {
    const produrl = "https://darvx.online/public/api/products";
    const orderUrl = "https://darvx.online/public/api/order";
    const CustmerUrl = "https://darvx.online/public/api/customers";
    const shipUrl = "https://darvx.online/public/api/ship";
  const [countPC, setCountPC] = useState(0);
  const [countPhone, setCountPhone] = useState(0);
  const [countConsGame, setCountConsGame] = useState(0);
  const [countPending, setCountPending] = useState([]);
  const [orderArr, setOrderArr] = useState([]);
  const pc = (item) => {
    return item.prod_category.toLowerCase() === "PC".toLowerCase();
  };
  const phone = (item) => {
    return item.prod_category.toLowerCase() === "Smart Phone".toLowerCase();
  };
  const consGame = (item) => {
    return item.prod_category.toLowerCase() === "Console Game".toLowerCase();
  };
  const ship = (item) => {
    return item.status.toLowerCase() === "Shipped".toLowerCase();
  };
  const cancel = (item) => {
    return item.status.toLowerCase() === "Canceled".toLowerCase();
  };
  return {
    produrl, countPC, setCountPC, pc, phone, countPhone, setCountPhone, consGame, countConsGame, setCountConsGame, 
    orderUrl, countPending, setCountPending, orderArr, setOrderArr, CustmerUrl, shipUrl, ship, cancel
  }
}

export default UniversalCode;