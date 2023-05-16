import { Formik, Form, Field } from 'formik';

export const SearchBar = ({ onSubmit, isSubmitting }) => {
  const handleSubmit = (values, actions) => {
    if (values.searchedImg.trim() === '') {
      return alert('Порожня строка');
    }
    onSubmit(values).then(() => actions.setSubmitting(false));
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ searchedImg: '' }} onSubmit={handleSubmit}>
      <Form>
        <button type="submit" className="button" disabled={isSubmitting}>
          <span className="button-label">Search</span>
        </button>

        <Field
          type="text"
          placeholder="Search images and photos"
          name="searchedImg"
        />
      </Form>
    </Formik>
  );
};
