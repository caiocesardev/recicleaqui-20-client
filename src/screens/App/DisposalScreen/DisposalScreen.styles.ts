// Arquivo: src/screens/App/DisposalScreen/DisposalScreen.styles.ts

import styled from 'styled-components/native';

// Defina a cor diretamente aqui para evitar dependências quebradas
const PRIMARY_COLOR = '#348e57';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f7fa;
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${PRIMARY_COLOR};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: white;
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
  color: #333;
  margin-bottom: 15px;
  margin-top: 10px;
`;

// --- CARDS DE SELEÇÃO ---
interface SelectionCardProps {
  selected?: boolean;
  color?: string;
}

export const SelectionCard = styled.TouchableOpacity<SelectionCardProps>`
  background-color: white;
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

  /* CORRIGIDO: Tipagem explícita */
  border-color: ${(props: SelectionCardProps) => (props.selected ? (props.color || PRIMARY_COLOR) : 'transparent')};
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

  /* CORRIGIDO: Tipagem explícita */
  background-color: ${(props: IconContainerProps) => props.color || '#eee'};
`;

export const CardContent = styled.View`
  flex: 1;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: #333;
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

// --- LISTA DE PONTOS ---
export const PointCard = styled.View`
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border-left-width: 5px;
  border-left-color: ${PRIMARY_COLOR};
  elevation: 2;
`;

export const PointName = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: #333;
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
  color: ${PRIMARY_COLOR};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 12px;
`;