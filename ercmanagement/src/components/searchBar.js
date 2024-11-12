import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by video or article name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.searchInput}
      />
      <button style={styles.iconButton}>
        <span role="img" aria-label="search">
          🔍
        </span>
      </button>
    </div>
  );
};

const styles = {
  };

export default SearchBar;
