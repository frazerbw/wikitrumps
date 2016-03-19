# -*- coding: utf-8 -*-
from sys import argv
from bottle import request, template, run, route, post

import page_processor

@route('/')
def index():
    return template("test")

@route('/data')
def get_data():
    page_title = request.query.get("page_title")
    print page_title
    return page_processor.get_page_data(page_title)

if __name__ == '__main__':
    run(host='0.0.0.0', debug=True, port=argv[1], reloader=True)