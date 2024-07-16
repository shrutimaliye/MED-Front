pragma solidity ^0.8.0;

contract MedicineSupplyChain {
    address public owner;
    mapping (bytes32 => bool) public batchIds;
    
    struct Batch {
        address manufacturer;
        uint256 quantity;
        //uint256 manufacturingDate;
        //uint256 expiryDate;
    }
    
    mapping (bytes32 => Batch) public batches;
    
    event NewBatchAdded(bytes32 batchId, address manufacturer, uint256 quantity);//, uint256 manufacturingDate, uint256 expiryDate);
    
    constructor() {
        owner = msg.sender;
      
    }/*[
  '0x6162636400000000000000000000000000000000000000000000000000000000',
  '0x7465737400000000000000000000000000000000000000000000000000000000',
  '0x626c756500000000000000000000000000000000000000000000000000000000',
  '0x3031303230333034000000000000000000000000000000000000000000000000',
  '0x05416460deb76d57af601be17e777b93592d8d4d4a4096c57876a91c84f4a712',
  '0xa59b89aee4f944a04d8fc075967d616b937dd4a7000000000000000000000000',
  '0x1234567890123456789012345678901234567890123456789012345678901234'
]*/
    
    function addBatch(bytes32 _batchId, uint256 _quantity) public {
        require(msg.sender == owner, "Only owner can add a new batch.");
        require(!batchIds[_batchId], "Batch ID already exists.");
        
        Batch memory newBatch = Batch({
            manufacturer: msg.sender,
            quantity: _quantity
            
        });
        
        batches[_batchId] = newBatch;
        batchIds[_batchId] = true;
        
        emit NewBatchAdded(_batchId, msg.sender, _quantity);
    }
    
    function getBatchDetails(bytes32 _batchId) public view returns (address, uint256) {
        require(batchIds[_batchId], "Batch ID does not exist.");
        
        Batch memory batch = batches[_batchId];
        
        return (batch.manufacturer, batch.quantity);
    }
    
    function verifyBatch(bytes32 _batchId, address _manufacturer) public view returns (bool) {
        require(batchIds[_batchId], "Batch ID does not exist.");
        
        Batch memory batch = batches[_batchId];
        
        return (batch.manufacturer == _manufacturer);//compare batch ids
    }
    
}
 
