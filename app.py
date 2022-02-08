from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

from pymongo import MongoClient

connect_string = 'mongodb+srv://jooyoung-oh:<password>@pymongo-heroku.4oygg.mongodb.net/pymongohero_orders?retryWrites=true&w=majority'
client = MongoClient(connect_string)
# client = MongoClient('localhost', 27017)
db = client.get_default_database()


## HTML
@app.route('/')
def home():
    return render_template('index.html')


# Order (Post) API
@app.route('/order', methods=['POST'])
def save_order():
    name_receive = request.form['name_give']
    count_receive = request.form['count_give']
    address_receive = request.form['address_give']
    phone_receive = request.form['phone_give']

    doc = {
        'name': name_receive,
        'count': count_receive,
        'address': address_receive,
        'phone': phone_receive
    }
    db.orders.insert_one(doc)

    return jsonify({'msg': 'Thanks for your order!'})


# Order List (Read) API
@app.route('/order', methods=['GET'])
def view_orders():
    orders = list(db.orders.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'orders': orders})

port = int(os.environ.get('PORT', 5000))
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
