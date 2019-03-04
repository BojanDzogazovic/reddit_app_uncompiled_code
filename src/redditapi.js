export default {
    search: function(searchTerm, limit, checked){
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${checked}&limit=${limit}`)
        .then(result => result.json())
        .then(data => { return data.data.children.map(data => data.data);})
        .catch(err => console.log(err));
    }
};