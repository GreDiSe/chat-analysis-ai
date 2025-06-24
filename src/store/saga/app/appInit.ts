import { requestAppErrorHandler } from '@actions';
import { AppActionTypes } from '@actionTypes';
import { getLanguage, appActions } from '../../slices/appSlice';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { createOrUpdateUser, getCurrentUser, signInAnonymously } from '../../../firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import i18n from '../../../localization';

interface AppInitAction {
  type: typeof AppActionTypes.APP_INIT_SAGA;
  payload: { hasUser: boolean };
}

function* handleAppInitSaga({ payload }: AppInitAction): Generator<any, void, any> {
  try {
    const language: string = yield select(getLanguage);
    yield call([i18n, i18n.changeLanguage], language);

    let currentUser = getCurrentUser();

    if (!currentUser) {
      const user: FirebaseAuthTypes.User = yield call(signInAnonymously);
      yield call(createOrUpdateUser, user.uid, { language });
      currentUser = user;
      yield put(appActions.setUserId(user.uid));
    }

    yield put(appActions.setUserId(currentUser.uid));

    yield delay(1000);
  } catch (e) {
    console.error('Auth Error:', e);
    yield put(requestAppErrorHandler({ e }));
  }
}

export function* watchAppInitSaga(): Generator {
  yield takeLatest(AppActionTypes.APP_INIT_SAGA, handleAppInitSaga);
}
