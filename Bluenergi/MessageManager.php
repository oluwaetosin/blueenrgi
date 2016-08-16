<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Bluenergi;

/**
 * Description of MessageManager
 *
 * @author OLUWATOSIN
 */
class MessageManager {
    
    private $to;
    private $from;
    private $username;
    private $password;
    private $message;
    private $result;
    function __construct($from) {
     
        $this->setFrom($from);
        $this->setUsername(getenv("SMS_USERNAME"));
        $this->setPassword(getenv("SMS_PWD"));
    }
    public function sendSms(){
        
     $param = array('from'=>$this->getFrom(),'to'=>$this->getTo(),'text'=>$this->getMessage()); 
     $password = $this->getUsername().':'.$this->getPassword();
     $data_string = json_encode($param);
     $curl = curl_init();
     curl_setopt($curl,CURLOPT_POST,true);
     curl_setopt($curl,CURLOPT_URL, "https://api.infobip.com/sms/1/text/single"); 
     curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
     curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
     curl_setopt($curl,CURLOPT_POSTFIELDS,$data_string);
     curl_setopt($curl,CURLOPT_USERPWD,$password);
     curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
    );
     $this->setResult(curl_exec($curl));
     $information = curl_getinfo($curl);
     curl_close ($curl);
     var_dump($information);
     
    }
    function getTo() {
        return $this->to;
    }

    function getFrom() {
        return $this->from;
    }

    function getUsername() {
        return $this->username;
    }

    function getPassword() {
        return $this->password;
    }

    function setTo($to) {
        $this->to = $to;
    }

    function setFrom($from) {
        $this->from = $from;
    }

    function setUsername($username) {
        $this->username = $username;
    }

    function setPassword($password) {
        $this->password = $password;
    }
    function getMessage() {
        return $this->message;
    }

    function setMessage($message) {
        $this->message = $message;
    }
    function getResult() {
        return $this->result;
    }

    function setResult($result) {
        $this->result = $result;
    }

            //put your code here
}


$sms = new MessageManager('BLUENERGI','bluenergi','3n3rg1');
$sms->setMessage("Hello");
$sms->setTo("+2348060928118");
$sms->sendSms();
var_dump($sms->getResult());