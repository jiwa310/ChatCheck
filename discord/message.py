import requests
import json

def get_messages(channel_id):
    headers = {
        'authorization': 'MjcyNTMzMDE1Njg1NDk2ODMy.GtzP6D.WLgyvT1WJ-FeloUbmezqoY1ZlmwI49cpFyonEI'
    }
    r = requests.get(f'https://discord.com/api/v9/channels/{channel_id}/messages', headers=headers)
    jsonn = json.loads(r.text)

    for value in jsonn:
        print(value['content'], '\n')

get_messages('1106665200955957278')