import './SearchBar.css';

function SearchBar({searchInput,setSearchInput, placeholder}) {
    return (
        <div className="search-bar-main-container">
            <input 
                type="text"
                key="random1"
                value={searchInput}
                placeholder={placeholder}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
}

export default SearchBar