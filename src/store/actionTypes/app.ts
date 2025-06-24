export enum AppActionTypes {
  APP_INIT_SAGA = 'app/APP_INIT_SAGA',
  SET_LANGUAGE_SAGA = 'app/SET_LANGUAGE_SAGA',
  APP_ERROR_HANDLER_SAGA = 'app/APP_ERROR_HANDLER_SAGA',
}

export interface IRequestAppErrorHandler {
  type: AppActionTypes.APP_ERROR_HANDLER_SAGA;
  payload: {
    e: any;
  };
}
