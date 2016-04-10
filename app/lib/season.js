class Season {

    /**
     * constructor
     */
    constructor() {

        let played = new Array();

        played[1] = localStorage.getItem('spring');
        played[2] = localStorage.getItem('summer');
        played[3] = localStorage.getItem('autumn');
        played[4] = localStorage.getItem('winter');

        this.season = Math.ceil(Math.random() * 4);

        // Don't play the same music twice in the same loop
        if (!(played[1] === 'played' && played[2] === 'played' && played[3] === 'played' && played[4] === 'played')) {
        	while (played[this.season] === 'played') {
        		this.season = Math.ceil(Math.random() * 4);
        	}
        } else {
        	// Restart a new loop
        	localStorage.clear();
        }

        // Parameters by season
        switch (this.season) {

            // Spring
            case 1:
                this.name = 'spring';
                this.color = '0x00FF00';
                this.spinSpeed = 5;
                this.factor = .7;
                break;

            // Summer
            case 2:
                this.name = 'summer';
                this.color = '0xFFFF00';
                this.spinSpeed = 3;
                this.factor = 1;
                break;

            // Autumn
            case 3:
                this.name = 'autumn';
                this.color = '0xFF7700';
                this.spinSpeed = 2;
                this.factor = .8;
                break;

            // Winter
            case 4:
                this.name = 'winter';
                this.color = '0x0000FF';
                this.spinSpeed = 1;
                this.factor = 1;
                break;

            default:
                break;

        }

        localStorage.setItem(this.name, 'played');

        this.soundPath = `./sounds/${ this.name }.mp3`;

        document.getElementById('link').style.color = `#${ this.color.substring(2) }`;

        this.favicon = document.createElement('link');
        this.favicon.id = 'dynamic-favicon';
        this.favicon.rel = 'shortcut icon';
        this.favicon.href = `./images/favicon-${ this.name }.png`;
        document.head.appendChild(this.favicon);

    }

}

export default Season
