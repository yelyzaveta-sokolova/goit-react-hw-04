import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import SearchBar from "./SearchBar/SearchBar";
import requestAPI from "../utils/requestApi";
import "modern-normalize";

function App() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  const onSubmit = (searchTerm) => {
    if (searchTerm === query) return;
    setQuery(searchTerm);
    setPage(1);
    setGallery([]);
    setError(null);
  };

  useEffect(() => {
    if (query === "") return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const { gallery, total } = await requestAPI(query, page);

        if (gallery.length === 0) {
          setError("Images not found for this request. Please try again");
          return;
        }

        setGallery((prevImages) => [...prevImages, ...gallery]);
        setTotalImages(total);
      } catch (err) {
        setError(
          `Sorry, something was wrong with fetching images. Error: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const loadMoreImages = () => {
    if (gallery.length >= totalImages) return;
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {error && <ErrorMessage message={error} />}

      {gallery.length > 0 && (
        <ImageGallery imageCards={gallery} onImageClick={openModal} />
      )}

      {loading && <Loader />}

      {gallery.length > 0 && !loading && gallery.length < totalImages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.regularImage}
          altText="Selected large image"
          description={selectedImage.description}
          likes={selectedImage.likes}
          author={selectedImage.author}
        />
      )}
    </>
  );
}

export default App;