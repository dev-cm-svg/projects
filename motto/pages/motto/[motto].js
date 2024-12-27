import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";

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

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Motto App
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <Card variant="outlined" style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h2" component="h1" gutterBottom>
              {selectedMotto.text}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedMotto.story}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
            >
              Back to Mottos
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
