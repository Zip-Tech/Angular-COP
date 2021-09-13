import { TestBed } from '@angular/core/testing';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run encrypt()', async () => {
    const secret = '123456$#@$^@1ERF';
    const encryptedString = service.encrypt(secret, 'AccessToken');
    expect(encryptedString).not.toBeNull();
  });

  it('should run decrypt()', async () => {
    const secret = '123456$#@$^@1ERF';
    const encryptedString = service.encrypt(secret, 'AccessToken');
    const decryptedString = service.decrypt(secret, encryptedString);
    expect(decryptedString).toEqual('AccessToken');
  });
});
