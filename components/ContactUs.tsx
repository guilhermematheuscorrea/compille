import { useState } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { FaSpinner } from 'react-icons/fa'
import ErrorMessage from './ErrorMessage'
import ErrorMessageBox from './ErrorMessageBox'
import SuccessMessageBox from './SuccessMessageBox'
import { api } from '../hooks/fetch'
import { normalizeTelephone } from '../helpers'

interface FormValues {
  email: string
  name: string
  message: string
  telephone: string
}

export default function ContactUs() {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <section
      id="fale-conosco"
      className="text-gray-600 pt-20 body-font relative"
    >
      <div className="flex flex-col justify-between items-center">
        <h2 className="text-blue-500 font-semibold text-4xl">Fale Conosco</h2>
      </div>
      <div className="container mx-auto py-24 flex justify-center items-center">
        {/* <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight={0}
            marginWidth={0}
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=pt_br&q=RECIFE+PE&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
          />
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                Endereço
              </h2>
              <p className="mt-1">Rua Av.Compille 1001, 1001</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                Email
              </h2>
              <a className="text-blue-500 leading-relaxed">
                compille@email.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                Telefone
              </h2>
              <p className="leading-relaxed">(81) 9999-9999</p>
            </div>
          </div>
        </div>

        md:ml-auto => mx-auto

      */}
        <Formik
          initialValues={{
            email: '',
            name: '',
            telephone: '',
            message: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Endereço de email inválido')
              .required('Email obrigátorio'),
            name: Yup.string().required('Nome obrigátorio'),
            message: Yup.string().required('Mensagem obrigátoria')
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            setSuccessMsg('')
            setErrorMsg('')
            try {
              await api.post(
                'http://localhost:5000/sendmail/contact-us',
                values
              )
              setSuccessMsg(
                'Sua mensagem foi enviada com sucesso! Em breve, nossa equipe entrará em contato com você.'
              )
            } catch (error) {
              setErrorMsg(
                'Ocorreu um erro ao enviar a mensagem, tente novamente mais tarde.'
              )
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <>
              <Form className="p-8 rounded-md bg-white flex flex-col w-full shadow-xl">
                {errorMsg && (
                  <div className="mb-6">
                    <ErrorMessageBox>{errorMsg}</ErrorMessageBox>
                  </div>
                )}

                {successMsg && (
                  <div className="mb-6">
                    <SuccessMessageBox>{successMsg}</SuccessMessageBox>
                  </div>
                )}

                <div className="flex space-x-10">
                  <div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="name"
                        className="text-black-400 font-semibold"
                      >
                        Nome
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                          errors.name && touched.name && 'border-red-500'
                        }`}
                      />
                      {errors.name && touched.name && (
                        <ErrorMessage>{errors.name}</ErrorMessage>
                      )}
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="email"
                        className="text-black-400 font-semibold"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                          errors.email && touched.email && 'border-red-500'
                        }`}
                      />
                      {errors.email && touched.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="telephone"
                        className="text-black-400 font-semibold"
                      >
                        Telefone (opcional)
                      </label>
                      <Field
                        type="telephone"
                        id="telephone"
                        name="telephone"
                        value={normalizeTelephone(values.telephone)}
                        className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                          errors.telephone &&
                          touched.telephone &&
                          'border-red-500'
                        }`}
                      />
                      {errors.telephone && touched.telephone && (
                        <ErrorMessage>{errors.telephone}</ErrorMessage>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 relative mb-4">
                    <label
                      htmlFor="message"
                      className="text-black-400 font-semibold"
                    >
                      Mensagem
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      className={`w-full h-52 bg-white rounded border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${
                        errors.message && touched.message && 'border-red-500'
                      }`}
                    />
                    {errors.message && touched.message && (
                      <ErrorMessage>{errors.message}</ErrorMessage>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-6 w-40 primary-btn flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin" size={24} />
                    ) : (
                      'ENVIAR'
                    )}
                  </button>
                </div>

                {/* <p className="text-xs text-gray-500 mt-3">
                  Chicharrones blog helvetica normcore iceland tousled brook
                  viral artisan.
                </p> */}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </section>
  )
}
