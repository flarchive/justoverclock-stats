<?php

namespace Justoverclock\Stats\Controller\BaseStats;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Justoverclock\Stats\Model\BaseStat;
use Justoverclock\Stats\Model\UserStat;
use Justoverclock\Stats\Serializer\BaseStatSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateBaseStatController extends AbstractCreateController
{

    public $serializer = BaseStatSerializer::class;

    /**
     * Handle the incoming request and return the data.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return BaseStat
     * @throws PermissionDeniedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $data = $request->getParsedBody();

        $stat = new BaseStat();
        $stat->name = Arr::get($data, 'data.attributes.stat_name');
        $stat->img = Arr::get($data, 'data.attributes.stat_img');
        $stat->save();

        User::query()->chunk(300, function ($users) use ($stat) {
            foreach ($users as $user) {
                $userStat = new UserStat();
                $userStat->user_id = $user->id;
                $userStat->base_stat_id = $stat->id;
                $userStat->value = 0;
                $userStat->save();
            }
        });

        return $stat;
    }
}
