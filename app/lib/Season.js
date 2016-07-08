import seasonData from './data/seasonData.json'

class Season {

    /**
	 * @constructor
	 */
    constructor() {

        this.season = this.getSeason();

        // Params by season
        const currentSeason = this.season;
        let seasonParams = seasonData.find((season) => {
            return season.id == currentSeason;
        });
        Object.assign(this, seasonParams);

        localStorage.setItem(this.name, 'played');

        this.soundPath = `//lab.arnaudrocca.fr/audio-workshop/assets/audio/${ this.name }.mp3`;

        document.getElementById('current-season').innerHTML = this.name;
        document.getElementById('link').style.color = `#${ this.color.substring(2) }`;

        let favicon = document.createElement('link');
        favicon.id = 'dynamic-favicon';
        favicon.rel = 'shortcut icon';
        favicon.href = `./assets/images/favicon-${ this.name }.png`;
        document.head.appendChild(favicon);

    }

    /**
     * @method
     * @name getSeason
     * @return {number} season - The id of the season
     */
    getSeason() {

        let played = new Array();

        played[0] = localStorage.getItem('spring');
        played[1] = localStorage.getItem('summer');
        played[2] = localStorage.getItem('autumn');
        played[3] = localStorage.getItem('winter');

        let season = Math.floor(Math.random() * 4);

        // Don't play the same music twice in the same loop
        if (!(played[0] === 'played' && played[1] === 'played' && played[2] === 'played' && played[3] === 'played')) {
            while (played[season] === 'played') {
                season = Math.floor(Math.random() * 4);
            }
        } else {
            // Restart a new loop
            localStorage.clear();
        }

        return season;

    }

}

export default Season
