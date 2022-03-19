import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  public user: any
  public userId: any = new BehaviorSubject<any>(null);
  public isAuth: any = new BehaviorSubject<boolean>(false);
  public openPopUp: any = new BehaviorSubject<boolean>(false);
  public openPopUpAddFramework: any = new BehaviorSubject<boolean>(false);
  public userData: any = new BehaviorSubject<any>(null);
  public useEmailAsUserName: any = new BehaviorSubject<any>(false);
  constructor() {}

  toggleSignUpModal(open: boolean, userId?: number, useEmail?: boolean) {
    this.openPopUp.next(open);
    this.userData.next(userId);
    this.useEmailAsUserName.next(useEmail);
  }

  toggleAdminSignUpModal(open: boolean) {
    this.openPopUp.next(open);
    // console.log("helper1", this.openPopUp)
  }

  toggleAddFrameworkModal(open: boolean) {
    this.openPopUpAddFramework.next(open)
  }

  // Save user
  saveUser(data: any) {
    this.user = data;
    this.userId.next(data.employeeId);
    console.log(this.userId, "helperSekjnfdkn!!!!!!!!!!!!!!!")
    this.isAuth.next(true);
  }

  isAuthorized() {
    const token = localStorage.getItem('accessToken')
    if(token) {
      this.isAuth.next(true)
    }
    return !!token;
  }

  logout() {
    this.isAuth.next(false);
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('auth_data');
  }

  // Encrypt
  // tslint:disable-next-line:typedef
  encrypt(str: any) {
    const iv = CryptoJS.lib.WordArray.random(16); // the reason to be 16, please read on `encryptMethod` property.

    const salt = CryptoJS.lib.WordArray.random(256);
    const iterations = 999;
    const encryptMethodLength = 256 / 4; // example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(environment.encToken, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations,
    });

    const encrypted = CryptoJS.AES.encrypt(str, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv,
    });
    const encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    const output = {
      ciphertext: encryptedString,
      iv: CryptoJS.enc.Hex.stringify(iv),
      salt: CryptoJS.enc.Hex.stringify(salt),
      iterations,
    };

    return CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(JSON.stringify(output))
    );
  }

  // decrypt
  // tslint:disable-next-line:typedef
  decrypt(encryptedString: any) {
    const json = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString))
    );

    const salt = CryptoJS.enc.Hex.parse(json.salt);
    const iv = CryptoJS.enc.Hex.parse(json.iv);

    const encrypted = json.ciphertext; // no need to base64 decode.

    // tslint:disable-next-line:radix
    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
      iterations = 999;
    }
    const encryptMethodLength = 256 / 4; // example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(environment.encToken, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
