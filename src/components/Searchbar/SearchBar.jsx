import { Formik } from 'formik';
import { Input, SearchForm, FormButton, FormWrap } from './styled';

export const SearchBar = ({ onSubmit, isSubmitting }) => {
  const handleSubmit = (values, actions) => {
    if (values.searchedImg.trim() === '') {
      return alert('Порожня строка');
    }
    onSubmit(values).then(() => actions.setSubmitting(false));
    actions.resetForm();
  };

  return (
    <FormWrap>
      <Formik initialValues={{ searchedImg: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <FormButton type="submit" className="button" disabled={isSubmitting}>
            <span className="button-label">Search</span>
          </FormButton>

          <Input
            type="text"
            placeholder="Search images and photos"
            name="searchedImg"
          />
        </SearchForm>
      </Formik>
    </FormWrap>
  );
};
