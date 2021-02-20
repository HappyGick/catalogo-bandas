@echo off
echo Instalando dependencias del backend...
cmd /c install_deps.bat backend
echo Compilando backend...
cd ./catalogo-back-end
cmd /c tsc
cd ..
echo Instalando dependencias del frontend...
cmd /c install_deps frontend
pause