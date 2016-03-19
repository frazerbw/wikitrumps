# -*- coding: utf-8 -*-

import urllib2

from bs4 import BeautifulSoup

def get_page_data(page_title):
    AGENT_NAME = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0"
    headers = {"User-Agent": AGENT_NAME}
    address = "https://en.wikipedia.org/wiki/%s" % page_title
    request = urllib2.Request(address, None, headers)
    page = urllib2.urlopen(request).read()
    soup = BeautifulSoup(page, "html.parser")
    num_of_links = len(soup.find_all("a", href=True))
    num_of_imgs = len(soup.find_all("img"))
    return dict(imageCount=num_of_imgs, linkCount=num_of_links)

def writePageHTML(page):
    soup = BeautifulSoup(page, "html.parser")
    page = soup.prettify('utf-8')
    with open("page.html", "wb") as p:
        p.write(page)