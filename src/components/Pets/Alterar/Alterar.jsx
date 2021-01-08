import React from "react";
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import CustomBreadcrumb from "../../Utilitarios/CustomBreadcrumb";
import { Query, Mutation } from "react-apollo";
import { LISTA_CLIENTES } from "../../../graphql/clientes";
import { CONSULTA_PET, ATUALIZA_PET } from "../../../graphql/pets";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  donoId: Yup.string().required(REQUIRED_MESSAGE),
  tipo: Yup.string().required(REQUIRED_MESSAGE),
  observacoes: Yup.string(),
});

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <CustomBreadcrumb
            parentLink="/pets"
            parentLabel="Pets"
            childrenLabel="Atualizar"
          />
          <Typography variant="h5" component="h2" color="primary">
            Atualizar Pet
          </Typography>
          <br />
          <Query
            query={CONSULTA_PET}
            variables={{ id: parseInt(props.match.params.id) }}
          >
            {({ data, loading }) => {
              if (loading) return null;
              const { pet } = data;
              const { id, nome, dono, tipo, observacoes } = pet;

              return (
                <Mutation mutation={ATUALIZA_PET}>
                  {(atualizaPet, data) => {
                    return (
                      <Formik
                        initialValues={{
                          nome,
                          donoId: dono.id,
                          tipo,
                          observacoes,
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                          const { id } = props.match.params;
                          values.donoId = parseInt(values.donoId);
                          atualizaPet({ variables: { id, ...values } });
                          props.history.push("/pets");
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

                            <Query query={LISTA_CLIENTES}>
                              {({ data, response }) => {
                                if (!data) return null;

                                return (
                                  <FormControl
                                    fullWidth
                                    error={errors.donoId && touched.donoId}
                                  >
                                    <InputLabel id="donoId">Dono</InputLabel>
                                    <Select
                                      labelId="donoId"
                                      id="donoId"
                                      name="donoId"
                                      label="Dono"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={handleChange}
                                      value={values.donoId}
                                    >
                                      {data.clientes.map((cliente) => (
                                        <MenuItem
                                          value={cliente.id}
                                          key={cliente.id}
                                        >
                                          {cliente.nome}
                                        </MenuItem>
                                      ))}
                                      ;
                                    </Select>
                                    {errors.donoId && touched.donoId && (
                                      <FormHelperText>
                                        {errors.donoId}
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                );
                              }}
                            </Query>
                            <br />
                            <br />
                            <TextField
                              name="tipo"
                              id="tipo"
                              placeholder="Preencha aqui"
                              label="Tipo"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={errors.tipo && touched.tipo}
                              helperText={
                                errors.tipo && touched.tipo ? (
                                  <div>{errors.tipo}</div>
                                ) : null
                              }
                              onChange={handleChange}
                              value={values.tipo}
                            />
                            <br />
                            <br />
                            <TextField
                              name="observacoes"
                              id="observacoes"
                              placeholder="Preencha aqui"
                              label="Observações"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={errors.observacoes && touched.observacoes}
                              helperText={
                                errors.observacoes && touched.observacoes ? (
                                  <div>{errors.observacoes}</div>
                                ) : null
                              }
                              onChange={handleChange}
                              value={values.observacoes}
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
