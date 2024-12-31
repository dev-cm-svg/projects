import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="fixed">
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
    );
};

export default Navbar;
