<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UpdateRelationsHelper
{
    public static function updateRelation(Model $model, string $relation, string $method, array $params)
    {

        foreach ($params as $param) {
            if (! is_int($param) && ! is_string($param)) {
                throw new \InvalidArgumentException('The params must be ids (integer or string)');
            }
        }

        switch ($method) {
            case 'associate':
                if (! ($model->{$relation}() instanceof HasMany && ! $model->{$relation}() instanceof HasOne)) {
                    $model->{$relation}()->$method(...$params);
                    break;
                }

                foreach ($params as $param) {
                    $model
                        ->{$relation}()
                        ->getRelated()
                        ->findOrFail($param)
                        ->update([
                            $model->{$relation}()->getForeignKeyName() => $model->id,
                        ]);
                }
                break;
            case 'dissociate':
                foreach ($params as $param) {
                    $model
                        ->{$relation}()
                        ->getRelated()
                        ->findOrFail($param)
                        ->update([
                            $model->{$relation}()->getForeignKeyName() => null,
                        ]);
                }
                break;
            case 'attach':
                $model->{$relation}()->$method($params);
                break;
            case 'detach':
                $model->{$relation}()->$method($params);
                break;
            case 'sync':
                $model->{$relation}()->$method($params);
                break;
            case 'toggle':
                $model->{$relation}()->$method($params);
                break;
            case 'syncWithoutDetaching':
                $model->{$relation}()->$method($params);
                break;
            default:
                throw new \InvalidArgumentException("The $method method is not supported. Suppored methods are associate, dissociate, attach, detach, sync, toggle, syncWithoutDetaching");
        }
    }
}
