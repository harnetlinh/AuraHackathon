import * as ORM from './database';

const checkCampus = (campus) => {
    switch (campus) {
        case 'ph':
            return ORM.apPH;
        case 'ps':
            return ORM.apPS;
        case 'pd':
            return ORM.apPD;
        case 'pk':
            return ORM.apPK;
        case 'pc':
            return ORM.apPC;
        case 'ho':
            return ORM.apHO;
        default:
            return ORM.apHO;
    }
}
export { checkCampus };
