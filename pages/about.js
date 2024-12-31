import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function About() {
    return (
        <>
           <Navbar/>
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '80px' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    About This App
                </Typography>
                <Typography variant="body1" paragraph>
                    This application is designed to inspire and motivate users through a collection of uplifting mottos.
                </Typography>
                <Typography variant="body1" paragraph>
                    Each motto comes with a story that elaborates on its meaning and significance.
                </Typography>
                <Button variant="contained" color="primary" component={Link} href="/">
                    Back to Mottos
                </Button>
            </Container>
        </>
    );
}
