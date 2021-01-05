import csv
import pandas as pd
import numpy as np
from os import walk
import json

with open('vocab-images.csv', 'r') as file:
    
    # reads all data from vocab.csv into a dataframe
    words_df = pd.read_csv("vocab-images.csv") 

    # create json_obj for each row in words_df
    json_obj = {}
    for index, row in words_df.iterrows():
        key = row['Filename']
        if type(row['Subcategory']) is str:
            subcategories = [word.strip() for word in row['Subcategory'].split(',')]
        else:
            subcategories = []
        temp = {
            'Filename':row['Filename'],
            'English':row['English'],
            'Kashaya':row['Kashaya'],
            'Category':row['Category'],
            'Subcategory': subcategories,
            'Image': '',
            'Audio': []
        }
        # print(index, temp)
        json_obj[key]=temp


    # read all files (jpg and mp3 files)
    files = []
    for (dirpath, dirnames, filenames) in walk('./Files'):
        files.extend(filenames)
        break

    # filter mp3 and jpg files
    mp3_files = list(filter(lambda x: x.endswith('.mp3'), files)) 
    jpg_files = list(filter(lambda x: x.endswith('.jpg'), files))  

    # add mp3 file path into json_obj
    path = './static/Files/'
    for mp3_file in mp3_files:
        # temp = mp3_file[:-4]
        # file_name=temp[:-3]
        temp = mp3_file.split('=')
        file_name = temp[0]

        # print("test", file_name)
        if file_name in json_obj:
            json_obj[file_name]['Audio'].append(path+mp3_file)

    # add img file path into json_obj
    path = './static/Files/'
    for jpg_file in jpg_files:
        file_name = jpg_file[:-4]
        if file_name in json_obj:
            json_obj[file_name]['Image']= path+jpg_file

    # get words with no image 
    keys_to_delete = set()
    for key in json_obj:
        if json_obj[key]['Image'] == '':
            keys_to_delete.add(key)
    # get words with no audio 
    for key in json_obj:
        if len(json_obj[key]['Audio']) ==0:
            keys_to_delete.add(key)
   
    # delete words with no image or audio
    for key in keys_to_delete:
        del json_obj[key]

    #export into json file
    with open('result_vocab_img.json', 'w') as fp :
       json.dump(json_obj, fp, ensure_ascii=False)

    
