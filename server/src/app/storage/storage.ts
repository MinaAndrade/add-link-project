export interface UploadParams {
  fileName: string;
  contentType: string;
  body: Buffer;
}

export interface FileStorage {
  upload(data: UploadParams): Promise<string>;
}
