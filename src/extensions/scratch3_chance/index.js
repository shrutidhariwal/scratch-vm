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
        console.log(util);
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
}
module.exports = ChanceExtension;
