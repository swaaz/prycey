# from flask import jsonify
import json

def to_dict(k: list):
    d = []

    for i in range(len(k)):
        d.append({
            "item_id": k[i][0],
            "title": k[i][1],
            "description": k[i][2],
            "price": k[i][3],
            "year": k[i][4],
            "date_added": k[i][5],
            "im1": k[i][6],
            "im2": k[i][7],
            "im3": k[i][8],
            "im4": k[i][9],
            "c_id": k[i][10],
            "seller_id": k[i][11]
        })

    return d