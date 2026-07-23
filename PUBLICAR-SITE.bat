@echo off
chcp 65001 >nul
title Publicando site no GitHub...
cd /d "%~dp0"

echo ==============================================
echo   PUBLICAR SITE NO GITHUB
echo ==============================================
echo.

REM --- Remove travas deixadas por outra ferramenta (se existirem) ---
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\ORIG_HEAD.lock" del /f /q ".git\ORIG_HEAD.lock"

echo [1/5] Buscando versao mais recente do GitHub...
git fetch origin
if errorlevel 1 goto erro

echo [2/5] Alinhando com o GitHub (sem apagar seus arquivos)...
git reset --soft origin/main
if errorlevel 1 goto erro

echo [3/5] Preparando as alteracoes...
git add -A

echo [4/5] Criando o commit...
git commit -m "Atualiza site: pagina Portal do Contribuinte" || echo   (nada novo para commitar, seguindo...)

echo [5/5] Enviando para o GitHub...
git push origin main
if errorlevel 1 goto erro

echo.
echo ==============================================
echo   PUBLICADO COM SUCESSO!
echo   Confira em: https://github.com/LucasValeQueiroz/site
echo ==============================================
echo.
pause
exit /b 0

:erro
echo.
echo ==============================================
echo   OCORREU UM ERRO. Verifique as mensagens acima.
echo ==============================================
echo   Dica: se pedir login, entre com sua conta do GitHub.
echo   Se persistir, me chame que a gente resolve.
echo ==============================================
echo.
pause
exit /b 1
