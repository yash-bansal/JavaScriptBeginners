let database = null;
let rootRef = null;

document.addEventListener('DOMContentLoaded', function () {
    database = firebase.database();
    var ref = database.ref();
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val() !== null) {
            for (let category in snapshot.val().products) {
                // document.getElementById('products').innerHTML = category + '<br>';
                document.getElementById('products').innerHTML = "";
                for (let item in snapshot.val().products[category]) {
                    document.getElementById('products').innerHTML += 
                        `<input id="${item}" type="text" class="inputs" value="${snapshot.val().products[category][item].productName }"/><button onclick="deleteFromDB('${item}')" style="margin-left: 1rem">Delete</button><br>`;
                }
            }
        } else {
            document.getElementById('products').innerHTML = "No product available.";
        }
        $('.inputs').focusout(function(){
            console.log('On focus out event');
            updateToDB($(this).attr('id'), $(this).val());
        })
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
function updateToDB(id, productValue) {
    console.log('Update');
    database.ref('/products/watch/' + id)
    .set({
        productName: productValue
    });
}
function deleteFromDB(id) {
    console.log('Delete', id);
    database.ref('/products/watch/' + id)
        .remove();
}
