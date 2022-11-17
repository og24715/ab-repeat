import * as React from "react";
import { useRef, useReducer, useCallback, useEffect } from "react";
import type { Reducer } from "react";

import { Action, initialState, reducer, State } from "./reducer";

interface Props {
  video: HTMLVideoElement;
}

const buttonTextDefinitionBySelectPartPhase = new Map([
  [0, "A-B"],
  [1, "A"],
  [2, "B"],
  [3, "X"],
]);

export function RepeatButton(props: Props): JSX.Element {
  const { video } = props;
  const timerId = useRef(0);
  const [{ aPart, bPart, selectPartPhase }, dispatch] = useReducer<
    Reducer<
      State,
      | Action<"start">
      | Action<"select-a-part", { time: number }>
      | Action<"select-b-part", { time: number }>
      | Action<"stop">
    >
  >(reducer, initialState);

  const handleStartButtonClick = useCallback(() => {
    dispatch({ type: "start", payload: undefined });
  }, [dispatch]);

  const handleAPartClick = useCallback(() => {
    dispatch({
      type: "select-a-part",
      payload: { time: video.currentTime },
    });
  }, [dispatch, video]);

  const handleBPartClick = useCallback(() => {
    dispatch({ type: "select-b-part", payload: { time: video.currentTime } });
  }, [dispatch, video]);

  const handleClickStopButton = useCallback(() => {
    dispatch({
      type: "stop",
      payload: undefined,
    });
    clearTimeout(timerId.current);
  }, [dispatch]);

  useEffect(() => {
    if (selectPartPhase === 3) {
      const _skip2APart = () => {
        video.currentTime = aPart;
        video.play();
      };

      const duration = (bPart - aPart) * 1000;
      _skip2APart();
      timerId.current = window.setInterval(() => {
        _skip2APart();
      }, duration);
    }
  }, [selectPartPhase, bPart, aPart, video]);

  const text = buttonTextDefinitionBySelectPartPhase.get(selectPartPhase);

  switch (selectPartPhase) {
    case 0:
      return (
        <button type="button" onClick={handleStartButtonClick}>
          {text}
        </button>
      );
    case 1:
      return (
        <button type="button" onClick={handleAPartClick}>
          {text}
        </button>
      );
    case 2:
      return (
        <button type="button" onClick={handleBPartClick}>
          {text}
        </button>
      );
    case 3:
      return (
        <button type="button" onClick={handleClickStopButton}>
          {text}
        </button>
      );
  }
}
