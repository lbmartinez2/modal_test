import React, { useState, useEffect } from "react";

const ProductDropdown = ({ products, updateSelectedCount, onProductAmountChange }) => {
  const [expandedProductIds, setExpandedProductIds] = useState({});
  const [selectedChildProducts, setSelectedChildProducts] = useState({});
  const [selectedMainProducts, setSelectedMainProducts] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProduct = (productId, event) => {
    event.stopPropagation();
    setExpandedProductIds((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));

    setSelectedMainProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const handleCheckboxChange = (productId, childId) => {
  setSelectedChildProducts((prevState) => {
    const isSelected = !prevState[productId]?.[childId]?.selected;
    const newChildProducts = {
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [childId]: {
          ...prevState[productId]?.[childId],
          selected: isSelected,
        },
      },
    };

    let newSelectedProducts = [...selectedProducts];
    const selectedChildProduct = products
      .find((product) => product.id === productId)
      .childProducts.find((child) => child.id === childId);

    if (isSelected) {
      newSelectedProducts.push(selectedChildProduct);
    } else {
      newSelectedProducts = newSelectedProducts.filter(
        (product) => product.id !== selectedChildProduct.id
      );
    }

    const newSelectedCount = newSelectedProducts.length;
    setSelectedCount(newSelectedCount);
    setSelectedProducts(newSelectedProducts);

    return newChildProducts;
  });
};

  const handleAmountChange = (productId, childId, value) => {
    setSelectedChildProducts((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [childId]: {
          ...prevState[productId]?.[childId],
          amount: value,
        },
      },
    }));

    onProductAmountChange(productId, childId, value);
  };

  useEffect(() => {
    updateSelectedCount(selectedCount, selectedProducts); 
  }, [selectedCount, updateSelectedCount, selectedProducts]);

  return (
    <div className="product-dropdown">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className={`product-dropdown-item ${selectedMainProducts[product.id] ? "selected" : ""}`}
            onClick={(e) => toggleProduct(product.id, e)}
          >
            <div className="product-main">
              <img src="#" className="product-img" />
              <span className="product-name">{product.name.toUpperCase()}</span>
              <img
                src="../src/assets/chevron-right.png"
                alt="Chevron Right"
                className="chevron-right-icon"
                style={{
                  transform: expandedProductIds[product.id] ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
              />
            </div>

            {expandedProductIds[product.id] && product.childProducts && product.childProducts.length > 0 && (
              <ul className="child-products">
                {product.childProducts.map((childProduct) => (
                  <li
                    key={childProduct.id}
                    className={`child-product ${selectedChildProducts[product.id]?.[childProduct.id]?.selected ? "selected" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChildProducts[product.id]?.[childProduct.id]?.selected || false}
                      onChange={() => handleCheckboxChange(product.id, childProduct.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="product-text">
                      <span>{childProduct.name}</span>
                      <span className="child-product-subtitle">
                        {`SKU: ${childProduct.sku.toUpperCase()}`}
                      </span>
                    </div>
                    <input
                      type="number"
                      className="product-amount"
                      value={selectedChildProducts[product.id]?.[childProduct.id]?.amount || 1}
                      disabled={!selectedChildProducts[product.id]?.[childProduct.id]?.selected}
                      onChange={(e) => handleAmountChange(product.id, childProduct.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div className="dropdown-item">No products found</div>
      )}
    </div>
  );
};

export default ProductDropdown;
