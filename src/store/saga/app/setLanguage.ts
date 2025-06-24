import { requestAppErrorHandler } from '@actions';
import { AppActionTypes } from '@actionTypes';
import { LANGUAGES, LanguageType } from '@constants';
import { getLanguage, setLanguage } from '../../slices/appSlice';
import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import i18n from '../../../localization';
import { createOrUpdateUser, getCurrentUser } from '../../../firebase/auth';

function* handleSetLanguageSaga() {
  try {
    const language: LanguageType = yield select(getLanguage);
    const newLanguage = language === LANGUAGES.en ? LANGUAGES.es : LANGUAGES.en;

    yield put(setLanguage(newLanguage));
    yield call([i18n, i18n.changeLanguage], newLanguage);

    // Update language in Firebase
    const currentUser = getCurrentUser();
    if (currentUser) {
      yield call(createOrUpdateUser, currentUser.uid, { language: newLanguage });
    }

    // Adding a short delay to ensure that the state update completes before proceeding.
    yield delay(100);
  } catch (e) {
    yield put(requestAppErrorHandler({ e }));
  }
}

export function* watchSetLanguageSaga() {
  yield takeLeading(AppActionTypes.SET_LANGUAGE_SAGA, handleSetLanguageSaga);
}
