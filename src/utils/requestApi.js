import axios from "axios";
const API_KEY = "CQI5lu9JTq63n18qKA9p0swV1JzSq8hXtMbf0U5whZ4";
const requestAPI = async (query, page) => {
  const perPage = 12;

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query,
        client_id: API_KEY,
        per_page: perPage,
        page,
        orientation: "landscape",
      },
    });

    const gallery = response.data.results.map((image) => ({
      id: image.id,
      description: image.description || image.alt_description,
      smallImage: image.urls.small,
      regularImage: image.urls.regular,
      likes: image.likes,
      author: image.user.name || "No author",
    }));
    const total = response.data.total;
    return { gallery, total };
  } catch (error) {
    throw error;
  }
};
export default requestAPI;