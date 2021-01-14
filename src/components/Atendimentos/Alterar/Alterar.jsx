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
import { LISTA_PETS } from "../../../graphql/pets";
import { LISTA_SERVICOS } from "../../../graphql/servicos";
import {
  CONSULTA_ATENDIMENTO,
  ATUALIZA_ATENDIMENTO,
} from "../../../graphql/atendimentos";

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

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <CustomBreadcrumb
            parentLink="/atendimentos"
            parentLabel="Atendimentos"
            childrenLabel="Atualizar"
          />
          <Typography variant="h5" component="h2" color="primary">
            Atualizar Atendimentos
          </Typography>
          <br />
          <Query
            query={CONSULTA_ATENDIMENTO}
            variables={{ id: parseInt(props.match.params.id) }}
          >
            {({ data, loading }) => {
              if (loading) return null;
              const { atendimento } = data;
              const {
                status,
                observacoes,
                cliente,
                pet,
                servico,
              } = atendimento;

              console.log("cliente", cliente, pet, servico);

              return (
                <Mutation mutation={ATUALIZA_ATENDIMENTO}>
                  {(atualizaAtendimento, data) => {
                    return (
                      <Formik
                        initialValues={{
                          status,
                          observacoes,
                          clienteId: cliente.id,
                          petId: pet.id,
                          servicoId: servico.id,
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                          const { id } = props.match.params;
                          values = {
                            ...values,
                            clienteId: parseInt(values.clienteId),
                            petId: parseInt(values.petId),
                            servicoId: parseInt(values.servicoId),
                          };

                          console.log({ id, ...values });

                          atualizaAtendimento({ variables: { id, ...values } });
                          props.history.push("/atendimentos");
                        }}
                        render={({
                          errors,
                          touched,
                          values,
                          isSubmitting,
                          handleChange,
                        }) => (
                          <Form>
                            <Query query={LISTA_CLIENTES}>
                              {({ data, response }) => {
                                if (!data) return null;

                                return (
                                  <FormControl
                                    fullWidth
                                    error={
                                      errors.clienteId && touched.clienteId
                                    }
                                  >
                                    <InputLabel id="clienteId">
                                      Cliente
                                    </InputLabel>
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
                                        <MenuItem
                                          value={cliente.id}
                                          key={cliente.id}
                                        >
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
                                      <FormHelperText>
                                        {errors.petId}
                                      </FormHelperText>
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
                                    error={
                                      errors.servicoId && touched.servicoId
                                    }
                                  >
                                    <InputLabel id="servicoId">
                                      Serviço
                                    </InputLabel>
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
                                        <MenuItem
                                          value={servico.id}
                                          key={servico.id}
                                        >
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
