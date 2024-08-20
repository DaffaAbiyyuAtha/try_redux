import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { FaPencil, FaTrash, FaCircleCheck, FaX } from "react-icons/fa6";
import { datas, cekImport } from "./redux/reducers/tables";

function Tables() {
  async function newData() {
    try {
      const respons = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!respons.ok) {
        throw new Error(`response status ${response.status}`);
      }
      const json = await respons.json();
      json.forEach((items) =>
        dispatch(
          datas({
            name: items.name,
            email: items.email,
          })
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  const dispatch = useDispatch();
  const dataUpdate = useSelector((state) => state.tables.forms);
  const [edits, setEdits] = React.useState(true);
  function update(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    dispatch(datas({ name, email }));
    e.currentTarget.reset();
    if (edits === true) {
      setEdits(false);
    } else {
      setEdits(true);
    }
  }
  function edit() {
    if (edits === true) {
      setEdits(false);
    } else {
      setEdits(true);
    }
  }
  const [remove, setRemove] = React.useState(0);
  function deletes(index) {
    if (remove === 0) {
      setRemove(index);
    } else {
      setRemove(0);
    }
  }
  function deleteItem() {
    dispatch(cekImport(remove));
    setRemove(0);
  }
  return (
    <div className="">
      <table className="w-full m-20 relative">
        <thead className="">
          <tr className="">
            <td>Name</td>
            <td>Email</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {dataUpdate.map((x, index) => {
            return (
              <tr>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td className="">
                  <button type="button" onClick={edit} className="text-black">
                    <FaPencil />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deletes(index)}
                    className="text-black"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>Daffa</td>
            <td>daffa@mail.com</td>
            <td className="">
              <button type="button" onClick={edit} className="text-black">
                <FaPencil />
              </button>
            </td>
            <td>
              <button type="button" onClick={deletes} className="text-black">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full m-20">
        <button type="button" onClick={newData}>
          Update Data
        </button>
      </div>
      <div
        className={
          edits
            ? "hidden"
            : "flex justify-center items-center h-screen w-full bg-black/25 absolute top-0"
        }
      >
        <form
          onSubmit={update}
          className="flex flex-col gap-4 bg-[#B0EBB4] p-14 rounded-3xl"
        >
          <div className="">
            <label htmlFor="name">Name</label>
            <div className="">
              <input
                type="text"
                name="name"
                id="name"
                className="border-2 h-12 w-72 p-6 rounded-xl"
                placeholder="Daffa"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="name">Email</label>
            <div className="">
              <input
                type="text"
                name="email"
                id="email"
                className="border-2 outline-none h-12 w-72 p-6 rounded-xl "
                placeholder="daffa@mail.com"
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="drop-shadow h-12 w-72 bg-[#ACE1AF] rounded-xl"
            >
              save
            </button>
          </div>
        </form>
      </div>
      <div
        className={
          remove
            ? "flex w-full h-screen items-center justify-center bg-black/25 absolute top-0"
            : "hidden"
        }
      >
        <div className="flex justify-center items-center flex-col gap-10 p-14 rounded-xl bg-[#B0EBB4]">
          <div className="">Are you sure deleted this data?</div>
          <div className=" flex gap-6">
            <button onClick={deleteItem} type="button" className="">
              <FaCircleCheck />
            </button>
            <button type="button" className="">
              <FaX />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <Tables />
    </Provider>
  );
}

export default App;
