import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Cep } from './components/cep/cep/cep';
@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(
    private http: HttpClient,
    private cepService: CepService
    ){}

  consultaCEP(cep: string) {
    

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
  

  }

