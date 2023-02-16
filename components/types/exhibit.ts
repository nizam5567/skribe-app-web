export interface Exhibit {
  exhibitName: string
  fileName: string
  mimeType: any
  fileSize: number
  imageUrl?: string
  fileOwner?: string
  objectId?: string
  uploadUrl?: string
  binaryContent?: any
  isReadyToUpload?: boolean
}

export interface Stipulation {
  fileName?: string
  fileOwner?: string
  fileSize?: number | string
  default?: boolean
  ownerName?: string
  exhibitName?: string
  mimeType?: any
  objectId?: number
}

export interface RecordItem {
  id: number
  exhibitName: string
  fileName: string
  ownerName: string
  newRecord: boolean
  ontheRecord: boolean
  exhibitType?: string
  exhibitThumbnail?: any
}
