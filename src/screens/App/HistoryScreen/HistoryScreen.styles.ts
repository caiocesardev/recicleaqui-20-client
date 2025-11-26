// Arquivo: src/screens/App/HistoryScreen/HistoryScreen.styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

// --- HEADER ---
export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${COLORS.primary};
  height: 140px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
  z-index: 10;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
  margin-top: 20px;
`;

export const MenuButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${COLORS.whiteTransparent || 'rgba(255,255,255,0.2)'};
  border-radius: 12px;
`;

// --- FILTROS (CHIPS) ---
export const FilterContainer = styled.View`
  padding-vertical: 15px;
`;

interface FilterChipProps {
  isActive: boolean;
}

export const FilterChip = styled.TouchableOpacity<FilterChipProps>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${(props: FilterChipProps) => props.isActive ? COLORS.primary : COLORS.white};
  border-width: 1px;
  border-color: ${(props: FilterChipProps) => props.isActive ? COLORS.primary : '#e0e0e0'};
  margin-right: 10px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const FilterText = styled.Text<FilterChipProps>`
  font-size: 12px;
  font-family: 'Montserrat-Bold';
  color: ${(props: FilterChipProps) => props.isActive ? COLORS.white : '#666'};
`;

// --- DATAS (SECTION HEADER) ---
export const SectionHeader = styled.View`
  padding-vertical: 10px;
  background-color: ${COLORS.background}; 
  margin-bottom: 5px;
`;

export const SectionHeaderText = styled.Text`
  font-size: 13px;
  font-family: 'Montserrat-Bold';
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// --- CARD DO HISTÓRICO ---
export const HistoryCard = styled.View`
  background-color: ${COLORS.white};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 5px; 
  
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
  
  border-left-width: 4px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  color: #aaa;
`;

interface StatusBadgeProps {
  bg: string;
}

export const StatusBadge = styled.View<StatusBadgeProps>`
  padding: 4px 10px;
  border-radius: 12px;
  background-color: ${(props: StatusBadgeProps) => props.bg};
`;

export const StatusText = styled.Text<{ color: string }>`
  font-size: 10px;
  font-family: 'Montserrat-Bold';
  color: ${(props: { color: any; }) => props.color};
  text-transform: uppercase;
`;

export const CardBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const ItemsText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
  margin-bottom: 2px;
`;

export const TypeText = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  color: #666;
`;

export const XpBadge = styled.View`
  align-items: flex-end;
`;

export const XpText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: #FFB300;
`;

// --- EMPTY STATE ---
export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: #999;
  margin-top: 10px;
`;