import { useNavigate } from "react-router";

import { Drawer, List, ListItem, ListItemText, IconButton, styled, ListItemButton, Divider } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={openSidebar}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpenSidebar(false)}>
          {openSidebar ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
      <ListItem disablePadding key={`global`}>
            <ListItemButton onClick={()=> navigate("/")}>
              <ListItemText primary="Global" />
            </ListItemButton>
          </ListItem>
        {['Europe', 'Americas', 'Africa', 'Asia', 'Antarctic'].map((name) => (
          <ListItem disablePadding key={`continent_${name}`}>
            <ListItemButton onClick={()=> navigate(`/region/${name}`)}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> 
    </Drawer>
  );
};

export default Sidebar;