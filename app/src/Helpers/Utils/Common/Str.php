<?php

namespace Source\Helpers\Utils\Common;

use Illuminate\Support\Str as IlluminateStr;

final class Str extends IlluminateStr
{
    /**
     * Converts a string or array of strings in camelCase to snake_case.
     * @param string|array $string The string or array of strings that will be converted.
     * @param string $arrayType The type of the array (if you are converting an array), making it possible to convert indexed arrays (their values) and associative arrays (their keys). Only 'indexed' or 'associative' are valid.
     * @return string|array The string or array of strings converted to snake_case.
     * @throws InvalidArgumentException If any element(indexed) or key(associative) of the array is not a string.
     */
    public static function camelToSnake(string|array $string, string $arrayType = null): string|array
    {
        if (is_string($string)) {
            return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
        }

        if (is_null($arrayType)) {
            throw new \InvalidArgumentException('Array type not specified.');
        }

        $avaliableArrayTypes = ['indexed', 'associative'];

        if (!in_array($arrayType, $avaliableArrayTypes, true)) {
            throw new \InvalidArgumentException('The specified array type is not valid..');
        }

        $output = [];

        if ($arrayType === $avaliableArrayTypes[0]) {
            foreach ($string as $value) {
                if (!is_string($value)) {
                    throw new \InvalidArgumentException('Array elements are not strings.');
                }

                $output[] = self::camelToSnake($value);
            }

            return $output;
        }

        foreach ($string as $key => $value) {
            if (!is_string($key)) {
                throw new \InvalidArgumentException('Array keys are not strings.');
            }

            $snakeValue = self::camelToSnake($key);
            $output[$snakeValue] = $value;
        }

        return $output;
    }

    /**
     * Converts a string or array of strings in snake_case to camelCase.
     * @param string|array $string The string or array of strings that will be converted.
     * @param string $arrayType The type of the array (if you are converting an array), making it possible to convert indexed arrays (their values) and associative arrays (their keys). Only 'indexed' or 'associative' are valid.
     * @return string|array The string or array of strings converted to camelCase.
     * @throws InvalidArgumentException If any element (indexed) or key (associative) of the array is not a string.
     */
    public static function snakeToCamel(string|array $string, string $arrayType = null): string|array
    {
        if (is_string($string)) {
            return lcfirst(str_replace('_', '', ucwords($string, '_')));
        }

        if (is_null($arrayType)) {
            throw new \InvalidArgumentException('Array type not specified.');
        }

        $availableArrayTypes = ['indexed', 'associative'];

        if (!in_array($arrayType, $availableArrayTypes, true)) {
            throw new \InvalidArgumentException('The specified array type is not valid.');
        }

        $output = [];

        if ($arrayType === $availableArrayTypes[0]) {
            foreach ($string as $value) {
                if (!is_string($value)) {
                    throw new \InvalidArgumentException('Array elements are not strings.');
                }

                $output[] = self::snakeToCamel($value);
            }

            return $output;
        }

        foreach ($string as $key => $value) {
            if (!is_string($key)) {
                throw new \InvalidArgumentException('Array keys are not strings.');
            }

            $camelKey = lcfirst(str_replace('_', '', ucwords($key, '_')));
            $output[$camelKey] = $value;
        }

        return $output;
    }
}
