import { localStorage } from "../config";

const getAllDocuments = () => {
    let res = localStorage.getItem('documents');
    return res;
}

const documentModel = {
    getAllDocuments
}

export default documentModel;