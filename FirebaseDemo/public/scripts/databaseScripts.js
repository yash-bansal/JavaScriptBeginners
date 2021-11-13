let database = null;
let rootRef = null;
document.addEventListener('DOMContentLoaded', function () {
    database = firebase.database();
    var ref = database.ref();
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val() !== null) {
            for (let category in snapshot.val().products) {
                document.getElementById('products').innerHTML = category + '<br>';
                for (let item in snapshot.val().products[category]) {
                    document.getElementById('products').innerHTML += snapshot.val().products[category][item].productName + `<button onclick="deleteFromDB('${item}')">Delete</button><br>`;
                }
            }
        } else {
            document.getElementById('products').innerHTML = "No product available.";
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
});
function createToDB() {
    console.log('Create');
    let productId = `watch${moment(new Date()).format('yyyymmDDhhMMss')}`;
    let productValue = document.getElementById('myProductName').value;
    database.ref('/products/watch/' + productId)
        .set({
            productName: productValue
        });
}
function updateToDB() {
    console.log('Update');
}
function deleteFromDB(id) {
    console.log('Delete', id);
    database.ref('/products/watch/' + id)
        .remove();
}
