import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { CadastrarComponent } from './cadastrar.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CadastrarComponent', () => {
  let component: CadastrarComponent;
  let fixture: ComponentFixture<CadastrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarComponent],
      imports: [CardModule, ButtonModule, HttpClientModule],
      providers: [MessageService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(CadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CadastrarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p-card')?.textContent).toContain('Cadastrar de Usuário');
  });
});
