import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

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
  supplierId,
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
                      <Row className="mb-3">
                          {/*<Col>
                              <Card className="h-100">
                                  <Card.Body>
                                      <Card.Title>Generate Report</Card.Title>
                                      <Card.Text>
                                          Generate a report about all customer details and loyalty points.
                                      </Card.Text>
                                      <Button className="btn btn-dark" onClick={generateReport}>Generate Report</Button>
                                  </Card.Body>
                              </Card>
                          </Col> */}
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">Total Items</h4>
                                      <div className="text-center my-auto">
                                          <h1 className="card-text">{clothes.length}</h1>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      
                      </Row>
                      

                      {/* Search input */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="flex-grow-1">
                              <input type="text" className="form-control" placeholder="Search by Item Code" value={searchQuery} onChange={handleSearch} />
                          </div>
                          <div>
                              <button onClick={handleOpenAddModal} className="btn btn-outline-success">Add New Clothes</button>
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
                                  <input type="text" className="form-control" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} />
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
                              <div className="form-group">
                                  <label>Supplier ID</label>
                                  <input type="text" className="form-control" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} />
                              </div>
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

                      {/* Clothes table */}
                      <table className="table">
                          <thead className="table-dark">
                              <tr>
                                  <th>#</th>
                                  <th>Item Code</th>
                                  <th>Item Name</th>
                                  <th>Category: F-Female M-Male</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Alert Quantity</th>
                                  <th>Supplier ID</th>
                                  <th>Image</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {filteredClothes.map((clothes, index) => (
                                  <tr key={clothes.item_code}>
                                      <td>{index + 1}</td>
                                      <td>{clothes.item_code}</td>
                                      <td>{clothes.item_name}</td>
                                      <td>{clothes.category}</td>
                                      <td>{clothes.price}</td>
                                      <td>{clothes.quantity}</td>
                                      <td>{clothes.alert_quantity}</td>
                                      <td>{clothes.supplier_id}</td>
                                      <td>
                                          {/* Display the image if it exists */}
                                          {clothes.imageUrl && (
                                              <img src={clothes.imageUrl} alt={clothes.item_name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                          )}
                                      </td>
                                      <td>
                                          <button className="btn btn-outline-primary me-2" onClick={() => handleOpenUpdateModal(clothes)}>Update</button>
                                          <button className="btn btn-outline-danger me-2" onClick={() => handleOpenDeleteConfirmationModal(clothes)}>Delete</button>
                                      </td>
                                      {/* Check if quantity is less than or equal to the alert quantity */}
                                      {clothes.quantity <= clothes.alert_quantity && (
                                          <td>
                                              <div className="alert alert-warning" role="alert">
                                                  Alert: Reorder this item!
                                              </div>
                                          </td>
                                      )}
                                  </tr>
                              ))}
                          </tbody>
                      </table>

                      <Row className="mb-3">
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
                          </Row>
                  </div>
            );
  };

  export default ClothesReturn;
    