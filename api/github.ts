export const githubAPI = {
  getUser: async (username: string): Promise<any> => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return await response.json();
  },
};
