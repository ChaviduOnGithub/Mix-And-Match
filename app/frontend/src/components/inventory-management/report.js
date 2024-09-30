import React from "react";

const Report = ({ clothes, totalQuantity }) => {
  return (
    <div>
      <h1>Clothes Stock Report</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Item Code</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Item Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {clothes.map((clothing, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>{clothing.item_code}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>{clothing.item_name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>{clothing.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Clothes Items: {clothes.length}</h3>
      <h3>Total Quantity: {totalQuantity}</h3>
      <div className="button-container">
        <button onClick={() => window.print()} className="btn btn-primary">
          Print
        </button>
        <button onClick={() => downloadCustomerReport()} className="btn btn-primary">
          Download PDF
        </button>
        <button onClick={() => window.close()} className="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  );
};

export default Report;