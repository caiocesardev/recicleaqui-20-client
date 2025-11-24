// Arquivo: src/components/TextInput/TextInput.tsx

import React from 'react';
import { TextInputProps as RNTextInputProps, View, TouchableOpacity } from 'react-native'; 
import styled from 'styled-components/native';

type TextInputProps = RNTextInputProps & {
  error?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

// --- Interface para o Estilo ---
interface InputWrapperProps {
  hasError: boolean;
  multiline?: boolean; // Adicionamos suporte a multiline no estilo
}

// --- Componentes Estilizados ---

const Container = styled(View)`
  width: 100%;
  margin-bottom: 5px;
`;

const InputWrapper = styled(View)<InputWrapperProps>`
  width: 100%;
  position: relative;
  flex-direction: row;
  
  align-items: ${(props: InputWrapperProps) => (props.multiline ? 'flex-start' : 'center')};
  
  background-color: #fff;
  border-radius: 25px;
  
  height: ${(props: InputWrapperProps) => (props.multiline ? 'auto' : '55px')};
  min-height: 55px; 
  
  border-width: 1px;
  border-color: ${(props: InputWrapperProps) => (props.hasError ? '#ff4444' : '#e0e0e0')};
  
  padding-left: 20px;
  padding-top: ${(props: InputWrapperProps) => (props.multiline ? '10px' : '0px')};
  padding-bottom: ${(props: InputWrapperProps) => (props.multiline ? '10px' : '0px')};
`;

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding-right: 48px; 
  height: 100%; 
`;

const ErrorText = styled.Text`
  color: #ff4444;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 20px;
  min-height: 16px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 12px;
  top: 12px; 
  justify-content: center;
  align-items: center;
  z-index: 10;
  elevation: 6;
`;

// --- Componente Principal ---

const TextInput = ({ error, children, rightIcon, onRightPress, ...props }: TextInputProps) => {
  return (
    <Container>
      <InputWrapper hasError={!!error} multiline={props.multiline}>
        <StyledInput
          placeholderTextColor="#A9A9A9"
          {...props}
        />
        <IconContainer>
          {rightIcon ? (
            <TouchableOpacity onPress={onRightPress} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            children
          )}
        </IconContainer>
      </InputWrapper>

      <ErrorText>{error || ''}</ErrorText>
    </Container>
  );
};

export default TextInput;