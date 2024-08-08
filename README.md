# gti525

## Application et Serveur

### Install VueJs
```
npm install -g @vue/cli
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Base de donnee

1. Installer le client pour **Docker** [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) (_disponible sur Windows, Linux et Mac_)

    <details>
    <summary>Pour Linux  </summary>
    <br>
    Le client visuel est disponible, mais vous pouvez installer l'invite de commande uniquement avec votre gestionnaire de <i>package</i> suivant : <br> <b>docker-compose</b> et <b>docker</b> <br> et continuer pour l'utilisation
    <br>
    </details>

2. Avec une terminal (Powershell ou avec le terminal de VS Code) positionner vous a début de l'arborescence du projet et entrer la commande suivante : `docker compose up -d`

    <details>
    <summary>Pour Linux  </summary>
    <br>
        Sassurer que le dossier <b>data</b> est accessible en écriture à chaque avec <b>sudo chmod 777 data</b>. Executé la commande dans le dossier
    <br>
    </details>