import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MuiToolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AdbIcon from '@mui/icons-material/Adb';
import React from 'react';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface ToolbarProps {
  pages: {
    title: string;
    path: string;
  }[];
}

export function Toolbar(props: ToolbarProps) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <MuiToolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page) => (
              <NavLink to={page.path} className="NavLink" key={page.path}>
                <Button
                  key={page.title}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}
          </Box>
        </MuiToolbar>
      </AppBar>
    </Box>
  );
}
