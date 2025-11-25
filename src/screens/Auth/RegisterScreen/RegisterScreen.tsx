// Arquivo: src/screens/Auth/RegisterScreen/RegisterScreen.tsx

import React, { useState, useEffect } from 'react';
import { StatusBar, View, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, TextInput } from '../../../components';
import { COLORS } from '../../../constants/colors';
import * as S from './RegisterScreen.styles';

import { AuthStackParamList } from '../../../navigation/types'; // Garanta que esse import existe ou use 'any'

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// --- HELPERS DE MÁSCARA ---
const onlyDigits = (s: string) => s.replace(/\D/g, '');
const formatCPF = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return d;
};
const formatCNPJ = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/, "$1.$2");
  d = d.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  d = d.replace(/\.(\d{3})(\d)/, ".$1/$2");
  d = d.replace(/(\d{4})(\d)/, "$1-$2");
  return d;
};
const formatPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/g, "($1) $2");
  d = d.replace(/(\d)(\d{4})$/, "$1-$2");
  return d;
};
const formatCEP = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{5})(\d)/, "$1-$2");
  return d;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(1);

  // Step 1 - Credenciais
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Step 2 - Dados Pessoais
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

  // Step 3 - Endereço
  const [postalCode, setPostalCode] = useState('');
  const [addressName, setAddressName] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  
  const [postalCodeError, setPostalCodeError] = useState('');
  const [addressNameError, setAddressNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // --- NOVO ESTADO PARA SUCESSO ---
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Força da Senha
  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);

    if (!hasLength || !hasUpper || !hasNumber) return 1;
    
    score = 2; 
    if (hasSpecial) score += 1;
    if (pass.length > 10 && hasSpecial) score += 1;
    return score;
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const handleClientTypeChange = (type: 'individual' | 'company') => {
    setClientType(type);
    if (type === 'individual') {
      setCompanyName(''); setTradeName(''); setCnpj('');
      setCompanyNameError(''); setCnpjError('');
    } else {
      setFirstName(''); setLastName(''); setCpf('');
      setFirstNameError(''); setLastNameError(''); setCpfError('');
    }
  };

  // --- VALIDAÇÕES ---
  const validateStep1 = () => {
    let isValid = true;
    if (!email.includes('@') || email.length < 5) { setEmailError('Email inválido'); isValid = false; } else setEmailError('');
    
    if (password.length < 8) {
       setPasswordError('Mínimo 8 caracteres');
       isValid = false;
    } else if (passwordStrength < 2) { 
       setPasswordError('Adicione maiúsculas e números.'); 
       isValid = false; 
    } else { 
       setPasswordError(''); 
    }
    
    if (password !== confirmPassword) { setConfirmPasswordError('Senhas não conferem'); isValid = false; } else setConfirmPasswordError('');
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    if (clientType === 'individual') {
      if (!firstName) { setFirstNameError('Informe o nome'); isValid = false; } else setFirstNameError('');
      if (!lastName) { setLastNameError('Informe o sobrenome'); isValid = false; } else setLastNameError('');
      if (onlyDigits(cpf).length < 11) { setCpfError('CPF inválido'); isValid = false; } else setCpfError('');
    } else {
      if (!companyName) { setCompanyNameError('Razão Social obrigatória'); isValid = false; } else setCompanyNameError('');
      if (onlyDigits(cnpj).length < 14) { setCnpjError('CNPJ inválido'); isValid = false; } else setCnpjError('');
    }
    if (onlyDigits(phone).length < 10) { setPhoneError('Telefone inválido'); isValid = false; } else setPhoneError('');
    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;
    if (onlyDigits(postalCode).length !== 8) { setPostalCodeError('CEP inválido'); isValid = false; } else setPostalCodeError('');
    if (!addressName) { setAddressNameError('Endereço obrigatório'); isValid = false; } else setAddressNameError('');
    if (!number) { setNumberError('Nº obrigatório'); isValid = false; } else setNumberError('');
    if (!city) { setCityError('Cidade obrigatória'); isValid = false; } else setCityError('');
    if (!state) { setStateError('UF obrigatório'); isValid = false; } else setStateError('');
    return isValid;
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return COLORS.error;
    if (passwordStrength === 2) return '#ffbb33';
    if (passwordStrength === 3) return '#00C851';
    return '#007E33';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Fraca';
    if (passwordStrength === 2) return 'Média';
    if (passwordStrength === 3) return 'Forte';
    return 'Muito Forte';
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const handleCepChange = async (text: string) => {
    const formatted = formatCEP(text);
    setPostalCode(formatted);
    const cleanCep = onlyDigits(text);
    if (cleanCep.length === 8) {
      setIsCepLoading(true);
      Keyboard.dismiss();
      try {
        const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAddressName(data.street || '');
        setNeighborhood(data.neighborhood || '');
        setCity(data.city || '');
        setState(data.state || '');
        setPostalCodeError('');
      } catch {
        setPostalCodeError('CEP não encontrado');
      } finally {
        setIsCepLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsLoading(true);

    try {
      const payload: any = {
        email,
        password,
        phone: onlyDigits(phone),
        address: {
          addressType: 'Rua',
          addressName,
          number,
          additionalInfo: complement,
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
      
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("URL da API não configurada");
      
      const fullUrl = `${apiUrl}${endpoint}`;

      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = data?.message || data?.error || `Erro ${res.status}`;
        Alert.alert('Erro no Cadastro', message);
        setIsLoading(false); 
        return;
      }
      setIsSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha de conexão.');
      setIsLoading(false);
    }
  };

  return (
    <S.SafeContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <S.Header>
        <S.BackButton onPress={handleBack}>
          <Icon name="arrow-left" size={30} color={COLORS.text} />
        </S.BackButton>
        <S.HeaderTitle>Criar Conta</S.HeaderTitle>
      </S.Header>

      <S.FormContainer>
        
        <S.StepsContainer>
          <S.ProgressBackground>
            <S.ProgressFill style={{ width: `${(step / 3) * 100}%` }} />
          </S.ProgressBackground>
          <S.StepLabel>Passo {step} de 3</S.StepLabel>
        </S.StepsContainer>

        {step === 1 && (
          <View>
            <S.StepTitle>Suas Credenciais</S.StepTitle>
            
            <TextInput 
              placeholder="Seu melhor e-mail" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email} 
              onChangeText={(t) => { setEmail(t); setEmailError(''); }} 
              error={emailError} 
            />
            
            <TextInput 
              placeholder="Crie uma senha forte" 
              secureTextEntry={!showPassword} 
              value={password} 
              onChangeText={(t) => { setPassword(t); setPasswordError(''); }} 
              error={passwordError} 
              rightIcon={<Icon name={showPassword ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
              onRightPress={() => setShowPassword(!showPassword)}
            />

            <S.HelperText>
              A senha deve no mínimo conter de 8 caracteres, contendo letra maiúscula e número.
            </S.HelperText>

            {password.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill 
                    width={`${(passwordStrength / 4) * 100}%`} 
                    color={getStrengthColor()} 
                  />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>
                  {getStrengthLabel()}
                </S.StrengthLabel>
              </S.StrengthContainer>
            )}
            
            <TextInput 
              placeholder="Confirme sua senha" 
              secureTextEntry={!showPassword} 
              value={confirmPassword} 
              onChangeText={(t) => { setConfirmPassword(t); setConfirmPasswordError(''); }} 
              error={confirmPasswordError} 
            />

            <S.Row>
              <S.Col><Button title="Próximo" onPress={handleNext} /></S.Col>
            </S.Row>
          </View>
        )}
        
        {step === 2 && (
          <View>
            <S.StepTitle>Dados Pessoais</S.StepTitle>
            
            <S.Row>
              <S.Col>
                 <Button 
                   title={clientType === 'individual' ? '✔ Pessoal' : 'Pessoal'} 
                   onPress={() => handleClientTypeChange('individual')}
                   variant={clientType === 'individual' ? 'primary' : 'secondary'} 
                 />
              </S.Col>
              <S.Col>
                 <Button 
                   title={clientType === 'company' ? '✔ Empresa' : 'Empresa'} 
                   onPress={() => handleClientTypeChange('company')}
                   variant={clientType === 'company' ? 'primary' : 'secondary'}
                 />
              </S.Col>
            </S.Row>
            
            {clientType === 'individual' ? (
              <>
                <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} error={firstNameError} />
                <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} error={lastNameError} />
                <TextInput 
                  placeholder="CPF" 
                  keyboardType="number-pad" 
                  value={cpf} 
                  onChangeText={(t) => { const m = formatCPF(t); setCpf(m); if(onlyDigits(m).length===11) setCpfError(''); }} 
                  maxLength={14} 
                  error={cpfError} 
                />
              </>
            ) : (
              <>
                <TextInput placeholder="Razão Social" value={companyName} onChangeText={setCompanyName} error={companyNameError} />
                <TextInput placeholder="Nome Fantasia" value={tradeName} onChangeText={setTradeName} />
                <TextInput 
                  placeholder="CNPJ" 
                  keyboardType="number-pad" 
                  value={cnpj} 
                  onChangeText={(t) => setCnpj(formatCNPJ(t))} 
                  maxLength={18} 
                  error={cnpjError} 
                />
              </>
            )}
            
            <TextInput 
              placeholder="Telefone / Celular" 
              keyboardType="phone-pad" 
              value={phone} 
              onChangeText={(t) => setPhone(formatPhone(t))} 
              maxLength={15} 
              error={phoneError} 
            />

            <S.Row>
              <S.Col><Button title="Voltar" onPress={handleBack} variant="secondary" /></S.Col>
              <S.Col><Button title="Próximo" onPress={handleNext} /></S.Col>
            </S.Row>
          </View>
        )}

        {step === 3 && (
          <View>
            <S.StepTitle>Endereço</S.StepTitle>
            <TextInput 
              placeholder="CEP" 
              keyboardType="number-pad" 
              value={postalCode} 
              onChangeText={handleCepChange} 
              maxLength={9} 
              error={postalCodeError} 
              rightIcon={isCepLoading ? <ActivityIndicator color={COLORS.primary} /> : null} 
            />
            <TextInput placeholder="Logradouro" value={addressName} onChangeText={setAddressName} error={addressNameError} />
            
            <S.Row style={{ marginTop: 0 }}>
                <S.Col><TextInput placeholder="Nº" value={number} onChangeText={(t) => { setNumber(t); setNumberError(''); }} error={numberError} keyboardType="number-pad" /></S.Col>
                <S.Col style={{ flex: 2 }}><TextInput placeholder="Complemento (Opcional)" value={complement} onChangeText={setComplement} /></S.Col>
            </S.Row>
            
            <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
            
            <S.Row style={{ marginTop: 0 }}>
                <S.Col style={{ flex: 2 }}><TextInput placeholder="Cidade" value={city} onChangeText={setCity} error={cityError} /></S.Col>
                <S.Col><TextInput placeholder="UF" value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" error={stateError} /></S.Col>
            </S.Row>

            <S.Row>
              <S.Col><Button title="Voltar" onPress={handleBack} variant="secondary" /></S.Col>
              <S.Col>
                <Button 
                  title={isSuccess ? "Conta Criada! ✓" : (isLoading ? "Criando..." : "Finalizar")} 
                  onPress={handleSubmit} 
                  isLoading={isLoading && !isSuccess} 
                  disabled={isLoading || isSuccess}   
                  style={isSuccess ? { backgroundColor: '#00C851' } : {}} 
                />
              </S.Col>
            </S.Row>
          </View>
        )}

      </S.FormContainer>
    </S.SafeContainer>
  );
};

export default RegisterScreen;