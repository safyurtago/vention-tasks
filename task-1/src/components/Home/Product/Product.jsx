import "../styles/style.css";
const Product = ({ name, price, image }) => {
  return (
    <div className="product">
      <div className="img-block">
        <img src={image} alt={name} />
      </div>
      <h3 className="name">{name}</h3>
      <p className="title">${price}</p>
      <button className="butt">Buy</button>
    </div>
  );
};

export default Product;
