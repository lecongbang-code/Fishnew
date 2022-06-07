import * as CryptoJS from 'crypto-js';

export class EncDecString
{
    private key: string='lecongbang';

    Encrypt(str:string)
    {
        return CryptoJS.AES.encrypt(str.trim(), this.key.trim()).toString();
    }

    Decrypt(str:string)
    {
        return CryptoJS.AES.decrypt(str.trim(), this.key.trim()).toString(CryptoJS.enc.Utf8);
    }
}