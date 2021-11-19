export default class AppointmentDM {
  _id = ''
  googleEmail = ''
  googleCalendarId = ''
  userId = ''
  title = ''
  date = ''
  startTime = ''
  puTime = ''
  endTime = ''
  doTime = ''
  driver = ''
  type = ''
  puLocation = ''
  instructor = ''
  vehicle = ''
  status = ''
  instrunctionOne = ''
  instructionTwo = ''
  notes = ''
  createdAt = ''

  readFromObj(obj) {
    this._id = obj._id
    this.userId = obj.userId
    this.googleEmail = obj.googleEmail
    this.googleCalendarId = obj.googleCalendarId
    this.title = obj.title
    this.date = obj.date
    this.startTime = obj.startTime
    this.puTime = obj.puTime
    this.endTime = obj.endTime
    this.doTime = obj.doTime
    this.driver = obj.driver
    this.type = obj.type
    this.puLocation = obj.puLocation
    this.instructor = obj.instructor
    this.vehicle = obj.vehicle
    this.status = obj.status
    this.instrunctionOne = obj.instrunctionOne
    this.instructionTwo = obj.instructionTwo
    this.notes = obj.notes
    this.createdAt = obj.createdAt
  }
}
