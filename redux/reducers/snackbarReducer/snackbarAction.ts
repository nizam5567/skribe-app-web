import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { successBar, errorBar, clearBar } from './snackbarReducer';

export const boundSnackbarActions: any = bindActionCreators(
  {
    'success': successBar,
    'clear': clearBar,
    'error': errorBar
  },
  store.dispatch
);
