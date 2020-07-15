import { useReducer, Reducer } from 'react';

enum ActionTypes {
  SET_QUERY = 'SET_QUERY',
  SET_SHOULD_REVALIDATE = 'SET_SHOULD_REVALIDATE',
}

type ContextReturn = {
  query: string;
  shouldRevalidate: boolean;
  setQuery: (query: string) => void;
  setShouldRevalidate: (shouldRevalidate: boolean) => void;
};

type Action =
  | { type: ActionTypes.SET_QUERY; payload: string }
  | { type: ActionTypes.SET_SHOULD_REVALIDATE; payload: boolean };

type State = {
  query: string;
  shouldRevalidate: boolean;
};

const INITIAL_STATE: State = {
  query: '',
  shouldRevalidate: false,
};

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case ActionTypes.SET_QUERY:
      return { ...prevState, query: action.payload };
    case ActionTypes.SET_SHOULD_REVALIDATE:
      return { ...prevState, shouldRevalidate: action.payload };
    default:
      return { ...prevState };
  }
};

export const useGlobalContext = (): ContextReturn => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return {
    query: state.query,
    setQuery: (query: string) => {
      dispatch({ type: ActionTypes.SET_QUERY, payload: query });
    },
    shouldRevalidate: state.shouldRevalidate,
    setShouldRevalidate: (shouldRevalidate: boolean) => {
      dispatch({
        type: ActionTypes.SET_SHOULD_REVALIDATE,
        payload: shouldRevalidate,
      });
    },
  };
};
