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
import {
  AlternativeCriteriaType,
  AlternativeType,
  CriteriaType,
} from "../../model";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Gap from "../../compoments/Gap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlternative,
  editAlternative,
} from "../../redux/alternative/alternativeSlice";
import { addAlternativeCriteria } from "../../redux/alternative-criteria/alternativeCriteriaSlice";

const validationSchema = yup.object({
  criterias: yup.array().of(
    yup.object().shape({
      value: yup.string().required("Value is required"),
    })
  ),
});

interface IInitialValues {
  criterias: AlternativeCriteriaType[];
}

const initialValues: IInitialValues = {
  criterias: [],
};

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const criteria = useSelector((state: any) => state.criteria);
  const alternative = useSelector((state: any) => state.alternative);
  const [selectedAlternative, setSelectedAlternative] = useState<AlternativeType | null>(null)
  let alternativeCriteria: AlternativeCriteriaType[] = [];

  useEffect(() => {
    let selected = alternative.find((d: AlternativeType) => d.code == id)
    setSelectedAlternative(selected);
    
    criteria.forEach((c: CriteriaType, i: number) => {
      alternativeCriteria[i] = {
        alternative_code: id!,
        criteria_code: c.code,
        value: 0,
      };
    });

    formik.setFieldValue("criterias", alternativeCriteria);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        editAlternative({
          id: selectedAlternative?.id!,
          code: selectedAlternative?.code!,
          name: selectedAlternative?.name!,
          note: selectedAlternative?.note!,
          criterias: values.criterias
        })
      );

      dispatch(addAlternativeCriteria({
        alternative_code: id!,
        criterias: values.criterias
      }))

      navigate("/calculate");
    },
  });

  return (
    <>
      <Box sx={{ mb: 2 }}
      >
        <Typography className="card-title">Update Nilai Perbandingan</Typography>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Card className="main-card" sx={{ py: 4, px: 2 }}>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <FieldArray name="criterias">
                  {(fieldArrayProps) => {
                    const { form } = fieldArrayProps;
                    const { values } = form;
                    const { criterias } = values;

                    return (
                      <div>
                        {criterias.map(
                          (c: AlternativeCriteriaType, index: any) => (
                            <div key={index}>
                              <TextField
                                fullWidth
                                className="input_form"
                                id="value"
                                name={`criterias[${index}].value`}
                                label={`Criteria ${c.criteria_code}`}
                                type="number"
                                value={formik.values.criterias[index].value}
                                onChange={formik.handleChange}
                                error={Boolean(
                                  (formik.touched.criterias && formik.touched.criterias[index]) && (formik.errors.criterias && formik.errors.criterias[index])
                                )}
                                helperText={
                                  Boolean(
                                    (formik.touched.criterias && formik.touched.criterias[index]) && (formik.errors.criterias && formik.errors.criterias[index])
                                  ) && `Criteria ${c.criteria_code} harus diisi`
                                }
                              />

                              <Gap height={20} width={0} />
                            </div>
                          )
                        )}
                      </div>
                    );
                  }}
                </FieldArray>

                <Button
                  variant="contained"
                  onClick={() => {
                    formik.submitForm();
                  }}
                >
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
