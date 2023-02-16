import { Box } from '@mui/material';

interface IActionButton {
  text: string
  onClickFn: Function
  icon?: React.ReactNode
}
const ActionButton = ({ text, onClickFn, icon }: IActionButton) => (
    <Box component="button" sx={{ 'padding': '10px 15px', 'border': '1px solid #E8E9EB', 'borderRadius': '5px', 'color': '#3F434A', 'cursor': 'pointer', 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '12px', 'background': '#fff', 'whiteSpace': 'nowrap', '&:hover': { 'background': '#e6e6e6' }, 'ml': 1 }} onClick={() => onClickFn()} display="flex" justifyContent="center" alignItems="center">
      {icon && <Box mr={1}>{icon}</Box>}
      {text}
    </Box>
);

export default ActionButton;
