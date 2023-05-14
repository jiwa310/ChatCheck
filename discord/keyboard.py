import asyncio
import tracemalloc  # Import the tracemalloc module
from pynput import keyboard

async def on_press(key):
    print(f"Key {key} was pressed.")

async def on_release(key):
    print(f"Key {key} was released.")
    if key == keyboard.Key.esc:
        return False  # Stop the listener

async def listen_for_keys():
    tracemalloc.start()  # Start the tracemalloc module

    listener = keyboard.Listener(on_press=on_press, on_release=on_release)
    listener.start()

    while True:
        await asyncio.sleep(0.1)  # Allow time for the listener to capture events

asyncio.run(listen_for_keys())