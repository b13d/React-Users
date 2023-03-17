import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pages.scss";

async function setPages(url) {
  // устанавливаю кол-во записей
  console.log("Устанавливаю записи");
  let arrPages = [];
  let temp = "";

  if (url !== undefined) {
    await fetch(url)
      .then((response) => response.json())
      .then((json) => (temp = json));

    return temp;
  }
}

function Pages(props) {
  const [listPages, setListPages] = useState([]); // переменная хранящая текущее кол-во записей пользователей
  const [currentUrl, setUrl] = useState("");
  const [numberPages, setNumberPages] = useState("");
  const [currentNumber, setNumberPage] = useState("");

  props.url !== undefined ? setUrl(props.url) : "";

  console.log("main component");
  console.log(currentNumber);

  let arrPages = [];

  const handleClickUser = (id) => {
    console.log("Нажали на пользователя: " + id);
  };

  useEffect(() => {
    if (currentUrl !== "") {
      setPages(currentUrl).then((data) => {
        let arr = [];
        let arrBig = [];

        for (let i = 0; i < data.length; i++) {
          arr.push(
            <div
              onClick={() => handleClickUser(data[i].id)}
              key={i}
              className="grid-main user"
            >
              <p className="tdUser">{data[i].id}</p>
              <p className="tdUser">
                {data[i].firstName.length > 10
                  ? data[i].firstName.substring(0, 10) + "..."
                  : data[i].firstName}
              </p>
              <p className="tdUser">
                {data[i].lastName.length > 10
                  ? data[i].lastName.substring(0, 10) + "..."
                  : data[i].lastName}
              </p>
              <p className="tdUser">
                {data[i].email.length > 20
                  ? data[i].email.substring(0, 20) + "..."
                  : data[i].email}
              </p>
              <p className="tdUser">{data[i].phone}</p>
            </div>
          );
          if (arr.length % 50 === 0 && arr.length > 0) {
            arrBig.push(arr.slice(0));
            arr.length = 0;
          }
        }

        console.log(arrBig);

        if (arrBig.length > 0) {
          let tempNumberPages = [];

          for (let i = 1; i <= arrBig.length; i++) {
            tempNumberPages.push(
              <Link key={i} onClick={() => handleClickNumberPage(i)} to="">
                {i}
              </Link>
            );
          }
          setNumberPages(tempNumberPages);
          setNumberPage((value) => {
            if (value === "") {
              return 0;
            }
          });
        }
        // console.log(arr);
        setListPages(arrBig.length > 0 ? arrBig : [arr]);
      });
    }
  }, [currentUrl]);

  // console.log(listPages);

  const handleClickNumberPage = (id) => {
    setNumberPage(id - 1);
  };

  console.log(listPages);
  console.log(listPages.length);
  // console.log(listPages[currentNumber]);
  return (
    <>
      <div className="chose">
        Выберите кол-во пользователей:
        <button
          onClick={() => SmallUsers(setUrl, setNumberPages, setNumberPage)}
          className="btn-chose"
        >
          32 пользователя
        </button>
        <button onClick={() => BigUsers(setUrl)} className="btn-chose">
          1000 пользователей
        </button>
      </div>
      {listPages.length > 1 ? listPages[currentNumber] : listPages}
      <div className="numbers-page">{numberPages}</div>
    </>
  );
}

export function SmallUsers(setUrl, setNumberPages, setNumberPage) {
  setNumberPages("");
  setNumberPage("");
  let url =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setUrl(url);
  console.log("мало");
}

export function BigUsers(setUrl) {
  let url =
    "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setUrl(url);
  console.log("много");
}

function ResultPages(props) {
  return (
    <>
      <h1 className="title-table-users">Список людей</h1>
      <div className="grid-main">
        <a className="grid-main__link" href="#">
          id
        </a>
        <a className="grid-main__link" href="#">
          firstName
        </a>
        <a className="grid-main__link" href="#">
          lastName
        </a>
        <a className="grid-main__link" href="#">
          Email
        </a>
        <a className="grid-main__link" href="#">
          Phone
        </a>
      </div>
    </>
  );
}

export default Pages;
// +------+------------+-----------------+-----------------+---------------+
// | id   | firstName  | lastName        | email           | phone         |
// +------+------------+-----------------+-----------------+---------------+
// +------+------------+-----------------+-----------------+---------------+
// | id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
// +------+------------+-----------------+-----------------+---------------+
