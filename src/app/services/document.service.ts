import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentRequest, CreateDocumentResponse, ListDocumentsRequest, ListDocumentsResponse } from '../interfaces/documents';
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
  getDocuments(documentParams: ListDocumentsRequest): Observable<ListDocumentsResponse[]> {
    return this.http.get<ListDocumentsResponse[]>(`${this.apiUrl}/${documentParams.company}/documents`);
  }
  updateSigner(updateSignerData: UpdateSignerRequest): void {
    this.http.patch<void>(`${this.apiUrl}/signers/${updateSignerData.id}/patch`, updateSignerData);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`);
  }
}
