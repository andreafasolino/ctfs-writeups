#!/usr/bin/python3
from flask import Flask, render_template, flash, redirect, url_for, abort, session, request, logging, send_file
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps
import time
import requests as pyrequest
from html2text import html2text
import markdown
import random, os, subprocess

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Nildogg36'
app.config['MYSQL_DB'] = 'app'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# init MYSQL
mysql = MySQL(app)


# Index
@app.route('/')
def index():
    return render_template('home.html')


# About
@app.route('/about')
def about():
    return render_template('about.html')

# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))
    return wrap

# notes
@app.route('/notes')
@is_logged_in
def notes():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get notes
    if check_VIP(session['username']):
        result = cur.execute("SELECT * FROM notes where author= (%s or 'Noter Team')",[session['username']])
    else:
        result = cur.execute("SELECT * FROM notes where author= %s",[session['username']])

    notes = cur.fetchall()

    if result > 0:
        return render_template('notes.html', notes=notes)
    else:
        msg = 'No notes Found'
        return render_template('notes.html', msg=msg)
    # Close connection
    cur.close()


#Single note
@app.route('/note/<string:id>/')
@is_logged_in
def note(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get notes
    if check_VIP(session['username']):
        result = cur.execute("SELECT * FROM notes where author= (%s or 'Noter Team') and id = %s",(session['username'], id))
    else:
        result = cur.execute("SELECT * FROM notes where author= %s",[session['username']])

    note = cur.fetchone()
    note['body'] = html2text(note['body'])
    return render_template('note.html', note=note)


# Register Form Class
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=3, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')


# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))

        # Create cursor
        cur = mysql.connection.cursor()

        # Execute query
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, username, password))

        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))
    return render_template('register.html', form=form)


# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get Form Fields
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", ([username]))

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                return redirect(url_for('dashboard'))
            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)
            # Close connection
            cur.close()
        else:
            error = 'Invalid credentials'
            return render_template('login.html', error=error)

    return render_template('login.html')



# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))


#Check VIP
def check_VIP(username):
    try:
        cur = mysql.connection.cursor()
        results = cur.execute(""" select username, case when role = "VIP" then True else False end as VIP from users where username = %s """, [username])

        results = cur.fetchone()
        cur.close()

        if len(results) > 0:
            if results['VIP'] == 1:
                return True

        return False

    except Exception as e:
        return render_template('login.html')


# Dashboard
@app.route('/dashboard')
@is_logged_in
def dashboard():


    # Create cursor
    cur = mysql.connection.cursor()

    # Get notes
    #result = cur.execute("SELECT * FROM notes")
    # Show notes only from the user logged in 
    result = cur.execute("SELECT * FROM notes WHERE author = %s",[session['username']])

    notes = cur.fetchall()
    VIP = check_VIP(session['username'])

    if result > 0:
        if VIP:
            return render_template('vip_dashboard.html', notes=notes)

        return render_template('dashboard.html', notes=notes)
    
    else:
        msg = 'No notes Found'

        if VIP:
            return render_template('vip_dashboard.html', msg=msg)

        return render_template('dashboard.html', msg=msg)
    # Close connection
    cur.close()

# parse the URL
def parse_url(url):
    url = url.lower()
    if not url.startswith ("http://" or "https://"):
        return False, "Invalid URL"    

    if not url.endswith('.md'):
            return False, "Invalid file type"

    return True, None


# upgrade to VIP
@app.route('/VIP',methods=['GET'])
@is_logged_in
def upgrade():
    return render_template('upgrade.html')


# note Form Class
class NoteForm(Form):
    title = StringField('Title', [validators.Length(min=1, max=200)])
    body = TextAreaField('Body', [validators.Length(min=30)])


# Add note
@app.route('/add_note', methods=['GET', 'POST'])
@is_logged_in
def add_note():
    form = NoteForm(request.form)
    if request.method == 'POST' and form.validate():
        title = form.title.data
        body = form.body.data
        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("INSERT INTO notes(title, body, author,create_date ) VALUES(%s, %s, %s, %s)",(title, body, session['username'], time.ctime()))

        # Commit to DB
        mysql.connection.commit()

        #Close connection
        cur.close()

        flash('note Created', 'success')

        return redirect(url_for('dashboard'))

    return render_template('add_note.html', form=form)


# Edit note
@app.route('/edit_note/<int:id>', methods=['GET', 'POST'])
@is_logged_in
def edit_note(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get note by id
    result = cur.execute("SELECT * FROM notes WHERE id = %s AND author = %s", (id, session['username']))

    note = cur.fetchone()
    cur.close()
    # Get form
    form = NoteForm(request.form)

    # Populate note form fields
    form.title.data = note['title']
    form.body.data = note['body']

    if request.method == 'POST' and form.validate():
        title = request.form['title']
        body = request.form['body']

        # Create Cursor
        cur = mysql.connection.cursor()
        app.logger.info(title)
        # Execute
        cur.execute ("UPDATE notes SET title=%s, body=%s WHERE id=%s  AND author = %s",(title, body, id, session['username']))
        # Commit to DB
        mysql.connection.commit()

        #Close connection
        cur.close()

        flash('note Updated', 'success')

        return redirect(url_for('dashboard'))

    return render_template('edit_note.html', form=form)


# Delete note
@app.route('/delete_note/<int:id>', methods=['POST'])
@is_logged_in
def delete_note(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Execute
    cur.execute("DELETE FROM notes WHERE id = %s AND author= %s",(id, session['username']))

    # Commit to DB
    mysql.connection.commit()

    #Close connection
    cur.close()

    flash('Note deleted', 'success')

    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(host="0.0.0.0",debug=False)
