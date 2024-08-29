import React, { useEffect, useState } from 'react';
import UniversalCode from '../CodeStorage/UniversalCode';
import '../App.css';
import axios from 'axios';

const ConsGame = () => {
    const { produrl, consGame} = UniversalCode();
    const [consGameArr, setConsGame] = useState([]);
    useEffect(() => {
        axios.get(produrl)
          .then((response) => {
            const data = response.data; 
            if (data && Array.isArray(data.data)) {
              const consGameImg = data.data.filter(consGame);
              setConsGame(consGameImg);
            } else {
              console.error("Expected an array but got:", data);
            }
          })
      }, []);
  return (
    <div className='PCpage container'>
    {consGameArr.length > 0 ? (
      consGameArr.map((item, index) => (
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

export default ConsGame;