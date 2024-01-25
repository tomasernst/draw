import { FC } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

interface ChromePickerProps {
  color: string;
  onChange: (color: ColorResult) => void;
}

const ChromePickerComponent: FC<ChromePickerProps> = ({ color, onChange }) => {
  return <ChromePicker color={color} onChange={onChange} />;
};

export default ChromePickerComponent;