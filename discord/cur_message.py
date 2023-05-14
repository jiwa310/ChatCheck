import discord
from discord.ext import commands
from pynput import keyboard

intents = discord.Intents.all()
client = discord.Client(intents=intents)

def on_press(key):
    print(key)

def on_release(key):
    if key == keyboard.Key.enter:
        return False  # Stop the listener

@client.event
async def on_ready():
    print(f'Bot is ready. Logged in as {client.user.name} ({client.user.id})')

@client.event
async def on_typing(channel, user, when):
    print(f"{user} is typing message in {channel} {when}")
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()

@client.event
async def on_message(message):
    channel = message.channel
    if message.author != client.user:
        print(f'{message.author.name} ({message.author.id}) sent a message: {message.content}')
        await channel.send(f'Hello {message.author.name}!')

client.run('MTEwNzA3MjY0NDYwNTU1MDcxMg.GLEgtJ.yQRdxx9tVd6NAIXk5TtNkgp3wSugfU8chuBiv0')
