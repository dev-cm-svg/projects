import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

export default function About() {
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
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
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
