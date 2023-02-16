export enum EVENT_STATUS {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PREFLIGHT = 'PREFLIGHT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  CANCELED = 'CANCELED',
  ERROR = 'ERROR',
}

export enum PARTY_TYPE {
  WITNESS = 'WITNESS',
  OBSERVERS = 'OBSERVERS',
  SCHEDULING = 'SCHEDULING',
  ATTENDING = 'ATTENDING',
}

export enum STIPULATION_STATUS {
  INITIAL = 'initial',
  AGREE = 'agree',
  DISAGREE = 'disagree'
}