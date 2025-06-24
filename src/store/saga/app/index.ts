import { all } from 'redux-saga/effects';

import { watchAppErrorHandlerSaga } from './appErrorHandler';
import { watchAppInitSaga } from './appInit';
import { watchSetLanguageSaga } from './setLanguage';

export default function* appSaga() {
  yield all([
    watchAppInitSaga(),
    watchAppErrorHandlerSaga(),
    watchSetLanguageSaga(),
  ]);
}
