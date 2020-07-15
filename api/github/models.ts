export interface GithubProfileRes {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: false;
  name: null | string;
  company: null | string;
  blog: null | string;
  location: null | string;
  email: null;
  hireable: null;
  bio: null | string;
  twitter_username: null | string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubOrganizationRes {
  login: string;
  id: number;
  url: string;
  avatar_url: string;
  description: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  has_organization_projects: true;
  has_repository_projects: true;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}
