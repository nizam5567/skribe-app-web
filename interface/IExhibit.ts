export interface IExhibit {
  id: number | undefined
  status: string | undefined
  objectid: number
  partyid: number | undefined
  tenantid: number | undefined
  eventid: number
  title: string
  description: string
  exhibitname: string
  filename: string
  filesize: number
  mimetype: string
  uploadUrl: string
  binaryContent: any
  exhibitid: string
  fileNameInUserEnd: string
  isReadyToUpload: boolean
}
