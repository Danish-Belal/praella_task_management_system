
export const getBaseUrl = (): string => {
  const hostname = window.location.hostname;

  if (hostname.includes('score-book.com')) {
    console.log(import.meta.env.VITE_AWS_API_URL);
    
    return import.meta.env.VITE_AWS_API_URL;
  }

  return import.meta.env.VITE_RENDER_API_URL;
};

getBaseUrl();
