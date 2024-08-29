import React, { useEffect, useState } from 'react';
import UniversalCode from '../CodeStorage/UniversalCode';
import '../App.css';
import axios from 'axios';

const PhoneComp = () => {
    const { phone, produrl,} = UniversalCode();
    const [phoneArr, setPhone] = useState([]);
    useEffect(() => {
        axios.get(produrl)
          .then((response) => {
            const data = response.data; // Assuming response.data is the entire object
            if (data && Array.isArray(data.data)) {
              const phoneImg = data.data.filter(phone);
              setPhone(phoneImg); // Accessing the array within `data` property
            } else {
              console.error("Expected an array but got:", data);
            }
          })
      }, []);

    
  return (
    <div className='PCpage container'>
    {phoneArr.length > 0 ? (
      phoneArr.map((item, index) => (
        <div key={index} className="card">
        <img src={item.main_img} className="card-img-top" alt="products" style={{ width: "100%", height: "250px"}}/>
        <div className="card-body p-1">
          <p className="card-text m-0" style={{fontSize: "11px"}}>{item.prod_name}</p>
          <p className="card-text m-0" style={{fontSize: "11px"}}>&#8369;{item.price}</p>
          <p className="card-text m-0" style={{fontSize: "11px"}}>Stocks: {item.stock}</p>
        </div>
      </div>
      ))
    ) : (
      <p>No items found.</p>
    )}
  </div>
  )
}

export default PhoneComp;