/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * fr : Francais
 * **************************
 *
 * Version : 1.4
 * Date : 04-22-2010
 * @author Valente
 */
var locale = 'fr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
	main: 'Principal',
	theme: 'Theme',
	icons:'Icônes',
	counter:'Compteur',
	layout: 'Mise en page',
	navigation: 'Navigation',
	share: 'Partage',
	action: 'Action',
	content: 'Contenu'
};
GRP.langs[locale].scripts = {
    general: {
        name: "Général",
        desc: "Configuration générale"
    },
    theme: {
        name: "Thème",
        desc: "Changer l'apparence de GoogleReader"
    },
    ig: {
        name: "Thème iGoogle",
        desc: "Use <a href='http://www.google.com/ig/directory?type=themes' target='blank'>iGoogle Theme</a> in your Google Reader (Beta)"
	},
    relook: {
        name: "Relook",
        desc: "Relooker votre reader en appliauant vos propres styles CSS"
    },
    favicons: {
        name: "Favicons",
        desc: "Afficher les icônes des sites"
    },
    unreadcount: {
        name: "Afficher les non lus",
        desc: "Afficher le compteur d'articles non lus pour chaque site et catégorie"
    },
    fixlayout: {
        name: "Corriger la mise en page",
        desc: "Corriger plusieurs problémes de mise en page comme la largeur des textes des articles, afficher des images manquantes, et adapter la taille des images trop grande"
    },
    count: {
        name: "Corriger le compteur",
        desc: "Afficher le vrai nombre d'articles non lus à la place de 1000+"
    },
    counticon: {
        name: "Compteur dans l'icône",
        desc: "Afficher un compteur dans l'icône du site de Google Reader"
    },
    removeads: {
        name: "Filtrage publicités",
        desc: "Simple filtrage de publicités"
    },
    column: {
        name: "Multi colonnes",
        desc: "Permet d'afficher le texte sur plusieurs colonnes comme dans un magazine"
    },
    preview: {
        name: "Aperçu",
        desc: "Ajoute un bouton pour afficher la page originale du site à la place de la nouvelle"
    },
    colorful: {
        name: "Liste colorée",
        desc: "Regrouper vos articles en utilisant une couleur pour chaque site"
    },
    filter: {
        name: "Filtrage",
        desc: "Filtrer les articles en le supprimant ou en les mettant em surbrillance grâce à vos mots clés"
    },
	limit: {
        name: "Limitation",
        desc: "Limiter le nombre d'aticles dans une page. Les articles lus sont retirés pour rester avec un nombre raisonnable d'éléments."
    },
    readbymouse: {
        name: "Lecture par souris",
        desc: "Lire les articles avec votre souris. Clid croit ou gauche pour aller sur l'élément suivant pour précédent"
    },
    facebook: {
        name: "Facebook",
        desc: "Partager vos articles sur Facebook"
    },
    twitter: {
        name: "Twitter",
        desc: "Partager vos articles sur Twitter"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Partager et lire plus tard vos articles via Instapaper"
    },
	readitlater: {
        name: "ReadItLater",
        desc: "Partager et lire plus tard vos articles via ReadItLater"
    },
    mark: {
        name: "Marquer comme lus",
        desc: "Marquer tous les articles précédents ou suivants comme lus"
    },
    jump: {
        name: "Haut / bas",
        desc: "Aller directement en haut ou en bas de l'élément"
    },
    fitheight: {
        name: "Adapteur hauteur",
        desc: "Adapteur la hauteur de l'élément à la hauteur de l'écran (pour les articles longs)"
    },
    closeentry: {
        name: "Fermer élément",
        desc: "Fermer complétement un élément"
    },
    openbackground: {
        name: "Ouvrir en arrière plan",
        desc: "Ouvrir en arrière plan un élément"
    },
    replacer: {
        name: "Remplacement",
        desc: "Remplace un élément avec une partie de la page originale. Actuellement utilisé pour afficher les bandes dessinées de gocomics.com. Merci à jolan78 pour son idée originale et son script."
    },
    aero: {
        name: "Barre d'outil Aero",
        desc: "Barre d'outil utilisant le theme Aero de Windows Vista"
    },
    info: {
        name: "SysInfo",
        desc: "Information sur le système"
    },
    extshortcuts: {
        name: "Raccourcis",
        desc: "Raccourcis clavier"
    },
    pack: {
        name: "Paquetages",
        desc: "Ensemble d'options préconfigurées"
    },
    thanks: {
        name: "Remerciements",
        desc: "Merci!"
    },
    about: {
        name: "A propos",
        desc: "A propos de ReaderPlus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "Aucun"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Noir Amélioré"
    },
    dark: {
        name: "Thème Noir"
    },
    darkgray: {
        name: "Thème Gris"
    },
    helvetireader: {
        name: "Helvetireader"
    },
    minimal: {
        name: "Thème minimaliste"
    },
    optimized: {
        name: "Thème Optimisé"
    },
    portal: {
        name: "Thème Portail"
    },
    player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Bleu"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Noir"
    },
	calibri: {
        name: "Calibri"
    },
	glassblackgold: {
        name: "Or foncé brillant"
    },
    simpleclean: {
        name: "Simple et propre"
    },
    peacockfeather: {
        name: "Plume de paon"
    },
    myowngooglereader: {
        name: "Mon Google Reader"
    },
    compactcleantweaked: {
        name: "Compact, propre & amélioré"
    },
    absolutelycompact: {
        name: "Absolutement compact"
    },
    darkshinyblue: {
        name: "Bleu foncé brillant"
    },
	persian: {
        name: "Perse optimisé"
	}
};
