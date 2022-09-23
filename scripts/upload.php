//put in /var/www/html, create directory /var/www/uploads, give www-data permission to write and read dir uploads, start apache web server.


<?php
$uploaddir = '/var/www/uploads/';
$uploadfile = $uploaddir . $_FILES['file']['name'];
move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)
?>