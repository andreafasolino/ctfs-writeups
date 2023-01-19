<?php
    $initial_time = 1673965995;
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for ($j = 0; $j < 20; $j++) {
        $initial_time++;
        srand($initial_time);
        $activation_code = "";
        for ($i = 0; $i < 32; $i++) {
            $activation_code = $activation_code . $chars[rand(0, strlen($chars) - 1)];
        }
        print($activation_code);
        print("\n");
    }
    
?>