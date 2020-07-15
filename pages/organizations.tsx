import React, { useContext, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';

import { GithubOrganizationRes } from 'api/github/models';
import { GithubEndpoints, githubFetcher } from 'api/github';
import { GlobalContext } from 'store';
import { Avatar } from 'components/ui/Avatar';
import { RepositoriesIcon } from 'components/ui/Icons';
import { Anchor } from 'components/ui/Anchor';

const Organizations: NextPage<{ initialData: GithubOrganizationRes }> = ({ initialData }) => {
  const { query, shouldRevalidate, setShouldRevalidate } = useContext(GlobalContext);

  const { data, mutate } = useSWR(
    [`${GithubEndpoints.ORGANIZATIONS}/`, query],
    (url, username) => githubFetcher(url + username),
    {
      initialData,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (shouldRevalidate) {
      mutate({ ...data });
      setShouldRevalidate && setShouldRevalidate(false);
    }
  }, [data, setShouldRevalidate, mutate, shouldRevalidate]);

  const { login, description, avatar_url, public_repos, html_url, blog } = data;

  return (
    <>
      {data && !data.message ? (
        <div className="container px-5 py-10 sm:py-24 mx-auto">
          <div className="flex flex-col items-center text-center w-full mb-4">
            <Anchor href={html_url} isTargetBlank>
              <Avatar src={avatar_url} />
              <h1 className="sm:text-3xl text-2xl font-medium title-font my-4 text-white">{login}</h1>
            </Anchor>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{description || 'No description'}</p>
          </div>
          <div className="text-center mb-8">
            {blog ? (
              <Anchor href={blog} isTargetBlank utilityClasses="text-purple-400">
                {blog}
              </Anchor>
            ) : (
              'No website'
            )}
          </div>
          <div className="flex flex-wrap text-center justify-center items-center">
            <div className="flex flex-col items-center mx-auto border-2 border-gray-800 px-4 py-4 rounded-lg">
              <RepositoriesIcon size={10} />
              <Anchor
                href={`${html_url}?tab=repositories`}
                isTargetBlank
                utilityClasses="title-font block font-medium text-3xl text-purple-500"
              >
                {public_repos}
              </Anchor>
              <p className="leading-relaxed">Public Repositories</p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl">Nothing found</h1>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data: GithubOrganizationRes = await githubFetcher(`${GithubEndpoints.ORGANIZATIONS}/startupdevhouse`);

  return {
    props: { initialData: data },
  };
};

export default Organizations;
