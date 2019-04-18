<template>
    <div class="main" v-hotkey="keymap">
        <div class="frame" :class="{blur: vars.collided || vars.paused}">
            <div class="board">
                <h4>score {{ score }}</h4>
                <p class="fud">Time: {{ vars.timeout }} show: {{ vars.show_slowmo_tip_timeout }} FUD: {{ currentFUD }}</p>
                <div class="notify" :class="{show: vars.show_slowmo_tip || vars.slowmo}">
                    <p v-if="vars.show_slowmo_tip">Press '{{ vars.power_key }}' to slowmo for '{{ vars.timeout }}' secs</p>
                    <p v-if="vars.slowmo">Slowmo expires in {{ vars.timeout }}</p>
                </div>
            </div>

            <div class="bars-holder" id="bars-holder">
                <div class="bar" id="first-bar"></div>
                <div class="bar" id="last-bar"></div>
            </div>

            <div class="bars-holder" id="bars-holder-alt">
                <div class="bar" id="first-bar-alt">
                </div>
                <div class="bar" id="last-bar-alt"></div>
            </div>

            <div class="player" id="player">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="328 106.994 90 90.012" width="90" height="90.012">
                    <path d=" M 416.654 162.886 C 410.643 187.001 386.224 201.67 362.109 195.659 C 338.007 189.648 323.334 165.227 329.348 141.118 C 335.356 117.003 359.775 102.33 383.881 108.341 C 407.992 114.352 422.664 138.776 416.653 162.886 L 416.654 162.886 Z " fill="rgb(255,153,0)"/>
                    <path d=" M 410.106 161.253 C 404.997 181.751 384.24 194.219 363.743 189.11 C 343.256 184.001 330.784 163.243 335.896 142.75 C 341.003 122.253 361.758 109.78 382.249 114.89 C 402.743 119.999 415.214 140.76 410.105 161.253 L 410.106 161.253 Z " fill="rgb(255,244,84)"/>
                    <path d=" M 389.632 141.699 C 388.479 136.817 385 134.632 378.282 134.153 L 378.282 126.671 L 373.401 126.671 L 373.401 134.153 L 369.753 134.153 L 369.753 126.671 L 364.874 126.671 L 364.874 134.153 L 355.5 134.153 L 355.5 139.415 Q 355.5 139.415 361.754 139.415 L 361.754 164.003 Q 356.891 163.995 356.891 163.995 L 355.5 169.73 L 364.874 169.73 L 364.874 177.329 L 369.783 177.313 L 369.753 169.73 L 373.374 169.73 L 373.401 177.329 L 378.282 177.313 L 378.319 169.73 C 385.531 169.576 391.759 167.068 392.424 159.699 C 392.962 155.629 390.63 151.127 386.114 150.072 C 386.48 149.922 390.786 146.582 389.632 141.699 Z  M 383.077 158.809 C 383.1 164.604 373.046 163.982 369.842 163.995 L 369.806 153.721 C 373.011 153.711 383.055 152.766 383.077 158.809 Z  M 380.826 144.324 C 380.843 149.595 372.422 148.85 369.753 148.859 L 369.783 139.415 C 372.451 139.405 380.805 138.824 380.826 144.323 L 380.826 144.324 Z " fill="rgb(255,153,0)"/>
                </svg>
            </div>
        </div>

        <div class="message" :class="{rise: vars.collided, show: vars.collided}">
            <h1>High Score</h1>
            <h1>{{ score }}</h1>
        </div>

        <div class="message info" :class="{show: vars.frozen, blur: vars.paused}">
            <p>Use the Left

            <!-- SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="388 612 50 25.397" width="50" height="25.397">
                <path d="M 393.46 612 L 432.54 612 C 435.553 612 438 614.447 438 617.46 L 438 631.937 C 438 634.95 435.553 637.397 432.54 637.397 L 393.46 637.397 C 390.447 637.397 388 634.95 388 631.937 L 388 617.46 C 388 614.447 390.447 612 393.46 612 Z" style="stroke:none;fill:#6F6F6F;stroke-miterlimit:10;"/>
                <polygon points="417.365,617.825,417.365,631.572,405.46,624.698" fill="rgb(255,255,255)"/>
            </svg>

            arrow Right

            <!-- SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="597 612 50 25.397" width="50" height="25.397">
                <path d="M 641.54 612 L 602.46 612 C 599.447 612 597 614.447 597 617.46 L 597 631.937 C 597 634.95 599.447 637.397 602.46 637.397 L 641.54 637.397 C 644.553 637.397 647 634.95 647 631.937 L 647 617.46 C 647 614.447 644.553 612 641.54 612 Z" style="stroke:none;fill:#6F6F6F;stroke-miterlimit:10;"/>
                <polygon points="617.635,617.825,617.635,631.572,629.54,624.698" fill="rgb(255,255,255)"/>
            </svg>

            arrow keys </p>

            <p>to control the bitcoin</p>
        </div>

        <div class="message" :class="{rise: vars.paused, show: vars.paused}">
            <h1>Paused</h1>
        </div>
    </div>
