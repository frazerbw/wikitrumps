# -*- coding: utf-8 -*-
# @author: Darren Vong

from bs4 import BeautifulSoup

def find_recursive_dict_key(d, key):
    """Given a dictionary d with a deep nesting structure from the Wikipedia API,
    determines whether the desired key exists in the dictionary. If the key exists,
    the value in which the key maps to is returned; otherwise, None is returned.
    """
    
    reduced_dict = d[u"query"][u"pages"] # {"4269567":{"images": [{...},...,{...}]}}
    reduced_dict = reduced_dict.itervalues().next() # {"images": [{...}, ..., {...}]}
    if reduced_dict.has_key(key):
        return reduced_dict[key]
    else:
        return None

def write_html_to_file(page):
    """Quick utility function for writing a scraped page into a html file."""
    soup = BeautifulSoup(page, "html.parser")
    page = soup.prettify('utf-8')
    with open("page.html", "wb") as p:
        p.write(page)