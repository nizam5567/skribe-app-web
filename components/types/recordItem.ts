export interface RecordItem {
  id: number
  exhibitName: string
  fileName: string
  ownerName: string
  newRecord: boolean
  exhibitType?: string
  fileSize?: number
  mimeType?: string
  imageUrl?: string
  fileOwner?: string
  exhibitId?: number
  eventId?: number
}
