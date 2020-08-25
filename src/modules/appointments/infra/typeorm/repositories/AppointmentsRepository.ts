import { getRepository, Repository } from 'typeorm';

import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppoitmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    return this.ormRepository.save(appointment);
  }

  public findAll(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({
      where: { date },
    });
  }
}

export default AppointmentsRepository;
