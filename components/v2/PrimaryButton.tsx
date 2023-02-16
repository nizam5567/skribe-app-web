import { Box } from '@mui/material';

interface IPrimaryButton {
  text: string
  onClickFn: Function
  icon?: React.ReactNode
}
const PrimaryButton = ({ text, onClickFn, icon }: IPrimaryButton) => (
    <Box component="button" display="flex" alignItems="center" justifyContent="center" sx={{ 'padding': '12px 20px', 'borderRadius': '5px', 'color': '#fff', 'cursor': 'pointer', 'background': '#001180', 'border': 'none', 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px' }} onClick={() => onClickFn()}>
      {icon && (
        <Box mr={0.5} display="inline-flex">
          {icon}
        </Box>
      )}
      {text}
    </Box>
);

export default PrimaryButton;
