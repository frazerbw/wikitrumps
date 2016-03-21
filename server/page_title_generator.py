#
# @author: Darren Vong

import urllib2

def get_random_page_list(target_size):
    AGENT_NAME = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0"
    headers = {"User-Agent": AGENT_NAME}
    random_url = u"https://en.wikipedia.org/wiki/Special:Random"
    page_list = []
    num_of_titles = 0
    while num_of_titles != target_size:
        request = urllib2.Request(random_url, None, headers)
        result_page_url = urllib2.urlopen(request).geturl()
        title = result_page_url.split("/")[-1]
        if len(title) > 30:
            continue
        else:
            page_list.append(title)
            num_of_titles += 1
    return page_list