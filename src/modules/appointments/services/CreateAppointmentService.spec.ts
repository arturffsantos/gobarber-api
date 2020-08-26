import 'reflect-metadata';
import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
    expect(appointment.date).toEqual(startOfHour(appointmentDate));
    expect(appointment.created_at).toBeTruthy();
    expect(appointment.updated_at).toBeTruthy();
    expect(appointment.created_at).toEqual(appointment.updated_at);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
