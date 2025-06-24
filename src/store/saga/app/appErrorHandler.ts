import { AppActionTypes, IRequestAppErrorHandler } from '@actionTypes';
import { showAlert } from '@helpers';
import { call, takeLatest } from 'redux-saga/effects';

function* handleAppErrorHandlerSaga({
  payload: { e },
}: IRequestAppErrorHandler) {
  try {
    // TODO: Only for developing
    yield call(
      showAlert,
      'Error',
      `message: ${e?.message}, data: ${JSON.stringify(e?.response?.data)}`,
    );
  } catch (error) {
    console.error(error);
  }
}

export function* watchAppErrorHandlerSaga() {
  yield takeLatest(
    AppActionTypes.APP_ERROR_HANDLER_SAGA,
    handleAppErrorHandlerSaga,
  );
}
