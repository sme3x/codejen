<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UpdateRelationsHelper
{
    public static function updateRelation(Model $model, string $relation, string $method, array $params)
    {
        if (($method === 'associate') && ($model->{$relation}() instanceof HasMany || $model->{$relation}() instanceof HasOne)) {
            if (! is_array($params[0]) && ! is_int($params[0]) && ! is_string($params[0])) {
                throw new \InvalidArgumentException("The $method first parameter must be an array of ids");
            }
            if (is_int($params[0]) || is_string($params[0])) {
                $params[0] = [$params[0]];
            }
            // FIXME: Make this not an array of arrays
            foreach ($params[0] as $param) {
                if (! is_int($param) && ! is_string($param)) {
                    throw new \InvalidArgumentException("The $method parameter must be an integer or a string");
                }
                $model->{$relation}()->getRelated()->findOrFail($param)->update([$model->{$relation}()->getForeignKeyName() => $model->id]);
            }
        } elseif ($method === 'dissociate') {
            if (! is_array($params[0]) && ! is_int($params[0]) && ! is_string($params[0])) {
                throw new \InvalidArgumentException("The $method first parameter must be an array of ids");
            }
            if (is_int($params[0]) || is_string($params[0])) {
                $params[0] = [$params[0]];
            }
            // FIXME: Make this not an array of arrays
            foreach ($params[0] as $param) {
                if (! is_int($param) && ! is_string($param)) {
                    throw new \InvalidArgumentException("The $method parameter must be an integer or a string");
                }
                $model->{$relation}()->getRelated()->findOrFail($param)->update([$model->{$relation}()->getForeignKeyName() => null]);
            }
        } else {
            $model->{$relation}()->$method(...$params);
        }
    }
}
