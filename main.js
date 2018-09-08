const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(timestamp,data){
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesis()];
    }

    createGenesis(){
        return new Block("09/08/2018","GenesisBlock");
    }

    latestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValidity(){
        for(let i=0; i < this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }
            if(prevBlock.hash !== currBlock.previousHash){
                return false;
            }
        }
        return true;
    }
}


let jsChain = new BlockChain();
jsChain.addBlock(new Block("09/08/2018",{amount :  100}));
jsChain.addBlock(new Block("09/08/2018",{amount :  200}));

console.log(JSON.stringify(jsChain,null,4));
console.log("Validity " + jsChain.checkValidity());
