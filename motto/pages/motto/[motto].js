import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Typography, Button, TextField, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const mottos = [
  {
    text: "Be a good person, always think about justice.",
    story: "Believing in yourself is the first step to success.",
  },
  {
    text: "Stay positive, work hard, make it happen.",
    story: "Positivity and hard work lead to great achievements.",
  },
  {
    text: "Dream big and dare to fail.",
    story: "Big dreams require courage to pursue.",
  },
  {
    text: "Your limitation—it's only your imagination.",
    story: "Imagination knows no bounds.",
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    story: "Self-motivation is key to personal growth.",
  },
];

export default function MottoItem() {
  const router = useRouter();
  const { motto } = router.query;

  const selectedMotto = mottos[motto];

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        text: commentText,
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "70px" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {selectedMotto.text}
        </Typography>
        <Typography variant="body1" paragraph>
          {selectedMotto.story}
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: "20px", fontWeight: "bold" }}>
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
              <Typography variant="body2" style={{ padding: "5px 0", backgroundColor: "#f5f5f5", borderRadius: "5px", padding: "10px", width: "100%", textAlign: "left" }}>
                <span style={{ fontSize: "0.8em", color: "gray" }}>{comment.date}</span>
                <br />
                {comment.text}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Button variant="contained" color="primary" onClick={() => router.push("/")}>
          Back to Mottos
        </Button>
      </Container>
    </>
  );
}
