import {typography} from './typography';
import {spacing} from './space';
import {colors} from './color';
import {config} from './config';

const themes = {
  ...typography,
  spacing,
  color: colors,
  config,
};

export default themes;
