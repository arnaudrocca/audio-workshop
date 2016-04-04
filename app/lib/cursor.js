import { Graphics } from 'pixi.js';

class Cursor extends Graphics {

    constructor(app) {

		super();

        this.app = app;
        this.season = this.app.season;
		this.music = this.app.music;

        this.radius = 15;

    }

    update(dt) {

        this.clear();

        if (this.app.start) {

            if (this.app.timerMouse > 0 && this.app.timerMouse < 1) {
                document.body.style.cursor = 'none';
                this.beginFill(this.season.color, .5);
                this.moveTo(this.app.mouseX, this.app.mouseY);
                this.arc(this.app.mouseX, this.app.mouseY, this.radius, -Math.PI / 2, this.app.timerMouse * 2 * Math.PI  -Math.PI / 2, false);
                this.beginFill(this.season.color, 1);
                this.drawCircle(this.app.mouseX, this.app.mouseY, 5);
            } else {
                document.body.style.cursor = 'pointer';
            }

        }

    }

}

export default Cursor;
