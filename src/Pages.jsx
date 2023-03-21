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
      .then((response) => {
        return response.json();
      })
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
  const [showAboutUser, setShowAboutUser] = useState({
    display: "none",
    textAlign: "center",
  });
  const [showAddFormUser, setShowAddFormUser] = useState({
    display: "none",
    textAlign: "center",
  });
  const [userInfo, setUserInfo] = useState({});
  const [shiftState, setShiftState] = useState(true);
  const [lastId, setLastId] = useState(1001);

  const refId = useRef("");
  const refFirstName = useRef("");
  const refLastName = useRef("");
  const refEmail = useRef("");
  const refPhone = useRef("");
  // props.url !== undefined ? setUrl(props.url) : "";

  let arrPages = [];

  async function handleClickAddUser(e) {
    e.preventDefault();


    if (
      refFirstName.current.value !== "" &&
      refLastName.current.value !== "" &&
      refEmail.current.value !== "" &&
      refPhone.current.value !== ""
    ) {
      let newUser = [];

      newUser.push({
        id: lastId,
        firstName: refFirstName.current.value,
        lastName: refLastName.current.value,
        email: refEmail.current.value,
        phone: refPhone.current.value,
      });

      console.log(refFirstName.current.value);
      console.log(newUser);

      console.log(listPages)

      let tempValue = "";

      await setListPages((value) => {
        tempValue = [...value];
        console.log("начало")

        if (currentNumber !== "") {
           tempValue[currentNumber].unshift(newUser[0]);
           console.log("sadsadsad")
        } else tempValue.unshift(newUser[0]);
      });

      console.log(tempValue)
      debugger
      setListPages(tempValue)

      // setListPages((value) => {
      //   let tempValue = [...value];
      //   if (currentNumber !== "") {
      //     tempValue[currentNumber].unshift(newUser[0]);
      //   } else tempValue.unshift(newUser[0]);
      //   console.log(tempValue);
      //   return tempValue;
      // });
      setLastId((value) => value + 1);
    } else {
      alert("Вы ввели не все значения!!!");
      setShowAddFormUser({
        display: "none",
        textAlign: "center",
      });
    }

    // console.log(listPages)
  }

  async function handleClickUser(e, idUser) {
    let currentNumber = "";

    setShowAboutUser({
      display: "block",
      textAlign: "center",
    });
    await setNumberPage((value) => {
      currentNumber = value;
      return value;
    });

    let userInfo = {};

    setListPages((value) => {
      if (Array.isArray(value[0])) {
        let valueUser = value[currentNumber][idUser];
        userInfo = {
          description: valueUser.description,
          firstName: valueUser.firstName,
          lastName: valueUser.lastName,
          streetAddress: valueUser.address.streetAddress,
          city: valueUser.address.city,
          state: valueUser.address.state,
          zip: valueUser.address.zip,
        };
        setUserInfo(userInfo);
      } else {
        let valueUser = value[idUser];
        userInfo = {
          description: valueUser.description,
          firstName: valueUser.firstName,
          lastName: valueUser.lastName,
          streetAddress: valueUser.address.streetAddress,
          city: valueUser.address.city,
          state: valueUser.address.state,
          zip: valueUser.address.zip,
        };
        setUserInfo(userInfo);
      }
      return value;
    });

    console.log(currentNumber);
    console.log("Нажали на пользователя: " + idUser);
  }

  useEffect(() => {
    if (currentUrl !== "") {
      console.log("aAa");
      setPages(currentUrl).then((data) => {
        let arr = [];
        let arrBig = [];

        // console.log(data.length);

        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
          // console.log(arr);
          if (arr.length % 50 === 0 && arr.length > 0) {
            arrBig.push(arr.slice(0));
            arr.length = 0;
          }
        }

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
    if (listPages !== undefined) {
      if (listPages.length > 0) {
        setClassGif({
          width: 120 + "px",
          display: "none",
        });
      }
    }
  }, [listPages]);
  // console.log(listPages);

  const handleClickNumberPage = (id) => {
    setNumberPage(id - 1);
  };

  async function handleClickColumn(e, idColumn) {
    let counter = 0;
    let shift = true;
    const arr = [];
    let oldArr = listPages;
    let arrStack = [];
    let arrAll = [];

    let temp = "";

    if (idColumn === "id") {
      temp = e.target.innerHTML === "id ▼" ? "id ▲" : "id ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === "firstName") {
      let temp =
        e.target.innerHTML === "firstName ▼" ? "firstName ▲" : "firstName ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === "lastName") {
      let temp =
        e.target.innerHTML === "lastName ▼" ? "lastName ▲" : "lastName ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === "email") {
      let temp = e.target.innerHTML === "email ▼" ? "email ▲" : "email ▼";
      e.target.innerHTML = temp;
    } else if (idColumn === "phone") {
      let temp = e.target.innerHTML === "phone ▼" ? "phone ▲" : "phone ▼";
      e.target.innerHTML = temp;
    }

    if (oldArr[0].length !== undefined) {
      let variableArr = oldArr;

      for (let j = 0; j < oldArr.length; j++) {
        for (let i = 0; i < variableArr[j].length; i++) {
          if (shiftState) {
            if (
              variableArr[j][i + 1] !== undefined &&
              variableArr[j][i][idColumn] > variableArr[j][i + 1][idColumn]
            ) {
              arr.push(variableArr[j][i + 1]);
              arr.push(variableArr[j][i]);
              counter++;
              i++;
            } else arr.push(variableArr[j][i]);
          } else {
            if (
              variableArr[j][i + 1] !== undefined &&
              variableArr[j][i][idColumn] < variableArr[j][i + 1][idColumn]
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
              oldArr[i][idColumn] > oldArr[i + 1][idColumn]
            ) {
              arr.push(oldArr[i + 1]);
              arr.push(oldArr[i]);
              counter++;
              i++;
            } else arr.push(oldArr[i]);
          } else {
            if (
              oldArr[i + 1] !== undefined &&
              oldArr[i][idColumn] < oldArr[i + 1][idColumn]
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
              setClassGif,
              setShowAboutUser
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
              setNumberPage,
              setShowAboutUser
            )
          }
          className="btn-chose"
        >
          1000 пользователей
        </button>
        <button
          onClick={(e) => {
            setShowAddFormUser((value) => {
              e.preventDefault();
              if (value.display === "none") {
                return {
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: 10 + "px",
                };
              } else {
                return {
                  display: "none",
                  textAlign: "center",
                };
              }
            });
          }}
          className="addUserBtn"
        >
          Добавить
        </button>
        <form action="" style={showAddFormUser}>
          <label>firstName</label>
          <input required ref={refFirstName} type="text" name="firstName" />
          <label>lastName</label>
          <input required ref={refLastName} type="text" name="lastName" />
          <label>email</label>
          <input required ref={refEmail} type="email" name="email" />
          <label>phone</label>
          <input required ref={refPhone} type="phone" name="phone" />
          {/* <button type="button" className="addUserBtn" onClick={(e) => handleClickAddUser(e)}> */}
          <input
            type="submit"
            className="addUserBtn"
            value="Добавить нового пользователя"
            onClick={handleClickAddUser}
          />
          {/* Добавить нового пользователя
          </button> */}
        </form>
        <div className="grid-main user">
          <p
            onClick={(e) => handleClickColumn(e, "id")}
            className="tdUser idUser__title"
          >
            id ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, "firstName")}
            className="tdUser idUser__title"
          >
            firstName ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, "lastName")}
            className="tdUser idUser__title"
          >
            lastName ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, "email")}
            className="tdUser idUser__title"
          >
            email ▼
          </p>
          <p
            onClick={(e) => handleClickColumn(e, "phone")}
            className="tdUser idUser__title"
          >
            phone ▼
          </p>
        </div>
        <img style={classGif} src="/loaded.gif" alt="gif" />
      </div>
      {listPages.length > 0
        ? drawUsers(listPages, currentNumber, handleClickUser)
        : ""}
      {/* {currentNumber !== "" ? listPages[currentNumber] : listPages} */}
      <form style={showAboutUser}>
        <p>
          Выбран пользователь:{userInfo.firstName + " " + userInfo.lastName}
        </p>
        <label>Описание:</label>
        <textarea value={userInfo.description} />
        <p>
          Адрес проживания: <b>{userInfo.streetAddress}</b>
        </p>
        <p>
          Город: <b>{userInfo.city}</b>
        </p>
        <p>
          Провинция/штат: <b>{userInfo.state}</b>
        </p>
        <p>
          Индекс: <b>{userInfo.zip}</b>
        </p>
      </form>
      <div className="numbers-page">{numberPages}</div>
    </>
  );
}

