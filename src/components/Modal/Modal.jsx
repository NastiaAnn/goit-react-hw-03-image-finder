import React, { Component } from 'react';

import { Overlay, StyledModal } from './styled';

export class Modal extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <Overlay>
        <StyledModal>
          <img src="" alt="" />
        </StyledModal>
      </Overlay>
    );
  }
}
