import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import './returnHome.css';


const ClothesReturn = ({
  clothes,
  searchQuery,
  handleSearch,
  error,
  itemCode,
  setItemCode,
  itemName,
  setItemName,
  category,
  setCategory,
  price,
  setPrice,
  quantity,
  setQuantity,
  alertQuantity,
  setAlertQuantity,
  supplier_id,
  setSupplierId,
  filteredClothes,
}) => {
    return (
        <div className="container">
                    <div className="row">
                        {/* Current Date and Time */}
                        <div className="col-md-6 text-md-end mb-3">
                              
                        </div>
                    </div>
                    <h1>Home</h1>
                        <Row className="mb-3">
                            
                            <div className="col-md-4">
                              <div className="cardTotal">
                                  <div className="card-body-total">
                                      <h2 className="card-title-total">Total Items</h2>
                                      <div className="text-center my-auto">
                                          <h1 className="card-text-total">{clothes.length}</h1>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      
                        </Row>
                      

                    {/* Search input */}
                    <div>
                        <div className="search-container">
                            <div className="search-box d-flex">
                                <input type="text" className="form-control" placeholder="Search by Item Code" value={searchQuery} onChange={handleSearch} />
                            </div>
                        </div>
                    </div>

        {/* Card for display items*/}
      <div className="cardSection">
            <Row xs={1} sm={2} md={3} className="g-4 mt-4">
                        {filteredClothes.map((clothes) => (
                            <Col key={clothes.item_code}>
                                <Card className="cardItems">
                                    <Card.Body>
                                        <Card.Title className="text-center">{clothes.item_name}</Card.Title>
                                        <div className="text-center">
                                            {clothes.imageUrl && (
                                                <img src={`http://localhost:8070${clothes.imageUrl}`} alt={clothes.item_name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                            )}
                                        </div>
                                        <Card.Text>
                                            <div className="fw-light">Item Code: {clothes.item_code}</div>
                                            <div className="fw-light">Category: {clothes.category}</div>
                                            <div className="fw-light">Price: {clothes.price}</div>
                                            <div className="fw-light">Quantity: {clothes.quantity}</div>
                                        </Card.Text>
                                    </Card.Body>
                                    
                                </Card>
                            </Col>
                        ))}
                    </Row>
            </div>

                      

                      {/* <Row className="mb-3">
                          <Col>
                              <Card className="h-100">
                                  <Card.Body>
                                      <Card.Title>Clothes Quantity Chart</Card.Title>
                                      <Card.Text>
                                          Track the quantity of clothes over time.
                                      </Card.Text>
                                      <canvas id="canvas-1"></canvas>
                                  </Card.Body>
                              </Card>
                          </Col>
                          </Row> */}
                  </div>
            );
  };

  export default ClothesReturn;
    