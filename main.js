class Block {

    constructor(prevHash, txs, nonce) {
        this.prevHash = prevHash;
        this.txs = txs;
        this.nonce = nonce;
        this.time = Date.now();
    }

   getHash(){
        return  CryptoJS.SHA256(this.prevHash +  this.getMerkleHash() +  this.nonce + this.time + '').toString();
              // return les infos du block actuel(getMerkleHash), le hash du block précendent(prevHash), la proof-of-work(nonce), et la date de création(time)
    }
    getMerkleHash() {
        return this.txs.toString(); // appel le tableau transactions du block actuel, les fou en string  
    }
}


class Blockchain {

    constructor(genesisBlock){ // création du block initiale
        this.blocks = new Array(); // initiation du tableau contenant les blocks
        this.blocks[genesisBlock.getHash()] = genesisBlock;
    }

    mineBlock(){
        // preuve de travail
        let nonce = Math.floor(Math.random() * 1000) + 1; 
        let block = new Block(this.getLastBlock().getHash(), ['Echange1', 'Echange2'], nonce); // construction d'un block
        this.blocks[block.getHash()] = block;
    }

    getLastBlock() {
        
        let key = Object.keys(this.blocks)[Object.keys(this.blocks).length - 1];
        return this.blocks[key];
    }
}

let genesisBlock = new Block(null, ['genesise', 'block'], 1);
let blockchain = new Blockchain(genesisBlock);


// console.log(blockchain.getLastBlock(), blockchain.getLastBlock().getHash()); 

console.log(blockchain.getLastBlock().getHash());

blockchain.mineBlock();
console.log(blockchain.getLastBlock(), blockchain.getLastBlock().getHash());


