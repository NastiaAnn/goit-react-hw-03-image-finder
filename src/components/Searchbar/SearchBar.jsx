import React, { Component } from 'react';
import { FormInput, SearchForm, FormButton, FormWrap } from './styled';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    imageName: '',
  };
  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
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
    return (
      <FormWrap>
        <header className="searchbar">
          <SearchForm onSubmit={this.handleSubmit}>
            <FormButton type="submit">
              <GoSearch size={'15px'} />
            </FormButton>

            <FormInput
              placeholder="Search images and photos"
              value={imageName}
              onChange={this.handleNameChange}
            />
          </SearchForm>
        </header>
      </FormWrap>
    );
  }
}
