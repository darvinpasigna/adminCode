import React, { useState } from 'react';
import axios from 'axios';
import ErrorValidation from './ErrorValidation';
import UniversalCode from '../CodeStorage/UniversalCode';

const AddProdComp = () => {
    const {produrl} = UniversalCode();
    const [arr, setArr] = useState([]);
    const [errors, setErrors] = useState({});
    const [addProd, setAddProd] = useState ({
        prod_category:"", prod_name:"",
        price:"", desc:"", stock:"", main_img:"",
        img1:"", img2:"", img3:""
    });
    const handleAddProd = (e) => {
        e.preventDefault();
        const validationErrors = ErrorValidation(addProd);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            let getData = new FormData();
            getData.append('prod_category', addProd.prod_category);
            getData.append('prod_name', addProd.prod_name);
            getData.append('price', addProd.price);
            getData.append('desc', addProd.desc);
            getData.append('stock', addProd.stock);
            getData.append('main_img', addProd.main_img);
            getData.append('img1', addProd.img1);
            getData.append('img2', addProd.img2);
            getData.append('img3', addProd.img3);

            axios.post("https://darvx.online/public/api/products/addprod", getData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(() => {
                // Fetch the updated product list after a successful POST
                return axios.get(produrl);
            })
            .then((response) => {
                const data = response.data;
                if (data && Array.isArray(data.data)) {
                    setArr(data.data);
                    setAddProd({
                        prod_category: "",
                        prod_name: "",
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
                alert('Successfully added!');
            })
        }
    };

    const handleAddProdChange = (field, value) => {
        setAddProd(prevState => ({
            ...prevState,
            [field]: value
        }));
    };


  return (
  
       <div className='container'>
             <form className='p-5' onSubmit={handleAddProd}>
                    <div className='d-flex'>
                            <div className='row' style={{width: "100%"}}>
                                    <div className='col-4'>
                                        <select
                                        name='prod_category' 
                                        id='prod_category'
                                        className="form-select mb-2" 
                                        aria-label="Default select example"
                                        onChange={(e) => handleAddProdChange('prod_category', e.target.value)}
                                        >
                                            <option selected>Category</option>
                                            <option value="PC">PC</option>
                                            <option value="Smart Phone">Smart Phone</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="COnsole Game">Console Game</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="advertise">Advertise</option>
                                        </select>{errors.prod_category && <span className='text-danger'>{errors.prod_category}</span>}

                                        <div className="form-floating mb-3">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="prod_name"
                                            name='prod_name'
                                            value={addProd.prod_name}
                                            onChange={(e) => handleAddProdChange('prod_name', e.target.value)} />
                                            <label for="name">Name of Item:</label>
                                        </div>{errors.prod_name && <span className='text-danger'>{errors.prod_name}</span>}

                                        <div className="form-floating mb-3">
                                            <input 
                                            type="number" 
                                            className="form-control" 
                                            id="price"
                                            name='price'
                                            value={addProd.price}
                                            onChange={(e) => handleAddProdChange('price', e.target.value)} />
                                            <label for="price">Price:</label>
                                        </div>{errors.price && <span className='text-danger'>{errors.price}</span>}

                                        <div className="form-floating mb-3">
                                            <input 
                                            type="number" 
                                            className="form-control"
                                            id="stock"
                                            name='stock'
                                            value={addProd.stock}
                                            onChange={(e) => handleAddProdChange('stock', e.target.value)} />
                                            <label for="stock">Stock:</label>
                                        </div>{errors.stock && <span className='text-danger'>{errors.stock}</span>}

                                        <h4>For image address only</h4>
                                        <div className="form-floating mb-3">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="main_img"
                                            name='main_img'
                                            value={addProd.main_img}
                                            onChange={(e) => handleAddProdChange('main_img', e.target.value)} />
                                            <label for="main_img">Main Image:</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="img1"
                                            name='img1'
                                            value={addProd.img1}
                                            onChange={(e) => handleAddProdChange('img1', e.target.value)} />
                                            <label for="img1">1st Image:</label>
                                        </div>{errors.img1 && <span className='text-danger'>{errors.img1}</span>}

                                        <div className="form-floating mb-3">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="img2"
                                            name='img2'
                                            value={addProd.img2}
                                            onChange={(e) => handleAddProdChange('img2', e.target.value)} />
                                            <label for="img2">2nd Image:</label>
                                        </div>{errors.img2 && <span className='text-danger'>{errors.img2}</span>}

                                        <div className="form-floating mb-3">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="img3"
                                            name='img3'
                                            value={addProd.img3}
                                            onChange={(e) => handleAddProdChange('img3', e.target.value)} />
                                            <label for="img2">3rd Image:</label>
                                        </div>{errors.img3 && <span className='text-danger'>{errors.img3}</span>}
                                </div>
                            
                                <div className='col-8'>
                                        <div className="form-floating mb-3">
                                        <textarea 
                                        className="form-control" 
                                        id="desc" 
                                        rows="10" 
                                        style={{height: "400px"}}
                                        name='desc'
                                        value={addProd.desc}
                                        onChange={(e) => handleAddProdChange('desc', e.target.value)}></textarea>
                                        <label for="desc" className="form-label">Description:</label>
                                        </div>{errors.desc && <span className='text-danger'>{errors.desc}</span>}
                                        <br /> <br />
                                        <p style={{color: "red", fontStyle: "italic"}}>Please review all the details and make sure they are correct before submitting.</p>
                                        <button type='submit' className='btn btn-success'>Submit</button>
                                </div>
                            </div>
                    </div>
           
        </form>
       </div>
   
  )
}

export default AddProdComp;