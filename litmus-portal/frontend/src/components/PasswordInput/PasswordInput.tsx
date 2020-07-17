import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

// This is the Password Input Component
interface State {
  password: string;
  showPassword: boolean;
}

interface passwordProps {
  textType: string;
  value: string;
  handleChange: (event: React.ChangeEvent<{ value: string }>) => void;
}

const PasswordInput: React.FC<passwordProps> = ({
  textType,
  value,
  handleChange,
}) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword(false);
  };
  const classes = useStyles();
  
  return (
      <div className={classes.inputArea}>
        <TextField
          id="standard-adornment-password"
          label={textType}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    
  );
};
export default PasswordInput;