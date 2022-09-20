import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    navigate(`/searched/${formData}`);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <FaSearch />
        <input
          type="text"
          placeholder="search"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
