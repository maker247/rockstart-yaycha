import { 
  useState
} from "react";
import {
  Container,
  Box
} from "@mui/material"
import Item from "./Components/Item";
import List from "./Components/List";
import Form from "./Components/Form";
import { useApp } from "./ThemeApp";
import Header from "./Components/Header";

const App = () => {

  const { showForm, globalMsg, setGlobalMsg } = useApp()

  const [data, setData] = useState([
      { id: 1, content: "Hello, World!", name: "Alice" },
      { id: 2, content: "React is fun.", name: "Bob" },
      { id: 3, content: "Yay, interesting.", name: "Chris" },
  ]);

  const remove = id => {
    setData(data.filter(item => item.id !== id))
    setGlobalMsg("An item deleted.")
  }

  const add = (content, name) => {
    setData([
      {
        id: data[data.length - 1].id + 1,
        content,
        name
      },
      ...data
    ])
    setGlobalMsg("An item added.")
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          my: 4
        }}
        maxWidth="sm"
      >
        {showForm && <Form add={add} /> } 

        <Box sx={{
          my: 3
        }}>
          {data.map((item) => 
            <Item
              key={item.id}
              item={item}
              remove={remove}
            ></Item>
          )}
        </Box>
        
      </Container>
    </>
  )
}

export default App