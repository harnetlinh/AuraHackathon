import * as ORM from '../config/database.js';

const checkCampus = (campus) => {
    switch (campus) {
        case 'ph':
            return ORM.apHN;
        case 'ps':
            return ORM.apHCM;
        case 'pd':
            return ORM.apDN;
        case 'pk':
            return ORM.apTN;
        case 'pc':
                return ORM.apCT;
        default:
            return ORM.apHN;
    }
}
export { checkCampus };
