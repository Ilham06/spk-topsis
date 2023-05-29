import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CriteriaType } from "../../model";
import { deleteCriteria } from "../../redux/criteria/criteriaSlice";

export default function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.criteria);

  const handleDelete = (id: string) => {
    dispatch(deleteCriteria(id));
  };

  return (
    <>
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className="table-title">Data Kriteria</Typography>
            <IconButton
              onClick={() => navigate("create")}
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              <AddBoxIcon />
            </IconButton>
          </Box>
        </Box>
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell width="15%">Kode</TableCell>
                <TableCell width="35%">Kriteria</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell>Bobot</TableCell>
                <TableCell>Atribut</TableCell>
                <TableCell width="10%">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: CriteriaType) => (
                <TableRow
                  key={row.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.note}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.attribute}</TableCell>
                  <TableCell width="10%">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => navigate(`edit/${row.id}`)}
                    >
                      <CreateIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </>
  );
}
