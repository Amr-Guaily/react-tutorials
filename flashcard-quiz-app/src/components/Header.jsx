import { useEffect, useState } from 'react';

const Header = ({ childToParent }) => {
  const [categories, setCategories] = useState([]);
  const [fromData, setFormData] = useState({
    category: 0,
    amount: 5,
  });

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        const { trivia_categories } = data;
        setCategories(trivia_categories);
      });
  }, []);

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function fetchData(e) {
    e.preventDefault();
    childToParent(fromData);
  }

  return (
    <div className="header">
      <form onSubmit={fetchData}>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" onChange={changeHandler}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="1"
            step="1"
            defaultValue={5}
            onChange={changeHandler}
          />
        </div>

        <div className="form-control">
          <button className="btn">Generate</button>
        </div>
      </form>
    </div>
  );
};

export default Header;
