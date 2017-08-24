import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksApiService } from './google-books-api.service';

describe('GoogleBooksApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleBooksApiService]
    });
  });

  it('should be created', inject([GoogleBooksApiService], (service: GoogleBooksApiService) => {
    expect(service).toBeTruthy();
  }));
});
