# -*- coding: utf-8 -*-
# @author: Darren Vong

import unittest

from bs4 import BeautifulSoup

import page_data_extractor

with open("page.html", "rb") as p:
    page = p.read()
soup = BeautifulSoup(page, "html.parser")

class Test(unittest.TestCase):
    
    def test_dog_page_imgs(self):
        self.assertEqual(page_data_extractor.get_num_imgs(soup), 36)
    
    def test_doge_page(self):
        self.assertEqual(page_data_extractor.get_num_links(soup), 2374)
    
    def test_dog_page_refs(self):
        self.assertEqual(page_data_extractor.get_num_references(soup), 186)
    
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
        self.assertTrue(page_data_extractor.find_recursive_dict_key(trouble, "images"))
    
    def test_img_non_exist_key(self):
        trouble = {"batchcomplete":"",
                   "query":{"pages":{"-1":{"ns":0,"title":"Mr. Beans","missing":""}}}}
        self.assertFalse(page_data_extractor.find_recursive_dict_key(trouble, "images"))
    
    def test_get_tricky_img_url(self):
        self.assertEqual(page_data_extractor.get_img_url(u"Dog"),
                         "https://upload.wikimedia.org/wikipedia/commons/b/bc/Aleria%2C_Rhyton%2C_t%C3%AAte_de_chien.jpg")
    
if __name__ == "__main__":
    unittest.main()