import SearchBar from "./Components/SearchBar";
import Body from "./Components/Body";
import Pagination from "./Components/Pagination";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  //here state will keep track of the row we are editing.
  const [state, setState] = useState({ name: "", email: "", role: "" });

  // In delArray we keep the list of Selected rows , to perform particular actions later on.
  const [delArray, setDelArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);

  //state for search input text.
  const [q, setQ] = useState("");

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // function to select a particular row by clicking on their checkBox
  const handleSelectRow = (e, id) => {
    const { checked } = e.target;
    if (checked === true) {
      setDelArray([...delArray, id]);
    } else {
      let tempArr = delArray;
      const index = tempArr.indexOf(id);
      tempArr.splice(index, 1);
      setDelArray(tempArr);
    }
  };
  //function to delete all the selected rows(users),, we put all the SELECTED items in delArray, then we remove those items from our main data array
  const deleteSelected = () => {
    let newUsers = [...users];

    newUsers = newUsers.filter((item) => !delArray.includes(item.id));

    console.log(newUsers);
    setUsers(newUsers);
    document.querySelector("th .checkbox").checked = false;
  };
  //funtion to select all rows in current page , by clkicking on the top-left checkbox of the table
  const tickAll = (rows) => {
    const main = document.querySelector("th .checkbox").checked;
    if (main === true) {
      let tempArray = [];
      rows.forEach((ele) => {
        tempArray.push(ele.id);
      });
      setDelArray([...tempArray]);
    }
    const elements = document.querySelectorAll("tbody input");
    elements.forEach((ele) => {
      ele.checked = main;
    });
  };

  // Fetch users from the api
  const URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
  const fetchUsers = async () => {
    const response = await fetch(`${URL}`);
    const result = await response.json();
    result.forEach((element) => {
      element.editable = false;
    });

    setUsers(result);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  //Searching Functionality
  const inputText = (e) => {
    setQ(e.target.value);
  };
  function search(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(q) > -1 ||
        row.email.toLowerCase().indexOf(q) > -1 ||
        row.role.toLowerCase().indexOf(q) > -1
    );
  }

  //delete-icon action , function to delete single row
  const handleDelete = (e) => {
    setUsers(users.filter((user) => user.id !== e));
    console.log(users);
  };

  const handleEdit = (id) => {
    // editable = true;
    // const element = document.getElementById(id);
    // console.log(element.childNodes);

    let tempUsers = [...users];
    tempUsers.map((item) => {
      if (item.id === id) {
        setState({ name: item.name, email: item.email, role: item.role });

        item.editable = true;
        return item;
      }
      return item;
    });
    setUsers(tempUsers);
  };

  const handleSave = (id) => {
    let tempUsers = [...users];
    tempUsers.map((item) => {
      if (item.id === id) {
        item.name = state.name;
        item.email = state.email;
        item.editable = false;
        return item;
      }
      return item;
    });
    setUsers(tempUsers);
  };

  const update = (e, text) => {
    console.log(e.target.value);
    if (e.target.value.includes("@")) {
      setState({ ...state, email: e.target.value });
    } else {
      setState({ ...state, name: e.target.value });
    }
    console.log(state);
  };

  // setState({ name: item.name, email: item.email, role: item.role });

  return (
    <div className="main-container">
      <SearchBar inputText={inputText}></SearchBar>
      <Body
        users={q.length < 1 ? currentUsers : search(users)}
        handleDelete={handleDelete}
        handleSelectRow={handleSelectRow}
        deleteSelected={deleteSelected}
        tickAll={tickAll}
        handleEdit={handleEdit}
        handleSave={handleSave}
        update={update}
      ></Body>

      <Pagination
        show={q.length < 1 ? true : false}
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        currentPage={currentPage}
        paginate={paginate}
      ></Pagination>
    </div>
  );
}

export default App;
