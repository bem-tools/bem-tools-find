# bem-tools-find

[![Build Status](https://travis-ci.org/bem-incubator/bem-tools-find.svg)](https://travis-ci.org/bem-incubator/bem-tools-find)
[![Coverage Status](https://coveralls.io/repos/bem-incubator/bem-tools-find/badge.svg?branch=master&service=github)](https://coveralls.io/github/bem-incubator/bem-tools-find?branch=master)

![Logo](./logo.ico)

Инструмент для поиска БЭМ сущностей по заданным критериям.

## Возможности

* Использование в качестве самостоятельного CLI инструмента
* Использование в качестве плагина к [bem-tools](https://github.com/bem/bem-tools)
* Возможность использования с помощью JS API

## Установка

Инструмент устанавливается как обычная npm-зависимость:
```
$ npm install bem-tools-find
```

## Использование

### Использование с помощью CLI-интерфейса.

```
Usage:
  find COMMAND [OPTIONS] [ARGS]
  find [OPTIONS] [ARGS]

Commands:
  completion : Shell completion

Options:
  -h, --help : Help
  -b BLOCK, --block=BLOCK : Name of block(s)
  -e ELEMENT, --element=ELEMENT : Name of element(s)
  -m MODIFIER, --mod=MODIFIER : Name of modifier(s)
  -t TECH, --tech=TECH : Name of tech(s)
  -v VIEW, --view=VIEW : Type of output

Arguments:
  ENTITY : entity
```

Здесь:

* `-h`, `--help` - флаг предназначенный для получения справочной информации по вызову команды.
* `-b`, `--block` - имя блока(ов) для поиска. Может быть использован несколько раз.
* `-e`, `--element` - имя элемента(ов) блока(ов) для поиска. Может быть использован несколько раз.
* `-m`, `--mod` - имя модификатора. Если указан также параметр элемента (`-e`, `--element`), 
то подразумевается поиск по модификаторам элементов блока. Если параметр элемента отсутствует, то
будет произведен поиск по модификаторам блока.
* `-t`, `--tech` - имя технологии блока.
* `-v`, `--view` - стиль вывода результата поиска. Может принимать значения `plain`(по умолчанию), `table` и `tree`.

#### Примеры вызова команды

* Поиск всех БЭМ сущностей в проекте:
```
$ ./node-modules/bem-tools-find/find
```
* Поиск файлов блока `my-block`: 
```
$ ./node-modules/bem-tools-find/find -b my-block
```
* Поиск файлов для нескольких блоков:
```
$ ./node-modules/bem-tools-find/find -b my-block1 -b my-block2
```
* Поиск файлов элемента `my-element` блока `my-block`:
```
$ ./node-modules/bem-tools-find/find -b my-block -e my-element
``` 
* Поиск файлов модификатора `my-mod` блока `my-block`:
```
$ ./node-modules/bem-tools-find/find -b my-block -m my-mod
``` 
* Поиск файлов модификатора `my-mod` элемента `my-element` блока `my-block`:
```
$ ./node-modules/bem-tools-find/find -b my-block -e my-element -m my-mod
``` 
* Поиск файлов технологии `js` блока `my-block`:
```
$ ./node-modules/bem-tools-find/find -b my-block -t js
```
* Вывод результатов поиска файлов блока `my-block` в табличном виде:
```
$ ./node-modules/bem-tools-find/find -b my-block -v table
```
* Вывод результатов поиска файлов блока `my-block` в виде дерева БЭМ сущностей:
```
$ ./node-modules/bem-tools-find/find -b my-block -v tree
```
* Получение справочной информации:
```
$ ./node-modules/bem-tools-find/find --help
```

### Использование инструмента с помощью JS API.

//TODO написать документацию

## Тестирование

Запуск тестов
```
$ npm test
```

Запуск тестов с вычислением покрытия кода тестами с помощью инструмента [istanbul](https://www.npmjs.com/package/istanbul):
```
$ npm run cover
```

Проверка синтаксиса кода с помощью:
[jshint](https://www.npmjs.com/package/jshint),
[jscs](https://www.npmjs.com/package/jscs)

```
$ npm run lint
```

Особая благодарность за помощь в разработке:

* [Гриненко Владимир](http://github.com/tadatuta)
* [Харисов Виталий](https://github.com/vithar)

Разработчики: 
* [Кузнецов Андрей](https://github.com/tormozz48)
* [Исупов Илья](https://github.com/SwinX)

Вопросы и предложения присылать в раздел [issues](https://github.com/bem-incubator/bem-tools-find) репозитория данного инструмента.
