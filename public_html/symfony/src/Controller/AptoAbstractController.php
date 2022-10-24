<?php

namespace App\Controller;

use App\Security\EmailVerifier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Cache\Adapter\AdapterInterface;

class AptoAbstractController extends AbstractController
{

    public EmailVerifier $emailVerifier;
    public AdapterInterface $cache;

    public function __construct(EmailVerifier $emailVerifier,AdapterInterface $cache)
    {
        $this->emailVerifier = $emailVerifier;
        $this->cache = $cache;
    }
}
