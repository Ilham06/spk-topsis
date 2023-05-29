import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AlternativeCriteriaType,
  AlternativeType,
  CriteriaType,
} from "../../model";
import Gap from "../../compoments/Gap";
import { clearAlternativeCriteria } from "../../redux/alternative-criteria/alternativeCriteriaSlice";

export default function Calculate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alternative: AlternativeType[] = useSelector(
    (state: any) => state.alternative
  );
  const criteria: CriteriaType[] = useSelector((state: any) => state.criteria);
  const alternativeCriteria: AlternativeCriteriaType[] = useSelector(
    (state: any) => state.alternativeCriteria
  );

  const hanldeClear = () => {
    dispatch(clearAlternativeCriteria());
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
        </Box>
      </Box>
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">Penentuan Nilai</Typography>
          </Box>
        </Box>
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell width="15%">Alternatif/Criteria</TableCell>
                {criteria.map((row: CriteriaType) => (
                  <TableCell key={row.id} width="15%">
                    {row.code}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {alternative.map((row: AlternativeType) => (
                <TableRow key={row.id}>
                  <TableCell
                    onClick={() => navigate(`update/${row.code}`)}
                    width="15%"
                    sx={{ textDecoration: 'underline', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {row.code}
                  </TableCell>
                  {alternativeCriteria.map(
                    (ac) =>
                      ac.alternative_code == row.code && (
                        <TableCell>{ac.value}</TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={20} width={0} />

      <Box>
        <Button sx={{ mr: 1 }} variant="contained" color="primary" onClick={() => navigate('/result')}>Hitung</Button>
        <Button variant="contained" color="error" onClick={hanldeClear}>Bersihkan Data</Button>
      </Box>
    </>
  );
}
