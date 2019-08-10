---
path: "/website-layout-with-webpack"
date: 2019-08-09T00:00:00.000Z
title: "Настраиваем Webpack для верстки с Bootstrap 4"
tags:
  - webpack
  - bootstrap
featured: ui-and-code.png
summary: "Пример настройки webpack для комфортной верстки страничек c использованием bootstrap"
type: "article"
---
# Настраиваем Webpack для верстки с Bootstrap 4 (Пошаговая инструкция)
## 1. Создаем проект
Первым делом создадим папку для нашего проекта и перейдем в нее
```shell script
mkdir site
cd site
```
Создаем ```package.json``` для этого выполняем следующую колманду.
```shell script
npm init
```
После этого ```npm``` задаст вам несколько вопросов 
(название проекта, номер версии, имя автора... ). 
Вы можете все это ввести или попустить соглашаясь с дефолтныим значениями.
В любом случае вы сможете всегда это поненять позже в вашем файле ```package.json```

Итак в результате ```npm``` сгенерирует вам  файл ```package.json```. Внутри будет чтото типа:
```json
{
  "name": "site",
  "version": "1.0.0",
  "description": "demo site",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Alexandr",
  "license": "MIT"
}
```
## 2. Подключаем Webpack

Для начала устанавливаем ```webpack```
```shell script
npm install webpack webpack-cli --save-dev
```
Теперь запускаем его иницифлизацию и настройку для нашего проекта
```shell script
webpack init
```
Он также задаст нам несколько вопросов:
```shell script
? Will your application have multiple bundles? (Y/n) 
```
Отвечаем Нет (вводим ```n``` жмем ```Enter```)
```shell script
? Which module will be the first to enter the application? [default: ./src/index] 
```
Соглашаемся (жмем ```Enter```)
```shell script
? Which folder will your generated bundles be in? [default: dist]: 
```
Соглашаемся (жмем ```Enter```)
```shell script
? Will you be using ES2015? (Y/n)
```
Соглашаемся (жмем ```Enter```)
```shell script
? Will you use one of the below CSS solutions? (Use arrow keys)
❯ SASS 
  LESS 
  CSS 
  PostCSS 
  No 
```
Тут можно выбрать как вы предпочитаете работать со стилями. 
Но поскольку Bootstrap написан на SASS, выбираем его

После этого ```webpack``` создаст нам свой файл конфигурации ```webpack.config.js``` и установит необходимые модули

## 2. Создаем структуру проекта

Создадим папку ```src``` для нашего кода. и в ней папки ```img```,
```style```, ```pages```, ```components``` 
Вы можете воспользоваться проводником, вашей IDE или выполнить команду  
```shell script
mkdir src 
mkdir src/img
mkdir src/style
mkdir src/pages
mkdir src/components
```

В папке ```src``` создаем файл пока пустой ```index.js```,
в папке ```src/style``` создадим пустой файл ```main.scss```, 
в папке ```src/pages``` создадим файл ```index.html``` с базовым html

```shell script
echo > src/index.js
echo > src/style/main.scss
echo '<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
</body>
</html>' > src/pages/index.html
```

в результате у нас должна получиться такая структура проекта

```shell script
├─┬ src                  - папка с исходниками сайта
│ ├── components         - папка c компонентами
│ ├── img                - папка с картинками
│ ├─┬ pages              - папка со страницами сайта
│ │ └── index.html       - главная страница сайта
│ ├─┬ style              - папка с SСSS файлами
│ │ └── main.scss        - главный SCSS файл
│ ├── index.js           - главный JS файл
├── package.json         - файл настроек NPM
└── webpack.config.js    - файл настроек Webpack
```

## 3. Устанавливаем дополнительные модули для Webpack

Нам потребуются лоадеры: ```file-loader```, ```html-loader```
```shell script
npm install file-loader html-loader --save-dev
```
И плагины: ```clean-webpack-plugin```, ```html-webpack-plugin```
```shell script
npm install clean-webpack-plugin html-webpack-plugin --save-dev
```

## 4. Настраиваем webpack

Открываем файл ```webpack.config.js``` в вашем любимом редакторе.
Находим в файле секцию ```rules```
```javascript
module.exports = {
	module: {
		rules: [
          //.........
        ]
    }
}
```
и добавляем туда лоадеры для html компонентов и картинок
```javascript
module.exports = {
	module: {
		rules: [
            {
          		test: /\.html$/,
          		include: path.resolve(__dirname, 'src/components'),
          		use: ['html-loader?interpolate']
          	},
          	{
          	    test: /\.(png|jpe?g|gif|svg)$/,
          		use: [
          			{
          				loader: 'file-loader',
          			},
          		],
          	},
          //.........
        ]
    }
}
```
Дальше подключаем плагигы. В начале файла загружаем их.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```
Теперь ищем секцию plugins и если не находим добавляем

```javascript
	},
	plugins: [
		
	]
};
```
Подключаем ```clean-webpack-plugin```
```javascript
},
	plugins: [
		new CleanWebpackPlugin(),
	]
};
```
Теперь напишем маленькую функцию которая будет перебирать наши странички и скармливать их в 
```html-webpack-plugin```

```javascript
const fs = require('fs');
function generatePages (pagesPath) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, pagesPath));
	return templateFiles.map(filename => {
		return new HtmlWebpackPlugin({
			filename,
			template: path.resolve(__dirname, `${pagesPath}/${filename}`),
		})
	})
}

module.exports = {
	///.....
```
Отлично теперь подключим ее в конфиг

```javascript
},
	plugins: [
		new CleanWebpackPlugin(),
	].concat(generatePages('src/pages'))
};
```
































