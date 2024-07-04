type FetchOptions = {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
};

export async function fetchWrapper(url: string, options: FetchOptions = {}) {
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body
  });

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response;
}
