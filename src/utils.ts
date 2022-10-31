const fetchPost = async <TRequest, TResponse>(
  url: string,
  request: TRequest,
): Promise<TResponse> => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then((response) => response.json());
};

export { fetchPost };
