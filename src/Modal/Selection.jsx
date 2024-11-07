function Selection({ selectedProducts = [], updateSelectedCount, productAmounts, onProductAmountChange }) {
  const handleRemove = (productId) => {
    if (!selectedProducts) return;
    const updatedProducts = selectedProducts.filter(product => product.id !== productId);
    updateSelectedCount(updatedProducts.length, updatedProducts);
  };

  const handleAmountChange = (productId, childId, value) => {
    if (value < 1) return;
    onProductAmountChange(productId, childId, value);
  };

  return (
    <div className="selection">
      {selectedProducts.length > 0 ? (
        selectedProducts.map((product, index) => (
          <div key={product.id} className="selected-product">
            <span className="product-index">{index + 1}</span>
            <img src="#" className="product-img" />
            <div className="product-info">
              <span>{product.name}</span>
              <span style={{color: "hsla(0, 0%, 48%, 1)"}}>{`SKU: ${product.sku.toUpperCase()}`}</span>
            </div>

            <input
              type="number"
              className="product-amount"
              value={productAmounts[product.id] || 1} 
              onChange={(e) => handleAmountChange(product.id, product.id, e.target.value)} 
            />

            <button
              onClick={() => handleRemove(product.id)}
              className="remove-product-btn"
            >
              <img src="../src/assets/trash-2.png" alt="Remove" />
            </button>
          </div>
        ))
      ) : (
        <div className="no-products">No products selected</div>
      )}
    </div>
  );
}

export default Selection;
