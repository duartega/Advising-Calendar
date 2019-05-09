----------------------------------------------------------
.:GROUP MEMBERS:.
----------------------------------------------------------
Made by: Jevan Smith, and Gabe Duarte


----------------------------------------------------------
.:Installation:.
----------------------------------------------------------
type "npm install" inside client directory
type "npm install" inside server directory
Our database credentials have been included for convenience


----------------------------------------------------------
.:Start Project:.
----------------------------------------------------------
- Inside server directory chantge port "const API_PORT = 1000" inside
server.js
- Add a ".env" file inside client folder with the port you want to 
run the client server on "PORT=1000"
- modify "ConfigAxios.js" inside client directory to your api server
"axios.defaults.baseURL = `http://www.cs.sonoma.edu:8131/api/v1`;"
- finally, run server with "node server.js", run client with "npm run start"


----------------------------------------------------------
.:Test Accounts:.
----------------------------------------------------------
Professor:
----------------------------------------------------------
User: Ali        	Pass: Kooshesh
User: Marilyn 		Pass: Coleman
User: Daniel     	Pass: Stanley


Students:
----------------------------------------------------------
User: jevan		Pass: jevan123
User: a			Pass: a
User: eric		Pass: cook

