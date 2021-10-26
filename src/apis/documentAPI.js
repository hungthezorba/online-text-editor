import axios from 'axios';
import {apis} from '../constants'


const getAllDocuments =  async () => {
    let res = await axios.get(apis.DOCUMENT_SERVICE_URL)
    return res;
}

const documentAPI = {
    getAllDocuments
}

export default documentAPI;