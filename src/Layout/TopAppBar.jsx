import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from '@mui/icons-material/Settings';
import { InputAdornment, Stack, TextField } from '@mui/material';
import './topappbar.scss'
import { useNavigate } from 'react-router-dom';
export default function TopAppBar() {
    const navigation = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: "#fff",
                    boxShadow: "none",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 20px",
                    paddingY: 0.5
                }}>
                <Toolbar>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                        <Stack direction="row" alignItems="center" >
                            <IconButton
                                onClick={() => navigation('/')}
                                size="large"
                                edge="start"
                                aria-label="menu"
                                sx={{ mr: 1 }}
                            >
                                <HomeIcon sx={{ fontSize: 30 }} />
                            </IconButton>

                            <TextField
                                size='small'
                                placeholder='ស្វែងរក'
                                className='text-field no-border'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <IconButton
                            onClick={() => navigation('/setting')}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                            <SettingsIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
