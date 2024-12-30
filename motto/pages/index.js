import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useMottos } from "../context/MottoContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Import the ThumbUpIcon

const Home = ({ initialMottos }) => {
  const [text, setText] = useState("");
  const [story, setStory] = useState("");
  const { mottos, setMottos } = useMottos(); // Use the context
  const [likes, setLikes] = useState({}); // State to track if the user has liked the motto

  useEffect(() => {
    const fetchMottos = async () => {
      const res = await fetch("http://localhost:3001/api/mottos");
      const data = await res.json();
      setMottos(data); // Store mottos in context
    };

    if (mottos.length === 0) {
      // Fetch only if mottos are not already loaded
      fetchMottos();
    }

    setLikes(JSON.parse(localStorage.getItem("likedMottos")) || {});
  }, [mottos, setMottos]);

  const handleLikeToggle = async (mottoId) => {
    if (likes[mottoId]) {
      setLikes({ ...likes, [mottoId]: false });
      localStorage.setItem(
        "likedMottos",
        JSON.stringify({ ...likes, [mottoId]: false })
      ); // Save updated likedMottos
    } else {
      setLikes({ ...likes, [mottoId]: true });
      localStorage.setItem(
        "likedMottos",
        JSON.stringify({ ...likes, [mottoId]: true })
      ); // Save updated likedMottos
    }
    const res = await fetch(
      `http://localhost:3001/api/mottos?mottoId=${mottoId}&like=${
        likes[mottoId] ? false : true
      }`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      const allMottos = await res.json();
      setMottos(allMottos);
    } else {
      console.error("Error liking motto");
    }
  };

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
            label="Motto Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            multiline // Enable multiline
            rows={4} // Set the number of visible rows
            fullWidth
            margin="normal"
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
                    },
                  }}
                >
                  {motto.text}
                </Typography>
              </Link>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => handleLikeToggle(motto.id)}
                  color={likes[motto.id] ? "secondary" : "default"} // Change color based on like status
                >
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2">{motto.likes}</Typography>
              </div>
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
