import { describe, expect, it } from "vitest"
import { Appointment } from "../../entities/appointment";
import { InMemoryAppointmentRepository } from "../../repositories/implementations.ts/inMemory/InMemoryAppointmentsRepository";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";

let isToTest = true

describe('Create Appointment Use Case', () => {

  it.runIf(isToTest)("Should be able to create an appointment", async () => {

    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointmentUseCase(appointmentRepository)

    let startsAt = new Date();
    let endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    await expect(createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)

  });

  it.runIf(isToTest)("Should not be able to create an appointment with overlapping dates", async () => {

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointmentUseCase(appointmentRepository);

    let startsAt = new Date();
    let endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 10);

    let appointment1 = new Appointment({
      startsAt,
      endsAt,
      customer: "Appointment1"
    });

    await createAppointment.execute(appointment1);

    let startsAt2 = new Date();
    let endsAt2 = new Date();

    startsAt2.setDate(startsAt2.getDate() + 5);
    endsAt2.setDate(endsAt2.getDate() + 15);

    let appointment2 = new Appointment({
      startsAt: startsAt2,
      endsAt: endsAt2,
      customer: "Appointment2"
    });

    await expect(createAppointment.execute(appointment2)).rejects.toThrow("Another appointment overlaps this appointment dates.")
    
  });
})