import { Formik } from 'formik';
import { Input, SearchForm, FormButton, FormWrap } from './styled';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';

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
            <GoSearch size={'20px'} />
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
