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

const Home = ({ initialMottos, apiUrl }) => {
  console.log(initialMottos,'initialMottos...123')
  const [text, setText] = useState("");
  const [story, setStory] = useState("");
  const [likes, setLikes] = useState({}); // State to track if the user has liked the motto
  const [mottos, setMottos] = useState(initialMottos);
  useEffect(() => {
    console.log('useEffect...123')
    // Retrieve liked mottos from localStorage
    const likedMottos = JSON.parse(localStorage.getItem('likedMottos')) || {};
    setLikes(likedMottos); // Set the initial state from localStorage
}, []); // Empty dependency array means this runs once on mount

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
      `${apiUrl}/mottos?mottoId=${mottoId}&like=${
        likes[mottoId] ? false : true
      }`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      const allMottos = await res.json();
      setMottos([...allMottos]);
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

    const response = await fetch(`${apiUrl}/mottos`, {
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

export async function getServerSideProps() {
  try {
    console.log(process.env.API_URL,'apiUrl...')
    const res = await fetch(`${process.env.API_URL}/mottos`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const initialMottos = await res.json();
    return {
      props: {
        initialMottos,
        apiUrl: process.env.API_URL,
      },
    };
  } catch (error) {
    console.error("Error fetching mottos:", error);
    return {
      props: {
        initialMottos: [],
        apiUrl: process.env.API_URL,
      },
    };
  }
}

export default Home;
