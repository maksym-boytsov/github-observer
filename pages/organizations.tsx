import React, { useContext, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { githubFetcher, GITHUB_URL } from "../misc/constants";
import { GlobalContext } from "../store";
import useSWR from "swr";

type GithubOrganizationData = {
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
};

const Organizations: NextPage<{ initialData: GithubOrganizationData }> = ({
  initialData,
}) => {
  const { query, shouldRevalidate, setShouldRevalidate } = useContext(
    GlobalContext
  );

  const { data, mutate } = useSWR(
    [`${GITHUB_URL}/orgs/`, query],
    (url, username) => githubFetcher(url, username),
    {
      initialData,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (shouldRevalidate) {
      mutate({ ...data });
      setShouldRevalidate(false);
    }
  }, [shouldRevalidate]);

  const {
    login,
    name,
    description,
    avatar_url,
    bio,
    public_repos,
    followers,
    following,
    hireable,
    html_url,
    blog,
  } = data;
  return (
    <main className="text-gray-500 bg-gray-900 body-font flex items-center justify-center">
      {data && !data.message ? (
        <div className="container px-5 py-10 sm:py-24 mx-auto">
          <div className="flex flex-col items-center text-center w-full mb-4">
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              <img
                alt="organization avatar"
                src={avatar_url}
                className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"
              />
              <h1 className="sm:text-3xl text-2xl font-medium title-font my-4 text-white">
                {login}
              </h1>
            </a>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {description || "No description"}
            </p>
          </div>
          <div className="text-center mb-8">
            {blog ? (
              <a
                href={blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 text-center"
              >
                {blog}
              </a>
            ) : (
              "No website"
            )}
          </div>
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4">
              <div className="border-2 border-gray-800 px-4 py-4 rounded-lg">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="text-white w-10 h-10 mb-2 inline-block fill-current"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                  ></path>
                </svg>
                <a
                  href={`${html_url}?tab=repositories`}
                  className="title-font block font-medium text-3xl text-purple-500"
                >
                  {public_repos}
                </a>
                <p className="leading-relaxed">Public Repositories</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl">¯\_( ͡❛ ͜ʖ ͡❛)_/¯</h1>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: GithubOrganizationData = await githubFetcher(
    `${GITHUB_URL}/orgs/`,
    "startupdevhouse"
  );

  return {
    props: { initialData: data },
  };
};

export default Organizations;
