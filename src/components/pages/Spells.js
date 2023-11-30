import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import NavBar from "../wrappers/NavBar";
import AppBarTest from "../wrappers/AppBarTest";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "school", label: "School", minWidth: 100 },
  {
    id: "casting time",
    label: "Casting Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "comps",
    label: "Comps",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "save",
    label: "Save",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "source",
    label: "Source",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function Spells({ mode, theme, colorMode }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    // You can put the logic for refreshing the table content here based on the selected tab.
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <NavBar mode={mode} theme={theme} colorMode={colorMode}>
      <React.Fragment>
        <Container
          maxWidth="xl"
          sx={{
            marginTop: "120px",
            marginLeft: "50px",
            width: "95%", // Adjust the width as needed
          }}
        >
          <Grid container spacing={10} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item></Grid>
          </Grid>
          <AppBarTest
            selectedTab={selectedTab}
            handleChangeTab={() => handleChangeTab()}
          >
            <Typography color="inherit" variant="h5" component="h1">
              Spells
            </Typography>
          </AppBarTest>
          {/* pass in handle tab changes */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {/* {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value} */}
                                {/* Render Name as a link */}
                                {column.id === "name" ? (
                                  <Link to={`/backgrounds/${row.name}`}>
                                    {value}
                                  </Link>
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </React.Fragment>
    </NavBar>
  );
}