export function drawUsers(listPages, currentNumber, handleClickUser) {
  let arrBody = [];
  let allUsers = [];

  if (listPages[0].length !== undefined) {
    for (let j = 0; j < listPages.length; j++) {
      for (let i = 0; i < listPages[j].length; i++) {
        arrBody.push(
          <div
            onClick={(e) => handleClickUser(e, i)}
            key={i}
            className="grid-main user"
          >
            <p className="tdUser">{listPages[j][i].id}</p>
            <p className="tdUser">
              {listPages[j][i].firstName.length > 10
                ? listPages[j][i].firstName.substring(0, 10) + "..."
                : listPages[j][i].firstName}
            </p>
            <p className="tdUser">
              {listPages[j][i].lastName.length > 10
                ? listPages[j][i].lastName.substring(0, 10) + "..."
                : listPages[j][i].lastName}
            </p>
            <p className="tdUser">
              {listPages[j][i].email.length > 20
                ? listPages[j][i].email.substring(0, 20) + "..."
                : listPages[j][i].email}
            </p>
            <p className="tdUser">{listPages[j][i].phone}</p>
          </div>
        );
      }
      allUsers.push(Array.from(arrBody));
      // console.log(allUsers);
      arrBody.length = 0;
    }
  } else {
    for (let i = 0; i < listPages.length; i++) {
      arrBody.push(
        <div
          onClick={(e) => handleClickUser(e, i)}
          key={i}
          className="grid-main user"
        >
          <p className="tdUser">{listPages[i].id}</p>
          <p className="tdUser">
            {listPages[i].firstName.length > 10
              ? listPages[i].firstName.substring(0, 10) + "..."
              : listPages[i].firstName}
          </p>
          <p className="tdUser">
            {listPages[i].lastName.length > 10
              ? listPages[i].lastName.substring(0, 10) + "..."
              : listPages[i].lastName}
          </p>
          <p className="tdUser">
            {listPages[i].email.length > 20
              ? listPages[i].email.substring(0, 20) + "..."
              : listPages[i].email}
          </p>
          <p className="tdUser">{listPages[i].phone}</p>
        </div>
      );
    }
  }

  return allUsers.length > 0 ? allUsers[currentNumber] : arrBody;
}

export function SmallUsers(
  setUrl,
  setNumberPages,
  setNumberPage,
  setListPages,
  setClassGif,
  setShowAboutUser
) {
  setClassGif({
    width: 120 + "px",
    display: "block",
  });

  setListPages("");

  setNumberPages("");
  setNumberPage("");

  setShowAboutUser({
    display: "none",
    textAlign: "center",
  });

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
  setNumberPage,
  setShowAboutUser
) {
  setListPages("");
  setNumberPages("");
  setNumberPage("");

  setShowAboutUser({
    display: "none",
    textAlign: "center",
  });

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
