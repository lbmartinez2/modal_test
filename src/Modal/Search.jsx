import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import searchIcon from '../assets/search-icon.svg';

const Search = ({ suppliers, products, onSupplierSelect, isSupplierSelected, updateSelectedCount, onProductAmountChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [selectedSupplierProducts, setSelectedSupplierProducts] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  useEffect(() => {
    if (!isSupplierSelected) {
      setSearchTerm('');
      setFilteredSuppliers(suppliers);
      setSelectedSupplierProducts([]);
    }
  }, [isSupplierSelected, suppliers]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(term)
      )
    );
  };

  const handleSelect = (supplier) => {
    onSupplierSelect(supplier.name, supplier);
    const productsForSupplier = products.data.filter(product => product.supplierId === supplier.id);
    setSelectedSupplierProducts(productsForSupplier);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(filteredSuppliers.length - 1, prevIndex + 1)));
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(0, prevIndex - 1)));
    } else if (e.key === 'Enter' && focusedIndex !== null) {
      const selectedSupplier = filteredSuppliers[focusedIndex];
      handleSelect(selectedSupplier);
    }
  };

  const sortedSuppliers = filteredSuppliers.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="search-input-container">
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder={isSupplierSelected ? "Search products" : "Search supplier"}
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
      </div>

      <Dropdown
        suppliers={isSupplierSelected ? [] : sortedSuppliers}
        onSelect={handleSelect}
        products={selectedSupplierProducts}
        updateSelectedCount={updateSelectedCount}
        onProductAmountChange={onProductAmountChange}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
      />
    </>
  );
};

export default Search;
