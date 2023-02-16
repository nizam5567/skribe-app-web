import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme requires a React version-specific adapter
// See https://github.com/airbnb/enzyme/tree/master/packages
configure({ 'adapter': new Adapter() });
// we will use .env file
