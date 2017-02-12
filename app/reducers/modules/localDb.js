import _ from 'lodash';

const localDB = (() => {
    /*
     -> Each id is item. And each item is comes in url path in frontend. Maintaining 1 level hierarchy in DB is important.
     -> This DB will be indexed using id for faster search.
     -> Only parent id needs to change in case folder/file is moved to another hierarchy.
     -> type:file will be restricted to have any children.
     */
    const itemCollection = [
        {
            id: 2323,
            type: 'folder',
            name: 'myFolder',
            parent: 0, // 0 means it's at 0 level
            children: [
                {id: 12323, type: 'folder'},
                {id: 3423, type: 'file'},
                {id: 23283, type: 'folder'},
                {id: 1332, type: 'file'}
            ]
        },
        {
            id: 26283,
            type: 'folder',
            name: 'DummyFolder',
            parent: 2323,
            children: [
                {id: 122323, type: 'folder'},
                {id: 13534, type: 'file'},
                {id: 226, type: 'file'},
                {id: 221, type: 'folder'}
            ]
        },
        {
            id: 23283,
            type: 'folder',
            name: 'Public Folder',
            parent: 26283,
            children: [
                {id: 122323, type: 'folder'},
                {id: 13534, type: 'file'},
                {id: 226, type: 'file'},
                {id: 221, type: 'folder'}
            ]
        },
        {
            id: 13534,
            type: 'file',
            parent: 23283,
            name: 'somefile.js',
        },
    ];


    /*
     -> Key value mapping of folders for faster DB search. Format is simplified for frontend-only task.
     -> In case of folder/file movement in hierarchy, ancestors part ahead of latest parent will be removed.
     -> No ancenstory means top in hierarchy level.
     -> Parent ids in order of hierarchy to simplify DB parsing for finding path.
     */
    const userCollection = {
        'myFolder': {id: 2323},
        'DummyFolder': {id: 26283, ancestors: [2323]},
        'Public Folder': {id: 23283, ancestors: [2323, 26283]}
    };

    /* Parse itemCollection with itemId */
    const _getItemNameById = (itemId) => {
        for (const itemKey in itemCollection) {
            if (itemCollection.hasOwnProperty(itemKey)) {
                if (itemCollection[itemKey].id === itemId) {
                    return itemCollection[itemKey].name;
                }
            }
        }
        return 'no_name'; // Some folders/files are not having mapping above
    };

    /* Parse itemCollection with itemId */
    const _getItemDetailsById = (itemId) => {
        let itemReq = null;
        for (const itemKey in itemCollection) {
            if (itemCollection[itemKey].id === itemId) {
                itemReq = itemCollection[itemKey];
                break;
            }
        }

        /* Get name of children items */
        for (const childKey in itemReq.children) {
            if (itemReq.children.hasOwnProperty(childKey)) {
                itemReq.children[childKey].name = _getItemNameById(itemReq.children[childKey].id);
            }
        }

        // Remove item id in response since FE should be unaware of it
        itemReq = _.omit(itemReq, ['id', 'parent']);
        for (const childKey in itemReq.children) {
            if (itemReq.children.hasOwnProperty(childKey)) {
                itemReq.children[childKey] = _.omit(itemReq.children[childKey], ['id']);
            }
        }
        return itemReq;
    };

    /* Resolve folderNames into id from userCollection mapping */
    const _getPathAncestors =  (folderName) => {
        const result = userCollection[folderName];
        return {itemId: result.id, itemAncestors: result.ancestors};
    };

    return {
        /* only for type: folder */
        getItemByName: (folderName) => {
            if (!folderName) {
                return {success: false, reason: 'Invalid Path Requested' };
            }
            const data = {};
            const itemInfo = _getPathAncestors(folderName);

            if (itemInfo.itemAncestors) {
                data.path = itemInfo.itemAncestors;
            }
            data.itemDetails = _getItemDetailsById(itemInfo.itemId);

            const response = {
                success: true,
                result: data
            };
            return response; // (Add promise later to simulate backend)
        }
    };
})();


export default localDB;
