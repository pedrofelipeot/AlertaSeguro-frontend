import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarSensorPage } from './cadastrar-sensor.page';

describe('CadastrarSensorPage', () => {
  let component: CadastrarSensorPage;
  let fixture: ComponentFixture<CadastrarSensorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
