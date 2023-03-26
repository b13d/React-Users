import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
// import Post from "./posts/[id]";

export default function Home({ postsSmall, postsBig }) {
  const [currentUrl, setUrl] = useState(undefined);
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState([true, true, true, true, true]);
  const [styleGif, setStyleGif] = useState({
    display: "none",
    justifyContent: "center",
  });

  function handleClickBtn(posts) {
    setStyleGif({
      display: "flex",
      justifyContent: "center",
    });

    let arrUsers = [];
    let tempArrUsers = [];

    if (posts.length > 50) {
      let temp = posts.length / 50;

      console.log(temp);
      console.log(posts.length);

      for (let j = 0; j < posts.length; j++) {
        tempArrUsers.push(posts[j]);

        if (tempArrUsers.length % 50 === 0 && j !== 0) {
          arrUsers.push(Array.from(tempArrUsers));
          tempArrUsers.length = 0;
        }
      }
      setListUsers(arrUsers);
      console.log(arrUsers);
    }

    if (arrUsers.length === 0) {
      setListUsers([])
      setTimeout(() => {
        setListUsers(posts);
      }, 100);
    }

    setUrl(arrUsers.length > 0 ? arrUsers : posts);
  }

  useEffect(() => {
    setStyleGif({
      display: "none",
      justifyContent: "center",
    });
  }, [listUsers]);

  console.log("Рендер");
  console.log(listUsers.length);
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
        <div style={styleGif}>
          <img className="gif-loading" src="./loaded.gif" />
        </div>
        <table className="table-users">
          <thead>
            <tr>
              <td>
                <a href="#" onClick={(e) => SortUser(e, "id", 0)}>
                  id {sortBy[0] === true ? "▼" : "▲"}
                </a>
              </td>
              <td colSpan="2">
                <a href="#" onClick={(e) => SortUser(e, "firstName", 1)}>
                  firstName {sortBy[1] === true ? "▼" : "▲"}
                </a>
              </td>
              <td colSpan="2">
                <a href="#" onClick={(e) => SortUser(e, "lastName", 2)}>
                  lastName {sortBy[2] === true ? "▼" : "▲"}
                </a>
              </td>
              <td colSpan="2">
                <a href="#" onClick={(e) => SortUser(e, "email", 3)}>
                  email {sortBy[3] === true ? "▼" : "▲"}
                </a>
              </td>
              <td colSpan="2">
                <a href="#" onClick={(e) => SortUser(e, "phone", 4)}>
                  phone {sortBy[4] === true ? "▼" : "▲"}
                </a>
              </td>
            </tr>
          </thead>
          <tbody>
            <DrawUsers />
          </tbody>
        </table>
        <NumbersPage />
      </div>
    </>
  );

  function SortUser(e, columnField, columnId) {
    let copyListUsers = Array.from(listUsers);
    let overSort = false;
    let counter = 0;
    let arr = [];

    setStyleGif({
      display: "flex",
      justifyContent: "center",
    });

    setSortBy((value) => {
      let arr = [];
      value.map((value, index) => {
        if (index === columnId) {
          arr.push(!value);
        } else arr.push(value);
      });

      return arr;
    });

    if (copyListUsers[0].length > 0) {
      let newListUsers = [];

      while (!overSort) {
        newListUsers.length = 0;
        counter = 0;

        for (let i = 0; i < copyListUsers.length; i++) {
          for (let j = 0; j < copyListUsers[i].length; j++) {
            if (
              sortBy[columnId] === true
                ? copyListUsers[i][j + 1] !== undefined &&
                  copyListUsers[i][j][columnField] >
                    copyListUsers[i][j + 1][columnField]
                : copyListUsers[i][j + 1] !== undefined &&
                  copyListUsers[i][j][columnField] <
                    copyListUsers[i][j + 1][columnField]
            ) {
              arr.push(copyListUsers[i][j + 1]);
              arr.push(copyListUsers[i][j]);
              j++;
              counter++;
            } else arr.push(copyListUsers[i][j]);
          }
          newListUsers.push(Array.from(arr));
          arr.length = 0;
        }
        if (counter === 0) {
          overSort = true;
          setListUsers(newListUsers);
        } else {
          copyListUsers = Array.from(newListUsers);
        }
      }
    } else if (copyListUsers.length > 0) {
      while (!overSort) {
        counter = 0;
        for (let i = 0; i < copyListUsers.length; i++) {
          if (
            sortBy[columnId] === true
              ? copyListUsers[i + 1] !== undefined &&
                copyListUsers[i][columnField] >
                  copyListUsers[i + 1][columnField]
              : copyListUsers[i + 1] !== undefined &&
                copyListUsers[i][columnField] <
                  copyListUsers[i + 1][columnField]
          ) {
            arr.push(copyListUsers[i + 1]);
            arr.push(copyListUsers[i]);
            i++;
            counter++;
          } else arr.push(copyListUsers[i]);
        }

        if (counter === 0) {
          overSort = true;
          setListUsers(arr);
        } else {
          copyListUsers = Array.from(arr);
          arr.length = 0;
        }
      }
    }
  }

  function handleClickPage(e, number) {
    e.preventDefault();
    setCurrentPage(number);
  }

  function NumbersPage() {
    let arr = [];
    if (listUsers.length > 0) {
      if (listUsers[0].length > 0) {
        for (let i = 0; i < listUsers.length; i++) {
          arr.push(
            <a key={i} href="#" onClick={(e) => handleClickPage(e, i)}>
              {i + 1}
            </a>
          );
        }
      }
    }

    return <div className="number-pages">{arr}</div>;
  }

  function DrawUsers() {
    console.log(listUsers);
    console.log("Рендеринг в мини функции");
    let arr = [];

    if (listUsers.length > 0) {
      if (listUsers[0].length > 0) {
        listUsers[currentPage].map((value, index) => {
          arr.push(
            <tr key={index}>
              <td>{value.id}</td>
              <td colSpan="2">{value.firstName}</td>
              <td colSpan="2">{value.lastName}</td>
              <td colSpan="2">{value.email}</td>
              <td colSpan="2">{value.phone}</td>
            </tr>
          );
        });
        // setTest(arr);
      } else {
        console.log("32");
        listUsers.map((value, index) => {
          arr.push(
            <tr key={index}>
              <td>{value.id}</td>
              <td colSpan="2">{value.firstName}</td>
              <td colSpan="2">{value.lastName}</td>
              <td colSpan="2">{value.email}</td>
              <td colSpan="2">{value.phone}</td>
            </tr>
          );
        });
      }

      return arr;
    }
  }
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
