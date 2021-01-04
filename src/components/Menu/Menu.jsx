import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import MenuIcon from "@material-ui/icons/Menu";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import ScheduleIcon from "@material-ui/icons/Schedule";
import "./styles.scss";

const items = [
  {
    table: "Dashboard",
    link: "",
    icon: <DashboardIcon />,
  },
  {
    table: "atendimentos",
    link: "atendimentos",
    icon: <ScheduleIcon />,
  },
  {
    table: "clientes",
    link: "clientes",
    icon: <PeopleIcon />,
  },
  {
    table: "pets",
    link: "pets",
    icon: <PetsIcon />,
  },
  {
    table: "servicos",
    link: "servicos",
    icon: <RoomServiceIcon />,
  },
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <nav>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Agenda Petshop</Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={open}>
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
            <List>
              {items.map((item, key) => (
                <ListItem button key={key}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Button size="small" color="primary" href={`/${item.link}`}>
                    {item.table}
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <br />
      </nav>
    );
  }
}

export default Menu;
