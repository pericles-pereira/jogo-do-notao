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
    public static function camelToSnake(string|array $string, string $arrayType = 'associative'): string|array
    {
        if (is_string($string)) {
            return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
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
    public static function snakeToCamel(string|array $string, string $arrayType = 'associative'): string|array
    {
        if (is_string($string)) {
            return lcfirst(str_replace('_', '', ucwords($string, '_')));
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

    /**
     * Formats a numeric string with decimal places for the correct way to be represented.
     * Attention! If the thousandsimal places are not separated by "." and/or the decimal places are not separated by ",", the formatting will not work as intended.
     * @param string|array $string The numeric string or array of numeric strings that will be converted.
     * @return string|array The formatted string or array of strings (the keys will be kept).
     * @throws InvalidArgumentException If any element of the array is not a string or if the input provided is invalid.
     */
    public static function formatDecimalStringNumber(string|array $string): string |array
    {
        if (is_string($string)) {
            if (preg_match('/^\d{1,3}(?:\.\d{3})*(?:,\d{2})$/', $string)) {
                return $string; // Se sim, retornar sem formatação
            }

            $value = preg_replace('/[^0-9,.]/', '', $string);

            $lastThreeCharacters = substr($value, -3);

            // Verificar se o primeiro dos três últimos caracteres é um ponto
            if ($lastThreeCharacters[0] === '.') {
                $lastThreeCharacters[0] = ",";
            }

            $splitedValue = str_split($value, 1);
            array_pop($splitedValue);
            array_pop($splitedValue);
            array_pop($splitedValue);

            $string = implode("", $splitedValue) . $lastThreeCharacters;

            // Remover todos os caracteres exceto números e vírgulas
            $value = preg_replace('/[^0-9,]/', '', $string);

            // Verificar se o valor é vazio ou apenas uma vírgula
            if ($value === '' || $value === ',') {
                throw new \InvalidArgumentException('The input provided is invalid.');
            }

            // Dividir o número em parte inteira e parte decimal
            $parts = explode(',', $value);

            if (count($parts) > 1) {
                for ($i = 0; $i < count($parts); $i++) {
                    if ($i === 0) {
                        continue;
                    }

                    if ($i !== count($parts) - 1) {
                        $parts[0] .= $parts[$i];
                    }
                }

                $parts = [$parts[0], $parts[count($parts) - 1]];
            }

            $integerPart = ltrim($parts[0], '0');
            $decimalPart = isset($parts[1]) ? substr($parts[1] . '00', 0, 2) : '00';

            // Se a parte inteira for vazia, definir como '0'
            if ($integerPart === '') {
                $integerPart = '0';
            }

            // Formatar a parte inteira com pontos de milhares
            $formattedIntegerPart = '';
            $length = strlen($integerPart);
            for ($i = 0; $i < $length; $i++) {
                $formattedIntegerPart .= $integerPart[$i];
                if (($length - $i - 1) % 3 === 0 && $i !== $length - 1
                ) {
                    $formattedIntegerPart .= '.';
                }
            }

            // Retornar o valor formatado
            return $formattedIntegerPart . ',' . $decimalPart;
        }

        foreach ($string as $key => $value) {
            if (!is_string($value)) {
                throw new \InvalidArgumentException('Array elements are not strings.');
            }

            $output[$key] = self::formatDecimalStringNumber($value);
        }

        return $output;
    }
}
