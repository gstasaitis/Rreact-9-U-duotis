import { useContext, useEffect, useRef, useState } from "react";
import TodosContext from "../contexts/TodosContext";
import { motion } from "framer-motion";

const ListItem = ({ id, value, title, itemAnimation, fetchData }) => {

  const [editMode, setEditMode] = useState(false);
  const [itemText, setItemText] = useState(value);
  const inputRef = useRef(null);
  const { listData, setListData } = useContext(TodosContext);

  const BASE_URL = "https://sophisticated-humane-dandelion.glitch.me/";

  const handleRemove = async () => {
    try {
      const resp = await fetch(BASE_URL + id, {
        method: "DELETE",
      });

      if (resp.ok) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const resp = await fetch(BASE_URL + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: itemText,
          title: title,
        }),
      });
  
      if (resp.ok) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setItemText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newListData = [...listData];
      newListData[id - 1] = { id, value: e.target.value, title };
      setListData(newListData);
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <motion.li className="list-item" variants={itemAnimation} layout="position">
      <div className={editMode ? "text hidden" : "text"}>{title}</div>
      <textarea
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={editMode ? "" : "hidden"}
        type="text"
        value={itemText} 
      />
      <div className="buttons">
        <button className="edit" onClick={handleEdit}>
          <i className="fa-solid fa-edit"></i>
        </button>
        <button className="remove" onClick={handleRemove}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </motion.li>
  );
};

export default ListItem;
