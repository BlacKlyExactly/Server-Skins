echo [Sklep-Dev]: Ladowanie...
start cmd.exe /c yarn dev
timeout /t 10 /nobreak > NUL
start cmd.exe /c nodemon cache.js
