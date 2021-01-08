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
import { CurrencyMaskCustom, unmask } from "../../../helpers/MaskInput";
import { Query, Mutation } from "react-apollo";
import { CONSULTA_SERVICO, ATUALIZA_SERVICO } from "../../../graphql/servicos";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  preco: Yup.string().required(REQUIRED_MESSAGE),
});

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <CustomBreadcrumb
            parentLink="/servicos"
            parentLabel="Serviços"
            childrenLabel="Atualizar"
          />
          <Typography variant="h5" component="h2" color="primary">
            Atualizar Serviço
          </Typography>
          <br />
          <Query
            query={CONSULTA_SERVICO}
            variables={{ id: parseInt(props.match.params.id) }}
          >
            {({ data, loading }) => {
              if (loading) return null;
              const { servico } = data;
              const { id, nome, preco, descricao } = servico;

              return (
                <Mutation mutation={ATUALIZA_SERVICO}>
                  {(atualizaServico, data) => {
                    return (
                      <Formik
                        initialValues={{
                          nome,
                          preco,
                          descricao,
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                          const { id } = props.match.params;
                          values.preco = parseFloat(unmask(values.preco));
                          atualizaServico({ variables: { id, ...values } });
                          props.history.push("/servicos");
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
                              name="preco"
                              id="preco"
                              placeholder="Preencha aqui"
                              label="Preço"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                inputComponent: CurrencyMaskCustom,
                              }}
                              error={errors.preco && touched.preco}
                              helperText={
                                errors.preco && touched.preco ? (
                                  <div>{errors.preco}</div>
                                ) : null
                              }
                              onChange={handleChange}
                              value={values.preco}
                            />
                            <br />
                            <br />
                            <TextField
                              name="descricao"
                              id="descricao"
                              placeholder="Preencha aqui"
                              label="Descrição"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={errors.descricao && touched.descricao}
                              helperText={
                                errors.descricao && touched.descricao ? (
                                  <div>{errors.descricao}</div>
                                ) : null
                              }
                              onChange={handleChange}
                              value={values.descricao}
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
