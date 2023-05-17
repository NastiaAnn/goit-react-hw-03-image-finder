import React, { Component } from 'react';

import { Overlay, StyledModal } from './styled';

export class Modal extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    // console.log({ largeImageURL });
    return (
      <Overlay>
        <StyledModal>{this.props.children}</StyledModal>
      </Overlay>
    );
  }
}
