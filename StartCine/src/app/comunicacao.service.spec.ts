import { TestBed } from '@angular/core/testing';

import { ComunicacaoService } from './comunicacao.service';

describe('AuthService', () => {
  let service: ComunicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
