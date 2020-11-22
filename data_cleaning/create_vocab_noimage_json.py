import csv
import pandas as pd
import numpy as np
from os import walk
import json

with open('vocab-no-images.csv', 'r') as file:
    
    # reads all data from vocab.csv into a dataframe
    words_df = pd.read_csv('vocab-no-images.csv') 

    # create json_obj for each row in words_df
    json_obj = {}
    for index, row in words_df.iterrows():
        key = row['Filename']
        categories = [word.strip() for word in row['Categories'].split(';')]
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
    path = './static/audio/'
    for mp3_file in mp3_files:
        temp = mp3_file[:-4]
        file_name=temp[:-3]
        if file_name in json_obj:
            json_obj[file_name]['Audio'].append(path+mp3_file)

    # get words with no image 
    keys_to_delete = set()

    # get words with no audio 
    for key in json_obj:
        if len(json_obj[key]['Audio']) ==0:
            keys_to_delete.add(key)
   
    # delete words with no image or audio
    for key in keys_to_delete:
        del json_obj[key]

    #export into json file
    with open('result_vocab_noimg.json', 'w') as fp :
       json.dump(json_obj, fp, ensure_ascii=False)

    
