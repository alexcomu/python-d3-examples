from flask import Flask, render_template, redirect, request, flash, jsonify
import psutil

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/data")
def data():
    return jsonify(usage=psutil.cpu_percent(interval=None))

@app.route("/utils")
def utils():
    return render_template("utils.html")


if __name__ == "__main__":
    app.run()

