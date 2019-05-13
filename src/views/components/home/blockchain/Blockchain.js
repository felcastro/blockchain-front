import Block from './Block';

class Blockchain{
    constructor(difficulty){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock(){
        return new Block(0, new Date(0), {}, "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    mineBlock(data){
        let block = new Block(this.chain.length, new Date(), data, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

export default Blockchain;