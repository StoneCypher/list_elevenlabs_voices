# list_elevenlabs_voices
Simple console tool to list eleven labs voices.  Needs API key to see custom voices.

![](./example.png)

```
npm install -g list_elevenlabs_voices
list_elevenlabs_voices -k [apikey]
```

&nbsp;

&nbsp;

## Envvars:
`list_elevenlabs_voices` recognizes one envvar.

* `LIST_ELEVENLABS_VOICES_APIKEY`
    * If set, this envvar's value will be used as a default fallback for the API key

&nbsp;

&nbsp;

## Options:

All formatting options are mutually exclusive:

* `-c` / `--color`
    * Console output will be in color (default)
* `-b` / `--basic`
    * Console output will be basic (no color)
* `-j` / `--in-json`
    * Console output will be simple JSON (no indentation, single line)
* `-f` / `--in-formatted-json`
    * Console output will be simple JSON (2-space indentation, multi-line)
* `-q` / `--quiet`
    * Results will not be output to console (other messages still will be)
* `-s` / `--silent`
    * Console will not be used except during errors

Other options:

* `-p` / `--private`
    * Only show private voices; remove all premades from list (including written file)
* `-k <key>` / `--api-key <key>`
    * Use this API key.  Overrides all other options
* `-e <kenv>` / `--key-envvar <kenv>`
    * Use the key found in the envvar named here.  Overridden by -k, overrides default
* `-o <file>` / `--output-json <file>`
    * Write result to disk as single line of dense JSON under provided filename
