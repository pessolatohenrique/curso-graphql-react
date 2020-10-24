import React from "react";
import {
  REQUIRED_MESSAGE,
  TOO_SHORT_MESSAGE,
  TOO_LONG_MESSAGE,
} from "../../../constants";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { CpfMaskCustom, unmask } from "../../../helpers/MaskInput";
import { Mutation } from "react-apollo";
import { ADICIONA_CLIENTE } from "../../../graphql/clientes";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  cpf: Yup.string().required(REQUIRED_MESSAGE),
});

const INITIAL_VALUES = { nome: "", cpf: "" };

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" color="primary">
            Novo Cliente
          </Typography>
          <br />
          <Mutation mutation={ADICIONA_CLIENTE}>
            {(adicionaCliente, response) => {
              return (
                <Formik
                  initialValues={INITIAL_VALUES}
                  validationSchema={ValidationSchema}
                  onSubmit={(values, actions) => {
                    values.cpf = unmask(values.cpf);
                    adicionaCliente({ variables: values });
                    props.history.push("/clientes");
                  }}
                  render={({
                    errors,
                    touched,
                    values,
                    isSubmitting,
                    handleChange,
                  }) => (
                    <Form>
                      <TextField
                        name="nome"
                        id="nome"
                        placeholder="Preencha aqui"
                        label="Nome"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={errors.nome && touched.nome}
                        helperText={
                          errors.nome && touched.nome ? (
                            <div>{errors.nome}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.nome}
                      />
                      <br />
                      <br />
                      <TextField
                        name="cpf"
                        id="cpf"
                        placeholder="Preencha aqui"
                        label="CPF"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputComponent: CpfMaskCustom,
                        }}
                        error={errors.cpf && touched.cpf}
                        helperText={
                          errors.cpf && touched.cpf ? (
                            <div>{errors.cpf}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.cpf}
                      />
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Adicionar
                      </Button>
                    </Form>
                  )}
                ></Formik>
              );
            }}
          </Mutation>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormComponent;
