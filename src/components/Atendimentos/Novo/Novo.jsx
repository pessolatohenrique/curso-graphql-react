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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import { ADICIONA_ATENDIMENTO } from "../../../graphql/atendimentos";
import { LISTA_CLIENTES } from "../../../graphql/clientes";
import { LISTA_PETS } from "../../../graphql/pets";
import { LISTA_SERVICOS } from "../../../graphql/servicos";

const ValidationSchema = Yup.object().shape({
  status: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  observacoes: Yup.string().required(REQUIRED_MESSAGE),
  clienteId: Yup.string().required(REQUIRED_MESSAGE),
  petId: Yup.string().required(REQUIRED_MESSAGE),
  servicoId: Yup.string().required(REQUIRED_MESSAGE),
});

const INITIAL_VALUES = {
  status: "",
  observacoes: "",
  clienteId: "",
  petId: "",
  servicoId: "",
};

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" color="primary">
            Novo Atendimento
          </Typography>
          <br />
          <Mutation mutation={ADICIONA_ATENDIMENTO}>
            {(adicionaAtendimento, response) => (
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={ValidationSchema}
                onSubmit={(values, actions) => {
                  values = {
                    ...values,
                    clienteId: parseInt(values.clienteId),
                    petId: parseInt(values.petId),
                    servicoId: parseInt(values.servicoId),
                  };

                  adicionaAtendimento({ variables: values });
                  props.history.push("/atendimentos");
                }}
                render={({
                  errors,
                  touched,
                  values,
                  isSubmitting,
                  handleChange,
                }) => {
                  return (
                    <Form>
                      <Query query={LISTA_CLIENTES}>
                        {({ data, response }) => {
                          if (!data) return null;

                          return (
                            <FormControl
                              fullWidth
                              error={errors.clienteId && touched.clienteId}
                            >
                              <InputLabel id="clienteId">Cliente</InputLabel>
                              <Select
                                labelId="clienteId"
                                id="clienteId"
                                name="clienteId"
                                label="Dono"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.clienteId}
                              >
                                {data.clientes.map((cliente) => (
                                  <MenuItem value={cliente.id} key={cliente.id}>
                                    {cliente.nome}
                                  </MenuItem>
                                ))}
                                ;
                              </Select>
                              {errors.clienteId && touched.clienteId && (
                                <FormHelperText>
                                  {errors.clienteId}
                                </FormHelperText>
                              )}
                            </FormControl>
                          );
                        }}
                      </Query>
                      <br />
                      <br />
                      <Query query={LISTA_PETS}>
                        {({ data, response }) => {
                          if (!data) return null;

                          return (
                            <FormControl
                              fullWidth
                              error={errors.petId && touched.petId}
                            >
                              <InputLabel id="petId">Pet</InputLabel>
                              <Select
                                labelId="petId"
                                id="petId"
                                name="petId"
                                label="Dono"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.petId}
                              >
                                {data.pets.map((pet) => (
                                  <MenuItem value={pet.id} key={pet.id}>
                                    {pet.nome}
                                  </MenuItem>
                                ))}
                                ;
                              </Select>
                              {errors.petId && touched.petId && (
                                <FormHelperText>{errors.petId}</FormHelperText>
                              )}
                            </FormControl>
                          );
                        }}
                      </Query>
                      <br />
                      <br />
                      <Query query={LISTA_SERVICOS}>
                        {({ data, response }) => {
                          if (!data) return null;

                          return (
                            <FormControl
                              fullWidth
                              error={errors.servicoId && touched.servicoId}
                            >
                              <InputLabel id="servicoId">Serviço</InputLabel>
                              <Select
                                labelId="servicoId"
                                id="servicoId"
                                name="servicoId"
                                label="Dono"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.servicoId}
                              >
                                {data.servicos.map((servico) => (
                                  <MenuItem value={servico.id} key={servico.id}>
                                    {servico.nome}
                                  </MenuItem>
                                ))}
                                ;
                              </Select>
                              {errors.servicoId && touched.servicoId && (
                                <FormHelperText>
                                  {errors.servicoId}
                                </FormHelperText>
                              )}
                            </FormControl>
                          );
                        }}
                      </Query>
                      <br />
                      <br />
                      <TextField
                        name="status"
                        id="status"
                        placeholder="Preencha aqui"
                        label="Status"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={errors.status && touched.status}
                        helperText={
                          errors.status && touched.status ? (
                            <div>{errors.status}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.status}
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
                        Adicionar
                      </Button>
                    </Form>
                  );
                }}
              ></Formik>
            )}
          </Mutation>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormComponent;
