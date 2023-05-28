import {
  Box,
  Typography,
  Breadcrumbs,
  Button,
  Card,
  Link,
  TextField,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { AlternativeType } from "../../model";
import { useFormik } from "formik";
import Gap from "../../compoments/Gap";
import { useDispatch, useSelector } from "react-redux";
import { addAlternative, editAlternative } from "../../redux/alternative/alternativeSlice";

const validationSchema = yup.object({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  note: yup.string().nullable(),
});

const initialValues: AlternativeType = {
  id: "",
  name: "",
  code: "",
  note: "",
};

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id
  const data = useSelector((state: any) => state.alternative);
  
  useEffect(() => {
    let alternative = data.find((d: AlternativeType) => d.id == id)
    formik.setFieldValue('code', alternative.code)
    formik.setFieldValue('name', alternative.name)
    formik.setFieldValue('note', alternative.note)
  }, [])
  

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        editAlternative({
          id: id!,
          code: values.code,
          name: values.name,
          note: values.note,
        })
      );

      navigate('/alternative')
    },
  });

  return (
    <>
      <Box sx={{ mb: 2 }}
      >
        <Typography className="card-title">Edit Alternatif</Typography>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Card className="main_card" sx={{ py: 4, px: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                className="input_form"
                id="code"
                name="code"
                label="Kode Alternatif"
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
                label="Nama Alternatif"
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
