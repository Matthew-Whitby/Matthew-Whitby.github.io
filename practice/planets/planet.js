class Planet {
    constructor(radius, distance, orbitspeed, angle) {
        this.radius = radius;
        this.distance = distance;
        this.orbitspeed = orbitspeed;
        this.angle = angle;
        this.planets = [];
    }

    orbit() {
        this.angle += this.orbitspeed;
        for (let i in this.planets) {
            this.planets[i].orbit();
        }
    }

    spawnMoons(total, level) {
        for (let i = 0; i < total; i++) {
            let radius = this.radius/(level*2);
            let distance = random(50, 150);
            let orbitspeed = random(-0.1, 0.1);
            let angle = random(TWO_PI);
            this.planets.push(new Planet(radius, distance/level, orbitspeed, angle));
            if (level < 3) {
                let num = Math.floor(random(0, 4));
                this.planets[i].spawnMoons(num, level+1);
            }
        }
    }

    show() {
        push();
        fill(255, 100);
        rotate(this.angle);
        translate(this.distance, 0);
        ellipse(0, 0, this.radius*2);
        for (let i in this.planets) {
            this.planets[i].show();
        }
        pop();
    }
}
