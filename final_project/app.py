from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
# from flask_mysqldb import MySQL
import mysql.connector

password = '5jzzkJ_HMa6M!Dk'


email = ''
user_phone = ''
msg = ''

name = ['Stone Diffuser of Bathing Cat', 'Stone Diffuser of Bathing Monkey', 'Stone Diffuser of Bathing Capybara',
        'Essential Oil of Grape Fruit', 'Essential Oil of Lavender', 'Essential Oil of Rosemary']
price = ['15.75', '15.75', '15.75', '19.98', '19.98', '19.98']

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://PotatoAnywhere:5jzzkJ_HMa6M!Dk@PotatoAnywhere.mysql.pythonanywhere-services.com/PotatoAnywhere$project-4'
db = SQLAlchemy(app)
app.secret_key = 'mysecret'

mydb = mysql.connector.connect(
    host = "PotatoAnywhere.mysql.pythonanywhere-services.com",
    user = "PotatoAnywhere",
    password = password,
    database = "PotatoAnywhere$project-4"
)



class User(db.Model):
    __tablename__ = 'user_info'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(30))
    phone = db.Column(db.VARCHAR(20), unique=True)
    address = db.Column(db.VARCHAR(100))

    def __init__(self, first_name, last_name, email, password, phone, address):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address


class Product(db.Model):
    __tablename__ = 'product_info'
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.VARCHAR(200))
    product_price = db.Column(db.Numeric)

    def __init__(self, name, product_price):
        self.product_name = name
        self.product_price = product_price


class OrderInfo(db.Model):
    __tablename__ = 'order_info'
    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    user_email = db.Column(db.VARCHAR(150))
    delivery_address = db.Column(db.VARCHAR(200))
    card_num = db.Column(db.VARCHAR(50), unique=True)
    exp_date = db.Column(db.DATE)
    cvc = db.Column(db.Integer)

    def __init__(self, user_id, first_name, last_name, user_email, delivery_address, card_num, exp_date, cvc):
        self.first_name = first_name
        self.last_name = last_name
        self.user_id = user_id
        self.user_email = user_email
        self.delivery_address = delivery_address
        self.card_num = card_num
        self.exp_date = exp_date
        self.cvc = cvc


class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'
    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_name = db.Column(db.VARCHAR(100))
    image = db.Column(db.VARCHAR(250))
    price = db.Column(db.Numeric)

    def __init__(self, user_id, product_name, image, price):
        self.user_id = user_id
        self.product_name = product_name
        self.image = image
        self.price = price


@app.route("/")
def index():
    session['loggedin'] = False
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/checkout/p1")
def checkout():
    return render_template("checkout.html", item_name=name[0], item_price=price[0])
@app.route("/checkout/p2")
def checkout1():
    return render_template("checkout.html", item_name=name[1], item_price=price[0])
@app.route("/checkout/p3")
def checkout2():
    return render_template("checkout.html", item_name=name[2], item_price=price[0])
@app.route("/checkout/p4")
def checkout3():
    return render_template("checkout.html", item_name=name[3], item_price=price[3])
@app.route("/checkout/p5")
def checkout4():
    return render_template("checkout.html", item_name=name[4], item_price=price[3])
@app.route("/checkout/p6")
def checkout5():
    return render_template("checkout.html", item_name=name[5], item_price=price[3])


@app.route("/account")
def signup():
    # if user_logged_in:
    if session['loggedin']:
        return render_template("account_page.html", msg=session['last_name'], email=session['email'], user_id=session['user_id'], user_phone=session['user_phone'])
    else:
        return render_template('signup.html')


@app.route("/signup/success", methods=["POST"])
def success():
    if request.method == 'POST':
        first_name = request.form['fname']
        last_name = request.form['lname']
        email = request.form['user_email']
        password = request.form['password']
        phone = request.form['telephone']
        address = request.form['address']
        print(request.form)

        data = User(first_name, last_name, email, password, phone, address)
        try:
            db.session.add(data)
            db.session.commit()

            mycursor = mydb.cursor()
            mycursor.execute("SELECT * FROM user_info WHERE email = %s AND password = %s",
                           (email, password))
            account = mycursor.fetchone()
            session['loggedin'] = True
            session['user_id'] = account[0]
            session['last_name'] = account[2]
            session['email'] = account[3]
            session['user_phone'] = account[5]
            return render_template("account_page.html", msg=session['last_name'], email=session['email'], user_id=session['user_id'], user_phone=session['user_phone'])

        except exc.IntegrityError:
            msg = '** Your email or phone number has been used by another account, please try a new one'
            return render_template("signup.html", msg=msg)





@app.route("/checkout/success", methods=['POST'])
def checkout_success():
    if request.method == 'POST':
        first_name = request.form['fname']
        last_name = request.form['lname']
        email = request.form['user_email']
        delivery_address = request.form['address']
        card_num = request.form['card_num']
        exp_date = request.form['exp_date']
        cvc = request.form['cvc']

        if type(session['id']) == int:
            data = OrderInfo(session['user_id'], first_name, last_name, email, delivery_address, card_num, exp_date, cvc)
        else:
            data = OrderInfo(session['user_id'], first_name, last_name, email, delivery_address, card_num, exp_date, cvc)

        db.session.add(data)
        db.session.commit()

    return render_template("success.html")


@app.route("/login")
def login_page():
    return render_template("login.html")


@app.route("/login/success", methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'login_email' in request.form and 'login_email' in request.form:
        login_email = request.form['login_email']
        login_password = request.form['login_password']


        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM user_info WHERE email = %s AND password = %s",
                           (login_email, login_password))
        account = mycursor.fetchone()
        if account:
            session['loggedin'] = True
            session['user_id'] = account[0]
            session['last_name'] = account[2]
            session['email'] = account[3]
            session['user_phone'] = account[5]
            return render_template("account_page.html", msg=session['last_name'], email=session['email'], user_id=session['user_id'], user_phone=session['user_phone'])

        else:
            msg = 'Email or/and Password is incorrect'
            return render_template("login.html", msg=msg)


@app.route("/signout")
def signout():
    # global user_logged_in, user_id
    # user_logged_in = False
    # user_id = None
    session['loggedin'] = False
    session['id'] = None
    return render_template('index.html')


@app.route("/shopping_cart")
def cart():
    if session['loggedin']:
    # conn = psycopg2.connect(
    #     database="project-4",
    #     user="postgres",
    #     password=password,
    #     host="localhost",
    #     port='5432')
    # conn.autocommit = True
    # cursor = conn.cursor()
    #
    # cursor.execute("SELECT * FROM shopping_cart WHERE ")
        products = ["Item 1", "Item 2", "Item 3", "Item 4"]
        return render_template("shopping_cart.html", products=products)
    else:
        return render_template('shopping_cart.html')


if __name__ == '__main__':
    app.debug = True
    app.run()



