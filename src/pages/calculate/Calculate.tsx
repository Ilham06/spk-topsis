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
import { AlternativeCriteriaType, AlternativeType, CriteriaType } from "../../model";
import Gap from "../../compoments/Gap";

interface DividerType {
  code: string;
  value: number;
}

interface DistanceType {
  alternative_code: string;
  value: number;
}

interface PreferenceType {
  alternative_code: string;
  value: number;
}

export default function Calculate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alternative = useSelector((state: any) => state.alternative);
  const criteria: CriteriaType[] = useSelector((state: any) => state.criteria);
  const alternativeCriteria = useSelector((state: any) => state.alternativeCriteria);

  let divider: DividerType[] = [];
  let normalize: any[] = [];
  let weightedNormalize: any[] = [];
  let maxIdealSolution: DividerType[] = [];
  let minIdealSolution: DividerType[] = [];
  let maxDistance: DistanceType[] = [];
  let minDIstance: DistanceType[] = [];
  let preference: PreferenceType[] = [];

  function getDivider() {
    criteria.forEach((c: CriteriaType) => {
      const filtered = alternativeCriteria.filter((ac: AlternativeCriteriaType) => ac.criteria_code == c.code)
      let pow = 0;
      filtered.forEach((f: AlternativeCriteriaType) => {
        pow += f.value**2
      });

      divider.push({code: c.code, value: Math.sqrt(pow)})
    });
  }
  
  function getNormalizeMatrix() {
    normalize = alternativeCriteria.map((ac: AlternativeCriteriaType) => {
      let d = divider.find(dv => dv.code == ac.criteria_code)
      
      return {
        criteria_code: ac.criteria_code,
        alternative_code: ac.alternative_code,
        value: (ac.value / d?.value!).toFixed(5)
      }
    })
  }

  function getWeightedNomalize() {
    weightedNormalize = normalize.map((n: AlternativeCriteriaType) => {
      let c = criteria.find((c: CriteriaType) => c.code == n.criteria_code)
      
      return {
        criteria_code: n.criteria_code,
        alternative_code: n.alternative_code,
        value: (n.value * c?.weight!).toFixed(5)
      }
    })
  }

  function getMaxIdealSolution() {
    criteria.forEach((c: CriteriaType) => {
      const filtered = weightedNormalize.filter((wn: AlternativeCriteriaType) => wn.criteria_code == c.code)
      if (c.attribute == 'benefit') {
        const max = filtered.reduce((prev, cur) => (cur.value > prev.value ? cur : prev));
        maxIdealSolution.push({code: c.code, value: max.value})
        
      } else {
        const min = filtered.reduce((prev, cur) => (cur.value < prev.value ? cur : prev));
        maxIdealSolution.push({code: c.code, value: min.value})
        
      }
    });
  }

  function getMinIdealSolution() {
    criteria.forEach((c: CriteriaType) => {
      const filtered = weightedNormalize.filter((wn: AlternativeCriteriaType) => wn.criteria_code == c.code)
      if (c.attribute == 'benefit') {
        const min = filtered.reduce((prev, cur) => (cur.value < prev.value ? cur : prev));
        minIdealSolution.push({code: c.code, value: min.value})
      } else {
        const max = filtered.reduce((prev, cur) => (cur.value > prev.value ? cur : prev));
        minIdealSolution.push({code: c.code, value: max.value})
      }
    });
  }

  function getMaxDistance() {
    alternative.map((a: AlternativeType) => {
      let maxTotal = 0;
      let minTotal = 0;
      weightedNormalize.map((wn: AlternativeCriteriaType) => {
        let maxVal = maxIdealSolution.find((mis) => mis.code == wn.criteria_code)
        let minVal = minIdealSolution.find((mis) => mis.code == wn.criteria_code)
        if (wn.alternative_code == a.code) {
          maxTotal += Math.pow((maxVal?.value! - wn.value ), 2)
          minTotal += Math.pow((wn.value - minVal?.value!), 2)
        }
      })

      maxDistance.push({alternative_code: a.code, value: Math.sqrt(maxTotal)})
      minDIstance.push({alternative_code: a.code, value: Math.sqrt(minTotal)})
    })
  }

  function getPreference() {
    minDIstance.map(m => {
      let max = maxDistance.find((md) => md.alternative_code == m.alternative_code)
      let p = m.value / (m.value + max?.value!)
      preference.push({alternative_code: m.alternative_code, value: p})
    })
  }

  getDivider()
  getNormalizeMatrix()
  getWeightedNomalize()
  getMaxIdealSolution()
  getMinIdealSolution()
  getMaxDistance()
  getPreference()
  
  
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
          <Typography className="section-header">Penentuan Nilai</Typography>
        </Box>
      </Box>
      <Paper className="main_card">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
            <TableCell width="15%">Alternatif/Criteria</TableCell>
              {
                criteria.map((row: CriteriaType) => (
                  <TableCell key={row.id} width="15%">{row.code}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alternative.map((row: AlternativeType) => (
                <TableRow key={row.id}>
                  <TableCell onClick={() => navigate(`update/${row.code}`)} width="15%">{row.code}</TableCell>
                  {
                    row.criterias?.map((ac: AlternativeCriteriaType) => (
                      <TableCell key={ac.criteria_code}>{ac.value}</TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      <Gap height={20} width={0} />
      <Paper className="main_card">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
            <TableCell width="15%">Alternatif/Criteria</TableCell>
              {
                criteria.map((row: CriteriaType) => (
                  <TableCell key={row.id} width="15%">{row.code}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alternative.map((row: AlternativeType) => (
                <TableRow key={row.id}>
                  <TableCell onClick={() => navigate(`update/${row.code}`)} width="15%">{row.code}</TableCell>
                  {
                    normalize.map((n: AlternativeCriteriaType) => (
                      n.alternative_code == row.code && <TableCell>{n.value}</TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      <Gap height={20} width={0} />
      <Paper className="main_card">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
            <TableCell width="15%">Alternatif/Criteria</TableCell>
              {
                criteria.map((row: CriteriaType) => (
                  <TableCell key={row.id} width="15%">{row.code}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alternative.map((row: AlternativeType) => (
                <TableRow key={row.id}>
                  <TableCell onClick={() => navigate(`update/${row.code}`)} width="15%">{row.code}</TableCell>
                  {
                    weightedNormalize.map((n: AlternativeCriteriaType) => (
                      n.alternative_code == row.code && <TableCell>{n.value}</TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
