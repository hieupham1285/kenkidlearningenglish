import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

const navs = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Practise", icon: <PlayCircleFilledIcon />, path: "/practise" },
  { label: "Correct", icon: <CheckCircleIcon />, path: "/correct" },
  { label: "Add words", icon: <AddCircleIcon />, path: "/add-words" },
  { label: "Profile", icon: <PersonIcon />, path: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = navs.findIndex((n) => n.path === location.pathname);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={current}
        onChange={(_, newValue) => navigate(navs[newValue].path)}
        showLabels
      >
        {navs.map((n) => (
          <BottomNavigationAction key={n.label} label={n.label} icon={n.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
