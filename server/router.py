# -*- coding: utf-8 -*-
# @author: Darren Vong

from sys import argv

from bottle import request, template, run, route, post, static_file, TEMPLATE_PATH,\
    response

import page_processor

TEMPLATE_PATH.append('../client')

@route('/')
def index():
    return template("index")

@route('/data')
def get_data():
    response.set_header("Access-Control-Allow-Origin", "http://frozen-wave-21193.herokuapp.com/")
    page_title = request.query.get("page_title")
    print page_title
    return page_processor.get_page_data(page_title)

@route('/<path:path>')
def get_resources(path):
    return static_file(path, root="../client")

if __name__ == '__main__':
    run(host='0.0.0.0', debug=True, port=argv[1], reloader=True)
