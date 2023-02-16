import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { ExhibitResponse } from '../../../../openapi';
import { useAppSelector } from '../../../../redux/store/hooks';
import { RootState } from '../../../../redux/store/store';
import LiveRoomPreviewExhibitModal from '../../exhibits/LiveRoomPreviewExhibitModal';
import ExhibitIcon from '../../svg-components/ExhibitIcon';
import VisibleToYouIcon from '../../svg-components/VisibleToYouIcon';

const VisibleToAllSection = () => {
  const { visibleToAllExhibits } = useAppSelector((state: RootState) => state?.exhibitReducer);
  const [previewlink, setPreviewlink] = useState<string>('');
  const [mimetype, setMimetype] = useState<string>('');

  const [sortedExhibits, setSortedExhibits] = useState<any>();

  useEffect(() => {
    if (visibleToAllExhibits) {
      const sortedData = visibleToAllExhibits.sort((a: any, b: any) => a.updatedat - b.updatedat);
      setSortedExhibits(sortedData);
    }
  }, [visibleToAllExhibits]);

  const toggleModal = (url?: string, type?: string) => {
    if (url && type) {
      setPreviewlink(url);
      setMimetype(type);
    } else {
      setPreviewlink('');
      setMimetype('');
    }
  };

  return (
    <Box pb={4} sx={{ 'height': 'calc(100% - 150px)' }}>
      {previewlink && <LiveRoomPreviewExhibitModal previewlink={previewlink} mimetype={mimetype} toggleModal={toggleModal} />}

      <Box p={2} sx={{ 'borderBottom': '1px solid #F1F5F8' }} display="flex" justifyContent="flex-start" alignItems="center">
        <VisibleToYouIcon />
        <Typography ml={1} sx={{ 'fontSize': '12px', 'fontWeight': 500, 'lineHeight': '15px', 'color': '#3954E3' }}>
          Visible to All
        </Typography>
      </Box>
      <Box sx={{ 'overflow': 'auto', 'height': '100%' }}>
        {sortedExhibits && sortedExhibits.length > 0
          ? (
              sortedExhibits.map((exhibit: ExhibitResponse | any, index: number) => (
              <Box key={exhibit.id} p={2} alignItems="center" sx={{ 'borderBottom': '1px solid #F1F5F8', 'cursor': 'pointer' }} display="flex" justifyContent="space-start" onClick={() => toggleModal(exhibit.previewlink, exhibit.mimetype)}>
                <Box>
                  <ExhibitIcon />
                </Box>
                <Box alignSelf="start">
                  <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#1E1E1E', 'width': '100%' }}>
                    {`Exhibit #00${index + 1}`}
                  </Typography>
                  <Typography ml={1} sx={{ 'fontSize': '12px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#7C8286', 'width': '100%' }}>
                    {exhibit?.title}
                  </Typography>
                  <Typography ml={1} sx={{ 'fontSize': '12px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#7C8286', 'width': '100%' }}>
                    {exhibit?.partyname}
                  </Typography>
                </Box>
              </Box>
              ))
            )
          : !visibleToAllExhibits
              ? (
          <Box pt={2} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'height': '60vh' }}>
            <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Box>
                )
              : null}
      </Box>
    </Box>
  );
};

export default VisibleToAllSection;
