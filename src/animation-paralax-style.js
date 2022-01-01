// Copyright 2022 manufosela.
// SPDX-License-Identifier: MIT

import { css } from 'lit';

export const animationParalaxStyles = css`
  :host,
  :root {
    display: block;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    overflow: hidden;
  }

  .paralax {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  .paralax .layer {
    position: absolute;
    width: 400%;
  }

  @keyframes slideshow {
    0% {
      left: 0;
    }
    100% {
      left: -200%;
    }
  }
`;
