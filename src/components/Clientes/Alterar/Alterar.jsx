import React from "react";
import clientesApi from "../../../api/clientes";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  REQUIRED_MESSAGE,
  TOO_SHORT_MESSAGE,
  TOO_LONG_MESSAGE,
} from "../../../constants";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import CustomBreadcrumb from "../../Utilitarios/CustomBreadcrumb";
import { CpfMaskCustom, unmask } from "../../../helpers/MaskInput";
import { Query, Mutation } from "react-apollo";
import { CONSULTA_CLIENTE, ATUALIZA_CLIENTE } from "../../../graphql/clientes";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  cpf: Yup.string().required(REQUIRED_MESSAGE),
});

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <CustomBreadcrumb
            parentLink="/clientes"
            parentLabel="Clientes"
            childrenLabel="Atualizar"
          />
          <Typography variant="h5" component="h2" color="primary">
            Atualizar Cliente
          </Typography>
          <br />
          <Query
            query={CONSULTA_CLIENTE}
            variables={{ id: parseInt(props.match.params.id) }}
          >
            {({ data, loading }) => {
              if (loading) return null;

              const { cliente } = data;
              const { nome, cpf } = cliente;

              return (
                <Mutation mutation={ATUALIZA_CLIENTE}>
                  {(atualizaCliente, data) => {
                    return (
                      <Formik
                        initialValues={{ nome, cpf }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                          const { id } = props.match.params;
                          values.cpf = unmask(values.cpf);
                          atualizaCliente({ variables: { id, ...values } });
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
                              Atualizar
                            </Button>
                          </Form>
                        )}
                      ></Formik>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormComponent;
