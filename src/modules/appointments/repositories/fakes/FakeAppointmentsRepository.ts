import { uuid } from 'uuidv4';

import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppoitmentsRepository {
  private appointments: Appointment[] = [];

  public create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    const createdAt = new Date();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      created_at: createdAt,
      updated_at: createdAt,
    });

    this.appointments.push(appointment);

    return Promise.resolve(appointment);
  }

  public findAll(): Promise<Appointment[]> {
    return Promise.resolve(this.appointments);
  }

  public findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return Promise.resolve(findAppointment);
  }
}

export default FakeAppointmentsRepository;
