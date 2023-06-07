import React, { Component } from 'react';
import { FormInput, SearchForm, FormButton, FormWrap } from './styled';
import { GoSearch } from 'react-icons/go';
<<<<<<< Updated upstream
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
=======
// import PropTypes from 'prop-types';

export class SearchBar extends Component {
>>>>>>> Stashed changes
  state = {
    imageName: '',
  };
  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
<<<<<<< Updated upstream
    const { imageName } = this.state;
    event.preventDefault();

    if (imageName.trim() === '') {
      Notify.warning('Empty line. Please enter something in the search field');
    }
    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;
=======
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Порожня строка');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
>>>>>>> Stashed changes
    return (
      <FormWrap>
        <header className="searchbar">
          <SearchForm onSubmit={this.handleSubmit}>
            <FormButton type="submit">
              <GoSearch size={'15px'} />
            </FormButton>

            <FormInput
              placeholder="Search images and photos"
<<<<<<< Updated upstream
              value={imageName}
=======
              value={this.state.imageName}
>>>>>>> Stashed changes
              onChange={this.handleNameChange}
            />
          </SearchForm>
        </header>
      </FormWrap>
    );
  }
}
