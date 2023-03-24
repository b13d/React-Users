import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
// import Post from "./posts/[id]";

export default function Home({ postsSmall, postsBig }) {
  const [currentUrl, setUrl] = useState(undefined);

  function handleClickBtn(posts) {
    setUrl(posts);
  }

  console.log(currentUrl);
  return (
    <>
      <div>
        <div className="buttons">
          <button onClick={() => handleClickBtn(postsSmall)}>
            32 пользователя
          </button>
          <button onClick={() => handleClickBtn(postsBig)}>
            1000 пользователей
          </button>
        </div>

        <table className="table-users">
          <thead>
            <tr>
              <td>id</td>
              <td colSpan="2">firstName</td>
              <td colSpan="2">lastName</td>
              <td colSpan="2">email</td>
              <td colSpan="2">phone</td>
            </tr>
          </thead>
          <tbody>
            {currentUrl !== undefined
              ? currentUrl.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td colSpan="2">{user.firstName}</td>
                      <td colSpan="2">{user.lastName}</td>
                      <td colSpan="2">{user.email}</td>
                      <td colSpan="2">{user.phone}</td>
                    </tr>
                  );
                })
              : console.log("no")}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let res = await fetch(
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
  );
  const postsSmall = await res.json();
  res = await fetch(
    "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
  );
  const postsBig = await res.json();

  return {
    props: {
      postsSmall,
      postsBig,
    },
  };
}
