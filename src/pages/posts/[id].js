import Link from "next/link";

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  console.log(paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {


  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <>
      <div>
        <h1>id</h1>
        <p>{post.id}</p>
        <h1>Name</h1>
        <p>{post.name}</p>
        <h1>Email</h1>
        <p>{post.email}</p>
        <h1>Address</h1>
        <p>{post.address.street}</p>
        <p>{post.address.suite}</p>
        <p>{post.address.city}</p>
        <p>{post.address.zipcode}</p>

        <Link href='/'>Вернуться</Link>
      </div>
    </>
  );
}
