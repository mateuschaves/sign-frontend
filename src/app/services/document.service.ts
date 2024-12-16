import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentRequest, CreateDocumentResponse, GetDocumentRequest, ListDocumentsResponse, UpdateDocumentRequest } from '../interfaces/documents';
import { Company } from '../interfaces/entities';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://sign-api.onrender.com/api';

  constructor(private http: HttpClient) { }

  createDocument(documentData: CreateDocumentRequest): Observable<CreateDocumentResponse> {
    return this.http.post<CreateDocumentResponse>(`${this.apiUrl}/documents/post`, documentData);
  }
  updateDocument(documentData: UpdateDocumentRequest): Observable<void> {
    console.log(documentData)
    return this.http.patch<void>(`${this.apiUrl}/documents/${documentData.id}/patch`, documentData);
  }
  getDocuments(): Observable<ListDocumentsResponse[]> {
    return this.http.get<ListDocumentsResponse[]>(`${this.apiUrl}/documents/get`);
  }
  deleteDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/documents/${documentId}/delete`);
  }
  updateSigner(updateSignerData: UpdateSignerRequest): void {
    this.http.patch<void>(`${this.apiUrl}/signers/${updateSignerData.id}/patch`, updateSignerData);
  }
  deleteSigner(signerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/signers/${signerId}/delete`);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`);
  }
  getDocument(documentId: number): Observable<GetDocumentRequest> {
    return this.http.get<GetDocumentRequest>(`${this.apiUrl}/documents/${documentId}`);
  }
}
