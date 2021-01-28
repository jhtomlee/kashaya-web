import csv
import pandas as pd
import numpy as np
from os import walk
import json

with open('Kashaya web list - sentences.csv', 'r') as file:
    
    # reads all data from vocab.csv into a dataframe
    words_df = pd.read_csv("Kashaya web list - sentences.csv") 

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
            'Audio': []
        }
        json_obj[key]=temp


    # read all files (jpg and mp3 files)
    files = []
    for (dirpath, dirnames, filenames) in walk('./Files'):
        files.extend(filenames)
        break

    # filter mp3
    mp3_files = list(filter(lambda x: x.endswith('.mp3'), files)) 

    # add mp3 file path into json_obj
    path = './static/Files/'
    for mp3_file in mp3_files:
        temp = mp3_file.split('=')
        file_name = temp[0]
        if file_name in json_obj:
            json_obj[file_name]['Audio'].append(path+mp3_file)

    # get and delete words with no audio 
    keys_to_delete = set()
    for key in json_obj:
        if len(json_obj[key]['Audio']) ==0 :
            keys_to_delete.add(key)
    for key in keys_to_delete:
        print('del: ', key)
        del json_obj[key]
    
    #export 
    with open('result_setences.json', 'w') as fp :
       json.dump(json_obj, fp, ensure_ascii=False)

    
