import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  keySize = 16;
  public encrypt(secretKey: string, value: string): string {
    const utf8Key = CryptoJS.enc.Utf8.parse(secretKey);
    const utf8Iv = CryptoJS.enc.Utf8.parse(secretKey);
    const utf8Val = CryptoJS.enc.Utf8.parse(value);
    const options: any = {
      keySize: this.keySize,
      iv: utf8Iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };

    const encrypted: any = CryptoJS.AES.encrypt(utf8Val, utf8Key, options);

    return encrypted.toString();
  }

  public decrypt(secretKey: string, value: string): string {
    const utf8Key = CryptoJS.enc.Utf8.parse(secretKey);
    const utf8Iv = CryptoJS.enc.Utf8.parse(secretKey);
    const options: any = {
      keySize: this.keySize,
      iv: utf8Iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };

    const decrypted: any = CryptoJS.AES.decrypt(value, utf8Key, options);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
