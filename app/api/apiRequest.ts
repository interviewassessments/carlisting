export const fetchAPIResponse = async (url: string, init: RequestInit) => {
  const response = await fetch(url, init);
  return await response.json();
};
