$(document).ready(function () {
    get_rate();
    listing();
});

// not working on Heroku
function get_rate() {
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/rate",
        data: {},
        success: function (response) {
            let now_rate = response['rate'];
            $('#now-rate').text(now_rate);
        }
    })
}

function listing() {
    $.ajax({
        type: "GET",
        url: "/order",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let orders = response['orders'];
                for (let i = 0; i < orders.length; i++) {
                    let name = orders[i]['name']
                    let count = orders[i]['count']
                    let address = orders[i]['address']
                    let phone = orders[i]['phone']

                    let temp_html = `<tr>
                                                <th scope="row">${name}</th>
                                                <td>${count}</td>
                                                <td>${address}</td>
                                                <td>${phone}</td>
                                            </tr>`
                    $('#orders-box').append(temp_html)
                }
            }
        }
    })
}

function order() {
    let name = $('#order-name').val();
    let count = $('#order-count').val();
    let address = $('#order-address').val();
    let phone = $('#order-phone').val();

    $.ajax({
        type: "POST",
        url: "/order",
        data: {name_give: name, count_give: count, address_give: address, phone_give: phone},
        success: function (response) {
            if (response["result"] == "success") {
                alert(response["msg"]);
                window.location.reload();
            }
        }
    })
}