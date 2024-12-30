import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useMottos } from "../context/MottoContext";

const Home = ({ initialMottos }) => {
  const [text, setText] = useState("");
  const [story, setStory] = useState("");
  const { mottos, setMottos } = useMottos(); // Use the context

  useEffect(() => {
    const fetchMottos = async () => {
        const res = await fetch('http://localhost:3001/api/mottos');
        const data = await res.json();
        setMottos(data); // Store mottos in context
    };

    if (mottos.length === 0) { // Fetch only if mottos are not already loaded
        fetchMottos();
    }
}, [mottos, setMottos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMotto = {
      id: uuidv4(),
      text,
      story,
    };

    const response = await fetch("/api/mottos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMotto),
    });

    if (response.ok) {
      const savedMotto = await response.json();
      setMottos([...mottos, savedMotto]);
      setText("");
      setStory("");
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "70px" }}
      >
        <Typography variant="h2">My Mottos</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Motto"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <TextField
            label="Story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
          />
          <Button type="submit">Add Motto</Button>
        </form>
        <List>
          {mottos.map((motto) => (
            <ListItem
              key={motto.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              
              <Link href={`/motto/${motto.id}`} passHref>

                <Typography
                  variant="body1"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {motto.text}
                </Typography>
              </Link>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => handleLike(motto.id)}>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{likes[motto.id]}</Typography>
                            </div> */}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

// export async function getServerSideProps() {
//   try {
//     const res = await fetch("http://localhost:3001/api/mottos");
//     if (!res.ok) {
//       throw new Error("Failed to fetch");
//     }
//     const initialMottos = await res.json();
//     return {
//       props: {
//         initialMottos,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching mottos:", error);
//     return {
//       props: {
//         initialMottos: [],
//       },
//     };
//   }
// }

export default Home;
