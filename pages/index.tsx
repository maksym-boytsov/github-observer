import { useEffect, useState } from "react";
import useSWR from "swr";
import { NextPage, GetServerSideProps } from "next";

import { githubFetcher } from "../misc/constants";
import Link from "next/link";

type GithubProfileData = {
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
};

const URL = "https://api.github.com/users/";

type HomeProps = {
  initialData: GithubProfileData;
  query: string;
};

console.log(process.env.NEXT_PUBLIC_GITHUB_TOKEN);

const Home: NextPage<HomeProps> = ({ initialData }) => {
  const [query, setQuery] = useState<string>("");

  const { data, mutate } = useSWR(
    [URL, query],
    (url, username) => githubFetcher(url, username),
    {
      initialData,
      revalidateOnFocus: false,
    }
  );

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ ...data });
  };

  const {
    login,
    avatar_url,
    name,
    bio,
    public_repos,
    followers,
    following,
    hireable,
    html_url,
  } = data;

  return (
    <>
      <header className="text-gray-500 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 496 512"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
            <span className="ml-3 text-xl">Github Observer</span>
          </a>

          <form
            onSubmit={handleSubmit}
            className="flex justify-center mt-2 md:mt-0"
          >
            <input
              className="w-40 sm:w-auto bg-gray-800 rounded text-white xl:mr-4 mr-2 border border-gray-700 focus:outline-none focus:border-purple-500 text-base py-2 px-4"
              placeholder="Github login..."
              onChange={handleSetQuery}
              value={query}
              type="text"
            />
            <button
              type="submit"
              className="flex-shrink-0 inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
            >
              Search
            </button>
          </form>

          <nav className="flex flex-wrap items-center text-base justify-center mt-6 md:mt-0">
            <Link href="/">
              <a className="hover:text-white">Profile</a>
            </Link>
          </nav>
        </div>
      </header>

      <main className="text-gray-500 bg-gray-900 body-font flex items-center justify-center">
        {!data.message || !data ? (
          <div className="container px-5 pb-10 flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="flex flex-col sm:flex-row">
                <a
                  href={html_url}
                  className="sm:w-1/2 text-center sm:pr-8 sm:py-8"
                >
                  {avatar_url ? (
                    <img
                      alt="avatar"
                      src={avatar_url}
                      className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"></div>
                  )}
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-white text-lg">
                      {name}
                    </h2>
                    <h4 className="mb-2">{login}</h4>
                    <div className="w-12 h-1 bg-purple-500 rounded mt-2 mb-4"></div>
                    <p className="text-sm text-gray-300">{bio || "No bio"}</p>
                  </div>
                </a>
                <div className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className="flex">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="fill-current text-white h-6 w-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4 text-left">
                      <h2 className="text-white text-lg title-font font-medium">
                        Public Repositories
                      </h2>
                      <p className="leading-relaxed text-purple-400">
                        {public_repos} repositories
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="fill-current text-white h-6 w-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4 text-left">
                      <h2 className="text-white text-lg title-font font-medium">
                        People
                      </h2>
                      <p className="leading-relaxed text-purple-400">
                        {followers} followers / {following} following
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="fill-current text-white h-6 w-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4 text-left">
                      <h2 className="text-white text-lg title-font font-medium">
                        Available for hire?
                      </h2>
                      <p className="leading-relaxed text-purple-400">
                        {hireable ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl">¯\_( ͡❛ ͜ʖ ͡❛)_/¯</h1>
        )}
      </main>

      <footer className="text-gray-500 bg-gray-800 body-font">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            © 2020 Maksym Boytsov —
            <a
              href="https://twitter.com/maxboytsov"
              rel="noopener noreferrer"
              className="text-gray-500 ml-1"
              target="_blank"
            >
              @maxboytsov
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/maksymboytsov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/maxboytsov/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-600"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/maxboytsov/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-600"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/maksym-boytsov/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-600"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialData: GithubProfileData = await githubFetcher(
    URL,
    "mayicodefuture"
  );

  return {
    props: { initialData },
  };
};

export default Home;
