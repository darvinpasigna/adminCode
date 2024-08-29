import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const Dashcont = ({ setCountPending, showPending, setShowPending, 
    setShowShip, setShowCancel, countPending, 
    orderArr, setShowUser, userCount, setOrderArr,
    shipCount, CancelCount, setCancelCount, setShipCount }) => {
    const [showUpdate, setShowUpdate] = useState(null);
    const [errors, setErrors] = useState({});
    const [targetItem, setTargetItem] = useState(null);

    const validate = (item) => {
        let err = {};
        if (!item.delivery_date) {
            err.delivery_date = "Please select the expected date of delivery!";
        }
        if (!item.status) {
            err.status = "Status is required!";
        }
        return err;
    };

    const handleUpdateChange = (itemId, field, value) => {
        setOrderArr((prevArr) =>
            prevArr.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
            )
        );

        setErrors((prevErrors) => ({
            ...prevErrors,
            [itemId]: { ...prevErrors[itemId], [field]: undefined }
        }));
    };

    const handleUpdate = (e, itemId) => {
        e.preventDefault();
    
        const item = orderArr.find((item) => item.id === itemId);
        const validationErrors = validate(item);
        if (Object.keys(validationErrors).length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [itemId]: validationErrors
            }));
            return;
        }
    
      
        const currentItemId = itemId;
        setTargetItem(currentItemId);
    
        let getData = new FormData();
        getData.append('mode_of_payment', item.mode_of_payment);
        getData.append('prod_name', item.prod_name);
        getData.append('quantity', item.quantity);
        getData.append('desc', item.desc);
        getData.append('delivery_date', item.delivery_date);
        getData.append('total_price', item.total_price);
        getData.append('status', item.status);
        getData.append('main_img', item.main_img);
    
        axios({
            method: "POST",
            url: "https://darvx.online/public/api/ship/send",
            data: getData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => {
          
            if (currentItemId) {
                return axios.delete(`https://darvx.online/public/api/order/delete/${currentItemId}`);
            } else {
                throw new Error("Target item is not set");
            }
        })
        .then((response) => {
            if (response.data.status === 200) {
                setOrderArr((prevItems) => prevItems.filter(item => item.id !== currentItemId));
                setCountPending(prevCount => prevCount - 1);
                if (item.status === "Shipped"){
                    setShipCount(prevShiCount => prevShiCount + 1);
                    alert('Item successfully Shipped');
                    
                }else {
                    setCancelCount(prevCanclCount => prevCanclCount  + 1);
                    alert('Item successfully Canceled');
                    
                }
               
            } else {
                alert('Failed to delete item');
            }
        })
        .catch((error) => {
            console.error('Error details:', error.response || error.message || error);
            alert('There was an error processing your request.');
        })
        .finally(() => {
            setTargetItem(null);
        });
    };
    
    

    return (
        <div className='dashcont container' style={{ display: showPending ? 'block' : 'none' }}>
            <div className='row' id='content'>
                <div className='col-3'>
                    <button type='button' id='userbtn' onClick={() => { setShowUser(true); setShowPending(false); setShowShip(false); setShowCancel(false); }}>
                        No. of Registered Users <br /> {userCount}
                    </button>
                </div>
                <div className='col-3'>
                    <button type='button' id='pending' onClick={() => { setShowUser(false); setShowPending(true); setShowShip(false); setShowCancel(false); }}>
                        PENDING ORDERS <br /> {countPending}
                    </button>
                </div>
                <div className='col-3'>
                    <button type='button' id='ship' onClick={() => { setShowUser(false); setShowPending(false); setShowShip(true); setShowCancel(false); }}>
                        ONGOING SHIPMENT <br /> {shipCount}
                    </button>
                </div>
                <div className='col-3'>
                    <button type='button' id='ret' onClick={() => { setShowUser(false); setShowPending(false); setShowShip(false); setShowCancel(true); }}>
                        CANCELED ORDERS <br /> {CancelCount}
                    </button>
                </div>
            </div>

            {/* table */}
            <table className="table-responsive container mt-5" style={{ textAlign: "left" }}>
                <thead style={{ textAlign: "center" }}>
                    <tr>
                        <th colSpan={9} style={{ backgroundColor: "lightgrey" }}>PENDING ORDERS</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Name of Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date of Checkout</th>
                        <th scope="col">Date of Delivery</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Status</th>
                        <th></th>
                    </tr>
                </thead>
                {orderArr.map((item) => (
                    <tbody key={item.id} className="table-group-divider">
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.mode_of_payment}</td>
                            <td>{item.prod_name.substring(0, 15)}...</td>
                            <td>{item.quantity}</td>
                            <td> {item.created_at} </td>
                            <td>
                                <input
                                    type="date"
                                    value={item.delivery_date}
                                    onChange={(e) => handleUpdateChange(item.id, 'delivery_date', e.target.value)}
                                /> <br />
                                {errors[item.id]?.delivery_date && <span className='text-danger'>{errors[item.id].delivery_date}</span>}
                            </td>
                            <td>{item.total_price}</td>
                            <td>
                                <select
                                    name="status"
                                    id="status"
                                    value={item.status}
                                    onChange={(e) => handleUpdateChange(item.id, 'status', e.target.value)}
                                    required
                                >
                                    <option></option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Canceled">Canceled</option>
                                </select><br />
                                {errors[item.id]?.status && <span className='text-danger'>{errors[item.id].status}</span>}
                            </td>
                            <td>
                                <button
                                    style={{ fontSize: "13px" }}
                                    type='button'
                                    className='btn btn-success'
                                    onClick={() => setShowUpdate(item.id)}
                                >
                                    Update
                                </button>

                                {showUpdate === item.id && (
                                    <div className="modal" style={{ display: 'block' }}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" style={{ width: "25px" }}
                                                        onClick={() => setShowUpdate(null)}
                                                    ></button>
                                                </div>
                                                <div className="modal-body" style={{ textAlign: "center" }}>
                                                    <p>Are you sure you want to update?</p>
                                                </div>
                                                <div className="modal-footer d-flex">
                                                    <button style={{ width: "100px" }} type="button" className="btn btn-secondary" onClick={() => setShowUpdate(null)}>Cancel</button>
                                                    <button style={{ width: "100px" }} type="submit" className="btn btn-primary" onClick={(e) => { handleUpdate(e, item.id); setShowUpdate(null); }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
}

export default Dashcont;
