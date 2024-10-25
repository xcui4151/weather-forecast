import React, { useState } from 'react';

interface SearchProps {
  onSearch: (location: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>('');

  const handleSearch = () => {
    if (location !== '') {
      onSearch(location);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
