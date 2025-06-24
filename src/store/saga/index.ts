import { all } from 'redux-saga/effects';

import appSaga from './app';

export function* rootSaga() {
  yield all([appSaga()]);
}
