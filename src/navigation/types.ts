// Arquivo: src/navigation/types.ts

// Aqui definimos todas as rotas do fluxo de autenticação
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  // Ao abrir a tela de verificação do código passamos o email
  ResetPassword: { email: string };
  // Após verificação, passamos email+code para confirmar nova senha
  ResetPasswordConfirm: { email: string; code: string };
};