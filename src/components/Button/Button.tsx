// Arquivo: src/components/Button/Button.tsx

import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

// Interface do Componente Button 
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

// --- Componentes Estilizados ---
const ButtonContainer = styled.TouchableOpacity<TouchableOpacityProps>`
  /* 2. SOLUÇÃO DO ERRO: 
     Tipamos explicitamente o 'props' dentro da função de interpolação.
     Isso diz ao TS: "Ei, esse props é do tipo TouchableOpacityProps!"
  */
  background-color: ${(props: TouchableOpacityProps) => (props.disabled ? '#cccccc' : '#348e57')};
  
  padding: 15px 30px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;
  elevation: 3;
  
  shadow-color: #000;
  shadow-offset: 0px 2px; 
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  /* Tipamos aqui também para garantir */
  opacity: ${(props: TouchableOpacityProps) => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Montserrat-Bold';
`;

// --- Componente Principal ---

const Button = ({ title, isLoading = false, ...rest }: ButtonProps) => {
  const isDisabled = rest.disabled || isLoading;

  return (
    <ButtonContainer 
      activeOpacity={0.8} 
      {...rest} 
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;