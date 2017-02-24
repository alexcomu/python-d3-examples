from flask import Flask, render_template, redirect, request, flash, jsonify
import psutil

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/utils_data")
def utils_data():
    return jsonify(usage=psutil.cpu_percent(interval=None))

@app.route("/utils")
def utils():
    return render_template("utils.html")

@app.route("/force")
def force():
    return render_template("force.html")

@app.route("/force_data")
def force_data():
    import random
    data_nodes = [{"amount": i+random.random()*10} for i in range(20)]
    data_links = []
    for i in range(100):
        s = int(random.random()*20)
        t = int(random.random()*20)
        if s!=t:
            data_links.append({"target": t, "source": s})
    return jsonify(data_nodes=data_nodes,data_links=data_links)

if __name__ == "__main__":
    app.run()

