import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import TodosContext from "./contexts/TodosContext";

function App() {

  const [listData, setListData] = useState([])
  const firstRender = useRef(true)




  // const [editMode, setEditMode] = useState(false)
  // const [itemText, setItemText] = useState(item)
  // const inputRef = useRef(null);
  // const {listData, setListData} = useContext(TodosContext)

  // const BASE_URL = "https://sophisticated-humane-dandelion.glitch.me/"



  

  // Užkrovimas iš localstorage ir pavertimas į masyvą
  useEffect(() => {
    const savedData = localStorage.getItem("listData")
    if(savedData) setListData(JSON.parse(savedData))
  }, [])

  // Išsaugojimas localstorage
  useEffect(() => {
    if(firstRender.current) {
      // Skip first render
      firstRender.current = false
      return;
    }

    localStorage.setItem("listData", JSON.stringify(listData))
  }, [listData])

  return (
   <TodosContext.Provider value={{listData, setListData}}>
      <Header/>
      <Input/>
      <List/>
    </TodosContext.Provider>
  );
}

export default App;
