export enum GithubEndpoints {
  ORGANIZATIONS = '/orgs',
  USERS = '/users',
}

export const GITHUB_URL = 'https://api.github.com';

export const githubFetcher = async (endpoint: string): Promise<any> => {
  const requestInitialData = process.env.NEXT_PUBLIC_GITHUB_TOKEN
    ? {
        headers: {
          authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    : {};

  const response = await fetch(GITHUB_URL + endpoint, requestInitialData);
  return await response.json();
};
