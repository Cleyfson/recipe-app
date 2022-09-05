import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <div className='detail'>
      <div className='detail__recipe'>
        <h2 className='title'>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <div className='detail__info'>
        <button
          className={
            activeTab === 'instructions'
              ? 'detail__button active'
              : 'detail__button'
          }
          onClick={() => setActiveTab('instructions')}>
          Instructions
        </button>
        <button
          className={
            activeTab === 'ingridients'
              ? 'detail__button active'
              : 'detail__button'
          }
          onClick={() => setActiveTab('ingridients')}>
          Ingredients
        </button>
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
        </div>
      </div>
    </div>
  );
};

export default Recipe;