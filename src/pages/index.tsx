import { getPost } from "../lib/notions";

export default function Home({ posts }: any) {
  if (!posts) return <h1>No posts</h1>;

  return (
    <div>
      {posts.map((item: any, idx: number) => {
        const { title, description, date, id } = item;
        return (
          <div
            key={idx}
            style={{
              border: "1px solid black",
              borderRadius: 8,
              padding: 10,
              margin: 10,
            }}
          >
            <h1>{title}</h1>
            <p>{description}</p>
            <p>created At : {date}</p>
            <p>post ID: {id}</p>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await getPost();

  return {
    props: {
      posts: data,
    },
  };
};
