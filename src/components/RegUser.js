import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

const RegUser = ({ setShowPending, setShowShip, setShowCancel, 
    countPending, setShowUser, showUser, userArr, userCount, 
    setUsercount, setUserArr, shipCount, CancelCount }) => {
    const [showDel, setShowDel] = useState(false);
    const [targetUser, setTargetUser] = useState(null);

    const handleDelete = () => {
        if (targetUser !== null) {
            axios.delete(`https://darvx.online/public/api/customers/delete/${targetUser}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setUserArr((prevItems) => prevItems.filter(item => item.custom_id !== targetUser));
                        alert('User successfully deleted');
                        setUsercount(prevCount => prevCount - 1);
                    } else {
                        alert('Failed to delete user');
                    }
                })
                .finally(() => {
                    setShowDel(false);
                    setTargetUser(null);
                });
        }
    };

    const handleShowDeleteModal = (userId) => {
        setTargetUser(userId);
        setShowDel(true);
    };

    return (
        <div className='dashcont container' style={{ display: showUser ? 'block' : 'none'}}>
            <div className='row' id='content'>
                <div className='col-3'>
                    <button type='button' id='userbtn' onClick={() => { setShowUser(true); setShowPending(false); setShowShip(false); setShowCancel(false); }}>No. of Registered Users <br /> {userCount}  </button>
                </div>
                <div className='col-3'>
                    <button type='button' id='pending' onClick={() => { setShowUser(false); setShowPending(true); setShowShip(false); setShowCancel(false); }}>PENDING ORDERS <br /> {countPending} </button>
                </div>
                <div className='col-3'>
                    <button type='button' id='ship' onClick={() => { setShowUser(false); setShowPending(false); setShowShip(true); setShowCancel(false); }}>ONGOING SHIPMENT <br />{shipCount}</button>
                </div>
                <div className='col-3'>
                    <button type='button' id='ret' onClick={() => { setShowUser(false); setShowPending(false); setShowShip(false); setShowCancel(true); }}>CANCELED ORDERS <br /> {CancelCount} </button>
                </div>
            </div>

            <table className="table-responsive container mt-5" style={{textAlign: "left" }}>
                <thead style={{textAlign: "center"}}>
                    <tr>
                        <th colSpan={7} style={{backgroundColor: "lightgrey"}} >REGISTERED USERS</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Email Address</th>
                        <th>Address</th>
                        <th>Date Registered</th>
                        <th></th>
                    </tr>
                </thead>
                {userArr.map((item, index) => (
                    <tbody key={index} className="table-group-divider">
                        <tr>
                            <td>{item.custom_id}</td>
                            <td>{item.fname} {item.lname} </td>
                            <td>{item.contact}</td>
                            <td>{item.email}</td>
                            <td> {item.city} {item.province} </td>
                            <td>{item.created_at}</td>
                            <td>
                            <button
                                    type='button'
                                    className='btn btn-danger'
                                    onClick={() => handleShowDeleteModal(item.custom_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <Modal show={showDel} onHide={() => setShowDel(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this user {targetUser}?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDel(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </tbody>
                    
                ))}
            </table>

          
        </div>
    );
};

export default RegUser;
