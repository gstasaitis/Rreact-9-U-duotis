import { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { motion, AnimatePresence } from "framer-motion";
import TodosContext from "../contexts/TodosContext";

const List = () => {
  const { listData, setListData } = useContext(TodosContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRenderList, setIsRenderList] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from API:", data);
        setListData(data.slice(0, 5));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [setListData]);

  const listAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    if (!isLoading) {
      setIsRenderList(true);
    }
  }, [isLoading]);

  return (
    <motion.ul
      variants={listAnimation}
      initial="hidden"
      animate={isRenderList ? "visible" : "hidden"}
      id="todo"
    >
      <AnimatePresence>
        {!isLoading &&
          listData.map((data) => (
            <ListItem
              title={data.title}
              key={data.id}
              itemAnimation={itemAnimation}
            />
          ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default List;
