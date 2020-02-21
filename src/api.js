
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Desmond-AndrewD';

	
function listApiFetch(...args) {
let error;
return fetch(...args)
    .then(res => {
    if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = { code: res.status };
    }
    // In either case, parse the JSON stream:
    return res.json();
    })
    .then(data => {
    // If error was flagged, reject the Promise with the error object
    if (error) {
        error.message = data.message;
        return Promise.reject(error);
    }
    // Otherwise give back the data as resolved Promise
    return data;
    });
}

function getItems(){
    return listApiFetch(`${BASE_URL}/items`);
}

function createItem(name){
    const newItem = JSON.stringify({name});
    
    return listApiFetch( `${BASE_URL}/items`,{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: newItem
});
}

function updateItem(id, updateData) {
    const newData = JSON.stringify(updateData);
    return listApiFetch(`${BASE_URL}/items/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: newData
    });
}

function deleteItem(id) {
    return listApiFetch(`${BASE_URL}/items/${id}`,{
        method: 'DELETE',
    });
}



export default {
    getItems,
    createItem,
    updateItem, 
    deleteItem
};