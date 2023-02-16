import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getExhibitService } from '../../../helpers/api-helper';
import { ExhibitResponse } from '../../../openapi';
import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import TrashIcon from '../../svg-components/TrashIcon';
import ActionButton from '../ActionButton';
import { formattedExhibitType } from '../common';
import ExhibitIcon from '../svg-components/ExhibitIcon';

interface IExhibitListItem {
  exhibit: ExhibitResponse | any
}
const ExhibitListItem = ({ exhibit }: IExhibitListItem) => {
  const { authUser } = useAuthContext();
  const [currentUserName, setCurrentUserName] = useState('');
  const dispatch = useDispatch();

  const getExhibitToPreview = async (exhibit: ExhibitResponse) => {
    boundExhibitsActions.storeExhibit(exhibit);
    dispatch(openModal('previewExhibit'));
  };

  const openExhibitDeleteModal = async (exhibit: ExhibitResponse) => {
    boundExhibitsActions.storeExhibit(exhibit);
    dispatch(openModal('deleteExhibit'));
  };

  useEffect(() => {
    setCurrentUserName(authUser?.displayName);
  }, [authUser]);

  return (
    <Box p={1} key={exhibit.id} display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} alignItems="center" justifyContent="space-between" sx={{ 'borderBottom': '1px solid #E8E9EB', 'width': '100%' }}>
      <Box py={1} sx={{ 'width': '40%' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
        {/* <ExhibitIcon /> */}
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>{exhibit.title}</Typography>
        {/* <Typography sx={{ fontSize: "14px", fontWeight: "100", lineHeight: "20px", color: "#616161" }}>{(Number(exhibit?.filesize / 1000) / 1000).toFixed(1)} MB</Typography> */}
      </Box>      
      <Box py={1} sx={{ 'width': '20%' }} display="flex">
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>{formattedExhibitType(exhibit?.mimetype)}</Typography>
      </Box>
      {/* <Box py={1} sx={{ width: "20%" }} display="flex" width={70}>
        <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px", color: "#3F434A" }}>{exhibit?.createdat ? exhibit?.createdat : "-"}</Typography>
      </Box> */}
      <Box sx={{ 'width': '20%' }} display="flex" width={100}>
        <ActionButton
          text="View"
          onClickFn={() => {
            getExhibitToPreview(exhibit);
          }}
        />
        {exhibit?.status === 'private' && (
          <ActionButton
            text="Delete"
            onClickFn={() => {
              openExhibitDeleteModal(exhibit);
            }}
            icon={<TrashIcon />}
          />
        )}
      </Box>
    </Box>
  );
};

export default ExhibitListItem;
