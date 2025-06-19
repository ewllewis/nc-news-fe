import "./styles/SearchBar.css";

function SearchBar({ setSearchParams, sort_by, order }) {
  const handleSortChange = (e) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort_by", e.target.value);
      return newParams;
    });
  };

  const handleOrderChange = (e) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("order", e.target.value);
      return newParams;
    });
  };
  return (
    <div className="sort-controls">
      <label>
        <div className="sort-label">Sort by:</div>
        <select value={sort_by} onChange={handleSortChange}>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>
      </label>

      <label>
        <div className="sort-label">Order:</div>
        <select value={order} onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
