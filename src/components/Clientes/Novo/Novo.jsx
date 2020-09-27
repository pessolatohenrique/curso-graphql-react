import React from "react";
import {
  REQUIRED_MESSAGE,
  TOO_SHORT_MESSAGE,
  TOO_LONG_MESSAGE,
} from "../../../constants";
import clientesApi from "../../../api/clientes";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  cpf: Yup.string().required(REQUIRED_MESSAGE),
});

const FormComponent = (props) => {
  const { values, isSubmitting, handleChange, errors, touched } = props;
  const { nome, cpf } = values;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" color="primary">
            Novo Cliente
          </Typography>
          <br />
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
                errors.nome && touched.nome ? <div>{errors.nome}</div> : null
              }
              onChange={handleChange}
              value={nome}
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
              error={errors.cpf && touched.cpf}
              helperText={
                errors.cpf && touched.cpf ? <div>{errors.cpf}</div> : null
              }
              onChange={handleChange}
              value={cpf}
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ nome: "", cpf: "" }),
  validationSchema: ValidationSchema,
  handleSubmit: (values, actions) => {
    clientesApi.adicionarCliente(values);
    actions.props.history.push("/clientes");
  },
})(FormComponent);
