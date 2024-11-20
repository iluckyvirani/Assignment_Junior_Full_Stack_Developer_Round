/** @format */


// Debouncing
export const debouncedSetQuery = ({ term, setSearch }) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setSearch(term);
  }, 500);
};


