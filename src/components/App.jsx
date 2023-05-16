import React, { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/Api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
  };

  getImages = async values => {
    try {
      this.setState({ isLoading: true });
      const images = await API.getImages(values);
      this.setState({ images: images.hits });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    console.log(this.state.images);
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar
          onSubmit={this.getImages}
          isSubmitting={this.state.isLoading}
        />
        {this.state.isLoading && <div>Loading</div>}
        {this.state.images.length > 0 ? (
          <ImageGallery
            searchedImg={this.state.searchedImg}
            items={this.state.images}
          />
        ) : null}
      </div>
    );
  }
}
