export interface MeetingSignature {
  signature: string
  apiKey: string
  meetingNumber: number
  userName: string
  userEmail: string
  password: string
  role: number
}

export type PartyType = 'witness' | 'scheduling' | 'attending' | 'observers';
export type ParticipantStatus = 'accepted' | 'invited' | 'declined'

export interface ParticipantModel {
  participantId: number
  eventId: number
  email: string
  firstName: string
  lastName: string
  partyId: number
  partyType: PartyType
  title: string
  status: ParticipantStatus
  partyName: string
}

export interface PartyModel {
  name: string
  partyType: PartyType
  stipulationStatus: boolean
  partyId: number
  eventId: number
}
