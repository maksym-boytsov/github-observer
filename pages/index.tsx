import { NextPage, GetServerSideProps } from "next";
import { fetcher } from "../misc/constants";
import useSWR, { mutate } from "swr";
import { useState } from "react";

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

const URL = "https://api.github.com/users/mayicodefuture";

const Home: NextPage<{ initialData: GithubProfileData }> = ({
  initialData,
}) => {
  const { data } = useSWR(URL, fetcher, { initialData });

  const {
    login,
    avatar_url,
    name,
    bio,
    public_repos,
    followers,
    following,
    hireable,
  } = data;

  return (
    <main className="text-gray-500 bg-gray-900 body-font">
      <div className="container px-5 pt-10 md:pt-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="sm:w-1/2 text-center sm:pr-8 sm:py-8">
              <img
                alt="avatar"
                src={avatar_url}
                className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"
              />
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-white text-lg">
                  {name}
                </h2>
                <h4 className="mb-2">{login}</h4>
                <div className="w-12 h-1 bg-purple-500 rounded mt-2 mb-4"></div>
                <p className="text-sm text-gray-300">{bio || "No bio"}</p>
              </div>
            </div>
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
                <div className="ml-4">
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
                <div className="ml-4">
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
                <div className="ml-4">
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
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialData: GithubProfileData = await fetcher(
    "https://api.github.com/users/mayicodefuture"
  );

  return {
    props: { initialData },
  };
};

export default Home;
