import {Parcours} from './parcours.model';
import {Price} from './price.model';

export class PackStudent {

    public id: number;
    public nombreCours: number;
    public forGroupe: boolean;
    public code: string;
    public libelle: string;
    public description: string;
    public imgUrl: string;
    public price: Price = new Price();
    public totalStudents: number;
    public preRequisites: string;
    public whyTakeThisCourse: string;
    public expectations: string;
    public level: Parcours = new Parcours();
    public rating: string;
    oldPrice: string;
}
