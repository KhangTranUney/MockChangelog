import ReactNativeBiometrics from 'react-native-biometrics';

const biometrics = new ReactNativeBiometrics();

export class BiometricService {
  static async isAvailable(): Promise<{ available: boolean; type: string }> {
    const { available, biometryType } = await biometrics.isSensorAvailable();
    return { available, type: biometryType || 'none' };
  }

  static async authenticate(promptMessage: string): Promise<boolean> {
    const { success } = await biometrics.simplePrompt({ promptMessage });
    return success;
  }

  static async createKeys(): Promise<string> {
    const { publicKey } = await biometrics.createKeys();
    return publicKey;
  }

  static async sign(payload: string): Promise<string> {
    const { signature } = await biometrics.createSignature({ promptMessage: 'Confirm identity', payload });
    return signature;
  }
}
