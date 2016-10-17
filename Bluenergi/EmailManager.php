<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Bluenergi;

/**
 * Description of EmailManager
 *
 * @author OLUWATOSIN
 */
class EmailManager {
    private $from;
    private $to;
    private $message;
    private $subject;
    private $header;
    
    function __construct() {
        $this->header =  'From: BluEnergi <bluenergi@energidevices.com>' . PHP_EOL .
    'Reply-To: Bluenergi <bluenergi@energidevices.com>' . PHP_EOL .
    'X-Mailer: PHP/' . phpversion();
        ;
    }
    function getHeader() {
        return $this->header;
    }

    function setHeader($header) {
        $this->header = $header;
    }

        function getFrom() {
        return $this->from;
    }

    function getTo() {
        return $this->to;
    }

    function getMessage() {
        return $this->message;
    }

    function setFrom($from) {
        $this->from = $from;
    }

    function setTo($to) {
        $this->to = $to;
    }

    function setMessage($message) {
        $this->message = $message;
    }

    function sendMailUsingPHPMail(){
        mail($this->getTo(),$this->getSubject(),$this->getMessage(),$this->header);
    }
    function getSubject() {
        return $this->subject;
    }

    function setSubject($subject) {
        $this->subject = $subject;
    }


    
}
