# -*- coding: utf-8 -*-
# @author: Darren Vong

import unittest

from bs4 import BeautifulSoup

import page_processor

with open("page.html", "rb") as p:
    page = p.read()
soup = BeautifulSoup(page, "html.parser")

class Test(unittest.TestCase):
    
    def test_dog_page_imgs(self):
        self.assertEqual(page_processor.get_num_imgs(soup), 36)
    
    def test_doge_page(self):
        self.assertEqual(page_processor.get_num_links(soup), 2374)
    
    def test_dog_page_refs(self):
        self.assertEqual(page_processor.get_num_references(soup), 186)
    
    def test_img_key_finder(self):
        trouble = {"batchcomplete":"",
                   "query":{
                        "normalized":[
                            {"from":"Mr._Bean","to":"Mr. Bean"}],
                            "pages":{"173863":{"pageid":173863,"ns":0,
                                "title":"Mr. Bean",
                                "images":[
                                    {"ns":6,"title":"File:Beanandteddy.jpg"},
                                    {"ns":6,"title":"File:Mr. bean title card.jpg"},
                                    {"ns":6,"title":"File:Mr bean anime.jpg"},
                                    {"ns":6,"title":"File:Rowan Atkinson on a Mini at Goodwood Circuit in 2009.jpg"},
                                    {"ns":6,"title":"File:Symbol support vote.svg"}]}}}}
        self.assertTrue(page_processor.find_recursive_dict_key(trouble, "images"))
    
    def test_img_non_exist_key(self):
        trouble = {"batchcomplete":"",
                   "query":{"pages":{"-1":{"ns":0,"title":"Mr. Beans","missing":""}}}}
        self.assertFalse(page_processor.find_recursive_dict_key(trouble, "images"))
    
    def test_get_img_url(self):
        pass
if __name__ == "__main__":
    unittest.main()