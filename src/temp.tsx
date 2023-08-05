import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./http";

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = [
  {
    id: "1",
    title: "First Post",
  },
  {
    id: "2",
    title: "Second Post",
  },
  {
    id: "3",
    title: "Third Post",
  },
];

const a =async()=>{ const b =await getPosts()
  console.log(b);
 }

 a()

function App() {
  const queryClient = useQueryClient();
  const postQuery = useQuery<Post[]>({
    queryKey: ["post"],
    queryFn: () => Api(1000).then(() => [...posts]),
  });

  const newPostMutation = useMutation(
    (title: string) => {
      return Api(1000).then(() => {
        posts.push({ id: crypto.randomUUID(), title });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
      },
    }
  );
  console.log(posts);

  if (postQuery.isLoading) return <h2>Loading...</h2>;

  if (postQuery.isError) return <h2>{JSON.stringify(postQuery.error)}</h2>;

  return (
    <div>
      {postQuery.data.map((elm) => (
        <div key={elm.id}>
          <p>{elm.title}</p>
        </div>
      ))}
      <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("forth post")}>
        Add new post
      </button>
    </div>
  );
}

const Api = (delay: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), delay));
};

export default App;
