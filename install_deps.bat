@echo off
if %1==backend cd ./catalogo-back-end
if %1==frontend cd ./catalogo-front-end
npm install