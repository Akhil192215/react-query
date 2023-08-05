// components/Repositories.tsx

import React, { Fragment } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Repo = {
  id: number;
  name: string;
  clone_url: string;
};

const Repositories: React.FC = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<Repo[]>(
    ["repo"],
    () =>
      axios
        .get<Repo[]>("https://api.github.com/users/eunit99/repos")
        .then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const errorWithMessage = error as { message: string };
    return <div>An error has occurred: {errorWithMessage.message}</div>;
  }

  console.log(data);

  return (
    <>
      {data?.map((repo) => (
        <Fragment key={repo.id}>
          <ul>
            <li>
              <a href={repo.clone_url}>{repo.name}</a>
            </li>
          </ul>
        </Fragment>
      ))}
      <button type="button" onClick={refetch}>
        Fetch again
      </button>
    </>
  );
};

export default Repositories;