</template>

<script>
const { Id }       = require('./../utils/htmlQuery')
const { buildMap } = require('./../utils/object')

export default {
    name: 'Game',
    data () {
        return {
            score: 0,
            fud: [
                'No clear utility',
                'A means for criminals',
                'Has no (instrinsic) value',
                'Its a bubble',
                'Too Volatile',
                'Not a Currency',
                'Not a store of value',
                'Easily Hacked',
                '51% attack',
                'Too complex to be adopted',
                '21m supply cap',
                'Anonymous transactions',
                'No Dev Incentives',
                'Lighting is an altcoin',
                'Lightning is not scalable',
                'Energy Wasting',
                'Small blocks',
                'No Turing',
                'High Fees',
                'No KYC/AML',
                'Toxic Fans'
            ],
            currentFUD: null,
            colors: {
                'purple': '#bf7dfe',
                'pink': '#f07aee',
                'blue': '#55ccfd',
                'red': '#f95253',
                'orange': '#fe9d53',
                'yellow': '#fdeb54',
                'green': '#66e654',
            },
            vars: {
                bars_ypos: 0,
                bars_ypos_alt: 150,
                speed: 0.7000,
                speed_alt: 0.6900,
                timeout: 10, // For slow downs
                show_slowmo_tip_timeout: 5,
                cached_factor: null, // for caching previous speed 'speed'
                frozen: true,
                paused: false,
                factor: 0.7500, // increases by 0.5 every 10 points
                ticker_fn: null, // store interval function
                game_fn: null,
                score_fn: null,
                power_key: null,
                power_keys: ['k','a','w','d','f','x','g','t','p','j'],
                locked_power_key: false,
                show_slowmo_tip: false,
                slowmo: false,
                locked: false,
                collided: false, // GAME OVER trigger
                player_dist: 15, // player movement dist
                player_offset: 0, // increases every 10 points to keep up with the dropping bars
                player_pos: window.innerWidth / 2 - 30, // Player current pos
            }
        }
    },
    mounted() {
        this.currentFUD = this.getRandomFUD()

        this.colorBars()

        Id('player').style.left = String(this.vars.player_pos) + 'px'
        Id('bars-holder').style.top = String(this.vars.bars_ypos) + 'px'
        Id('bars-holder-alt').style.top = String(this.vars.bars_ypos_alt) + 'px'

        // To set x pos of gap
        this.setRandomFirstBarsXPos()
        this.setRandomLastBarsXPos()
    },
    watch: {
        collided() {
            // We don't want hidden overcounting
            clearInterval(this.vars.ticker_fn)
            clearInterval(this.vars.game_fn)
        },
        gameFreeze() {
            this.vars.ticker_fn = !this.vars.frozen ? setInterval(() => {
                // Drop divs
                if (!(this.vars.collided || this.vars.paused || this.vars.frozen)) {
                    this.vars.bars_ypos += this.vars.speed + (this.vars.speed * this.vars.factor)

                    this.vars.bars_ypos_alt += this.vars.speed_alt + (this.vars.speed_alt * this.vars.factor)

                    Id('bars-holder').style.top = String(this.vars.bars_ypos) + 'px'

                    Id('bars-holder-alt').style.top = String(this.vars.bars_ypos_alt) + 'px'
                }
            }, 10) : null



            this.vars.game_fn = !this.vars.frozen ? setInterval(() => {
                this.updateGame()
            }, 500) : null

        },
        barsYpos() {
            if (this.isBelowPlayer(Id('bars-holder'))) {
                this.score += 1
            }

            if (this.isInvisible(Id('bars-holder'))) {
                this.currentFUD = this.getRandomFUD()

                // We don't want our bars climbing each other
                if (this.vars.bars_ypos_alt > (window.innerHeight / 2)-120) {
                    this.vars.bars_ypos = 0
                }

                if (this.vars.bars_ypos_alt < (window.innerHeight/2)-120) {
                    this.vars.bars_ypos = -75
                }

                this.colorBars()

                Id('bars-holder').style.top = String(this.vars.bars_ypos) + 'px'
                this.setRandomFirstBarsXPos()
            }
        },
        barsAltYpos() {
            if (this.isBelowPlayer(Id('bars-holder-alt'))) {
                this.score += 1
            }

            if (this.isInvisible(Id('bars-holder-alt'))) {
                this.currentFUD = this.getRandomFUD()

                // We don't want our bars climbing each other
                if (this.vars.bars_ypos > (window.innerHeight / 2)-120) {
                    this.vars.bars_ypos_alt = 0
                }

                if (this.vars.bars_ypos < (window.innerHeight/2)-120) {
                    this.vars.bars_ypos_alt = -75
                }

                this.colorBars()

                Id('bars-holder-alt').style.top = String(this.vars.bars_ypos_alt) + 'px'
                this.setRandomLastBarsXPos()
            }
        }
    },
    methods: {
        handle_power_key() {
            if (this.vars.show_slowmo_tip && event.key == this.vars.power_key) {
                this.vars.show_slowmo_tip = false
                this.vars.slowmo = true

                console.log('> ', this.vars.factor, this.vars.cached_factor)
                // Cache speed here
                this.vars.cached_factor = this.vars.factor

                // Set slower speed
                this.vars.factor = 0.7500
                console.log('>> ', this.vars.factor, this.vars.cached_factor)
            }
        },
        getRandomFUD() {
            return this.fud[Math.trunc(Math.random() * this.fud.length)]
        },
        setRandomFirstBarsXPos() {
            // Twice the randomness? I doubt
            let random_gap = Math.random()*(window.innerWidth-170)+170
            random_gap = Math.random()*(window.innerWidth-170)+170

            random_gap > ((window.innerWidth-170) / 2) ? Id('last-bar').style.paddingLeft = String((window.innerWidth-170) - random_gap) + 'px' : Id('first-bar').style.paddingRight = String((window.innerWidth-170) - random_gap) + 'px'
        },
        setRandomLastBarsXPos() {
            // Whats the worst that could happen?
            let random_gap = Math.random()*(window.innerWidth-170)+170
            random_gap = Math.random()*(window.innerWidth-170)+170

            random_gap > ((window.innerWidth-170) / 2) ? Id('last-bar-alt').style.paddingLeft = String((window.innerWidth-170) - random_gap) + 'px' : Id('first-bar-alt').style.paddingRight = String((window.innerWidth-170) - random_gap) + 'px'
        },
        isInvisible(el) {
            let box = el.getBoundingClientRect()

            return box.y > (window.innerHeight+75)
        },
        isBelowPlayer(el) {
            let box = Id('player').getBoundingClientRect()
            let box_two = el.getBoundingClientRect()

            return Math.trunc(box_two.y - box.y) == 100 || Math.trunc(box_two.y - box.y) == 0
        },
        checkCollision(div_a, div_b) {
            return !(
                ((div_a.y + div_a.height) < (div_b.y)) ||
                (div_a.y > (div_b.y + div_b.height)) ||
                ((div_a.x + div_a.width) < div_b.x) ||
                (div_a.x > (div_b.x + div_b.width))
            )
        },
        hasCollided() {
            let first_bar = Id('first-bar').getBoundingClientRect()
            let last_bar = Id('last-bar').getBoundingClientRect()

            let first_bar_alt = Id('first-bar-alt').getBoundingClientRect()
            let last_bar_alt = Id('last-bar-alt').getBoundingClientRect()

            let player = Id('player').getBoundingClientRect()

            return this.checkCollision(first_bar, player) || this.checkCollision(last_bar, player) || this.checkCollision(first_bar_alt, player) || this.checkCollision(last_bar_alt, player)
        },
        getRandomColor() {
            return this.colors[Object.keys(this.colors)[Math.floor(Math.random() * Object.keys(this.colors).length)]]
        },
        colorBars() {
            Id('first-bar').style.background = this.getRandomColor()
            Id('last-bar').style.background = this.getRandomColor()

            Id('first-bar-alt').style.background = this.getRandomColor()
            Id('last-bar-alt').style.background = this.getRandomColor()
        },
        updateGame() {
            // Check for body collision; GAME OVER
            if (this.hasCollided() && !this.paused) {
                // Game over
                this.vars.collided = true
            }

            // Speed game up after every +10 points
            if (this.score > 0 && this.score % 2 == 0 && !this.vars.collided) {
                this.vars.factor += 0.05
                this.vars.player_offset += 0.2
            }

            // Slow game down
            // Trigger 'power_key' press option
            if (this.score > 0 && this.score % 5 == 0 && !this.vars.collided && !this.vars.locked_power_key && !this.vars.slowmo && !this.vars.paused && !this.vars.collided) {
                this.vars.show_slowmo_tip = true
                this.vars.power_key = this.vars.power_keys[Math.floor(Math.random() * this.vars.power_keys.length)]
                this.vars.locked_power_key = true
            }

            // Start countdown for 'show_slowmo_tip'
            if (this.vars.show_slowmo_tip && this.vars.show_slowmo_tip_timeout > 0) {
                this.vars.show_slowmo_tip_timeout -= 1
            }

            // If 'show_slowmo_tip' is over, reset timeout and show var
            if (this.vars.show_slowmo_tip && this.vars.show_slowmo_tip_timeout == 0) {
                this.vars.show_slowmo_tip_timeout = 5
                this.vars.show_slowmo_tip = false
                this.vars.locked_power_key = false
            }

            // countdown code for slowmo
            if (this.vars.slowmo && this.vars.timeout > 0) {
                this.vars.show_slowmo_tip_timeout = 5
                this.vars.locked_power_key = false

                this.vars.timeout -= 1
            }

            // If 'timeout' slowmo is done
            if (this.vars.slowmo && this.vars.timeout == 0) {
                this.vars.slowmo = false
                this.vars.timeout = 10

                // restore speed factor
                this.vars.factor = this.vars.cached_factor

                // clear speed factor cache
                this.vars.cached_factor = null
            }
        },
        move(pos) {
            if (!(this.vars.collided || this.vars.paused)) {
                if (this.vars.frozen) {
                    this.vars.frozen = false
                }

                if (pos == 'left') {
                    this.vars.player_pos -= this.vars.player_pos >= 75 ? (this.vars.player_dist + this.vars.player_offset) : 0
                } else {
                    this.vars.player_pos += window.innerWidth - 165 > this.vars.player_pos ? (this.vars.player_dist  + this.vars.player_offset) : 0
                }

                Id('player').style.left = String(this.vars.player_pos) + 'px'
            }

        },
        moveLeft() {
            this.move('left')
        },
        moveRight() {
            this.move('right')
        },
        pause() {
            if (this.vars.collided) {
                this.reset()
            } else {
                if (this.vars.paused) {
                    this.vars.paused = false
                } else {
                    this.vars.paused = true
                }
            }
        },
        reset() {
            if (this.vars.collided) {
                this.score = 0
                this.vars = {
                    bars_ypos: 0,
                    bars_ypos_alt: 150,
                    speed: 0.7000,
                    speed_alt: 0.6900,
                    timeout: 10, // For slow downs
                    show_slowmo_tip_timeout: 5,
                    cached_speed: null, // for caching previous speed
                    frozen: true,
                    paused: false,
                    factor: 0.7500, // increases by 0.5 every 10 points
                    ticker_fn: null, // store interval function
                    game_fn: null,
                    power_key: null,
                    power_keys: ['k','a','w','d','f','x','g','t','p','j'],
                    locked_power_key: false,
                    show_slowmo_tip: false,
                    slowmo: false,
                    locked: false,
                    collided: false, // GAME OVER trigger
                    player_dist: 15, // player movement dist
                    player_offset: 0, // increases every 10 points to keep up with the dropping bars
                    player_pos: window.innerWidth / 2 - 30, // Player current pos
                }

                Id('player').style.left = String(this.vars.player_pos) + 'px'
                Id('bars-holder').style.top = String(this.vars.bars_ypos) + 'px'
                Id('bars-holder-alt').style.top = String(this.vars.bars_ypos_alt) + 'px'

                // To set x pos of gap
                this.setRandomFirstBarsXPos()
                this.setRandomLastBarsXPos()
            }

            this.colorBars()
        }
    },
    computed: {
        keymap() {
            return buildMap([
                'left',
                'right',
                'space',
                'enter',
                'k',
                'a',
                'w',
                'd',
                'f',
                'x',
                'g',
                't',
                'p',
                'j'
            ], [
                this.moveLeft,
                this.moveRight,
                this.pause,
                this.reset,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key,
                this.handle_power_key
            ])
        },
        collided() {
            return this.vars.collided
        },
        gameFreeze() {
            return this.vars.frozen
        },
        barsYpos() {
            return this.vars.bars_ypos
        },
        barsAltYpos() {
            return this.vars.bars_ypos_alt
        }
    }
}
</script>

