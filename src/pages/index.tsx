import { getPost } from "../lib/notions";

export default function Home({ posts }: any) {
  //   console.log("PST", posts);
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

/*
name: NOTION API TEST
on:
  push:
    branches:
      - main

      jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        run: |
          # Add your deployment commands here
          # For example, deploying to a hosting service or server
*/
