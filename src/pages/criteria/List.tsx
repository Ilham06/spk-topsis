import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlternativeType, CriteriaType } from "../../model";
import { deleteAlternative } from "../../redux/alternative/alternativeSlice";
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
      <Box className="header">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className="section-header">Data Criteria</Typography>
          <Button
            onClick={() => navigate("create")}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            <AddIcon /> Tambah Data
          </Button>
        </Box>
      </Box>
      <Paper className="main_card">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell width="15%">Code</TableCell>
              <TableCell width="35%">Criteria</TableCell>
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
    </>
  );
}
