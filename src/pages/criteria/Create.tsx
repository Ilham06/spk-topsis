import {
  Box,
  Typography,
  Breadcrumbs,
  Button,
  Card,
  Link,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AlternativeType, CriteriaType } from "../../model";
import { useFormik } from "formik";
import Gap from "../../compoments/Gap";
import { useDispatch } from "react-redux";
import { addAlternative } from "../../redux/alternative/alternativeSlice";
import { addCriteria } from "../../redux/criteria/criteriaSlice";

const validationSchema = yup.object({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  note: yup.string().nullable(),
  weight: yup.string().required("Bobot is required"),
  attribute: yup.string().required("Atribut is required"),
});

const initialValues: CriteriaType = {
  id: "",
  name: "",
  code: "",
  weight: 0,
  attribute: "benefit",
  note: "",
};

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        addCriteria({
          id: Date.now().toString(),
          code: values.code,
          name: values.name,
          note: values.note,
          attribute: values.attribute,
          weight: values.weight
        })
      );

      navigate("/criteria");
    },
  });

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
          <Typography className="section-header">Tambah Criteria</Typography>
        </Box>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Card className="main_card" sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                className="input_form"
                id="code"
                name="code"
                label="Code"
                type="text"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />

              <Gap height={20} width={0} />

              <TextField
                fullWidth
                className="input_form"
                id="name"
                name="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <Gap height={20} width={0} />

              <TextField
                fullWidth
                multiline
                rows={4}
                className="input_form"
                id="note"
                name="note"
                label="Note"
                type="text"
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
              />

              <Gap height={20} width={0} />

              <TextField
                fullWidth
                className="input_form"
                id="weight"
                name="weight"
                label="Bobot"
                type="number"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />

              <Gap height={20} width={0} />

              <FormControl fullWidth>
                <InputLabel id="attribute">Atribut</InputLabel>
                <Select
                  labelId="attribute"
                  id="attribute"
                  value={formik.values.attribute}
                  label="Atribut"
                  name="attribute"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={"benefit"}>Benefit</MenuItem>
                  <MenuItem value={"cost"}>Cost</MenuItem>
                </Select>
              </FormControl>

              <Gap height={20} width={0} />

              <Button
                variant="contained"
                onClick={() => {
                  formik.submitForm();
                }}
              >
                Submit
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
