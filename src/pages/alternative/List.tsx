import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlternativeType } from "../../model";
import { deleteAlternative } from "../../redux/alternative/alternativeSlice";

export default function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.alternative);

  const handleDelete = (id: string) => {
    dispatch(deleteAlternative(id));
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
            <Typography className="table-title">Data Alternatif</Typography>
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
                <TableCell width="35%">Alternatif</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell width="10%">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: AlternativeType) => (
                <TableRow
                  key={row.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.note}</TableCell>
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
