// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AptimaNFT is ERC721URIStorage, Ownable, ReentrancyGuard  {
    uint256 public immutable MaxSupply;
    uint16 private immutable MaxEarlyBirdSupply;
    uint256 public immutable MintFee;   // MintFee - ArtCollectionfee goes to the owner of this contract
    uint256 public constant ArtCollectionFee = 0.02 ether;  // goes to the artist


    enum State {
        Init, 
        EarlyBird, 
        Public
    }
    State public mintingState;
    bytes32 private _earlyBirdsMerkleRoot;
    mapping(address => bool) public earlyBirdsMintClaimed;

    struct ArtItem {
        uint itemId;
        uint256 tokenId;
        address payable Artist;
        address payable owner;
        uint256 price;
        bool sold;
    }


}
