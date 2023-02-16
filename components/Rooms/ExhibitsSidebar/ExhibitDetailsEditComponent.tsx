import { Avatar, Box, Chip, Typography } from '@mui/material';
import { EditExhibitButton } from '@skribe/theme';
import { useState } from 'react';
import ExhibitFileNameEditComponent from './ExhibitFileNameEditComponent';
import RecordListItemIcon from '../../svg-components/RecordListItemIcon';
import { RecordItem } from '../../types/exhibit';

interface ExhibitDetailsEditComponentProps {
  isExhibitDeleted: boolean
  action: 'manage' | 'preview' | 'Present'
  record: RecordItem | null
  handleUpdate: (record: RecordItem) => void
}

const ExhibitDetailsEditComponent = ({
  isExhibitDeleted,
  action,
  record,
  handleUpdate
}: ExhibitDetailsEditComponentProps) => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [thumbnail, setthumbnail] = useState<any>(record?.exhibitThumbnail);

  const handleClose = () => {
    setShowEditComponent(false);
  };

  const handelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList = event.target.files as FileList;
    if (file?.length !== 0) {
      setthumbnail(URL.createObjectURL(file[0]));
    }
  };

  const handelChange = (
    { exhibitName, fileName }: { exhibitName: string, fileName: string },
    cb: () => void
  ) => {
    handleUpdate({
      ...record,
      exhibitName,
      fileName,
      'exhibitThumbnail': thumbnail
    } as RecordItem);
  };

  return (
    <Box>
      <Box
        py={3}
        px={4}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderBottom={1}
        borderColor="divider"
      >
        <Box>
          <Typography variant="body1">
            Exhibit of The Martinez Law Firm
          </Typography>
          <Typography color="secondary.light" variant="body2">
            Uploaded by {record?.ownerName}
          </Typography>
          <Box display="flex" mt={1}>
            <Box marginRight={1}>
              <Typography variant="body2">27 March 2022</Typography>
            </Box>
            <Box paddingLeft={1} borderLeft={1} borderColor="divider">
              <Typography variant="body2">64.4 MB</Typography>
            </Box>
          </Box>
        </Box>
        {isExhibitDeleted
          ? null
          : action === 'manage'
            ? (
          <EditExhibitButton
            onClick={() => {
              setShowEditComponent(true);
            }}
          />
              )
            : (
          <Chip
            sx={{ 'borderRadius': '4px' }}
            label={<Typography component="span">On The Record</Typography>}
          />
              )}
      </Box>
      {showEditComponent && !isExhibitDeleted ? (
        <Box borderBottom={1} borderColor="divider" px={4} py={3}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb={2}
            sx={{ 'cursor': 'pointer' }}
          >
            {thumbnail
              ? (
              <Avatar
                alt="Remy Sharp"
                src={thumbnail}
                variant="square"
                sx={{
                  'background': '#F5F6F7',
                  'borderRadius': '4px',
                  'marginRight': '16px'
                }}
              />
                )
              : (
              <Box
                display="inline-flex"
                sx={{ 'background': '#F5F6F7', 'borderRadius': '4px' }}
                p={2}
                mr={2}
              >
                <RecordListItemIcon />
              </Box>
                )}
            <Box>
              <label htmlFor="raised-button-file">
                <Typography ml="1rem" color="#3954E3">
                  Upload Thumbnail
                </Typography>
              </label>
              <input
                accept="image/*"
                style={{ 'display': 'none' }}
                id="raised-button-file"
                type="file"
                name="thumbnail"
                onChange={handelFileChange}
              />
            </Box>
            {/* <Typography color="#4285F4">Add a Thumbnail</Typography> */}
          </Box>
          <ExhibitFileNameEditComponent
            handleUpload={handelChange}
            handleClose={handleClose}
            recordFileName={record?.fileName as string}
            recordExhibitName={record?.exhibitName as string}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ExhibitDetailsEditComponent;
