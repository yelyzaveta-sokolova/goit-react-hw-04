import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ imageCards, onImageClick }) {
  return (
    <ul className={css.imageGallery}>
      {imageCards.map((item) => (
        <li key={item.id} className={css.galleryItem}>
          <ImageCard imageCard={item} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}