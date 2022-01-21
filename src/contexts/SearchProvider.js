import React, { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext([]);

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState(null);

  const contextValue = { keyword, setKeyword };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
