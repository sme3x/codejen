<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Builder;

class FilterHelper {

    public static function throwWithParam(string $message, array $param) {
        throw new \Exception($message .': '. print_r($param, true));
    }

    public static function validateClosureParam(array $closureParam) {
        if (!isset($closureParam['type'])) {
            FilterHelper::throwWithParam('Type key is required for closure param', $closureParam);
        }
        if ($closureParam['type'] !== 'closure') {
            FilterHelper::throwWithParam('Closure param must be of type closure', $closureParam);
        }
        if (!isset($closureParam['params'])) {
            FilterHelper::throwWithParam('Params are required for closure param', $closureParam);
        }
        forEach($closureParam['params'] as $param) {
            if (!isset($param['type'])) {
                FilterHelper::throwWithParam('Type key is required for closure param', $param);
            }
            if ($param['type'] === 'method') {
                FilterHelper::validateMethodParam($param);
            }else {
                FilterHelper::throwWithParam('Invalid type for closure param', $param);
            }
        }
    }

    public static function validateValueParam(array $valueParam) {
        if (!isset($valueParam['type'])) {
            FilterHelper::throwWithParam('Type key is required for value param', $valueParam);
        }
        if ($valueParam['type'] !== 'value') {
            FilterHelper::throwWithParam('Value param must be of type value', $valueParam);
        }
        if (!isset($valueParam['value'])) {
            FilterHelper::throwWithParam('Value key is required for value param', $valueParam);
        }
    }

    public static function validateMethodParam(array $methodParam) {
        if (!isset($methodParam['type'])) {
            FilterHelper::throwWithParam('Type key is required for method param', $methodParam);
        }
        if ($methodParam['type'] !== 'method') {
            FilterHelper::throwWithParam('Method param must be of type method', $methodParam);
        }
        if (!isset($methodParam['params'])) {
            FilterHelper::throwWithParam('Params are required for method param', $methodParam);
        }
        if (!isset($methodParam['method'])) {
            FilterHelper::throwWithParam('Method is required for method param', $methodParam);
        }
        if(!is_array($methodParam['params'])) {
            FilterHelper::throwWithParam('Params must be an array', $methodParam);
        }
        forEach($methodParam['params'] as $param) {
            if (!isset($param['type'])) {
                FilterHelper::throwWithParam('Type key is required for method params', $param);
            }
            if ($param['type'] === 'value') {
                FilterHelper::validateValueParam($param);
            } else if ($param['type'] === 'closure') {
                FilterHelper::validateClosureParam($param);
            } else {
                FilterHelper::throwWithParam('Invalid type for method param', $param);
            }
        }
    }

    public static function validateFilterSpec(array $filterSpec) {
        forEach($filterSpec as $value) {
            FilterHelper::validateMethodParam($value);
        }
    }

    public static function buildParams(array $params): array {
        $output = [];
        forEach($params as $param) {
            if ($param['type'] === 'value') {
                $output[] = $param['value'];
            } else if ($param['type'] === 'closure') {
                $output[] = function($query) use ($param) {
                    forEach($param['params'] as $param) {
                        FilterHelper::applyMethod($query, $param);
                    }
                    return $query;
                };
            }
        }
        return $output;
    }

    public static function applyMethod(Builder &$query, array $methodParam): void {
        $methodName = $methodParam['method'];
        if (!is_callable([$query, $methodName])) {
            FilterHelper::throwWithParam('Invalid method name', $methodParam);
        }
        $params = $methodParam['params'];
        $query = $query->$methodName(...FilterHelper::buildParams($params));
    }

    public static function applyFilters(Builder &$query, $filterSpecs): void {
        forEach($filterSpecs as $filterSpec) {
            FilterHelper::validateFilterSpec($filterSpec);
            $query = $query->where(function($query) use ($filterSpec) {
                forEach($filterSpec as $methodParam) {
                    FilterHelper::applyMethod($query, $methodParam);
                }
                return $query;
            });
        }
    }

}
