import css from "./ImageCard.module.css";

const ImageCard = ({ imageCard, onImageClick }) => {
  const { smallImage, regularImage, description, likes, author } = imageCard;
  const handleClick = () => {
    onImageClick({ regularImage, description, likes, author });
  };
  return (
    <div onClick={handleClick}>
      <img src={smallImage} alt={description} className={css.image} />
    </div>
  );
};

export default ImageCard;