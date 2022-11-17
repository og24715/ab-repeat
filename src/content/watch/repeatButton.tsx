import * as React from "react";
import { Component } from "react";

interface Props {
  video: HTMLVideoElement
}

export default class RepeatButton extends Component<Props> {
  buttonTextDefinitionBySelectPartPhase = new Map([
    [0, 'A-B'],
    [1, 'A'],
    [2, 'B'],
    [3, 'X'],
  ]);
  timerId: number = 0;
  state = {
    aPart: 0,
    bPart: 0,
    selectPartPhase: 0,
  };

  _startSelectingPart() {
    this.setState({
      selectPartPhase: this.state.selectPartPhase + 1,
      aPart: 0,
      bPart: 0,
    });
  }

  _selectAPart() {
    this.setState({
      selectPartPhase: this.state.selectPartPhase + 1,
      aPart: this.props.video.currentTime,
    });
  }

  _selectBPart() {
    this.setState(
      {
        selectPartPhase: this.state.selectPartPhase + 1,
        bPart: this.props.video.currentTime,
      },
      () => {
        const duration = (this.state.bPart - this.state.aPart) * 1000;
        this._skip2APart();
        this._repeatVideo(duration);
      },
    );
  }

  _repeatVideo(duration) {
    this.timerId = window.setTimeout(() => {
      this._skip2APart();
      this._repeatVideo(duration);
    }, duration);
  }

  _skip2APart() {
    this.props.video.currentTime = this.state.aPart;
    this.props.video.play();
  }

  _stopRepeat() {
    clearTimeout(this.timerId);
    this.setState({
      selectPartPhase: 0,
    });
  }

  _onClick = () => {
    switch (this.state.selectPartPhase) {
      case 0: // Start selecting A Part
        this._startSelectingPart();
        break;
      case 1: // Start selecting B Part
        this._selectAPart();
        break;
      case 2: // Repeat A-B!
        this._selectBPart();
        break;
      case 3: // Cancel Repeat
        this._stopRepeat();
        break;
      default:
    }
  }

  _buttonText() {
    return this.buttonTextDefinitionBySelectPartPhase.get(this.state.selectPartPhase);
  }

  render() {
    return (
      <button
        onClick={this._onClick}
      >
        {this._buttonText()}
      </button>
    );
  }
}
