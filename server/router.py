# -*- coding: utf-8 -*-

import urllib2

from bottle import request, template, run, route
from bs4 import BeautifulSoup

@route('/')
def index():
    return "Hello world!"

if __name__ == '__main__':
    run(debug=True, port=80, reloader=True)