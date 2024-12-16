import { SinatureStatusEnum } from "../nums/sinature";

export interface SignDocument {
    id?:     number;
    url:     string;
    name:    string;
    company: number;
    status?: SinatureStatusEnum;
}

export interface Signer {
    name:  string;
    email: string;
}

export interface Company {
    id:   number;
    name: string;

}