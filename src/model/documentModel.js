import { localStorage } from "../config";

const getAllDocuments = () => {
    let res = localStorage.getItem('documents');
    if (res) {
        return res;
    }
    return [];
}

const documentModel = {
    getAllDocuments
}

export default documentModel;