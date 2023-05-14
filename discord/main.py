import requests
import json

def get_messages(channel_id):
    headers = {
        'authorization': 'MjcyNTMzMDE1Njg1NDk2ODMy.Ge8OqF.HyB0aHQCbbdSDdPr5xvOUSDtUwTClya1JOyYmk'
    }
    r = requests.get(f'https://discord.com/api/v9/channels/{channel_id}/messages', headers=headers)
    jsonn = json.loads(r.text)

    for value in jsonn:
        print(value, '\n')

get_messages('1105630255470870588')