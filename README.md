<h1 align="center">ProjectJS 2025 Fall</h1>

<p align="center">
  <img src="media/jenkins.svg" alt="Jenkins logo" width="100"/>
</p>

## ️ Documentation

**Предварительные условия (Prerequisites)**

-   Chrome browser
-   Node.js version 20 (https://nodejs.org/en/download)
-   NPM (устанавливается вместе с Node)
-   VSCode
-   Jenkins version 2.541.3

**Как запустить проект (How to run the project)**

1. Clone repository to your local folder "c:\Js_2026_Spring\Js_Practice"
2. Open VSCode and navigate to project folder "c:\Js_2026_Spring\Js_Practice\JenkinsQA_JS_2026_spring"
3. Create `.env` file and modify it
4. In VSCode terminal, run command `npm ci` then `npx playwright install`
5. Run command `npx playwright test --ui` in VSCode terminal to run tests

Note: Global cleanup is executed before each test

**Соглашение о кодировании проекта (Project Coding Convention)**

Naming files:

-   Use camelCase for naming files: `myFirstTest`
-   Name should be relevant to the user story name

**Структура спецификации (Spec structure)**

-   Each block `describe` should be named as a user story
-   Each test (`test`) should be named as a test case

example:

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
