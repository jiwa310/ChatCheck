import os

import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        text_message = request.form["text-message"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(text_message),
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(text_message):
    return f"Please evaluate how charismatic and socially appropriate the following text message is on a scale of 1 to 10 and suggest a more charismatic and socially appropriate alternative: '{text_message}'"