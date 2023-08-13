import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ImageUploadWithArray = () => {
  
  const [formData, setFormData] = useState({ 
    selectedImage: null, 
    title: '',
    cost:'',
    quantity:1
     });

     const [imageArray, setImageArray] = useState([]);
  
     const [show, setShow] = useState(false);
     const [showTable, setShowTable] = useState(false);
     const handleShow = () => setShow(true);
     const handleClose = () => setShow(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, selectedImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleQuantityChange = (index, change) => {
    const newArray = [...imageArray];
    console.log(index)
    const newQuantity = newArray[index].quantity + change;
  

    if (newQuantity >= 1) {
      newArray[index].quantity = newQuantity;
      setImageArray(newArray);
    }
  };
  const handleDeleteItem = (index) => {
    const newArray = [...imageArray];
    newArray.splice(index, 1);
    setImageArray(newArray);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (formData.selectedImage && formData.title) {
      const newItem = { image: formData.selectedImage ,title: formData.title, cost: formData.cost , quantity: formData.quantity };
      setImageArray([...imageArray, newItem]);
      setFormData({ selectedImage: null, title: '', cost:'' , quantity: 1 });
      setShowTable(true);
    }
  };

  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    const total = imageArray.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    setOverallTotal(total);
  }, [imageArray]);


  return (


    <div>
      <div class="shadow-lg  rounded">
      <Navbar bg="primary" data-bs-theme="white">
        <Navbar.Brand href="#home" className="text-light">
        CHAITRALI STORE
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button variant="light" onClick={handleShow}> <ShoppingCartIcon/> Add To Cart</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleFormSubmit}>
        <input type="file" className='form-control form-group' accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className='form-control form-group'
        />

        <input
          type="number"
          name="cost"
          placeholder="cost"
          value={formData.cost}
          onChange={handleInputChange}
          className='form-control form-group'
        />
        <button type="submit" className="form-group btn btn-primary">Upload and Add</button>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          </Modal.Footer>
          </Modal>



    <div>
    <div className='container pl-5 responsive'>
    <div className="row text-center mt-5">
        <div className='row'>
        {imageArray.map((item, index) => (
        <div  className=' shadow col-sm-3 text mr-5' style={{width: "18rem"}} key={index}>
            <img src={item.image} alt={item.title} className='pt-2' style={{width:"260px"}} />
            <h3>{item.title}</h3>
            <p>{item.cost} RS</p>
            <button className='btn btn-primary mr-3 mb-3'  onClick={() => handleQuantityChange(index, -1)}>-</button>
            <span>{item.quantity}</span>
            <button  className='btn btn-primary ml-3 mb-3' onClick={() => handleQuantityChange(index, 1)}>+</button>
        </div>
      ))}
        </div>
     
    </div>
          

    <h2 className='mt-5'>MY SHOPPING BAG</h2>
    {showTable ?<table className="table table-bordered ">
    
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Cost</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th> 
      <th scope="col">Delete</th>
      
    </tr>
  </thead>
  <tbody>
  
    {imageArray.map((item, index) => (
      <tr >
        <td><img src={item.image} alt={item.title} style={{ width: "50px" }} /></td>
        <td>{item.title}</td>
        <td>{item.cost}</td>
        <td>{item.quantity}</td>
        <td>{item.cost * item.quantity}</td>
       
        <td>
          <button className='btn btn-danger' onClick={() => handleDeleteItem(index)}><DeleteIcon/></button>
        </td> 
       
        
        </tr>
        
     
      
    ))}
  </tbody>
  <tr>
              <td colSpan="4" className="text-right font-weight-bold">Overall Total:</td>
             
              <td>{overallTotal} RS</td>
        </tr>
</table>:null}



    </div>

    </div>
    </div>
    
  );
};

export default ImageUploadWithArray;
