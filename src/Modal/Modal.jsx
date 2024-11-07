import React, { useState, useEffect } from "react";
import Selection from "./Selection";
import Search from "./Search";
import suppliersData from "../assets/data/suppliers.json";
import productsData from "../assets/data/products.json";
import chevronLeftIcon from "../assets/chevron-left.png";

function Modal() {
  const [title, setTitle] = useState("Browse");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectionView, setIsSelectionView] = useState(false);
  const [productAmounts, setProductAmounts] = useState({});

  const handleSupplierSelect = (supplierName, supplier) => {
    setTitle(supplierName);
    setSelectedSupplier(supplier);
  };

  const handleBack = () => {
    setTitle("Browse");
    setSelectedSupplier(null);
    setIsSelectionView(false);
  };

  const updateSelectedCount = (count, products) => {
    setSelectedCount(count);
    setSelectedProducts(products);
  };

  const toggleSelectionView = () => {
    setIsSelectionView(!isSelectionView);
  };

  const handleProductAmountChange = (productId, childId, value) => {
    if (value < 1) return;
  
    setProductAmounts((prevAmounts) => {
      const updatedAmounts = { ...prevAmounts };
      const key = `${childId}`;
      updatedAmounts[key] = value;
      return updatedAmounts;
    });
  };
  

  return (
    <div className="modal-container">
      <div className="modal-header">
        {isSelectionView ? (
          <button className="back-btn" onClick={handleBack}>
            <img src={chevronLeftIcon} alt="Back" className="chevron-left-icon" />
          </button>
        ) : (
          selectedSupplier && (
            <button className="back-btn" onClick={handleBack}>
              <img src={chevronLeftIcon} alt="Back" className="chevron-left-icon" />
            </button>
          )
        )}
        <div className="modal-title">
          <span className="title">{isSelectionView ? "Selection" : title}</span>
          <button className="modal-close-btn btn">
            <img src="../src/assets/close-icon.png" alt="Close" />
          </button>
        </div>
      </div>

      <div className="modal-body">
        {isSelectionView ? (
          <Selection
            selectedProducts={selectedProducts}
            productAmounts={productAmounts}
            updateSelectedCount={updateSelectedCount}
            onProductAmountChange={handleProductAmountChange}
          />
        ) : (
          <Search
            suppliers={suppliersData}
            products={productsData}
            onSupplierSelect={handleSupplierSelect}
            isSupplierSelected={!!selectedSupplier}
            updateSelectedCount={updateSelectedCount}
            productAmounts={productAmounts}
            onProductAmountChange={handleProductAmountChange}
          />
        )}
      </div>

      <div className="modal-footer">
        {!isSelectionView && (
          <div
            className={`products-selected ${selectedCount > 0 ? "selected" : ""}`}
            onClick={toggleSelectionView}
          >
            {selectedCount} products selected
          </div>
        )}
        <div className="btn-grp">
          <button className="cancel">Cancel</button>
          <button className="add" disabled={selectedCount === 0}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
