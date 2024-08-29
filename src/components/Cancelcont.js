import React from 'react';


const Cancelcont = ({setShowShip, setShowPending, setShowCancel, 
    countPending, showCancel, setShowUser, userCount,
    shipCount, CancelCount, cancelArr }) => {

  return (
    <div className='dashcont container' style={{ display: showCancel ? 'block' : 'none', backgroundColor: "" }}>
    <div className='row' id='content'>
        <div className='col-3'>
                <button type='button' id='userbtn' onClick={() => {setShowUser(true); setShowPending(false); setShowShip(false); setShowCancel(false);}}>No. of Registered Users <br /> {userCount} </button>
        </div>
        <div className='col-3'>
            <button type='button' id='pending' onClick={() => {setShowUser(false); setShowPending(true); setShowShip(false); setShowCancel(false);}}>PENDING ORDERS <br /> {countPending} </button>
        </div>
        <div className='col-3'>
        <button type='button' id='ship' onClick={() => {setShowUser(false); setShowPending(false); setShowShip(true); setShowCancel(false);}}>ONGOING SHIPMENT <br /> {shipCount} </button>
        </div>
        <div className='col-3'>
        <button type='button' id='ret' onClick={() => {setShowUser(false); setShowPending(false); setShowShip(false); setShowCancel(true);}}>CANCELED ORDERS <br /> {CancelCount} </button>
        </div>
    </div>
  
    {/* table */}
   
               <table  className="table-responsive container mt-5" style={{textAlign: "left"}}>
               <thead style={{textAlign: "center"}}>
                        <tr>
                            <th colSpan={5} style={{backgroundColor: "lightgrey"}} >CANCELED ORDERS</th>
                        </tr>
                </thead>
               <thead>
                   <tr>
                   <th scope="col">Mode of Payment</th>
                   <th scope="col">Name of Product</th>
                   <th scope="col">Quantity</th>
                   <th scope="col">Total Price</th>
                   <th>Date Canceled</th>
                   </tr>
               </thead>
               {cancelArr.map((item, index) =>(
               <tbody key={index} className="table-group-divider">
                   <tr>
                   <td>{item.mode_of_payment}</td>
                   <td>{item.prod_name.substring(0, 20)}...</td>
                   <td>{item.quantity} </td>
                   <td>{item.total_price}</td>
                   <td>{item.created_at}</td>
                   </tr>
               </tbody>
               ))}
           </table>
    
    </div>
  )
}

export default Cancelcont;