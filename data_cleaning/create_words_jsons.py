import csv
import pandas as pd
import numpy as np
from os import walk
import json

with open('Kashaya web list - words.csv', 'r') as file:
    
    # reads all data from vocab.csv into a dataframe
    words_df = pd.read_csv("Kashaya web list - words.csv") 

    # drops row where at least one column element is missing 
    words_df.dropna(inplace=True)

    # create json_obj for each row in words_df
    json_obj = {}
    for index, row in words_df.iterrows():
        key = row['Filename']
        if type(row['Categories']) is str:
            categories = [word.strip() for word in row['Categories'].split('; ')]
        else:
            categories = []
        temp = {
            'Filename':row['Filename'],
            'English':row['English'],
            'Kashaya':row['Kashaya'],
            'Categories':categories,
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

    # get and delete words with no audio 
    # keys_to_delete = set()
    # for key in json_obj:
    #     if len(json_obj[key]['Audio']) ==0 :
    #         keys_to_delete.add(key)
    # for key in keys_to_delete:
    #     print('del: ', key)
    #     del json_obj[key]
    
    # init the two json objects
    words_json = {}
    words_noimg_json ={}

    # filter json_obj into either words_json or words_noimg_json
    for key in json_obj:
        if json_obj[key]['Image'] == '':
            words_noimg_json[key] = json_obj[key]
        else :
            words_json[key] = json_obj[key]

    #export 
    with open('result_words_img.json', 'w') as fp :
       json.dump(words_json, fp, ensure_ascii=False)
    with open('result_words_noimg.json', 'w') as fp :
       json.dump(words_noimg_json, fp, ensure_ascii=False)

    
