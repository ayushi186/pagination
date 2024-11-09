import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todos[]>();
  const [nPage, setNPage] = useState<any>();
  const gettodods = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => setTodos(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    gettodods();
    if (todos) {
      const nPage = Math.ceil(todos?.length / entryperpage);
      setNPage(nPage);
    }
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const entryperpage = 10;
  const lastIndex = currentPage * entryperpage;
  const firstIndex = lastIndex - entryperpage;
  const records = todos?.slice(firstIndex, lastIndex);
  const numbers = Array.from(Array((nPage ?? 0) + 1).keys()).slice(1);

  const prevPageClick = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPageClick = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageClick = (i: any) => {
    setCurrentPage(i);
  };

  console.log(nPage, numbers);

  return (
    <div className="App">
      <table>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
        {records?.map((todo: Todos, idx: number) => {
          return (
            <>
              <tr key={idx}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed === true ? "Done" : "In progress"}</td>
              </tr>
            </>
          );
        })}
      </table>
      <nav style={{ display: "flex" }}>
        <ul style={{ display: "flex" }}>
          <li style={{ listStyle: "none", padding: "4px" }}>
            <a
              href="#"
              className={currentPage <= 1 ? "anchor-disabled" : ""}
              onClick={(e) =>
                currentPage <= 1 ? e.preventDefault() : prevPageClick()
              }>
              Prev
            </a>
          </li>

          {numbers.map((i, idx) => {
            return (
              <li
                className={`page-item ${currentPage === i ? "active" : ""}`}
                key={idx}
                style={{
                  listStyle: "none",
                  padding: "4px",
                  border: "2px solid lightgrey",
                }}
                onClick={() => pageClick(i)}>
                <a href="#" className="page-link">
                  {i}
                </a>
              </li>
            );
          })}

          <li style={{ listStyle: "none" }}>
            <a
              href="#"
              className={currentPage >= nPage ? "anchor-disabled" : ""}
              onClick={(e) =>
                currentPage >= nPage ? e.preventDefault() : nextPageClick()
              }>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
