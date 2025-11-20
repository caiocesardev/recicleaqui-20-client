// src/screens/Auth/RegisterScreen/RegisterScreen.tsx
import React, { useState } from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as S from './RegisterScreen.styles';
import { PRIMARY_COLOR } from '../LoginScreen/LoginScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from '../../../components';

type Props = NativeStackScreenProps<any, 'Register'>;

// Helpers de máscara
const onlyDigits = (s: string) => s.replace(/\D/g, '');
const formatCPF = (v: string) => {
  const d = onlyDigits(v).slice(0,11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
};
const formatCNPJ = (v: string) => {
  const d = onlyDigits(v).slice(0,14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0,2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8)}`;
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`;
};
const formatPhone = (v: string) => {
  const d = onlyDigits(v).slice(0,11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};
const formatCEP = (v: string) => {
  const d = onlyDigits(v).slice(0,8);
  if (d.length <= 5) return d;
  return `${d.slice(0,5)}-${d.slice(5)}`;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(1);

  // Step 1 - Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Step 2 - Client data
  const [clientType, setClientType] = useState<'individual' | 'company'>('individual');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [cnpjError, setCnpjError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Step 3 - Address
  const [addressName, setAddressName] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressNameError, setAddressNameError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    let isValid = true;
    
    if (!email.includes('@') || email.length < 5) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (password.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não conferem');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    
    if (clientType === 'individual') {
      if (!firstName) {
        setFirstNameError('Informe o nome');
        isValid = false;
      } else {
        setFirstNameError('');
      }
      
      if (!lastName) {
        setLastNameError('Informe o sobrenome');
        isValid = false;
      } else {
        setLastNameError('');
      }
      
      if (onlyDigits(cpf).length < 11) {
        setCpfError('CPF inválido (11 dígitos)');
        isValid = false;
      } else {
        setCpfError('');
      }
    } else {
      if (!companyName) {
        setCompanyNameError('Informe a razão social');
        isValid = false;
      } else {
        setCompanyNameError('');
      }
      
      if (onlyDigits(cnpj).length < 14) {
        setCnpjError('CNPJ inválido (14 dígitos)');
        isValid = false;
      } else {
        setCnpjError('');
      }
    }
    
    if (onlyDigits(phone).length < 8) {
      setPhoneError('Telefone inválido');
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;
    
    if (!addressName) {
      setAddressNameError('Informe o logradouro');
      isValid = false;
    } else {
      setAddressNameError('');
    }
    
    if (!city) {
      setCityError('Informe a cidade');
      isValid = false;
    } else {
      setCityError('');
    }
    
    if (!state) {
      setStateError('Informe o estado');
      isValid = false;
    } else {
      setStateError('');
    }
    
    if (onlyDigits(postalCode).length !== 8) {
      setPostalCodeError('CEP inválido (8 dígitos)');
      isValid = false;
    } else {
      setPostalCodeError('');
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsLoading(true);
    try {
      // montar payload conforme API do backend
      const payload: any = {
        email,
        password,
        phone: onlyDigits(phone),
        address: {
          // API espera addressType + addressName etc. Usamos 'Rua' como default em falta de campo específico
          addressType: 'Rua',
          addressName,
          number,
          neighborhood,
          postalCode: onlyDigits(postalCode),
          city,
          state,
        },
      };

      let endpoint = '';
      if (clientType === 'individual') {
        endpoint = '/clients/individual';
        payload.firstName = firstName;
        payload.lastName = lastName;
        payload.cpf = onlyDigits(cpf);
      } else {
        endpoint = '/clients/company';
        payload.companyName = companyName;
        payload.tradeName = tradeName;
        payload.cnpj = onlyDigits(cnpj);
      }
      
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // tentar ler mensagem de erro do backend
        let data = null;
        try { data = await res.json(); } catch (e) { /* ignore */ }
        const message = data?.message || data?.error || `Erro ${res.status}`;
        Alert.alert('Erro', message);
        console.error('Registro falhou:', res.status, data);
        return;
      }

      // sucesso
      const result = await res.json().catch(() => null);
      console.log('Registro OK:', result);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao criar conta. Verifique conexão com a API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.SafeContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S.Header>
        <S.BackButton onPress={handleBack}>
          <Icon name="arrow-left" size={30} color="#333" />
        </S.BackButton>
        <S.HeaderTitle>Criar Conta</S.HeaderTitle>
      </S.Header>

      <S.FormContainer>
        {/* Steps indicators: circles with lines between (two-row layout to center lines) */}
        <View style={{ marginBottom: 18 }}>
          {/* Row: circles and connecting lines */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {['Credenciais', 'Dados', 'Endereço'].map((label, i) => {
              const stepIndex = i + 1;
              const completed = step > stepIndex;
              const active = step === stepIndex;
              return (
                <React.Fragment key={i}>
                  <View style={{ width: 80, alignItems: 'center' }}>
                    {active ? (
                      <View style={{ padding: 4, borderRadius: 999, borderWidth: 3, borderColor: PRIMARY_COLOR }}>
                        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                          <Icon name="check" size={18} color="#fff" />
                        </View>
                      </View>
                    ) : completed ? (
                      <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="check" size={18} color="#fff" />
                      </View>
                    ) : (
                      <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                        <S.StepTitle style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat-Bold' }}>{i + 1}</S.StepTitle>
                      </View>
                    )}
                  </View>

                  {i < 2 && (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <View style={{ height: 2, backgroundColor: step > stepIndex ? PRIMARY_COLOR : '#eee' }} />
                    </View>
                  )}
                </React.Fragment>
              );
            })}
          </View>

          {/* Row: labels under each circle (separate row to avoid vertical misalignment) */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginTop: 8 }}>
            {['Credenciais', 'Dados', 'Endereço'].map((label, i) => (
              <React.Fragment key={`label-${i}`}>
                <View style={{ width: 80, alignItems: 'center' }}>
                  <S.StepTitle style={{ marginTop: 6, fontSize: 12, color: '#666' }}>{label}</S.StepTitle>
                </View>
                {i < 2 && <View style={{ flex: 1 }} />}
              </React.Fragment>
            ))}
          </View>
        </View>
        {step === 1 && (
          <View>
            <S.StepTitle>Etapa 1: Suas Credenciais</S.StepTitle>
            <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} error={emailError} />
            <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} error={passwordError} />
            <TextInput placeholder="Confirmar senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} error={confirmPasswordError} />
            <View style={{ marginTop: 20 }}>
              <Button title="Próximo" onPress={handleNext} />
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <S.StepTitle>Etapa 2: Dados Pessoais</S.StepTitle>

            <View style={{ flexDirection: 'row', marginBottom: 20, gap: 8 }}>
              <View style={{ flex: 1 }}>
                <Button 
                  title={clientType === 'individual' ? '✓ Pessoal' : 'Pessoal'} 
                  onPress={() => setClientType('individual')} 
                  disabled={clientType === 'individual'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button 
                  title={clientType === 'company' ? '✓ Empresa' : 'Empresa'} 
                  onPress={() => setClientType('company')} 
                  disabled={clientType === 'company'}
                />
              </View>
            </View>

            {clientType === 'individual' ? (
              <>
                <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} error={firstNameError} />
                <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} error={lastNameError} />
                <TextInput placeholder="CPF" keyboardType="number-pad" value={cpf} onChangeText={(t)=> setCpf(formatCPF(t))} error={cpfError} />
              </>
            ) : (
              <>
                <TextInput placeholder="Razão social" value={companyName} onChangeText={setCompanyName} error={companyNameError} />
                <TextInput placeholder="Nome fantasia" value={tradeName} onChangeText={setTradeName} />
                <TextInput placeholder="CNPJ" keyboardType="number-pad" value={cnpj} onChangeText={(t)=> setCnpj(formatCNPJ(t))} error={cnpjError} />
              </>
            )}

            <TextInput placeholder="Telefone" keyboardType="phone-pad" value={phone} onChangeText={(t)=> setPhone(formatPhone(t))} error={phoneError} />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button title="Voltar" onPress={handleBack} />
              </View>
              <View style={{ flex: 1 }}>
                <Button title="Próximo" onPress={handleNext} />
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <S.StepTitle>Etapa 3: Seu Endereço</S.StepTitle>
            <TextInput placeholder="Logradouro (Rua, Av, etc)" value={addressName} onChangeText={setAddressName} error={addressNameError} />
            <TextInput placeholder="Número" value={number} onChangeText={setNumber} />
            <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
            <TextInput placeholder="CEP" keyboardType="number-pad" value={postalCode} onChangeText={(t)=> setPostalCode(formatCEP(t))} error={postalCodeError} />
            <TextInput placeholder="Cidade" value={city} onChangeText={setCity} error={cityError} />
            <TextInput placeholder="Estado (UF)" value={state} onChangeText={setState} error={stateError} />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button title="Voltar" onPress={handleBack} />
              </View>
              <View style={{ flex: 1 }}>
                <Button title={isLoading ? 'Salvando...' : 'Criar Conta'} onPress={handleSubmit} isLoading={isLoading} />
              </View>
            </View>
          </View>
        )}
      </S.FormContainer>
    </S.SafeContainer>
  );
};

export default RegisterScreen;