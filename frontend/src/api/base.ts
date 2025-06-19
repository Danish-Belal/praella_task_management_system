const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRequest = async (
  url: string,
  method: string = 'GET',
  data?: any,
  isMultipart: boolean = false
) => {
  const token = localStorage.getItem('token'); // ✅ Get token

  const headers: HeadersInit = {};

  // Set content-type header unless it's FormData
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = isMultipart ? data : JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}${url}`, config);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Something went wrong');
  }

  return res.json();
};

export default apiRequest;
