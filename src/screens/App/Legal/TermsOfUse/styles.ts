// Arquivo: src/screens/App/Legal/TermsOfUse/styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${COLORS.primary};
  height: 120px; /* Um pouco menor que a Home */
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
  margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${COLORS.whiteTransparent || 'rgba(255,255,255,0.2)'};
  border-radius: 12px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
  margin-top: 20px;
  margin-bottom: 8px;
`;

export const Paragraph = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #666;
  line-height: 22px;
  margin-bottom: 10px;
  text-align: justify;
`;