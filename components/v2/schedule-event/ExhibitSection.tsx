import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getExhibitService } from '../../../helpers/api-helper';
import { CreateExhibitRequest, ExhibitResponse } from '../../../openapi';
import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import { formattedExhibitType, getTenantIdFromLocalStorage } from '../common';
import ExhibitCardHeader from '../exhibits/ExhibitCardHeader';
import ExhibitCardHeaderPublic from '../exhibits/ExhibitCardHeaderPublic';
import ExhibitList from '../exhibits/ExhibitList';
import ExhibitListPublic from '../exhibits/ExhibitListPublic';
import LinearProgressbar from '../exhibits/LinearProgressbar';
import SecondaryButton from '../SecondaryButton';
import DocumentIcon from '../svg-components/DocumentIcon';
import ExhibitIcon from '../svg-components/ExhibitIcon';
import { IExhibit } from '../../../interface/IExhibit';

interface IExhibitSection {
  publicExhibitFound: boolean
  privateExhibitFound: boolean
}

const ExhibitSection = ({ publicExhibitFound, privateExhibitFound }: IExhibitSection) => {
  const { authUser, authService } = useAuthContext();
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const router = useRouter();
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const [percentageList, setPercentageList] = useState<any[]>([]);
  const [currentUserName, setCurrentUserName] = useState('');
  useEffect(() => {
    setCurrentUserName(authUser?.displayName);
  }, [authUser]);

  const { exhibits, tempExhibits, readyToUploadTempExhibit, publicExhibits } = useAppSelector((state: RootState) => state?.exhibitReducer);
  const { schedulingPartyId } = useAppSelector((state: RootState) => state.partiesReducer);
  const [showTableHeader, setShowTableHeader] = useState(false);
  useEffect(() => {
    if (!readyToUploadTempExhibit) return;
    setShowTableHeader(true);
    const attachExhibitWithEventId = async (eventId: number, exhibit: CreateExhibitRequest, exhibitInfo: IExhibit) => {
      if (accessToken) {
        try {
          const exhibitService = await getExhibitService(accessToken);
          const exhibitResponse: any = await exhibitService.exhibitsControllerCreateExhibit(exhibit);
          if (exhibitResponse?.status === 200 || exhibitResponse?.status === 201) {
            boundExhibitsActions.deleteTempExhibit(exhibitInfo.exhibitid);
            boundExhibitsActions.createExhibit(exhibitResponse?.data);
            boundMattersActions.increaseExhibitCount({ 'matterId': Number(matterId), 'eventId': Number(eventId) });
          }
        } catch (error: any) {
          handleApiError(error);
        }
      }
    };
    const uploadExhibit = () => {
      tempExhibits &&
        tempExhibits.map((exhibit: IExhibit) => {
          if (!exhibit.isReadyToUpload) {
            exhibit.isReadyToUpload = true;
            try {
              axios
                .request({
                  'method': 'PUT',
                  'url': exhibit.uploadUrl,
                  'data': exhibit.binaryContent,
                  'headers': {
                    'Content-Type': 'application/octet-stream'
                  },
                  'onUploadProgress': (p) => {
                    const percentage = (p.loaded / p.total) * 100;
                    const { exhibitid } = exhibit;
                    const newListItem = {
                      exhibitid,
                      percentage
                    };
                    const newList: any[] = percentageList.map((item: any) => {
                      if (exhibitid === item.exhibitid) {
                        return newListItem;
                      }
                      return item;
                    });
                    setPercentageList((prev: any) => {
                      if (prev) {
                        return [newListItem];
                      }
                      return newList;
                    });
                  }
                })
                .then((data) => {
                  const tid = getTenantIdFromLocalStorage();
                  if (schedulingPartyId && tid) {
                    const formattedExhibit: CreateExhibitRequest | any = {
                      'title': exhibit?.exhibitname,
                      'description': exhibit?.description,
                      'objectid': exhibit?.objectid,
                      'eventid': parseInt(eventId),
                      'tenantid': tid,
                      'partyid': schedulingPartyId
                    };
                    attachExhibitWithEventId(Number(eventId), formattedExhibit, exhibit);
                  }
                });
            } catch (error: any) {
              handleApiError(error);
            }
          }
        });
    };

    uploadExhibit();
    boundExhibitsActions.clearReadyToUploadTempExhibit();
  }, [readyToUploadTempExhibit]);

  const handleExhibit = () => {
    dispatch(openModal('exhibit'));
  };

  return (
    <Box borderRadius={2} boxShadow={1} p={4} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff' }}>
      <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" mb={3} sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
        <Box>
          <Typography display={'inline-flex'} sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>
            Your Exhibits
          </Typography>
          <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '21px', 'color': '#616161' }} mt={1.5}>
            {event?.status === 'COMPLETE' ? 'Public Exhibits were shared to the record during the event, while Your Exhibits were not.' : 'Upload exhibits to Skribe, which will only be visible to you. You may elect to share them during the virtual event.'}
          </Typography>
        </Box>
        {event && event.status !== 'COMPLETE' && (
          <Box display="flex" justifyContent="flex-end">
            <SecondaryButton text="+ Upload" onClickFn={handleExhibit} />
          </Box>
        )}
      </Box>
      {(tempExhibits && tempExhibits.length === 0 && exhibits && exhibits.length === 0) || (privateExhibitFound && publicExhibitFound && exhibits && exhibits.length === 0 && ((tempExhibits && tempExhibits.length === 0) || !tempExhibits))
        ? (
        <Box display="flex" mt={3} alignItems="center" sx={{ 'color': '#616161' }}>
          <DocumentIcon />
          <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': '400', 'lineHeight': '21px', 'color': '#616161' }}>
            You haven&apos;t uploaded any exhibits yet.
          </Typography>
        </Box>
          )
        : null}

      {publicExhibitFound && privateExhibitFound ? (
        <Box>
          {publicExhibits && publicExhibits.length ? <Typography sx={{ 'fontSize': '16px', 'lineHeight': '21px', 'fontWeight': 400, 'mt': 5 }}>Public Exhibits</Typography> : null}
          {publicExhibits && publicExhibits.length ? <ExhibitCardHeaderPublic /> : null}
          {publicExhibits && publicExhibits.length ? <Box sx={{ 'width': '100%' }}>{publicExhibits && <ExhibitListPublic />}</Box> : null}

          {(exhibits && exhibits.length) || (tempExhibits && tempExhibits.length && readyToUploadTempExhibit) || showTableHeader ? <Typography sx={{ 'fontSize': '16px', 'lineHeight': '21px', 'fontWeight': 400, 'mt': 5 }}>Your Exhibits</Typography> : null}

          {(exhibits && exhibits.length) || (tempExhibits && tempExhibits.length && readyToUploadTempExhibit) || showTableHeader ? <ExhibitCardHeader /> : null}

          {tempExhibits && tempExhibits.length ? (
            <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ 'width': '100%' }}>
              {tempExhibits &&
                tempExhibits.map((exhibit: IExhibit) => {
                  if (exhibit.isReadyToUpload) {
                    return (
                      // <Box key={exhibit.exhibitid} sx={{ width: "100%" }}>
                      //   <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" sx={{ borderBottom: "1px solid #E8E9EB", width: "100%" }}>
                      //     <Box py={1} sx={{}} display="flex" alignItems="center">
                      //       <ExhibitIcon />
                      //       <Typography sx={{ fontSize: "15px", fontWeight: 400, lineHeight: "18px", color: "#3F434A", ml: 1 }}>{exhibit?.title}</Typography>
                      //     </Box>
                      //   </Box>
                      //   <Box sx={{ width: "100%" }}>
                      //     <LinearProgressbar list={percentageList} item={exhibit} />
                      //   </Box>
                      // </Box>
                      <Box key={exhibit.exhibitid} sx={{ 'width': '100%' }}>
                        <Box p={1} key={exhibit.exhibitid} display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} alignItems="center" justifyContent="space-between" sx={{ 'borderBottom': '1px solid #E8E9EB', 'width': '100%' }}>
                          <Box py={1} sx={{ 'width': '40%' }} display="flex">
                            {/* <ExhibitIcon /> */}
                            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>{exhibit.title}</Typography>
                          </Box>                          
                          <Box py={1} sx={{ 'width': '20%' }} display="flex">
                            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>{formattedExhibitType(exhibit?.mimetype)}</Typography>
                          </Box>
                          {/* <Box py={1} sx={{ width: "20%" }} display="flex" width={70}>
                            <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px", color: "#3F434A" }}>{"-"}</Typography>
                          </Box> */}
                          <Box sx={{ 'width': '20%' }} display="flex" width={100}></Box>
                        </Box>
                        <Box sx={{ 'width': '100%' }}>
                          <LinearProgressbar list={percentageList} item={exhibit} />
                        </Box>
                      </Box>
                    );
                  }
                })}
            </Box>
          ) : null}
          <ExhibitList />
        </Box>
      ) : (
        <Box p={2} pt={4} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'borderTop': '1px solid #fff' }}>
          <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
            <CircularProgress size="2rem" />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ExhibitSection;
