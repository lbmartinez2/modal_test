import React from 'react';
import chevronRight from '../assets/chevron-right.png';
import ProductDropdown from './ProductDropdown';

const Dropdown = ({ suppliers, onSelect, products, updateSelectedCount, onProductAmountChange, focusedIndex, setFocusedIndex }) => {
  const getClassName = (index) => {
    return focusedIndex === index ? 'dropdown-item focused' : 'dropdown-item';
  };

  const handleMouseEnter = (index) => {
    setFocusedIndex(index); 
  };

  return products && products.length > 0 ? (
    <ProductDropdown
      products={products}
      updateSelectedCount={updateSelectedCount}
      onProductAmountChange={onProductAmountChange}
    />
  ) : (
    <div className="dropdown">
      {suppliers && suppliers.length > 0 ? (
        suppliers.map((supplier, index) => (
          <div
            key={supplier.id}
            className={getClassName(index)}
            onClick={() => onSelect(supplier)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {supplier.name}
            <img src={chevronRight} alt="Chevron Right" className="chevron-icon" />
          </div>
        ))
      ) : (
        <div className="dropdown-item">No results found</div>
      )}
    </div>
  );
};

export default Dropdown;
