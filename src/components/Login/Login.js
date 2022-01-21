import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import LoaderBtn from '../Loaders/Button/LoaderBtn';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { alkemyData, baseUrl } from '../../utils/api/alkemy';
import { TOAST_ACTIONS } from '../../utils/reducers/toastReducer';
import * as Yup from 'yup';
import './Login.css';

export default function Login() {
  const [loader, setLoader] = useState(false);
  const auth = useAuth();
  const { toastDispatch } = useToast();

  async function postingUser() {
    try {
      setLoader(true);
      const query = baseUrl('');
      const res = await query.post(alkemyData);
      const data = res.data;
      const token = data.token;
      auth.login(token);
      toastDispatch({
        type: TOAST_ACTIONS.ADD,
        payload: {
          title: 'Batibienvenida',
          message: 'Iniciaste sesión exitosamente',
        },
      });
    } catch (err) {
      toastDispatch({
        type: TOAST_ACTIONS.ADD,
        payload: {
          title: 'API problemas',
          message: `${err}`,
        },
      });
    } finally {
      setLoader(false);
    }
  }

  // Validate email and password
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'La clave debe tener un mínimo de 6 caracteres')
      .max(50, 'La clave debe tener un máximo de 50 caracteres')
      .required('Por favor, ingresá una clave'),
    email: Yup.string()
      .email('Por favor, ingresá un correo válido')
      .required('Ingresá tu correo'),
  });

  return (
    <Container fluid className='login-bg'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={schema}
        // validate={(val) => {
        //   const formErr = {};

        //   // Validate email
        //   if (!val.email) {
        //     formErr.email = "Por favor, ingresá un correo";
        //   } else if (
        //     !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val.email)
        //   ) {
        //     formErr.email = "Por favor, ingresá un correo válido";
        //   }

        //   // Validate password
        //   if (!val.password) {
        //     formErr.password = "Por favor, ingresá una clave";
        //   } else if (
        //     !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(val.password)
        //   ) {
        //     formErr.password =
        //       "La clave debe tener un mínimo de 6 y un máximo de 50 caracteres e incluir al menos una letra y un número";
        //   }

        //   return formErr;
        // }}
        onSubmit={postingUser}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <div className='login-container'>
            <Form className='p-4' onSubmit={handleSubmit}>
              <h1 className='mb-4'>Iniciá sesión</h1>
              <Form.Group className='mb-3'>
                <Form.Label visuallyHidden={true}>
                  Correo electrónico
                </Form.Label>
                <Form.Control
                  type='email'
                  value={values.email}
                  placeholder='Correo electrónico'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='email'
                />
                {touched.email && errors.email && <small>{errors.email}</small>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label visuallyHidden={true}>Contraseña</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Contraseña'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name='password'
                />
                {touched.password && errors.password && (
                  <small>{errors.password}</small>
                )}
              </Form.Group>
              {loader ? (
                <LoaderBtn text='Enviando...' />
              ) : (
                <Button className='w-100' variant='primary' type='submit'>
                  Enviar
                </Button>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </Container>
  );
}
