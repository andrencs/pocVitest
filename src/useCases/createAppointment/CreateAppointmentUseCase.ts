import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../../repositories/AppointmentsRepository";
import { CreateAppointmentDTO } from "./CreateAppointmentDTO";

export class CreateAppointmentUseCase {

  constructor(
    private appointmentRepository: AppointmentsRepository
  ){}

  async execute(props: CreateAppointmentDTO): Promise<CreateAppointmentDTO | void>{

    const { customer, startsAt, endsAt } = props;

    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt);

    if(overlappingAppointment) throw new Error('Another appointment overlaps this appointment dates.')

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    });

    await this.appointmentRepository.create(appointment);

    return appointment;
    
  }
}