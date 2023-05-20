import React, { Component } from 'react';
import { FormInput, SearchForm, FormButton, FormWrap } from './styled';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';

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
      alert('Порожня строка');
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