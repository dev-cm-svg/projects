import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useMottos } from "../../context/MottoContext";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

export default function MottoItem({ initialComments, initialMotto }) {
  const router = useRouter();
  const mottoId = router.query.motto; // ottoId, text, and story from the URL query
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(initialComments);
  const { mottos } = useMottos(); // Use the context
  const [motto, setMotto] = useState(initialMotto); // Initialize motto state with props

  // const motto = mottos.find(m => m.id === mottoId);
  if (!motto) return <Typography>Loading...</Typography>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: uuidv4(),
        text: commentText,
        mottoId,
      };

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments([...comments, savedComment]);
        setCommentText("");
      } else {
        console.error("Failed to save comment");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "70px" }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {motto.text}
        </Typography>
        <Typography variant="body1" paragraph>
          {motto.story}
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "20px", fontWeight: "bold" }}
        >
          Comments
        </Typography>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Paper>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} style={{ justifyContent: "center" }}>
              <Typography
                variant="body2"
                style={{
                  padding: "5px 0",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "0.8em", color: "gray" }}>
                  {comment.date}
                </span>
                <br />
                {comment.text}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Back to Mottos
        </Button>
      </Container>
    </>
  );
}

// Fetch motto and comments on the server side
export async function getServerSideProps(context) {
  const mottoId = context.params.motto;

  // Fetch the specific motto by ID
  const mottoRes = await fetch(
    `http://localhost:3001/api/mottos?mottoId=${mottoId}`
  );
  const initialMotto = await mottoRes.json();

  // Fetch comments for the specific mottoId
  const commentsRes = await fetch(
    `http://localhost:3001/api/comments?mottoId=${mottoId}`
  );

  if (!commentsRes.ok) {
    const errorText = await commentsRes.text(); // Get the response text
    console.error("Error fetching comments:", errorText); // Log the error text
    throw new Error("Failed to fetch comments");
  }

  const comments = await commentsRes.json();

  return {
    props: {
      initialComments: comments,
      initialMotto,
    },
  };
}
