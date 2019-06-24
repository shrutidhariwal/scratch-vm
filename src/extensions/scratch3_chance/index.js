const randomInt = require('random-int');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const random = require('math-random');

const Cast = require('../../util/cast');

class ChanceExtension {
    /**
     * @return {object} This object's metadata.
     */
    getInfo () {
        return {

            id: 'chance', // Machine readable id of this extension.

            name: 'Chance',

            blocks: [
                {
                    opcode: 'diceMaker',
                    blockType: BlockType.BUTTON,
                    text: 'Make a Dice',
                    func: 'MAKE_A_DICE'

                },
                {   // Block for a dice that has adjustable distribution.
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

                {
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
            ]
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
        
        let sliderSums = [sliders[0]];
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
}
module.exports = ChanceExtension;
