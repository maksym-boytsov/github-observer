export const githubFetcher = async (url: string, query: string) => {
  const requestInitialData = process.env.NEXT_PUBLIC_GITHUB_TOKEN
    ? {
        headers: {
          authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    : {};

  const response = await fetch(url + query, requestInitialData);
  return await response.json();
};

export const GITHUB_URL = "https://api.github.com";
