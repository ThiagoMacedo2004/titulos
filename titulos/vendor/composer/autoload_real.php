<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit0f61594e3e385919cd4531bc88d6a338
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit0f61594e3e385919cd4531bc88d6a338', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit0f61594e3e385919cd4531bc88d6a338', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit0f61594e3e385919cd4531bc88d6a338::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
