import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AlternativeType } from "../../model";
import { useFormik } from "formik";
import Gap from "../../compoments/Gap";
import { useDispatch } from "react-redux";
import { addAlternative } from "../../redux/alternative/alternativeSlice";

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

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        addAlternative({
          id: Date.now().toString(),
          code: values.code,
          name: values.name,
          note: values.note,
        })
      );

      navigate("/alternative");
    },
  });

  return (
    <>
      <Box sx={{ mb: 2 }}
      >
        <Typography className="card-title">Tambah Alternatif</Typography>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Card className="main-card" sx={{ py: 4, px: 2 }}>
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
