import { useNavigate } from "react-router"

import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import ListItemButton from "@mui/material/ListItemButton"
import Divider from "@mui/material/Divider"
import { styled } from "@mui/material"

import { ChevronLeft, ChevronRight } from "@mui/icons-material"

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();

  const goTo = (path : string) => {
    setOpenSidebar(false);
    navigate(path);
  }

  return (
    <Drawer
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpenSidebar(false)}>
          {openSidebar ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem disablePadding key={`global`}>
          <ListItemButton onClick={()=> goTo("/")}>
            <ListItemText primary="Global" />
          </ListItemButton>
        </ListItem>

        {['Europe', 'Americas', 'Africa', 'Asia', 'Antarctic'].map((name) => (
          <ListItem key={`continent_${name}`}>
            <ListItemButton onClick={()=> goTo(`/region/${name}`)}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> 
    </Drawer>
  );
};

export default Sidebar;