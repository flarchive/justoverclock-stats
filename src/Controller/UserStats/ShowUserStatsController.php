<?php

namespace Justoverclock\Stats\Controller\UserStats;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Justoverclock\Stats\Model\UserStat;
use Justoverclock\Stats\Serializer\UserStatSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowUserStatsController extends AbstractListController
{

    public $serializer = UserStatSerializer::class;
    public $include = ['baseStat'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $userId = Arr::get($request->getQueryParams(), 'userId');

        return UserStat::query()
            ->with('baseStat')
            ->where('user_id', $userId)
            ->get();
    }
}
