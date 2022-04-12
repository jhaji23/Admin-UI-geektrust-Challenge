import React from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import InputBox from "./InputBox";

function Body({
  users,
  handleDelete,
  handleSelectRow,
  deleteSelected,
  tickAll,
  handleEdit,
  handleSave,
  update,
}) {
  return (
    <div className="overflow-x-auto w-full body-container">
      <table className="table w-full">
        {/* head of the Table*/}
        <thead className="font-bold">
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked={false}
                  onChange={() => tickAll(users)}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Email </th>
            <th>Role </th>
            <th>Actions </th>
            <th />
          </tr>
        </thead>

        {/* Body of the table , classes used are from daisyUI */}

        <tbody>
          {users.map((item) => (
            <tr key={item.id} id={item.id}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={false}
                    onChange={(e) => handleSelectRow(e, item.id)}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="opacity-70">
                      {item.editable === false ? (
                        item.name
                      ) : (
                        <InputBox text={item.name} update={update} />
                      )}
                    </div>
                    {/* <div className="text-sm opacity-50">{item.email}</div> */}
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm opacity-70">
                  {item.editable === false ? (
                    item.email
                  ) : (
                    <InputBox text={item.email} update={update} />
                  )}
                </span>
              </td>
              <td className="opacity-70"> {item.role}</td>
              <th>
                {item.editable === false ? (
                  <button
                    className="btn btn-ghost btn-xs opacity-70"
                    onClick={() => handleEdit(item.id, users)}
                  >
                    <FaEdit style={{ fontSize: "16px" }} />
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost btn-xs opacity-70"
                    onClick={() => handleSave(item.id)}
                  >
                    <FaSave style={{ fontSize: "16px", color: "purple" }} />
                  </button>
                )}

                <button
                  className="btn btn-ghost btn-xs opacity-70"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash style={{ fontSize: "16px", color: "red" }} />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-outline btn-error" onClick={deleteSelected}>
        Delete Selected
      </button>
    </div>
  );
}

export default Body;
