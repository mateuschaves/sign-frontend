    export interface CreateDocumentRequest {
        document: SignDocument;
        signers:  Signer[];
    }
    
    export interface CreateDocumentResponse {
        id:              number;
        open_id:         number;
        token:           string;
        name:            string;
        status:          string;
        created_at:      Date;
        last_updated_at: Date;
        created_by:      string;
        company:         number;
        external_id:     null;
    }
    
    
    export interface ListDocumentsRequest {
        company: number;
    }
    
    export interface ListDocumentsResponse extends Document {
    }
