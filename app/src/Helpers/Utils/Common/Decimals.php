<?php

namespace Source\Helpers\Utils\Common;

final class Decimals
{
    /**
     *  It receives a numeric string and formats it to the correct string pattern with the Str::formatDecimalStringNumber function and then converts it to a float with two decimal places. ATTENTION, this method must be used to convert values ​​correctly to save in the database, in the case of calculations, other operations must be carried out.
     * @param string $value The numeric string to be converted.
     * @return float The conversion result.
     * @throws \InvalidArgumentException If the input value is invalid.
     */
    public static function numericStringToDecimal(string $value): float
    {
        $formattedString = Str::formatDecimalStringNumber($value);

        $value = floatval(str_replace(',', '.', str_replace('.', '', $formattedString)));

        if ($value === 0 || $value === 1) {
            throw new \InvalidArgumentException('The value entered is invalid for conversion.');
        }

        return $value;
    }

    /**
     *  Receives an array of numeric strings and converts them using the Decimals::numericStringToDecimal method. The keys of the inserted array will be maintained.
     * @param array $array The array of numeric strings to be converted.
     * @return array The array conversion result.
     * @throws \InvalidArgumentException If any element of the array is not a string.
     */
    public static function numericArrayStringToDecimalArray(array $array): array
    {
        $output = [];

        foreach ($array as $key => $value) {
            if (!is_string($value)) {
                throw new \InvalidArgumentException('Array elements are not strings.');
            }

            $output[$key] = self::numericStringToDecimal($value);
        }

        return $output;
    }
}
