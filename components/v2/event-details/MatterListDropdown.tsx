import { Box, Typography } from '@mui/material';
import PlusIcon from '../svg-components/PlusIcon';

interface IMatterListDropdown {
  matterList: any[] | undefined
  formik: any
  handleMatterSelectFromDropdown: Function
}

const MatterListDropdown = ({ matterList, formik, handleMatterSelectFromDropdown }: IMatterListDropdown) => (
    <Box sx={{ 'border': '1px solid #e6e6e6', 'zIndex': 10, 'background': '#fff', 'maxHeight': '230px', 'overflow': 'auto' }} borderRadius={1} position="absolute" top={'58px'} left={0} right={0} boxShadow={2}>
      {matterList &&
        matterList.map((matter: any) => (
            <Typography textAlign={'left'} p={2} key={matter?.id} sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '18px', 'cursor': 'pointer', 'borderBottom': '1px solid #e6e6e6' }} onClick={() => handleMatterSelectFromDropdown(formik, matter)}>
              {matter.title}
            </Typography>
        ))}
      {!matterList ||
        (matterList && matterList.length === 0 && (
          <Typography textAlign={'left'} p={2} sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '18px', 'borderBottom': '1px solid #e6e6e6' }}>
            No matter found
          </Typography>
        ))}
    </Box>
);

export default MatterListDropdown;
