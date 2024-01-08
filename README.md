# White-Label App (WLA Drinks App) Documentation

Welcome to the documentation for our White-Label App (WLA). This document provides insights into the structure of the project, how UI elements can be managed/altered through the JSON object.

## Project Overview

This Angular application serves as a White-Label App that can be branded and configured using a JSON object. The JSON object acts as an instruction set.

## Configuration Through JSON

UI elements can be customized using the configuration provided in the `assets/config.json` file. The structure of the JSON object includes properties for app name, logo, and other branding details.

Example `config.json`:

```json
{
  "baseUrl": "https://www.thecocktaildb.com/api/json/v1/1",
  "appName": "WLA Drinks",
  "branding": {
    "favicon": "assets/logos/wla-logo.png",
    "companyName": "White Label Company"
  }
}
```

### Configuration Properties

- **appName**: The name of the White-Label App.
- **logo**: The path to the custom logo image file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
