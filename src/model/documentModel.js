import {pouchdb} from '../config';

const getAllDocuments = async () => {
    let rs = await pouchdb.allDocs({
        include_docs: true
    }) 
    return (await rs).rows.map(item => item.doc);
}

const saveDocument =  async (doc) => {
    console.log(doc);
    let rs = await pouchdb.put(doc, {
        force: true
    })
    if (rs) {
        return rs.rev;
    }
    return false;
}
const documentModel = {
    getAllDocuments,
    saveDocument
}

export default documentModel;