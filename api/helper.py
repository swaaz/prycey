# from flask import jsonify
import json

# key = ['item_id', 'title', 'description', 'c_id', 'price', 'year', 'im1', 'im2', 'im3', 'im4', 'seller_id']

def to_dict(k: list):
    d = []

    for i in range(len(k)):
        d.append({
            "item_id": k[i][0],
            "title": k[i][1],
            "description": k[i][2],
            "c_id": k[i][3],
            "price": k[i][4],
            "year": k[i][5],
            "im1": k[i][6],
            "im2": k[i][7],
            "im3": k[i][8],
            "im4": k[i][9],
            "seller_id": k[i][10]
        })
    
        # print(d[i].keys())
        # print(d[i].values())

    return json.dumps(d)

# k = [(1, 'iPad Pro', 'No scratches', 60000.0, 1, '2020-12-22', 'blank', ' ', ' ', ' ', 1, 'test'), (2, 'iPhone X', 'Broken screen', 30000.0, 2, '2020-12-22', 'blank', ' ', ' ', ' ', 1, 'test')]

# x = to_dict(k)
# print(x)

# t = json.dumps(x)

# print(t)

# print(to_dict(k))