import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AlternativeCriteriaType,
  AlternativeType,
  CriteriaType,
  DistanceType,
  DividerType,
  IdealSolutionType,
  NormalizeType,
  PreferenceType,
} from "../../model";
import Gap from "../../compoments/Gap";

export default function Results() {
  const navigate = useNavigate();
  const alternative: AlternativeType[] = useSelector(
    (state: any) => state.alternative
  );
  const criteria: CriteriaType[] = useSelector((state: any) => state.criteria);
  const alternativeCriteria: AlternativeCriteriaType[] = useSelector(
    (state: any) => state.alternativeCriteria
  );

  let divider: DividerType[] = [];
  let normalize: NormalizeType[] = [];
  let weightedNormalize: NormalizeType[] = [];
  let maxIdealSolution: IdealSolutionType[] = [];
  let minIdealSolution: IdealSolutionType[] = [];
  let distance: DistanceType[] = [];
  let preference: PreferenceType[] = [];
  let result: PreferenceType[] = [];

  function getDivider() {
    criteria.map((c) => {
      const filtered = alternativeCriteria.filter(
        (ac) => ac.criteria_code == c.code
      );
      let pow = 0;
      filtered.map((f) => {
        pow += f.value ** 2;
      });

      divider.push({ code: c.code, value: Math.sqrt(pow) });
    });
  }

  function getNormalizeMatrix() {
    normalize = alternativeCriteria.map((ac) => {
      let d = divider.find((dv) => dv.code == ac.criteria_code);

      return {
        criteria_code: ac.criteria_code,
        alternative_code: ac.alternative_code,
        value: ac.value / d?.value!,
      };
    });
  }

  function getWeightedNomalize() {
    weightedNormalize = normalize.map((n) => {
      let c = criteria.find((c) => c.code == n.criteria_code);

      return {
        criteria_code: n.criteria_code,
        alternative_code: n.alternative_code,
        value: n.value * c?.weight!,
      };
    });
    console.log(weightedNormalize);
  }

  function getMaxIdealSolution() {
    criteria.map((c) => {
      const filtered = weightedNormalize.filter(
        (wn) => wn.criteria_code == c.code
      );
      const min = filtered.reduce((prev, cur) =>
        cur.value < prev.value ? cur : prev
      );
      const max = filtered.reduce((prev, cur) =>
        cur.value > prev.value ? cur : prev
      );
      if (c.attribute == "benefit") {
        maxIdealSolution.push({ code: c.code, value: max.value });
        minIdealSolution.push({ code: c.code, value: min.value });
      } else {
        maxIdealSolution.push({ code: c.code, value: min.value });
        minIdealSolution.push({ code: c.code, value: max.value });
      }
    });
  }

  function getDistance() {
    alternative.map((a) => {
      let maxTotal = 0;
      let minTotal = 0;
      weightedNormalize.map((wn) => {
        let maxVal = maxIdealSolution.find(
          (mis) => mis.code == wn.criteria_code
        );
        let minVal = minIdealSolution.find(
          (mis) => mis.code == wn.criteria_code
        );
        if (wn.alternative_code == a.code) {
          maxTotal += Math.pow(maxVal?.value! - wn.value, 2);
          minTotal += Math.pow(wn.value - minVal?.value!, 2);
        }
      });

      distance.push({
        alternative_code: a.code,
        maxValue: Math.sqrt(maxTotal),
        minValue: Math.sqrt(minTotal)
      })
    });
  }

  function getPreference() {
    distance.map(d => {
      let p = d.minValue / (d.minValue + d.maxValue);
      preference.push({ alternative_code: d.alternative_code, value: p });
    });

    result = preference.sort((a, b) => b.value - a.value)
  }

  getDivider();
  getNormalizeMatrix();
  getWeightedNomalize();
  getMaxIdealSolution();
  getDistance();
  getPreference();

  return (
    <>
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">Data Alternatif</Typography>
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

      <Gap height={40} width={0} />

      <Card className="main-card">
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }} width="15%">Pembagi</TableCell>
                {divider.map((row) => (
                  <TableCell key={row.code} width="15%">
                    {row.code} - {row.value.toFixed(5)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">
              Data Matrix Ternormalisasi
            </Typography>
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
                  >
                    {row.code}
                  </TableCell>
                  {normalize.map(
                    (n) =>
                      n.alternative_code == row.code && (
                        <TableCell>{n.value.toFixed(5)}</TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">
              Data matrix ternormalisasi dan terbobot
            </Typography>
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
                  >
                    {row.code}
                  </TableCell>
                  {weightedNormalize.map(
                    (wn) =>
                      wn.alternative_code == row.code && (
                        <TableCell>{wn.value.toFixed(5)}</TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />

      <Card className="main-card">
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell width="15%" sx={{ fontWeight: 700 }}>Max</TableCell>
                {maxIdealSolution.map((row) => (
                  <TableCell key={row.code} width="15%">
                    {row.code} - {row.value.toFixed(5)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={10} width={0} />

      <Card className="main-card">
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell width="15%" sx={{ fontWeight: 700 }}>Min</TableCell>
                {minIdealSolution.map((row) => (
                  <TableCell key={row.code} width="15%">
                    {row.code} - {row.value.toFixed(5)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />
      <Card className="main-card">
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">
              Data Jarak
            </Typography>
          </Box>
        </Box>
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell width="15%">Alternatif</TableCell>
                <TableCell width="30%">Jarak Ideal Positif (D+)</TableCell>
                <TableCell width="30%">Jarak Ideal Negatif (D-)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {distance.map((row) => (
                <TableRow key={row.alternative_code}>
                  <TableCell
                    width="15%"
                  >
                    {row.alternative_code}
                  </TableCell>
                  <TableCell width="15%">
                    {row.maxValue.toFixed(5)}
                  </TableCell>
                  <TableCell width="15%">
                    {row.minValue.toFixed(5)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />
      <Card className="main-card" sx={{ width: '50%' }}>
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">
              Data preferensi (V)
            </Typography>
          </Box>
        </Box>
        <Paper className="">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell width="15%">Alternatif</TableCell>
                <TableCell width="15%">Preferensi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preference.map((row) => (
                <TableRow key={row.alternative_code}>
                  <TableCell
                    width="15%"
                  >
                    {row.alternative_code}
                  </TableCell>
                  <TableCell width="15%">
                    {row.value.toFixed(5)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      <Gap height={40} width={0} />
      <Card className="main-card" sx={{ width: '50%' }}>
        <Box className="header">
          <Box
            sx={{ py: 1 }}
          >
            <Typography className="table-title">
              Hasil Akhir
            </Typography>
          </Box>
        </Box>
        <Paper className="">
          <Table aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
              <TableCell width="5%">No</TableCell>
                <TableCell width="15%">Alternatif</TableCell>
                <TableCell width="15%">Preferensi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row, i: number) => (
                <TableRow key={row.alternative_code}>
                  <TableCell width="5%">
                    {i+1}
                  </TableCell>
                  <TableCell width="15%">
                    {row.alternative_code}
                  </TableCell>
                  <TableCell width="15%">
                    {row.value.toFixed(5)}
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
