import { CLOSE_MODAL, OPEN_MODAL } from './modalTypes';

export const openModal = (modalName: string) => ({
  'type': OPEN_MODAL,
  'payload': modalName
});

export const closeModal = () => ({
  'type': CLOSE_MODAL,
  'payload': ''
});
