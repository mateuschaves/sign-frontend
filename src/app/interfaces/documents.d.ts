import { Company, SignDocument } from "./entities";

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
        created_at:      Date | string;
        last_updated_at: Date | string;
        created_by:      string;
        company:         number;
        external_id:     null;
    }

    export interface UpdateDocumentRequest {
        name: string;
        id: number;
    }

    export interface GetDocumentRequest extends SignDocument {
        signers: Signer[];
    }
    
    export interface ListDocumentsRequest {
        company: number;
    }
    
    export interface ListDocumentsResponse extends SignDocument {
        signers: Signer[];
        company: Company;
    }
