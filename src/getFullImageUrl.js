export const getFullImageUrl = (imagePath) => {
  const backendBaseUrl =
    import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  return `${backendBaseUrl}${imagePath}`;
};
