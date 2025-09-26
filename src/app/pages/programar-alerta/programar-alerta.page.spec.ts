import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarAlertaPage } from './programar-alerta.page';

describe('ProgramarAlertaPage', () => {
  let component: ProgramarAlertaPage;
  let fixture: ComponentFixture<ProgramarAlertaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarAlertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
