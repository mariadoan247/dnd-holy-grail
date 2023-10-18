import { useState } from "react";
// @mui
import { Menu, Button, MenuItem, Typography } from "@mui/material";
// component
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "A-D", label: "A-D" },
  { value: "E-H", label: "E-H" },
  { value: "I-L", label: "I-L" },
  { value: "M-P", label: "M-P" },
  { value: "Q-T", label: "Q-T" },
  { value: "U-Z", label: "U-Z" },
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          A-D
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={handleClose}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
