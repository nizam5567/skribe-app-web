import { Box, Input, InputAdornment, InputProps } from '@mui/material';
import SearchInputFieldIcon from '../svg-components/SearchInputFieldIcon';
import styles from './SearchField.module.scss';

const ariaLabel = { 'aria-label': 'description' };
interface searchPlaceholderProps {
  placeholder: string
}
const SearchField = ({ placeholder }: searchPlaceholderProps) => (
    <Box className={styles['tag-search-bar']} component="form" noValidate autoComplete="off">
    <Input className={styles['tag-search-bar__form-control']} disableUnderline={true} fullWidth={true} placeholder={placeholder} inputProps={ariaLabel} startAdornment={
      <InputAdornment position="start">
        <SearchInputFieldIcon/>
      </InputAdornment>
    }/>
    </Box>
);

export default SearchField;
