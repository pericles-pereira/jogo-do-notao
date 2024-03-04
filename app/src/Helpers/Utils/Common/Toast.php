<?php

namespace Source\Helpers\Utils\Common;

final class Toast
{
    /**
     * Standardizes the definition of user-friendly success messages.
     * @param string $message The notification's message.
     * @return array The data for toast generation in the visual component.
     */
    public static function success(string $message): array
    {
        return [
            'message' => $message,
            'type' => 'success'
        ];
    }

    /**
     * Standardizes the definition of user-friendly error messages.
     * @param string $message The notification's message.
     * @return array The data for toast generation in the visual component.
     */
    public static function error(string $message): array
    {
        return [
            'message' => $message,
            'type' => 'error'
        ];
    }

    /**
     * Standardizes the definition of user-friendly info messages.
     * @param string $message The notification's message.
     * @return array The data for toast generation in the visual component.
     */
    public static function info(string $message): array
    {
        return [
            'message' => $message,
            'type' => 'info'
        ];
    }
    
    /**
     * Standardizes the definition of user-friendly warning messages.
     * @param string $message The notification's message.
     * @return array The data for toast generation in the visual component.
     */
    public static function warn(string $message): array
    {
        return [
            'message' => $message,
            'type' => 'warn'
        ];
    }
}
