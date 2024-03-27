<?php

namespace Source\Helpers\Utils\Errors;

final class ProcessErrorMessage
{
    private static string $defaultMessage = 'Erro no servidor. Por favor, tente novamente mais tarde ou entre em contato com o suporte.';

    private static array $pgsqlErrors = [
        '08001' => 'Desculpe, não foi possível conectar ao banco de dados. Por favor, verifique sua conexão com a internet ou entre em contato com o suporte técnico.',
        '28000' => 'Suas credenciais de acesso ao banco de dados estão incorretas. Por favor, verifique seu nome de usuário e senha e tente novamente.',
        '23503' => 'Não foi possível concluir a operação devido a uma restrição nos dados relacionamentos. Por favor, verifique se todos os dados relacionados estão corretos.',
        '23505' => 'Já existe um registro com esses dados. Por favor, forneça informações únicas para continuar.',
        '23506' => 'Houve um problema ao tentar realizar a operação devido a uma violação de integridade referencial. Por favor, verifique os dados fornecidos.',
        '57014' => 'O servidor está demorando muito para responder. Por favor, tente novamente mais tarde ou entre em contato com o suporte.',
        '22001' => 'Os dados fornecidos excedem o tamanho máximo permitido. Por favor, revise suas informações e tente novamente.',
        '42601' => 'Houve um problema ao processar sua solicitação. Por favor, entre em contato com o suporte técnico.'
    ];

    private static array $mysqlErrors = [
        '2002' => 'Desculpe, não foi possível conectar ao banco de dados. Por favor, verifique sua conexão com a internet ou entre em contato com o suporte técnico.',
        '1045' => 'Suas credenciais de acesso ao banco de dados estão incorretas. Por favor, verifique seu nome de usuário e senha e tente novamente.',
        '1452' => 'Não foi possível concluir a operação devido a uma restrição nos dados relacionamentos. Por favor, verifique se todos os dados relacionados estão corretos.',
        '1062' => 'Já existe um registro com esses dados. Por favor, forneça informações únicas para continuar.',
        '1216' => 'Houve um problema ao tentar realizar a operação devido a uma violação de integridade referencial. Por favor, verifique os dados fornecidos.',
        '2006' => 'O servidor está demorando muito para responder. Por favor, tente novamente mais tarde ou entre em contato com o suporte.',
        '22001' => 'Os dados fornecidos excedem o tamanho máximo permitido. Por favor, revise suas informações e tente novamente.',
        '42000' => 'Houve um problema ao processar sua solicitação. Por favor, entre em contato com o suporte técnico.'
    ];

    /**
     * Returns a standard message to the user based on the error that occurred, if there is no error message in question, it returns a standard message.
     * @param \Throwable $th The Throwable.
     * @param ?string $defaultMessage the default message, if you want to define it.
     * @return string The message to the user.
     */
    public static function getMessage(\Throwable $th, ?string $defaultMessage = null): string
    {
        $code = $th->getCode();
        $defaultMessage = $defaultMessage ?? self::$defaultMessage;

        if (self::hasMassage($code)) {
            return self::processDriver($code, $defaultMessage);
        }

        return $defaultMessage;
    }

    private static function processDriver(int $code, string $defaultMessage): string
    {
        $conn = env('DB_CONNECTION');
        $drivers = [
            'pgsql' => self::$pgsqlErrors,
            'mysql' => self::$mysqlErrors,
            'sqlite' => self::$mysqlErrors
        ];

        if (array_key_exists($conn, $drivers)) {
            $driver = $drivers[$conn];

            if (array_key_exists($code, $driver)) {
                return $driver[$code];
            }
        }

        return $defaultMessage;
    }

    private static function hasMassage(int $code): bool
    {
        return array_key_exists($code, self::$mysqlErrors) || array_key_exists($code, self::$pgsqlErrors);
    }
}
