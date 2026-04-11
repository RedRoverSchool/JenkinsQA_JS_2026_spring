<h1 align="center">ProjectJS 2026 Spring</h1>

<p align="center">
  <img src="media/jenkins.svg" alt="Jenkins logo" width="100"/>
</p>

## ️ Documentation

**Предварительные условия (Prerequisites)**

-   Chrome
-   Node.js версия 20 (https://nodejs.org/en/download)
-   NPM (устанавливается вместе с Node)
-   VSCode
-   Java версия 25
-   Jenkins версия 2.541.3

**Как запустить проект (How to run the project)**

1. Клонируем репо на локальный компьютер в папку "c:\Js_2026_Spring\Js_Practice" (создаем если еще нет)
2. Открываем склонированную папку в VSCode ("c:\Js_2026_Spring\Js_Practice\JenkinsQA_JS_2026_spring")
3. Создаем `.env` файл и модифицируем его
4. В VSCode, открываем терминал и пишем две комманды: `npm ci`, затем `npx playwright install`
5. В терминале, запускаем тесты через комманду `npx playwright test --ui`

Пометка: Глобальная очистка данных запускается перед каждым тестом. 

**Соглашение о кодировании проекта (Project Coding Convention)**

Как называем файлы:

-   Используем camelCase: `myFirstTest.spec.ts`
-   Имя файла должно соответствовать User Story

**Структура спецификации (Spec structure)**

-   Каждый блок `describe` должен быть назван в соотвестсвии с User Story
-   Каждый блок `test` должен быть назван в соответсвии с Test Case

Пример:

```
describe('US_01.001 | New Item > Create a new item', () => {

    test('TC_01.001.01 | Verify page load', function () {
        ...
    })

})
```

<a name="rules"></a>

## ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА (MUST-FOLLOW RULES)

-   Студентам нельзя устанавливать какие-либо библиотеки, плагины и другие вещи. 
-   Студентам нельзя модифицировать никакие конфигурационные файлы.

**!!Не изменять и не пушать файлы как (Do not push changed files as):**

-   `README.md`
-   `package.json`
-   `package-lock.json`
-   `playwright.config.ts`
-   `.gitignore`
-   `base.ts`
-   `global-setup.ts`
-   `ci.yml`
-   `cancel.yml`
-   `wait-for-jenkins.sh`
-   `cleanData.ts`
-   любые другие файлы, которые не относятся к написанию тестов.
