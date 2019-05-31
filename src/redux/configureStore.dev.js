import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// This is how you configure the redux store
export default function configureStore(initialState) {
  // adds support for redux dev toools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    // don't forget the parens to invoke the function or you will get a weird and unhelpful error.
    // reduxImmutableStateInvariant is Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