<style scoped>
.main {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none
}

.main * {
    user-select: none
}

.message {
    height: 100%;
    width: 100%;
    margin: 0;
    position: absolute;
    display: flex;
    flex-flow: column;
    visibility: hidden;
    align-items: center;
    justify-content: center;
}

.info {
    bottom: -140px;
}

.info p {
    display: flex;
    align-items: center;
    user-select: none;
    margin: 8px;
}

.info svg {
    margin-left: 12px;
    margin-right: 12px;
}

h1:first-child {
    margin-top: 0;
    margin-bottom: 0;
}

h1:last-child {
    margin-top: 8px;
}

h1 {
    font-size: 42px;
}

.frame {
    position: absolute;
    height: 100%;
    width: 100%;
}

.bars-holder, .bars-holder-alt {
    position: relative;
    display: flex;
}

.bars-holder p, .bars-holder-alt p {
    margin-top: 40px;
}

.bar:first-child {
    margin-right: 200px;
}

.bar {
    height: 90px;
    width: 50%;
    transition: background 0.3s ease-in;
}

.board {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

.fud  {
    margin-right: 30px;
    margin-top: 40px;
}

h4 {
    font-size: 26px;
}

.board h4:first-child {
    margin-left: 50px;
}

.board h4:last-child {
    margin-right: 50px;
}

.notify {
    border: 5px solid #65e762;
    background: #9ef95291;
    border-radius: 5px;
    color: #607D8B;
    width: 400px;
    justify-content: center;
    display: flex;
    top: 20px;
    left: 20vw;
    position: absolute;
    height: 50px;
    visibility: hidden;
}

.player {
    position: absolute;
    bottom: 80px;
}

.show {
    visibility: visible;
}

.blur {
    opacity: 0.4;
}

.rise {
    animation: linear 0.3s rise;
}

@keyframes rise {
    0% {
        bottom: -90px;
        opacity: 0.3;
    }
    100% {
        bottom: 0px;
        opacity: 1;
    }
}
</style>
