
const App = () => {
  
  const categories = [
    {
      id: 1,
      title: 'Hats',
    },

    {
      id: 1,
      title: 'Jackets',
    },

    {
      id: 1,
      title: 'Sneakers',
    },

    {
      id: 1,
      title: 'Womens',
    },

    {
      id: 1,
      title: 'Mens',
    },
  ]

  return (
    <div className="categories__container">
      {categories.map(({title}) => (
        <div className="categories__card">
        0.0
          <div className="categories__card__label">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>  
  )
};

export default App;
