
const SUCCESS = 'SUCCESS';
const ERRORBAR = 'ERROR';
const CLEAR = 'CLEAR';

interface TimeoutType {
  timeout: number
}
export interface SnackBarType {
  type: 'SUCCESS' | 'ERROR' | 'CLEAR'
  text?: String
  option?: TimeoutType
}

export const successBar = (text: string, option?: TimeoutType) => ({ 'type': SUCCESS, text, option });

export const errorBar = (text: string, option?: TimeoutType) => ({ 'type': ERRORBAR, text, option });

export const clearBar = () => ({ 'type': CLEAR });

const snackbarReducer = (state = {}, action: SnackBarType) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        'type': 'success',
        'text': action.text,
        'option': action.option
      };
    case ERRORBAR:
      return {
        ...state,
        'type': 'error',
        'text': action.text,
        'option': action.option
      };
    case CLEAR:
      return {
        ...state,
        'type': false,
        'text': false,
        'option': action.option
      };
    default:
      return {
        ...state,
        'type': false,
        'text': false,
        'option': {}
      };
  }
};

export default snackbarReducer;
