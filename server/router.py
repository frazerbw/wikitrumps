# -*- coding: utf-8 -*-

from bottle import request, template, run, route, post

import page_processor

@route('/')
def index():
    return template("test")

@post('/data')
def get_data():
    return page_processor.get_page_data()

if __name__ == '__main__':
    run(debug=True, port=80, reloader=True)