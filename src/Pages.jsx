import React, { useState, useEffect } from "react";
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

export default function Pages(props) {
  const [listPages, setListPages] = useState([]); // переменная хранящая текущее кол-во записей пользователей
  const [currentUrl, setUrl] = useState("");

  props.url !== undefined ? setUrl(props.url) : ""
  
  console.log("aasdsa")
  let arrPages = [];

  const handleClickUser = (id) => {
    console.log("Нажали на пользователя: " + id);
  };

  useEffect(() => {
    if (currentUrl !== "") {
      setPages().then((data) => {
        let arr = [];

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
        }

        // console.log(arr);
        setListPages(arr);
      });
    }
  }, [currentUrl]);

  // console.log(listPages);

  return;

  {
    /* {ResultPages()}
      {listPages} */
  }
}

export function SmallUsers() {
  let url =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setPages(url);
  <Pages url="aaa"/>
  // setUrl(url);
  console.log("мало");
}

export function BigUsers() {
  let url =
    "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setPages(url);
  // setUrl(url);
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
// +------+------------+-----------------+-----------------+---------------+
// | id   | firstName  | lastName        | email           | phone         |
// +------+------------+-----------------+-----------------+---------------+
// +------+------------+-----------------+-----------------+---------------+
// | id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
// +------+------------+-----------------+-----------------+---------------+
