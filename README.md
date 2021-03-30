# Vulcan - Pouvoir utiliser "searchable" avec les Nested Schema

Initialisation du projet de test :

- yarn install ( ou npm install )
- yarn start ( ou npm start)

Je suis désolé je n'ai pas eu le temps de mettre un fichier seeds avec des fakes data.
Du coup pour tester, il faut :

- 1 : Se créer un compte
- 2 : Ajouter 2 à 3 cv pour pouvoir tester que la recherche fonctionne bien
- 3 : Ajouter des skills différents (ex : React, javascript, java, mysql ...)
- 4 : Mettre un niveau de skill entre 1 et 8

La recherche se base sur le champ name (le nom du cv) et le champ skills.nom, pour pouvoir filtrer par skills

Je suis persuadé qu'on certainement optimisé cela, avec plus de maitrise du framework. Mais bon ça fonctionne plutôt pas mal.

Le gros du travail à était fait dans le fichier modules/cvs/resolvers.js.

J'espère avoir bien compris ce que vous vouliez. N'hésite pas à m'appeler si tu veux plus d'explications sur ma démarche.
