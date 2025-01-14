<?php

namespace Justoverclock\Stats\Controller\BaseStats;


use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Justoverclock\Stats\Model\BaseStat;
use Justoverclock\Stats\Serializer\BaseStatSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class GetBaseStatsController extends AbstractListController
{

    public $serializer = BaseStatSerializer::class;

    /**
     * @throws PermissionDeniedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        return BaseStat::all();
    }
}
