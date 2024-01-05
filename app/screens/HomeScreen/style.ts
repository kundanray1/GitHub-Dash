// styles.ts

import { ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { isRTL } from "../../i18n"
import { colors, spacing } from '../../theme';

export const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

export const $cardStyle: ViewStyle = {
  marginVertical: spacing.extraSmall,
  borderRadius: spacing.small,
  marginHorizontal: spacing.zero,
  flex: 1,
  borderColor: colors.border,
  borderWidth: 1,
};

export const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: '50%',
  justifyContent: 'center',
  paddingHorizontal: spacing.large,
};

export const $bottomContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: 'space-around',
};

export const $homeLogo: ImageStyle = {
  height: 88,
  width: '100%',
  marginBottom: spacing.huge,
};

export const $homeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: 'absolute',
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
};

export const $homeHeading: TextStyle = {
  marginBottom: spacing.medium,
};

export const $buttonStyle: ViewStyle = {
  borderRadius: spacing.small,
};

export const $errorInput: ViewStyle = {
  borderColor: colors.error,
};
