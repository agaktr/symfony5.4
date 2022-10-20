Description:
  Extract missing translations keys from code to translation files.

Usage:
  translation:extract [options] [--] <locale> [<bundle>]
  translation:update

Arguments:
  locale                               The locale
  bundle                               The bundle name or directory where to load the messages

Options:
      --prefix[=PREFIX]                Override the default prefix [default: "__"]
      --output-format[=OUTPUT-FORMAT]  Override the default output format (deprecated)
      --format[=FORMAT]                Override the default output format [default: "xlf12"]
      --dump-messages                  Should the messages be dumped in the console
      --force                          Should the extract be done
      --clean                          Should clean not found messages
      --domain[=DOMAIN]                Specify the domain to extract
      --xliff-version[=XLIFF-VERSION]  Override the default xliff version (deprecated)
      --sort[=SORT]                    Return list of messages sorted alphabetically [default: "asc"]
      --as-tree[=AS-TREE]              Dump the messages as a tree-like structure: The given value defines the level where to switch to inline YAML
  -h, --help                           Display help for the given command. When no command is given display help for the list command
  -q, --quiet                          Do not output any message
  -V, --version                        Display this application version
      --ansi|--no-ansi                 Force (or disable --no-ansi) ANSI output
  -n, --no-interaction                 Do not ask any interactive question
  -e, --env=ENV                        The Environment name. [default: "dev"]
      --no-debug                       Switch off debug mode.
  -v|vv|vvv, --verbose                 Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Help:
  The translation:extract command extracts translation strings from templates
  of a given bundle or the default translations directory. It can display them or merge
  the new ones into the translation files.
  
  When new translation strings are found it can automatically add a prefix to the translation
  message.
  
  Example running against a Bundle (AcmeBundle)
  
    php bin/console translation:extract --dump-messages en AcmeBundle
    php bin/console translation:extract --force --prefix="new_" fr AcmeBundle
  
  Example running against default messages directory
  
    php bin/console translation:extract --dump-messages en
    php bin/console translation:extract --force --prefix="new_" fr
  
  You can sort the output with the --sort flag:
  
      php bin/console translation:extract --dump-messages --sort=asc en AcmeBundle
      php bin/console translation:extract --dump-messages --sort=desc fr
  
  You can dump a tree-like structure using the yaml format with --as-tree flag:
  
      php bin/console translation:extract --force --format=yaml --as-tree=3 en AcmeBundle
      php bin/console translation:extract --force --format=yaml --sort=asc --as-tree=3 fr
  
