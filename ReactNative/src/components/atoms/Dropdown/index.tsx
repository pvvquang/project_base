import ArrowDown from '@/assets/icons/ArrowDown';
import ArrowUp from '@/assets/icons/ArrowUp';
import Icon from '@/components/atoms/IconSvg';
import themes from '@/themes';
import React, {useState} from 'react';
import {ColorValue, StyleSheet, ViewStyle} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface IDropdown {
  data: Array<any>;
  onSelect: () => void;
  colorIcon?: ColorValue;
  rowStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  defaultValue?: string;
  defaultButtonText?: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: ViewStyle;
}

const Dropdown = (props: IDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemSelect, setItemSelect] = useState('');
  const renderIconRight = () => {
    return isOpen ? (
      <Icon
        icon={ArrowUp}
        color={props.colorIcon ? props.colorIcon : 'black'}
      />
    ) : (
      <Icon
        icon={ArrowDown}
        color={props.colorIcon ? props.colorIcon : 'black'}
      />
    );
  };
  const calcButton = (text: string) => {
    if (text.length > 3) {
      return 100 + (text.length - 3) * 10;
    }
    return 100;
  };
  return (
    <SelectDropdown
      data={props.data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        setItemSelect(selectedItem);
        props.onSelect();
      }}
      buttonTextAfterSelection={selectedItem => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={item => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonTextStyle={props.buttonTextStyle}
      selectedRowTextStyle={{color: themes.color.red[900]}}
      dropdownIconPosition="right"
      renderDropdownIcon={renderIconRight}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      dropdownStyle={props.dropdownStyle}
      buttonStyle={[styles.buttonStyle, {width: calcButton(itemSelect)}]}
      defaultButtonText={props.defaultButtonText}
      defaultValue={props.defaultValue}
      rowTextStyle={styles.rowTextStyle}
      rowStyle={styles.rowStyle}
      dropdownOverlayColor="transparent"
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white',
  },
  rowTextStyle: {
    color: themes.color.black,
    marginLeft: 20,
    padding: 0,
    fontWeight: '500',
    textAlign: 'left',
  },
  rowStyle: {
    height: 40,
    borderBottomWidth: 0,
  },
});
