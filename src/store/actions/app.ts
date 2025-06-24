import { AppActionTypes, IRequestAppErrorHandler } from '@actionTypes';

export const requestAppInit = (payload: { hasUser: boolean }) => ({
  type: AppActionTypes.APP_INIT_SAGA,
  payload
});

export const requestSetLanguage = () => ({
  type: AppActionTypes.SET_LANGUAGE_SAGA,
});

export const requestAppErrorHandler = (
  payload: IRequestAppErrorHandler['payload'],
) => ({
  type: AppActionTypes.APP_ERROR_HANDLER_SAGA,
  payload,
});
