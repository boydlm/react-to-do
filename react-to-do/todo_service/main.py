from flask import Flask, request
from flask import jsonify
import json
from flask_cors import CORS #include this line
from flask_mysqldb import MySQL
import pandas as pd

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'
app.config['MYSQL_CURSORCLASS'] = "DictCursor"
 
mysql = MySQL(app)

app.run(debug=True)
CORS(app)
# read file
with open('tasks.json', 'r') as myfile:
    data=myfile.read()
# parse file
obj = json.loads(data)
@app.route('/todo/getall',methods=['GET'])
def getTasks():
    return fetchToDo()

@app.route('/todo/create',methods=['POST'])
def createTask():
    req_data = request.get_json()
    createToDo(req_data["task"], req_data["complete"])
    return fetchToDo()
    
@app.route('/todo/update',methods=['PUT'])
def updateTask():
    req_data = request.get_json()
    updateToDo(req_data ["id"], req_data ["complete"])
    return fetchToDo()
    
@app.route('/todo/delete',methods=['DELETE'])
def deleteTask():
    req_data = request.get_json()
    print(req_data)
    deleteToDO(req_data["id"])
    return fetchToDo()

@app.route('/sql-test', methods=['GET'])
def test():
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO todos3 (task, complete) VALUES ("eat lucky charms", false) ''')
    mysql.connection.commit()
    cursor.close()
    return "Inserted todo"

def createToDo(task, status):
    cursor = mysql.connection.cursor()
    sql = "INSERT INTO todos3 (task, complete) VALUES (%s, %s)"
    val = (task, status)
    cursor.execute (sql, val)
    mysql.connection.commit()
    cursor.close()
    return True

def fetchToDo():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM todos3 ''')
    table_rows = cursor.fetchall()
    print(table_rows)
    df = pd.DataFrame(table_rows)
    result = df.to_json(orient="records")
    print(result)

    parsed = json.loads(result)
    print(parsed)
    return json.dumps(parsed)

def updateToDo(id, status):
    cursor = mysql.connection.cursor()
    sql = f'UPDATE todos3 SET complete = {status} WHERE id = {id}'
    cursor.execute(sql)
    mysql.connection.commit()
    cursor.close()
    return True

def deleteToDO (id):
    cursor = mysql.connection.cursor()
    sql = f'DELETE FROM todos3 WHERE id = {id}'
    cursor.execute (sql)
    mysql.connection.commit()
    cursor.close()
    return True





