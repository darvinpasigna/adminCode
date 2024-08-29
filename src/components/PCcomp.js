import React, { useEffect, useState } from 'react';
import UniversalCode from '../CodeStorage/UniversalCode';
import '../App.css';
import axios from 'axios';

const PCcomp = () => {
  const { pc, produrl } = UniversalCode();
  const [pcArr, setPcArr] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateProd, setUpdateProd] = useState({
    id: "",  // Include ID in the state
    prod_name: "",
    prod_category: "",
    price: "",
    desc: "",
    stock: "",
    main_img: "",
    img1: "",
    img2: "",
    img3: ""
  });

  useEffect(() => {
    fetch(produrl)
      .then((response) => response.json())
      .then((data) => {
        const pcImg = data.data.filter(pc);
        if (data && Array.isArray(data.data)) {
          setPcArr(pcImg);
        } else {
          console.error("Expected an array but got:", data);
          setPcArr([]);
        }
      });
  }, [produrl, pc]);

  const openUpdateModal = (item) => {
    setUpdateProd(item); // Set the selected item in the state
    setShowUpdate(true);
  };

  const handleUpdate = () => {
    const getData = new FormData();
    Object.keys(updateProd).forEach((key) => {
      getData.append(key, updateProd[key]);
    });

    axios.post(`https://darvx.online/public/api/products/edit/${updateProd.id}`, getData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        return axios.get(produrl);
      })
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setPcArr(data.data);
          setUpdateProd({
            id: "",
            prod_name: "",
            prod_category: "",
            price: "",
            desc: "",
            stock: "",
            main_img: "",
            img1: "",
            img2: "",
            img3: ""
          });
        } else {
          console.error("Expected an array but got:", data);
        }
        alert('Successfully updated!');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProd((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='PCpage container'>
      {pcArr.length > 0 ? (
        pcArr.map((item, index) => (
          <div key={index} className="card">
            <img
              src={item.main_img}
              className="btn card-img-top"
              onClick={() => openUpdateModal(item)}
              alt="products"
              style={{ width: "100%", height: "250px" }}
            />
            <div className="card-body p-1">
              <p className="card-text m-0" style={{ fontSize: "11px" }}>{item.prod_name}</p>
              <p className="card-text m-0" style={{ fontSize: "11px" }}>&#8369;{item.price}</p>
              <p className="card-text m-0" style={{ fontSize: "11px" }}>Stocks: {item.stock}</p>
            </div>

            <div className='modal' style={{ display: showUpdate ? 'block' : 'none' }}>
              <div className='modal-dialog-lg modal-dialog-centered' style={{width: "1000px", margin: "auto"}} >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4>Update Product</h4>
                    <button type='button' className='btn-close' onClick={() => setShowUpdate(false)}></button>
                  </div>
                  <div className='modal-body'>
                    <form>
                      <div className='row'>
                        <div className='col-4'>
                        <label> Category:</label>
                      <input
                        className='form-control'
                        type="text"
                        name="prod_category"
                        value={updateProd.prod_category}
                        onChange={handleChange}
                      />
                      <label> Name of Product:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="prod_name"
                        value={updateProd.prod_name}
                        onChange={handleChange}
                      />
                      <label> Price:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="price"
                        value={updateProd.price}
                        onChange={handleChange}
                      />
                      <label> Stocks:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="stock"
                        value={updateProd.stock}
                        onChange={handleChange}
                      />
                      <label> Main Image:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="main_img"
                        value={updateProd.main_img}
                        onChange={handleChange}
                      />
                      <label> 1st Image:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="img1"
                        value={updateProd.img1}
                        onChange={handleChange}
                      />
                       <label> 2nd Image:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="img2"
                        value={updateProd.img2}
                        onChange={handleChange}
                      />
                       <label> 3rd Image:</label>
                      <input
                      className='form-control'
                        type="text"
                        name="img3"
                        value={updateProd.img3}
                        onChange={handleChange}
                      />
                        </div>
                        <div className='col-8'>
                        <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          id="desc"
                          rows="10"
                          style={{ height: "400px" }}
                          name="desc"
                          value={updateProd.desc}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                        </div>
                      </div>
                     
                      
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' onClick={() => setShowUpdate(false)}>Cancel</button>
                    <button type='button' className='success' onClick={() => { handleUpdate(); setShowUpdate(false); }}>Submit</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}

export default PCcomp;
