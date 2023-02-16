import { GET_EXHIBIT_TO_PREVIEW, SAVE_EXHIBIT_TO_PREVIEW } from './previewExhibitTypes';

export const saveExhibitToPreview = (exhibit: any) => ({
  'type': SAVE_EXHIBIT_TO_PREVIEW,
  'payload': exhibit
});

export const getExhibitToPreview = () => ({
  'type': GET_EXHIBIT_TO_PREVIEW
});
