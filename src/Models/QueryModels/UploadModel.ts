import * as fs from 'fs';
import * as path from 'path';

import WPError, { ApiError } from '../Errors';
import fetch, { HeadersInit } from 'node-fetch';

interface UploadMetadata {
  title?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  post?: number;
  author?: number;
}

export default class UploadModel {
  protected baseUrl: string;
  protected suffix: string;
  protected file: Buffer | string;
  protected filename: string;
  protected mimeType?: string;
  protected metadata: UploadMetadata = {};
  protected headers: HeadersInit = {};

  constructor(baseUrl: string, suffix: string, file: Buffer | string, filename: string, mimeType?: string) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.file = file;
    this.filename = filename;
    this.mimeType = mimeType;
  }

  public setTitle(title: string): UploadModel {
    this.metadata.title = title;
    return this;
  }

  public setAltText(altText: string): UploadModel {
    this.metadata.alt_text = altText;
    return this;
  }

  public setCaption(caption: string): UploadModel {
    this.metadata.caption = caption;
    return this;
  }

  public setDescription(description: string): UploadModel {
    this.metadata.description = description;
    return this;
  }

  public setPost(postId: number): UploadModel {
    this.metadata.post = postId;
    return this;
  }

  public setAuthor(authorId: number): UploadModel {
    this.metadata.author = authorId;
    return this;
  }

  public setHeaders(headers: HeadersInit): UploadModel {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  public addHeader(key: string, value: string): UploadModel {
    this.headers = { ...this.headers, [key]: value };
    return this;
  }

  private async getFileBuffer(): Promise<Buffer> {
    if (Buffer.isBuffer(this.file)) {
      return this.file;
    }
    
    // Si es una ruta de archivo, leerlo
    if (typeof this.file === 'string') {
      if (this.file.startsWith('http://') || this.file.startsWith('https://')) {
        // Si es una URL, descargar el archivo
        const response = await fetch(this.file);
        if (!response.ok) {
          throw new Error(`Failed to download file from URL: ${this.file}`);
        }
        return Buffer.from(await response.arrayBuffer());
      } else {
        // Si es una ruta local, leer el archivo
        return fs.readFileSync(this.file);
      }
    }
    
    throw new Error('Invalid file type. Must be Buffer, file path, or URL');
  }

  private getMimeType(buffer: Buffer): string {
    if (this.mimeType) {
      return this.mimeType;
    }

    // Detectar MIME type basado en magic numbers
    const magicNumbers: { [key: string]: string } = {
      'ffd8ff': 'image/jpeg',
      '89504e47': 'image/png',
      '47494638': 'image/gif',
      '52494646': 'image/webp',
      '25504446': 'application/pdf',
      '504b0304': 'application/zip',
    };

    const hex = buffer.toString('hex', 0, 4);
    for (const [magic, mime] of Object.entries(magicNumbers)) {
      if (hex.startsWith(magic)) {
        return mime;
      }
    }

    // Si no se detecta, intentar basarse en la extensión del archivo
    const ext = path.extname(this.filename).toLowerCase();
    const extMimeMap: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.mp4': 'video/mp4',
      '.mp3': 'audio/mpeg',
      '.zip': 'application/zip',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    return extMimeMap[ext] || 'application/octet-stream';
  }

  public async request(): Promise<any> {
    const fullUrl = `${this.baseUrl}${this.suffix}`;
    const fileBuffer = await this.getFileBuffer();
    const mimeType = this.getMimeType(fileBuffer);

    // Preparar headers
    const uploadHeaders: { [key: string]: string } = {
      ...(typeof this.headers === 'object' && this.headers !== null ? Object.fromEntries(Object.entries(this.headers).map(([k, v]) => [k, String(v)])) : {}),
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${this.filename}"`,
    };

    // Agregar metadatos como headers si existen
    if (this.metadata.title) {
      uploadHeaders['Content-Title'] = this.metadata.title;
    }
    if (this.metadata.alt_text) {
      uploadHeaders['Content-Alt-Text'] = this.metadata.alt_text;
    }
    if (this.metadata.caption) {
      uploadHeaders['Content-Caption'] = this.metadata.caption;
    }
    if (this.metadata.description) {
      uploadHeaders['Content-Description'] = this.metadata.description;
    }
    if (this.metadata.post) {
      uploadHeaders['Content-Post'] = this.metadata.post.toString();
    }
    if (this.metadata.author) {
      uploadHeaders['Content-Author'] = this.metadata.author.toString();
    }

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: uploadHeaders,
      body: fileBuffer,
    });

    const responseData: any = await response.json();
    
    if (responseData.code) {
      throw new WPError(responseData as ApiError);
    }
    
    return responseData;
  }
}