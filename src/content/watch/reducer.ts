export interface State {
  aPart: number;
  bPart: number;
  selectPartPhase: 0 | 1 | 2 | 3;
}

export const initialState: State = { aPart: 0, bPart: 0, selectPartPhase: 0 };

export type Action<Type extends string, Payload = undefined> = {
  type: Type;
  payload: Payload;
};

export function reducer(
  state: State,
  action:
    | Action<"start">
    | Action<"select-a-part", { time: number }>
    | Action<"select-b-part", { time: number }>
    | Action<"stop">
): State {
  switch (action.type) {
    case "start":
      return { aPart: 0, bPart: 0, selectPartPhase: 1 };
    case "select-a-part":
      return {
        ...state,
        aPart: action.payload.time,
        selectPartPhase: 2,
      };
    case "select-b-part":
      return {
        ...state,
        bPart: action.payload.time,
        selectPartPhase: 3,
      };
    case "stop":
      return {
        ...state,
        selectPartPhase: 0,
      };
  }
}