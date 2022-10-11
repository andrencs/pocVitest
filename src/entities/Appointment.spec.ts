import { expect, test } from "vitest"
import { Appointment } from "./Appointment"

let isToTest = true

test.runIf(isToTest)('Create a valid appointment', () => {

  let startsAt = new Date();
  let endsAt = new Date();
  
  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("John Doe")
})

test.runIf(isToTest)('Cannot create an appointment with end date before start date', () => {

  let startsAt = new Date();
  let endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 10);
  endsAt.setDate(endsAt.getDate() + 5);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    })
  }).toThrow("Invalid end date")
})

test.runIf(isToTest)('Cannot create an appointment with start date before now', () => {

  let startsAt = new Date();
  let endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(startsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    })
  }).toThrow("Invalid start date")
})