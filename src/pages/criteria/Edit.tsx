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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { AlternativeType, CriteriaType } from "../../model";
import { useFormik } from "formik";
import Gap from "../../compoments/Gap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlternative,
  editAlternative,
} from "../../redux/alternative/alternativeSlice";
import { editCriteria } from "../../redux/criteria/criteriaSlice";

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

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const data = useSelector((state: any) => state.criteria);

  useEffect(() => {
    let criteria = data.find((d: CriteriaType) => d.id == id);
    formik.setFieldValue("code", criteria.code);
    formik.setFieldValue("name", criteria.name);
    formik.setFieldValue("note", criteria.note);
    formik.setFieldValue("weight", criteria.weight);
    formik.setFieldValue("attribute", criteria.attribute);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        editCriteria({
          id: id!,
          code: values.code,
          name: values.name,
          note: values.note,
          attribute: values.attribute,
          weight: values.weight,
        })
      );

      navigate("/criteria");
    },
  });

  return (
    <>
      <Box sx={{ mb: 2 }}
      >
        <Typography className="card-title">Edit Criteria</Typography>
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
                label="Kode Kriteria"
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
                label="Nama Kriteria"
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
                label="Catatan"
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
