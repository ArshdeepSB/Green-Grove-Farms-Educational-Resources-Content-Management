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
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#eaf3f9',
    padding: '5px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '8px',
    width: '250px',
    fontSize: '16px',
    backgroundColor: 'transparent',
  },
  iconButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '5px',
  },
};

export default SearchBar;
