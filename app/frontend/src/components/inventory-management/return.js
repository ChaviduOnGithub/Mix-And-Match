import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import './return.css';


const ClothesReturn = ({
  clothes,
  searchQuery,
  handleSearch,
  handleOpenAddModal,
  showAddModal,
  setShowAddModal,
  handleFormSubmit,
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
  handleImageUpload,
  showUpdateModal,
  setShowUpdateModal,
  selectedItemForDelete,
  handleCancelDelete,
  handleConfirmDelete,
  filteredClothes,
  handleOpenUpdateModal,
  handleOpenDeleteConfirmationModal,
  generateReportPDF,
  generateReport
}) => {
    return (
        <div className="container">
                    <div className="row">
                        {/* Current Date and Time */}
                        <div className="col-md-6 text-md-end mb-3">
                              
                        </div>
                    </div>
                    <h1>Manage Clothes</h1>
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
                        <Row className="mb-3">
                            <Col>
                                <Card className="cardGenarateRp">
                                    <Card.Body>
                                    <Card.Title>Generate Clothes Report</Card.Title>
                                    <Card.Text>Generate a detailed report of clothes by category and most purchased items.</Card.Text>
                                    <Button className="generateRp" onClick={generateReport}>Generate Report</Button>
                                    <Button className="downloadRp   " onClick={generateReportPDF}>Download PDF Report</Button>

                                    </Card.Body>
                                </Card>
                            </Col>
                            
                      
                        </Row>
                      

                    {/* Search input */}
                    <div>
                        <div className="search-container">
                            <div className="search-box d-flex">
                                <input type="text" className="form-control" placeholder="Search by Item Code" value={searchQuery} onChange={handleSearch} />
                            </div>
                        </div>
                        <div className="newClothes">
                              <button onClick={handleOpenAddModal} className="addNewClothes">Add New Clothes</button>
                        </div>
                    </div>

                      {/* Modal for adding new clothes */}
                      {/* Modal for adding new clothes */}
          <div className="modal" style={{ display: showAddModal ? 'block' : 'none' }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Add New Clothes</h5>
                          <button type="button" className="close" style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={() => setShowAddModal(false)}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <form onSubmit={handleFormSubmit}>
                              {error && <div className="alert alert-danger" role="alert">{error}</div>}
                              <div className="form-group">
                                  <label>Item Code</label>
                                  <input type="text" className="form-control" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Item Name</label>
                                  <input type="text" className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Category: F-Female M-Male</label>
                                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                      <option value="">Select One</option>
                                      <option value="F">F</option>
                                      <option value="M">M</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label>Price</label>
                                  <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Quantity</label>
                                  <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Alert Quantity</label>
                                  <input type="number" className="form-control" value={alertQuantity} onChange={(e) => setAlertQuantity(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Supplier ID</label>
                                  <input type="text" className="form-control" value={supplier_id} onChange={(e) => setSupplierId(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Upload Image</label>
                                  <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                              </div>
                              <button type="submit" className="btn btn-primary">Add Clothes</button>
                              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>

          {/* Modal for updating clothes */}
          <div className="modal" style={{ display: showUpdateModal ? 'block' : 'none' }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Update Clothes</h5>
                          <button type="button" className="close" style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={() => setShowUpdateModal(false)}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <form onSubmit={handleFormSubmit}>
                              {error && <div className="alert alert-danger" role="alert">{error}</div>}
                              <div className="form-group">
                                  <label>Item Code</label>
                                  <input type="text" className="form-control" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Item Name</label>
                                  <input type="text" className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Category: F-Female M-Male</label>
                                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                      <option value="">Select One</option>
                                      <option value="F">F</option>
                                      <option value="M">M</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label>Price</label>
                                  <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Quantity</label>
                                  <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Alert Quantity</label>
                                  <input type="number" className="form-control" value={alertQuantity} onChange={(e) => setAlertQuantity(e.target.value)} />
                              </div>
                              {/* <div className="form-group">
                                  <label>Supplier ID</label>
                                  <input type="text" className="form-control" value={supplier_id} onChange={(e) => setSupplierId(e.target.value)} />
                              </div> */}
                              <div className="form-group">
                                  <label>Upload Image</label>
                                  <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                              </div>
                              <button type="submit" className="btn btn-primary">Update Clothes</button>
                              <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Close</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>

          {/* Modal for delete confirmation*/}
      <div className="modal" style={{ display: selectedItemForDelete ? 'block' : 'none' }}>
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Confirm Delete</h5>
                      <button type="button" className="close" style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleCancelDelete}>
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                      <p>Are you sure you want to delete {selectedItemForDelete?.item_name}?</p>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                  </div>
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
                                            <div className="fw-light">Alert Quantity: {clothes.alert_quantity}</div>
                                            <div className="fw-light">Supplier ID: {clothes.supplier_id}</div>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        
                                            <Button className="cardUpdateBtn" variant="dark" size="sm" onClick={() => handleOpenUpdateModal(clothes)}>Update</Button>
                                            <Button className="cardDeleteBtn" variant="dark" size="sm" onClick={() => handleOpenDeleteConfirmationModal(clothes)}>Delete</Button>
                                        
                                    </Card.Footer>
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
    