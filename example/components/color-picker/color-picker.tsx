import {Color} from "antd/es/color-picker";
import * as React from "react";
import {ColorPicker as AntdColorPicker, Divider} from "antd";

type ColorPickerProps = {
    disabled: boolean;
    value?: string | Color;
    onChange?: (hex: string) => void;
}
export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const {disabled, value, onChange} = props;
    const triggerChange = (changeValue: string) => {
        onChange?.(changeValue);
    }
    const onColorChange = (color: Color) => triggerChange(color.toHexString());
    return (
        <AntdColorPicker defaultValue={value || null}
                         styles={{popupOverlayInner: {width: 468 + 24,}}}
                         disabled={disabled}
                         onChange={onColorChange}
                         panelRender={(_, {components: {Picker, Presets}}) => (
                             <div className="custom-panel" style={{display: "flex", width: 468}}>
                                 <div style={{flex: 1,}}>
                                     <Presets/>
                                 </div>
                                 <Divider type="vertical" style={{height: "auto"}}/>
                                 <div style={{width: 234}}>
                                     <Picker/>
                                 </div>
                             </div>
                         )}/>
    )
}