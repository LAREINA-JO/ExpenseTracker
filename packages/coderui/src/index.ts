import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

// theme
export {
  default as ThemeProvider,
  defaultLightTheme,
} from './components/ThemeProvider';

// components
export { default as Alert } from './components/Alert';
export { default as Button } from './components/Button';
export { default as IconButton } from './components/IconButton';
export { default as Input } from './components/Input';
export { default as Select, type Option } from './components/Select';
export { default as Autocomplete } from './components/Autocomplete';
export { default as Modal } from './components/Modal';
export { default as Dropdown } from './components/Dropdown';
export { default as Loading } from './components/Loading';
export { default as ToastContainer, toast } from './components/Toast';

// hooks
export { default as useOnClickOutside } from './hooks/useOnClickOutside';
