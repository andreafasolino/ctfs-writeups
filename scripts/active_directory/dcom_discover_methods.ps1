$com = [activator]::CreateInstance([type]::GetTypeFromProgId("Excel.Application","192.168.1.110"))
$com | Get-Member