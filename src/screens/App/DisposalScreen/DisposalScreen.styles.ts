// Arquivo: src/screens/App/DisposalScreen/DisposalScreen.styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${COLORS.primary};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: rgba(255,255,255,0.9);
  text-align: center;
  margin-top: 5px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const DescriptionText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #666;
  margin-bottom: 20px;
`;

// --- CARDS DE SELEÇÃO ---

interface SelectionCardProps {
  selected?: boolean;
  color?: string;
}

export const SelectionCard = styled.TouchableOpacity<SelectionCardProps>`
  background-color: ${COLORS.white};
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;

  border-color: ${(props: SelectionCardProps) => (props.selected ? (props.color || COLORS.primary) : 'transparent')};
`;

interface IconContainerProps {
  color?: string;
}

export const IconContainer = styled.View<IconContainerProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  background-color: ${(props: IconContainerProps) => props.color || '#eee'};
`;

export const CardContent = styled.View`
  flex: 1;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
  margin-bottom: 2px;
`;

export const CardDescription = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  color: #666;
  margin-top: 4px;
  flex-wrap: wrap;
`;

// --- FORMULÁRIO ---
export const FormLabel = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: #555;
  margin-bottom: 8px;
  margin-top: 10px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
  gap: 10px;
`;

// --- LISTA DE PONTOS ---
export const PointCard = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border-left-width: 5px;
  border-left-color: ${COLORS.primary};
  elevation: 2;
`;

export const PointName = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
`;

export const PointAddress = styled.Text`
  font-size: 13px;
  font-family: 'Montserrat-Regular';
  color: #666;
  margin-top: 4px;
`;

export const PointDistance = styled.View`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #e8f5e9;
  padding: 4px 8px;
  border-radius: 12px;
`;

export const DistanceText = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.primary};
`;

export const PointFooter = styled.View`
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
  padding-top: 8px;
`;

export const CardActionText = styled.Text`
  color: ${COLORS.primary};
  margin-left: 6px;
  font-size: 13px;
  font-family: 'Montserrat-Bold';
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

// Estilo objeto para passar para o TextInput multiline
export const textAreaStyle = {
  height: 120,
  textAlignVertical: 'top' as const,
  paddingTop: 15,
  paddingBottom: 15,
};