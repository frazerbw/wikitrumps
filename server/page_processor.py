# -*- coding: utf-8 -*-

import urllib2

from bs4 import BeautifulSoup

def get_num_links(soup):
    return len(soup.find_all("a", href=True))

def get_num_imgs(soup):
    return len(soup.find_all("img"))

def get_num_references(soup):
    reference_list = soup.select("ol.references > li")
    return len(reference_list)

def get_page_data(page_title):
    AGENT_NAME = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0"
    headers = {"User-Agent": AGENT_NAME}
    address = "https://en.wikipedia.org/wiki/%s" % page_title
    request = urllib2.Request(address, None, headers)
    page = urllib2.urlopen(request).read()
    soup = BeautifulSoup(page, "html.parser")
    num_of_links = get_num_links(soup)
    num_of_imgs = get_num_imgs(soup)
    num_of_refs = get_num_references(soup)
    return dict(imageCount=num_of_imgs, linkCount=num_of_links, refCount=num_of_refs)

def writePageHTML(page):
    """Quick utility function for writing a scraped page into a html file."""
    soup = BeautifulSoup(page, "html.parser")
    page = soup.prettify('utf-8')
    with open("page.html", "wb") as p:
        p.write(page)
