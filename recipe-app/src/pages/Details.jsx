import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Details = () => {
  const { id } = useParams();
  const [deatails, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&query=pasta`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, [id]);

  return (
    <div className="details">
      <div className="left-side">
        <h3>{deatails.title}</h3>
        <img src={deatails.image} alt={deatails.title} />
      </div>

      <div className="right-side">
        <div className="actions">
          <button
            onClick={() => setActiveTab('instructions')}
            className={activeTab === 'instructions' ? 'active' : ''}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={activeTab === 'ingredients' ? 'active' : ''}
          >
            Ingredients
          </button>
        </div>

        {activeTab === 'instructions' && (
          <div className="instructions">
            <p dangerouslySetInnerHTML={{ __html: deatails.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: deatails.instructions }}></p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <ul className="ingredients">
            {deatails.extendedIngredients.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Details;
