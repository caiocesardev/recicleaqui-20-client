// Arquivo: src/screens/App/HomeScreen/HomeScreen.styles.ts

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* Fundo dinâmico (Branco no Light / Preto no Dark) */
  background-color: ${(props: any) => props.theme.colors.background};
`;

// ============= HEADER =============
export const Header = styled.View`
  /* O Header Verde (Primary) mantém a cor da marca nos dois temas */
  background-color: ${(props: any) => props.theme.colors.primary};
  height: 140px;
  justify-content: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  
  elevation: 0; 
  shadow-opacity: 0;
  z-index: 0; 
  position: relative;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; 
  width: 100%;
  margin-top: 20px;
`;

// --- AVATAR ---
export const AvatarContainer = styled.TouchableOpacity`
  width: 70px; 
  height: 70px;
  border-radius: 35px;
  background-color: ${(props: any) => props.theme.colors.white};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${(props: any) => props.theme.colors.whiteTransparent};
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const WelcomeContainer = styled.View`
  flex: 1;
  margin-left: 16px; 
`;

export const HeaderTitle = styled.Text`
  font-size: 26px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
`;

export const HeaderSubtitle = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Montserrat-Regular';
  margin-top: 4px;
`;

export const HeaderIconButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 16px;
  margin-left: 10px;
`;

// ============= MAIN ACTION (Registrar Descarte) =============
export const ActionContainer = styled.View`
  padding: 0 24px;
  margin-top: 10px;
`;

export const MainActionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.primary};
  padding: 20px;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  shadow-color: ${(props: any) => props.theme.colors.primary};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.4;
  shadow-radius: 15px;
  elevation: 10;
`;

export const IconBox = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  align-items: center;
  justify-content: center;
`;

export const ActionContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const ActionTitle = styled.Text`
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActionSubtitle = styled.Text`
  font-family: 'Montserrat-Regular';
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  margin-top: 4px;
`;

// ============= TIPS SECTION =============
export const TipsSection = styled.View`
  margin-top: 30px;
  padding-left: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  /* A cor do título muda (Preto no Light / Branco no Dark) */
  color: ${(props: any) => props.theme.colors.text};
  margin-bottom: 15px;
`;

// ============= HISTORY PREVIEW (compacto) =============
export const HistoryPreviewCard = styled.View`
  margin: 12px 24px 0 24px;
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: 24px;
  padding: 16px;
  shadow-color: ${(props: any) => props.theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 5;
  overflow: hidden;
`;

export const HistoryHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const HistoryTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.text};
`;

export const HistorySeeAllButton = styled.TouchableOpacity`
  padding: 6px 12px;
  border-radius: 14px;
  background-color: ${(props: any) => props.theme.colors.primary};
`;

export const HistorySeeAllText = styled.Text`
  font-size: 11px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
`;

export const HistoryItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.08);
`;

export const HistoryItemIcon = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const HistoryItemContent = styled.View`
  flex: 1;
`;

export const HistoryItemTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const HistoryItemTitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.text};
  flex: 1;
`;

export const HistoryItemStatus = styled.Text<{ $status: 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED' }>`
  font-size: 10px;
  font-family: 'Montserrat-Bold';
  padding: 4px 10px;
  border-radius: 12px;
  overflow: hidden;
  border-width: 1.5px;
  background-color: transparent;
  color: ${(props: any) => {
    const s = (props.$status || 'REQUESTED');
    if (s === 'COMPLETED') return props.theme.colors.primary;
    if (s === 'IN_PROGRESS') return '#F39C12';
    return '#2196F3';
  }};
  border-color: ${(props: any) => {
    const s = (props.$status || 'REQUESTED');
    if (s === 'COMPLETED') return props.theme.colors.primary;
    if (s === 'IN_PROGRESS') return '#F39C12';
    return '#2196F3';
  }};
`;

export const HistoryItemBottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HistoryItemLines = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.colors.textLight};
  font-family: 'Montserrat-Regular';
`;

export const HistoryItemDate = styled.Text`
  font-size: 11px;
  color: ${(props: any) => props.theme.colors.textLight};
  font-family: 'Montserrat-Regular';
`;

// Chips de linhas
export const LineChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

export const LineChip = styled.View<{ $color: string }>`
  padding: 3px 10px;
  border-radius: 12px;
  background-color: ${(props: any) => props.$color + '18'};
  border-width: 1px;
  border-color: ${(props: any) => props.$color + '40'};
`;

export const LineChipText = styled.Text<{ $color: string }>`
  font-size: 10px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.$color};
`;