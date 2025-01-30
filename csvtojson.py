# run like this: python csvtojson.py skillstable.csv

# Written by Sandra Karcher to convert csv files to a json file 
# Inspired by blog.seancoughlin.me/hosting-an-api-with-github-pages

import sys
import csv
import json
import operator

FILE_HEADERS = ['Id', 'Category', 'Application/Tool', 'Skill Level', 'Last Used']
JSON_FILENAME = 'skills.json'


def main(args):
    skills_file = args[1]
    # these are ordered by ID for the json API file
    skills_lod, skills_lol = load_skills_dict(skills_file) 
    # print('lod:', skills_lod[0:3])
    # print('lol:', skills_lol[0:3])
    # make the json file
    make_json(skills_lod)
    # these are ordered by category then tool to make them easier to turn to a printable list
    ordered_skills_lol = ordered_skills_lod(skills_lol)
    # print('\n\n\nList of Lists to copy and paste into Javascript file for DataTable')
    # print(ordered_skills_lol)
    print('---\n')


def make_json(skills_lod):
    with open(JSON_FILENAME, 'w') as json_file:
        json.dump(
            skills_lod, 
            json_file, 
            indent=4
            )


def load_skills_dict(skills_file):
    skills_lod = []
    skills_lol = []

    with open(skills_file, 'r') as skills_mem:
        parsed_skills_mem = csv.reader(skills_mem, delimiter=',')
        # skip header row
        next(parsed_skills_mem, None)

        for each_row in parsed_skills_mem:
            row_dict = {}
            for index, header in enumerate(FILE_HEADERS):
                row_dict[header] = each_row[index]
            skills_lod.append(row_dict)
            skills_lol.append(each_row[1:])
    return skills_lod, skills_lol


def ordered_skills_lod(skills_lod):
    print('\n\nskills_lod')
    print(skills_lod)
    ordered_skills_lol = sorted(skills_lod, key = operator.itemgetter(0, 1))
    print('\n\nordered_skills_lol')
    print(ordered_skills_lol)
    return ordered_skills_lol 


if __name__ == "__main__":
    args = sys.argv
    main(args)
