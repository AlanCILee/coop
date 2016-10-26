frontend:
coop/ npm run build
coop/ npm start 

backend:
coop/ node ./backend/app.js
coop/ supervisor ./backend/app.js

watch:
coop/ node ./watcher.js