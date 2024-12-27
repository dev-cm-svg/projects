import { Container, Typography, Button, Card, CardContent, List, ListItem, IconButton, Paper } from '@mui/material';
import Link from 'next/link';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const mottos = [
    { text: "Believe in yourself.", story: "Believing in yourself is the first step to success." },
    { text: "Stay positive, work hard, make it happen.", story: "Positivity and hard work lead to great achievements." },
    { text: "Dream big and dare to fail.", story: "Big dreams require courage to pursue." },
    { text: "Your limitation—it's only your imagination.", story: "Imagination knows no bounds." },
    { text: "Push yourself, because no one else is going to do it for you.", story: "Self-motivation is key to personal growth." },
];

export default function Home() {
    const [likes, setLikes] = useState(Array(mottos.length).fill(0));

    const handleLike = (index) => {
        const newLikes = [...likes];
        newLikes[index] += 1;
        setLikes(newLikes);
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '70px' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    My Mottos
                </Typography>
                <List>
                    {mottos.map((motto, index) => (
                        <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link href={`/motto/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        '&:hover': { 
                                            color: 'primary.main', 
                                            textDecoration: 'underline' 
                                        } 
                                    }}
                                >
                                    {motto.text}
                                </Typography>
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => handleLike(index)}>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{likes[index]}</Typography>
                            </div>
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Get Inspired
                </Button>
            </Container>
        </>
    );
} 