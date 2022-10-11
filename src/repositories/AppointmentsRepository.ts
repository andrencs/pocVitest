import { Appointment } from "../entities/Appointment";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(startAt: Date, endsAt: Date): Promise<Appointment | null>
}