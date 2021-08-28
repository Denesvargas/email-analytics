import styled from 'styled-components';
import { colors } from '../../common/defaults';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import { BarChart as BarChartTemplate } from 'react-native-chart-kit';
import {
  IconButton as IconButtonTemplate,
  Select as SelectTemplate,
} from '../../components';

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 1,
  fillShadowGradient: colors.secondary,
  fillShadowGradientOpacity: 0.7,
  color: () => colors.primary,
  barPercentage: 0.5,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeWidth: 1,
    x: width * 0.15,
    fillOpacity: 1,
    stroke: '#0006',
  },
  propsForVerticalLabels: {
    stroke: 'none',
    strokeWidth: 0.9,
    scale: 1.1,
    fill: colors.secondary,
  },
  propsForHorizontalLabels: {
    stroke: 'none',
    strokeWidth: 0.9,
    scale: 1.2,
    fill: colors.black,
  },
};

export const Screen = styled.View`
  height: 100%;
  background-color: ${colors.primary};
`;

export const IconButton = styled(IconButtonTemplate)``;

export const TitleView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 16px 18px 12px 24px;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Select = styled(SelectTemplate)``;

export const Wrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 12px 20px;
`;

export const SelectWrapper = styled.View`
  width: 48%;
`;

export const BarChart = styled(BarChartTemplate).attrs((props) => ({
  ...props,
  height: height * 0.4,
  width: width * 0.85,
  chartConfig: chartConfig,
  verticalLabelRotation: 0,
  showValuesOnTopOfBars: true,
  fromZero: true,
}))`
  align-self: center;
  margin-top: 16px;
  border: ${`${width * 0.03}px`} solid white;
  border-bottom-width: ${`${width * 0.01}px`};
  border-radius: 25px;
`;
