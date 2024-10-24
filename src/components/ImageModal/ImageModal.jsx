import Modal from "react-modal";
import { useEffect } from "react";
import css from "./ImageModal.module.css";
import { FaHeart, FaPen } from 'react-icons/fa'; 


Modal.setAppElement("#root");

const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  altText,
  description,
  likes,
  author,
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  className={css.modal}
  overlayClassName={css.overlay}
  onClick={onBackdropClick}
>
  <div className={css.modalWrapper}>
    <img src={imageUrl} alt={altText} className={css.image} />
    <div className={css.imageDescrWrap}>
      <p className={css.imageDesc}><FaHeart /> {likes}</p> 
      <p className={css.imageDesc}><FaPen /> {author}</p> 
      <p className={css.imageDesc}>Description: {description}</p> 
    </div>
  </div>
</Modal>

  );
};

export default ImageModal;