import React, { useState, useEffect } from "react";
import "./style.css";

//get the local storage data
const getLocalStorageData = () => {
  const datalist = localStorage.getItem("mytodolist");
  if (datalist) {
    return JSON.parse(datalist);
  } else {
    return [];
  }
};
const Todo = () => {
  const [InputData, setInputData] = useState("");
  const [AddItems, setAddItems] = useState(getLocalStorageData());
  const [editId, setEditId] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const addItems = () => {
    if (!InputData) {
      alert("Plz fill some data");
    } else if (editId && toggleEdit) {
      setAddItems(
        AddItems.map((element) => {
          if (element.id === editId) {
            return { ...element, name: InputData };
          }
          return element;
        })
      );
      setInputData("");
      setEditId("");
      setToggleEdit(false);
    } else {
      const item = {
        id: Date.now(),
        name: InputData
      };
      setAddItems([...AddItems, item]);
      setInputData("");
    }
  };

  //Edit Items
  const editItem = (index) => {
    const editable_item = AddItems.find((element) => element.id === index);
    setInputData(editable_item.name);
    setToggleEdit(true);
    setEditId(index);
  };

  const deleteItem = (id) => {
    let updateItems = AddItems.filter((item, index) => {
      return item.id !== id;
    });
    setAddItems(updateItems);
  };

  //add items into the localstorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(AddItems));
  }, [AddItems]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="Todo SVG Figure" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items.."
              className="form-control"
              value={InputData}
              onChange={(event) => setInputData(event.target.value)}
            />
          </div>
          {toggleEdit ? (
            <i className="fa-edit fas" onClick={addItems}></i>
          ) : (
            <i className="fas fa-plus" onClick={addItems}></i>
          )}

          <div className="showItems">
            {AddItems.map((currentElement) => {
              const { id, name } = currentElement;
              return (
                <div className="eachItem" key={id} id={id}>
                  <h3>{name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit far-left"
                      onClick={() => editItem(id)}
                    ></i>
                    <i
                      className="far fa-trash-alt"
                      onClick={() => deleteItem(id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                setAddItems([]);
              }}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
