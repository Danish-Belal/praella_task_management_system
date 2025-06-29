export const getBaseUrl = (): string => {
  const awsUrl = import.meta.env.VITE_AWS_API_URL;
  const renderUrl = import.meta.env.VITE_RENDER_API_URL;

  console.log("AWS URL", awsUrl);
  console.log("Render url",renderUrl);
  
  

  if (!awsUrl || !renderUrl) {
    throw new Error("Missing required environment variables");
  }

  const hostname = window.location.hostname;
  return hostname.includes('score-book.com') ? awsUrl : renderUrl;
};
