import { useEffect, useState } from 'react';

const useFetch = (url, type) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // I didn't want to get new data every time i rerender
    if (localStorage.getItem(`${type}`)) {
      setData(JSON.parse(localStorage.getItem(`${type}`)));
      setIsLoading(false);
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resourse');
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setError(null);

        // const { recipes } = data;
        // To get firstValue in an Object:
        const recipes = Object.values(data)[0];

        const requiredData = recipes.map((item) => {
          const { id, title, image } = item;
          return { id, title, image };
        });
        setData(requiredData);
        if (type) {
          localStorage.setItem(`${type}`, JSON.stringify(requiredData));
        }
      })
      .catch((err) => {
        setIsLoading(true);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
