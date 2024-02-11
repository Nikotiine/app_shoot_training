# ShootTrainingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

### Description

Application de calcul ballistique et suivi des seances d'entraiment pour tireur sportifs
* Enregister vos setup d'armes
* Ajouter des armes ou des optique a la base de données
* Suivre des seances d'entraimenent (*)
* Comparaison des resultat avec prise en compte des parametre de tir : munition / meteo ... (*)
* Reglage de l'elevation de la lunette / dioptre en fonction de la distance (*)
* Reglage de la derive en fonction des paremetre du vent (*)
* Calculateur de puissance en Joules

## Installation
1. Cloner le repo du front-end:
   https://github.com/Nikotiine/app_shoot_training.git
2. Cloner le repo du back-end et suivre son readme
   https://github.com/Nikotiine/api_shoot_training
3. Installer les dependances
```bash
npm install
```
## Recuperer les models de l'api



```bash
ng-openapi-gen --input  http://localhost:8080/v3/api-docs --output src/app/core/api

```
## Lancer le serveur de devellopement 

```bash
ng serve
```
Allez sur  `http://localhost:4200/`. 

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


# app_shoot_training
