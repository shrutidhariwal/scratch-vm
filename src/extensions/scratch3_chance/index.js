const randomInt = require('random-int');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const random = require('math-random');

const Cast = require('../../util/cast');

class ChanceExtension {
    constructor () {
      
      this.dice2Value = 1;
      this.dice1Value = 1;
      this.dice1Distribution = '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666';
      this.dice2Distribution = '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666';

    }

    newMethod() {
        return this;
    }

    /**
     * @return {object} This object's metadata.
     */
    getInfo () {
        return {

            id: 'chance', // Machine readable id of this extension.

            name: 'Chance',

            blocks: [
                {
                    opcode: 'dice1',
                    blockType: BlockType.REPORTER,
                    text: 'Dice 1'
                },
                {
                    opcode: 'dice2',
                    blockType: BlockType.REPORTER,
                    text: 'Dice 2'
                },
                {
                    opcode: 'rollDice',
                    blockType: BlockType.COMMAND,
                    text: 'Roll [DICE]',
                    arguments: {
                        DICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'dice1',
                            menu: 'diceMenu'
                        }

                    }
                },
                {
                    opcode: 'setDistribution',
                    blockType: BlockType.COMMAND,
                    text: 'Set Distribution [DICE] [DISTRIBUTION]',
                    arguments: {
                        DICE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'dice1',
                            menu: 'diceMenu'
                        },
                        DISTRIBUTION: {
                            type: ArgumentType.SLIDER,
                            defaultValue: '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666'
                        }
                    }

                },
                { // Block for a dice that has adjustable distribution and no stored value. It is a reporter and not a variable.
                    opcode: 'makeADice',

                    blockType: BlockType.REPORTER,

                    text: 'Dice with properties [DISTRIBUTION]',

                    arguments: {
                        DISTRIBUTION: {
                            type: ArgumentType.SLIDER,
                            defaultValue: '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666'
                        }
                    }

                    
                },

                { // E-block that probabilistically splits into one of two branches.
                    opcode: 'probFork',

                    blockType: BlockType.CONDITIONAL,

                    branchCount: 2,

                    text: [
                        'happens [NUM] out of [DEN] times',
                        'happens all remaining times'
                    ],

                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1

                        },

                        DEN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                        
                    }
                },

                // Dice with uniform distribution that also has no stored value.

                {
                    opcode: 'dice',

                    blockType: BlockType.REPORTER,

                    text: 'dice that has [NUM] sides',

                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 6
                        }
                    }


                }
            ],

            menus: {
                // Menu that contains all of the dice.
                diceMenu: [
                    {
                        value: 'dice1',
                        text: 'Dice 1'
                    },
                    {
                        value: 'dice2',
                        text: 'Dice 2'
                    }

                ]
                
            }


        };
    }

    probFork (args, util) {
        
        const probability = Cast.toNumber(args.NUM) / Cast.toNumber(args.DEN);
        if (random() < probability) {
            util.startBranch(1, false);
        } else {
            util.startBranch(2, false);
        }
    }

    dice (args) {
        const numSides = Cast.toNumber(args.NUM);
        return randomInt(1, numSides);
    }


    makeADice (args) {
        const sliders = args.DISTRIBUTION.split(',');
        
        // Convert all the slider array elements from strings into floats.
        for (let i = 0; i < sliders.length; i++) sliders[i] = +sliders[i];
        
        const sliderSums = [sliders[0]];
        for (let i = 1; i < sliders.length; i++) {
            sliderSums.push(sliderSums[sliderSums.length - 1] + sliders[i]);
        }
        const randomNumber = random() * 100.0;
        for (let i = 0; i < sliders.length; i++) {
            if (randomNumber <= sliderSums[i]) {
                return i + 1;
            }
        }
    }
    
    // First dice with stored value.
    dice1 () {
        return this.dice1Value;
    }
    // Second dice with stored value≥
    dice2 () {
        return this.dice2Value;
    }


    rollDice (args) {

        const dice = args.DICE;
        
        let distribution;
        if (dice === 'dice1') {
            distribution = this.dice1Distribution;
        } else {
            distribution = this.dice2Distribution;
        }
        
        const sliders = distribution.split(',');
        
        // Convert all the slider array elements from strings into floats.
        for (let i = 0; i < sliders.length; i++) sliders[i] = +sliders[i];
        let newValue;
        const sliderSums = [sliders[0]];
        for (let i = 1; i < sliders.length; i++) {
            sliderSums.push(sliderSums[sliderSums.length - 1] + sliders[i]);
        }
        const randomNumber = random() * 100.0;
        for (let i = 0; i < sliders.length; i++) {
            if (randomNumber <= sliderSums[i]) {
                newValue = i + 1;
                break;
            }
        }
        if (dice === 'dice1') {
            
            this.dice1Value = newValue;
        } else {
            this.dice2Value = newValue;
        }

     
    }

    setDistribution (args) {
        const dice = args.DICE;
        const distribution = args.DISTRIBUTION;
        if (dice === 'dice1') {
            this.dice1Distribution = distribution;
        } else {
            this.dice2Distribution = distribution;
        }
    }

}
module.exports = ChanceExtension;
