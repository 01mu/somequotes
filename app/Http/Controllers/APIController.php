<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class APIController extends Controller
{
    private $base_url;

    public function home()
    {
        return 'home';
    }

    public function __construct()
    {
        $this->base_url = 'https://smallfolio.bitnamiapp.com/somequotes/';
    }

    public function GetQuotesSearch($limit, $start, $query)
    {
        $query = str_replace(' ', '%20', $query);

        $url = $this->base_url . 'get_quotes_search.php?limit=' . $limit .
            '&start=' . $start . '&query=' . $query;

        return $this->GetRequest($url);
    }

    public function GetQuotesRandom($limit, $start)
    {
        $url = $this->base_url . 'get_quotes_random.php?limit=' . $limit.
            '&start=' . $start;

        return $this->GetRequest($url);
    }

    public function GetAuthorSearch($limit, $start, $query)
    {
        $query = str_replace(' ', '%20', $query);

        $url = $this->base_url . 'get_author_search.php?limit=' . $limit .
            '&start=' . $start . '&query=' . $query;

        return $this->GetRequest($url);
    }

    public function GetAuthorSingle($author)
    {
        $author = str_replace(' ', '%20', $author);

        $url = $this->base_url . 'get_author_single.php?author=' . $author;

        return $this->GetRequest($url);
    }

    private function GetRequest($url)
    {
        $data = file_get_contents($url, false);
        $posts = json_decode($data, true);

        return $posts;
    }
}
