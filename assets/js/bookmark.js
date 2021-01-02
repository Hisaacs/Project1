
    function myFormSearch(name) {
        document.getElementById("myForm").submit();
    }

    function item(id, time, name, city) {
        return `
        <tr>
        <th scope="row">${id}</th>
        <td>${name}</td>
        <td>${city}</td>
        <td>${time}</td>
    </tr>`
    }

    if (!localStorage.getItem("bookmarkItems")) {

        localStorage.setItem("bookmarkItems", "[]");
    }

    var oldStorage = JSON.parse(localStorage.getItem("bookmarkItems"));

    var htmlRender = ``;

    for (var i in oldStorage) {
        htmlRender += item(i, oldStorage[i][0], oldStorage[i][1], oldStorage[i][2])
    }

    document.querySelector('#ItemsCover').innerHTML = htmlRender;
