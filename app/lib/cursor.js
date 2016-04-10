import { Graphics } from 'pixi.js'

class Cursor extends Graphics {

    /**
     * constructor
     *
     * @param {obj} app - The app
     */
    constructor(app) {

		super();

        this.app = app;
        this.season = this.app.season;
		this.music = this.app.music;

        this.radius = 15;

    }

    /**
     * update
     * - Triggered on every TweenMax tick
     *
     * @param {number} dt
     */
    update(dt) {

        this.clear();

        if (this.app.start) {
            if (this.app.mouseDown && this.app.timerMouse < 1) {
                document.body.style.cursor = 'none';
                this.beginFill(this.season.color, .5);
                this.moveTo(this.app.mouseX, this.app.mouseY);
                this.arc(this.app.mouseX, this.app.mouseY, this.radius, -(Math.PI / 2), (this.app.timerMouse * 2 * Math.PI) - (Math.PI / 2), false);
                this.beginFill(this.season.color, 1);
                this.drawCircle(this.app.mouseX, this.app.mouseY, this.radius / 3);
            } else {
                document.body.style.cursor = 'pointer';
            }
        } else {
            document.body.style.cursor = 'wait';
        }

    }

}

export default Cursor
