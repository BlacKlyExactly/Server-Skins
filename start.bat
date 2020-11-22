echo [Sklep]: Ladowanie...
start cmd.exe /c yarn start
timeout /t 5 /nobreak > NUL
start cmd.exe /c node cache.js
start cmd.exe /c node bot.js
