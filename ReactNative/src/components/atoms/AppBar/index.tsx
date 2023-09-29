import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Icon from '@/components/atoms/IconSvg';
import ArrowLeft from '@/assets/icons/ArrowLeft';
import themes from '@/themes';
import {useNavigation} from '@react-navigation/native';

interface IAppBar {
  title?: string;
  onPressLeft?: () => void;
  iconSize?: number;
  iconColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppBar = (props: IAppBar) => {
  const navigation = useNavigation();
  const {
    title,
    onPressLeft,
    iconSize = 28,
    iconColor = themes.color.black,
    titleStyle,
    containerStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          onPressLeft ? onPressLeft() : navigation.goBack();
        }}>
        <Icon icon={ArrowLeft} color={iconColor} size={iconSize} />
      </TouchableOpacity>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View />
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: themes.spacing[5],
  },
  title: {
    fontSize: themes.fontSizes.md,
    fontFamily: themes.fonts.heading,
    fontWeight: '800',
  },
});
