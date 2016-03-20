# -*- coding: utf-8 -*-
# @author: Darren Vong

import urllib
import urllib2
import json

from bs4 import BeautifulSoup

AGENT_NAME = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0"
headers = {"User-Agent": AGENT_NAME}

def get_num_links(soup):
    return len(soup.find_all("a", href=True))

def get_num_imgs(soup):
    return len(soup.find_all("img"))

def get_num_references(soup):
    reference_list = soup.select("ol.references > li")
    return len(reference_list)

def find_img_key(d, key):
    reduced_dict = d["query"]["pages"] # {"4269567":{..., "images": [{...},...,{...}]}}
    reduced_dict = reduced_dict.itervalues().next() # {..., "images": [{...}, ..., {...}]}
    if reduced_dict.has_key(key):
        return reduced_dict[key]
    else:
        return None

def get_img_url(page_title):
    img_exists_url = ("https://en.wikipedia.org/w/api.php?action=query&"+
                      "titles=%s&prop=images&format=json" % (urllib.quote(page_title)))
    request = urllib2.Request(img_exists_url, None, headers)
    feed = urllib2.urlopen(request)
    img_exists_obj = json.load(feed)
    img_names_list = find_img_key(img_exists_obj, "images")
    if isinstance(img_names_list, list):
        img_name = img_names_list[0]["title"]
        img_url_info_link = ("https://en.wikipedia.org/w/api.php?action=query&"+
                             "titles=%s&prop=imageinfo&iiprop=url&format=json" % (urllib.quote(img_name)))
        img_req = urllib2.Request(img_url_info_link, None, headers)
        img_link_feed = urllib2.urlopen(img_req)
        img_url_cont_obj = json.load(img_link_feed)
        img_url = find_img_key(img_url_cont_obj, "imageinfo")[0]["url"]
          
    else: # No appropriate imgs found, returns link to wikipedia logo img 
        img_url = "https://usmentor.qbcontent.com/wp-content/uploads/2014/07/wikipedia-logo1.jpg"
    return img_url

def get_page_data(page_title):
    address = "https://en.wikipedia.org/wiki/%s" % page_title
    request = urllib2.Request(address, None, headers)
    page = urllib2.urlopen(request).read()
    soup = BeautifulSoup(page, "html.parser")
    num_of_links = get_num_links(soup)
    num_of_imgs = get_num_imgs(soup)
    num_of_refs = get_num_references(soup)
    img_url = get_img_url(page_title)
    return dict(imageCount=num_of_imgs, linkCount=num_of_links,
                refCount=num_of_refs, imageURL=img_url)

def writePageHTML(page):
    """Quick utility function for writing a scraped page into a html file."""
    soup = BeautifulSoup(page, "html.parser")
    page = soup.prettify('utf-8')
    with open("page.html", "wb") as p:
        p.write(page)

if __name__ == "__main__":
    print get_img_url("Mr._Bean")