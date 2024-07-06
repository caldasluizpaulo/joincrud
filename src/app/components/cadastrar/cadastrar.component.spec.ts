import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { CadastrarComponent } from './cadastrar.component';

describe('CadastrarComponent', () => {
  let component: CadastrarComponent;
  let fixture: ComponentFixture<CadastrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarComponent],
      imports: [CardModule, ButtonModule]
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
