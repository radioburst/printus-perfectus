kkkk oiso

1. nodejs installieren, und docker-compose wennst des ned host
2. amoi im frontend olle dependencies installiern `cd frontend && npm run i`
3. wieder zruck ins root verzeichnis :D
4. `npm run build:prod && npm run start:prod` zum laufen lossn vom container

ez

auf `localhost:7001/admin?parole=SchnitzlGsicht420` host des admin interface, passwort is top geheim ned weidageben :D (konfigurierbor in `frontend/.env`)

Do kaunst daun tokens erstön und so und löschen

wennst an token erstöt host, kaunst unter `localhost:7001/MEI_TOKEN` die website aufruafn.

in da `frontend/src/index.html` san 3 video tags drinnen, wenn da proxy konfiguriert is haust de links anfoch eini

da port der applikation is konfigurierbor in `docker-compose.yml` bzw `docker-compose.dev.yml`

apropos dev

`npm run build:dev && npm run start:dev` is so eigrichtet dassa automatisch den server neichstart wennst a .ts file veränderst, is nice zum entwickeln. :)

apropos SchnitzlGsicht

wennst an proxy konfigurierst würdis vlt so mochn dass des admin interface goaned von aussen erreichbar is, so wie i des obgsichert hob is des ned unbedingt des sicherste. (wennstas mit ssl obgsichert host wärs theoretisch oba a ok wennstas aufmochst noch draussn.)

apropos ssl

kaunst direkt im nginx proxy konfiguriern wennst des mochn wüst, und des frontend dahinter brauchts daun goaned. glaub i. (stichwort: letsencrypt certbot, is bissl a herumscheissn oba gibts a ois container)

Kaunst natürlich a drauf scheissn.

## datenbank

i hob moi den fehler ghobt dassa si in da konsole beschwert hod "cannot write to read-only database". daun muast `sudo chmod +w ./frontend/data` und de tokens.db de drinnan liegt löschen, er legts eh wieder au beim neichstart.

ajo, in da tokens.db liegen de tokens daun gspeichert. is jetzt sqlite, geht schnölla zum programmiern :p
