import React, { useEffect, useRef, useState } from "react";
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
  const [classGif, setClassGif] = useState({
    width: 120 + "px",
    display: "none",
  });
  const [shiftState, setShiftState] = useState(true);

  const refId = useRef("");
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
              onClick={() => handleClickUser(i)}
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
        setUrl("");
        setListPages(arrBig.length > 0 ? arrBig : arr);
      });
    }
  }, [currentUrl]);

  useEffect(() => {
    if (listPages.length > 0) {
      setClassGif({
        width: 120 + "px",
        display: "none",
      });
    }
  }, [listPages]);
  // console.log(listPages);

  const handleClickNumberPage = (id) => {
    setNumberPage(id - 1);
  };

  // console.log(listPages);
  // console.log(listPages.length);
  // console.log(listPages[currentNumber]);

  async function handleClickColumn(e, idColumn) {
    let counter = 0;
    let shift = true;
    const arr = [];
    let oldArr = listPages;
    let arrStack = [];
    let arrAll = [];

    let temp = "";

    if (idColumn === 0) {
      temp = e.target.innerHTML === "id ▼" ? "id ▲" : "id ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === 1) {
      let temp =
        e.target.innerHTML === "firstName ▼" ? "firstName ▲" : "firstName ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === 2) {
      let temp =
        e.target.innerHTML === "lastName ▼" ? "lastName ▲" : "lastName ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === 3) {
      let temp = e.target.innerHTML === "email ▼" ? "email ▲" : "email ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === 4) {
      let temp = e.target.innerHTML === "phone ▼" ? "phone ▲" : "phone ▼";
      e.target.innerHTML = temp;
    }

    // while (shift) {
    // цикл для возрастания / убывания

    // console.log(currentNumber);

    if (oldArr[0].length !== undefined) {
      let variableArr = oldArr;

      for (let j = 0; j < oldArr.length; j++) {
        for (let i = 0; i < variableArr[j].length; i++) {
          if (shiftState) {
            if (
              variableArr[j][i + 1] !== undefined &&
              variableArr[j][i].props.children[idColumn].props.children >
                variableArr[j][i + 1].props.children[idColumn].props.children
            ) {
              arr.push(variableArr[j][i + 1]);
              arr.push(variableArr[j][i]);
              counter++;
              i++;
            } else arr.push(variableArr[j][i]);
          } else {
            if (
              variableArr[j][i + 1] !== undefined &&
              variableArr[j][i].props.children[idColumn].props.children <
                variableArr[j][i + 1].props.children[idColumn].props.children
            ) {
              arr.push(variableArr[j][i + 1]);
              arr.push(variableArr[j][i]);
              counter++;
              i++;
            } else arr.push(variableArr[j][i]);
          }
        }

        if (arr.length === variableArr[j].length) {
          if (counter !== 0) {
            variableArr[j] = Array.from(arr);
            arr.length = 0;
            j = j - 1;
          } else {
            setListPages("");

            setTimeout(() => {
              console.log("Перезагрузил таблицу");
              setListPages(variableArr);
            }, 1);
            arr.length = 0;

            if (j + 1 === oldArr.length) {
              setShiftState((value) => !value);
            }
          }
        }
        counter = 0;
      }
    } else {
      while (shift) {
        for (let i = 0; i < oldArr.length; i++) {
          if (shiftState) {
            if (
              oldArr[i + 1] !== undefined &&
              oldArr[i].props.children[idColumn].props.children >
                oldArr[i + 1].props.children[idColumn].props.children
            ) {
              arr.push(oldArr[i + 1]);
              arr.push(oldArr[i]);
              counter++;
              i++;
            } else arr.push(oldArr[i]);
          } else {
            if (
              oldArr[i + 1] !== undefined &&
              oldArr[i].props.children[idColumn].props.children <
                oldArr[i + 1].props.children[idColumn].props.children
            ) {
              arr.push(oldArr[i + 1]);
              arr.push(oldArr[i]);
              counter++;
              i++;
            } else arr.push(oldArr[i]);
          }

          // console.log(counter);
        }
        if (counter === 0) {
          setShiftState((value) => !value);
          shift = false;
        }
        counter = 0;
        oldArr = Array.from(arr);
        arr.length = 0;
        setListPages(oldArr);
      }
    }
  }

  return (
    <>
      <div className="chose">
        Выберите кол-во пользователей:
        <button
          onClick={() =>
            SmallUsers(
              setUrl,
              setNumberPages,
              setNumberPage,
              setListPages,
              setClassGif
            )
          }
          className="btn-chose"
        >
          32 пользователя
        </button>
        <button
          onClick={() =>
            BigUsers(
              setUrl,
              setClassGif,
              setListPages,
              setNumberPages,
              setNumberPage
            )
          }
          className="btn-chose"
        >
          1000 пользователей
        </button>
        <div className="grid-main user">
          <p
            onClick={(e) => handleClickColumn(e, 0)}
            className="tdUser idUser__title"
          >
            id ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, 1)}
            className="tdUser idUser__title"
          >
            firstName ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, 2)}
            className="tdUser idUser__title"
          >
            lastName ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, 3)}
            className="tdUser idUser__title"
          >
            email ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, 4)}
            className="tdUser idUser__title"
          >
            phone ▼
          </p>
        </div>
        <img style={classGif} src="/loaded.gif" alt="gif" />
      </div>
      {currentNumber !== "" ? listPages[currentNumber] : listPages}
      <div className="numbers-page">{numberPages}</div>
    </>
  );
}

export function SmallUsers(
  setUrl,
  setNumberPages,
  setNumberPage,
  setListPages,
  setClassGif
) {
  setClassGif({
    width: 120 + "px",
    display: "block",
  });

  setListPages("");

  setNumberPages("");
  setNumberPage("");
  let url =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setUrl(url);
  // console.log("мало");
}

export function BigUsers(
  setUrl,
  setClassGif,
  setListPages,
  setNumberPages,
  setNumberPage
) {
  setListPages("");
  setNumberPages("");
  setNumberPage("");

  setClassGif({
    width: 120 + "px",
    display: "block",
  });

  let url =
    "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  setUrl(url);
  // console.log("много");
}

export default Pages;
// +------+------------+-----------------+-----------------+---------------+
// | id   | firstName  | lastName        | email           | phone         |
// +------+------------+-----------------+-----------------+---------------+
// +------+------------+-----------------+-----------------+---------------+
// | id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
// +------+------------+-----------------+-----------------+---------------+
