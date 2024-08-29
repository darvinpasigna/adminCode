import React from 'react';



const Shipcont = ({showShip, setShowShip, setShowPending, 
    setShowCancel, countPending, 
    setShowUser, userCount, shipCount, CancelCount, shipArr }) => {
  
   
  
  return (
    <div className='dashcont container' style={{ display: showShip ? 'block' : 'none' }}>
    <div className='row' id='content'>
            <div className='col-3'>
                <button type='button' id='userbtn' onClick={() => {setShowUser(true); setShowPending(false); setShowShip(false); setShowCancel(false);}}>No. of Registered Users <br /> {userCount}  </button>
            </div>
        <div className='col-3'>
            <button type='button' id='pending' onClick={() => {setShowUser(false); setShowPending(true); setShowShip(false); setShowCancel(false);}}>PENDING ORDERS <br /> {countPending} </button>
        </div>
        <div className='col-3'>
        <button type='button' id='ship' onClick={() => {setShowUser(false); setShowPending(false); setShowShip(true); setShowCancel(false);}}>ONGOING SHIPMENT <br /> {shipCount} </button>
        </div>
        <div className='col-3'>
        <button type='button' id='ret' onClick={() => {setShowUser(false); setShowPending(false); setShowShip(false); setShowCancel(true);}}>CANCELED ORDERS <br /> {CancelCount}</button>
        </div>
    </div>
  
    {/* table */}
   
               <table className="table-responsive container mt-5" style={{textAlign: "left"}}>
               <thead style={{textAlign: "center"}}>
                        <tr>
                            <th colSpan={7} style={{backgroundColor: "lightgrey"}} >SHIPMENT</th>
                        </tr>
                </thead>
               <thead>
                   <tr>
                   <th scope="col">Shipment ID</th>
                   <th scope="col">Mode of Payment</th>
                   <th scope="col">Name of Product</th>
                   <th scope="col">Quantity</th>
                   <th scope="col">Date of Delivery</th>
                   <th scope="col">Total Price</th>
                   <th> Date of Shipment </th>
                   </tr>
               </thead>
               {shipArr.map((item, index) =>(
               <tbody key={index} className="table-group-divider">
                   <tr>
                   <th scope="row">{item.id}</th>
                   <td>{item.mode_of_payment}</td>
                   <td>{item.prod_name.substring(0, 20)}...</td>
                   <td>{item.quantity} </td>
                   <td>{item.delivery_date} </td>
                   <td>{item.total_price}</td>
                   <td> {item.created_at} </td>
                   </tr>
               </tbody>
                ))}
           </table>
   
    </div>
 
  )
}

export default Shipcont;