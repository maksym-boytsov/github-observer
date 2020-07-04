export const githubFetcher = (url: string, username: string) =>
  fetch(url + username, {
    headers: {
      authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  }).then((r) => r.json());
