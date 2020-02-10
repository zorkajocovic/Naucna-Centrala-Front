import { SciField } from './SciField';

export class Magazine {
    id: number;
    description: string;
    isopenaccess: boolean;
    title: string;
    sciFields: SciField[];
}