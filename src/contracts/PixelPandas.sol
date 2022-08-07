// SPDX-License-Identifier: MIT LICENSE
pragma solidity 0.8.11;

/*

    ███████████                           █████              ███████████                                    █████  ███                  
    ░░███░░░░░███                         ░░███              ░░███░░░░░███                                  ░░███  ░░░                   
    ░███    ░███  ██████   ████████    ███████   ██████      ░███    ░███  ██████   ████████   ██████    ███████  ████   █████   ██████ 
    ░██████████  ░░░░░███ ░░███░░███  ███░░███  ░░░░░███     ░██████████  ░░░░░███ ░░███░░███ ░░░░░███  ███░░███ ░░███  ███░░   ███░░███
    ░███░░░░░░    ███████  ░███ ░███ ░███ ░███   ███████     ░███░░░░░░    ███████  ░███ ░░░   ███████ ░███ ░███  ░███ ░░█████ ░███████ 
    ░███         ███░░███  ░███ ░███ ░███ ░███  ███░░███     ░███         ███░░███  ░███      ███░░███ ░███ ░███  ░███  ░░░░███░███░░░  
    █████       ░░████████ ████ █████░░████████░░████████    █████       ░░████████ █████    ░░████████░░████████ █████ ██████ ░░██████ 
    ░░░░░         ░░░░░░░░ ░░░░ ░░░░░  ░░░░░░░░  ░░░░░░░░    ░░░░░         ░░░░░░░░ ░░░░░      ░░░░░░░░  ░░░░░░░░ ░░░░░ ░░░░░░   ░░░░░░  
                                                                                                                                     
   

                ██████████████████████████████████████████████████████████████████████
                ██████████████████████████████████████████████████████████████████████
                ██████████████████████████████████████████████████████████████████████
                ██████████████████████████████████████████████████████████████████████
                ██████████████████████████████████████████████████████████████████████
                ██████████████████████████████████████████████████████████████████████
                ███████████████████████████████████▓▓▓▓▓▓█▓▓▒▓▓▓▓▒▓▓▓█████████████████
                ███████████████████████████████▓▓▒▓▒▒▒▒▓▒▒▒▓▓▓▓▓▓▓▓▓▒▒▓███████████████
                ███████████▓▓▓▓▓▓▓▓▒▓▓██▓▓▓▓▒▓▓▒▒▒░░░░▒▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓█████████████
                █████████▓▒▒▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒███▓▓▓▓▓▓▓▒▓████████████
                ████████▒▒▓▓▓▓▓▓▓▓▓▓▓▓█▒░░░░░░░░░░░░░░░░░░░░░▒▓▓▓██▓▓▓▓▓▓▒████████████
                ███████▒▒▓▓▓███████▓▓▓▒░░░░░░░░░░░░░░░░░░░░░▒▒░░░▒▓▓▓▓▓▓▓▒████████████
                ███████▒▓▓▓██████▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▒▒████████████
                ███████▒▓▓▓▓██▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▒▓█████████████
                ███████▒▒▓▓▓▓▓▒░░░░░░░░░░░░░▒▓▓▓▓▓▒▒▓▓▒░░░░░░▓▒▓▓▓▓▒░░▒▒▒█████████████
                ████████▒▒▓▓▓▓░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓░░░░░▓▓▓▓▓▓▓▓▒░░▒▒▒████████████
                █████████▓▒▒▓░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▒▒▓▓▓░░░░░▓▓▓▓▒▒▓▓▓▒░░▓▒████████████
                ██████████▒█░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▒▒▓▓▓░░░░░▓▓▓▓▒▒▓▓▓▒░░▓▒████████████
                █████████▒▒▒░░░░░░░░░░░░▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▒░░░░▒▓▓▒▓▓▓▓▓▓▒░▒▒▒███████████
                █████████▒▓░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░▒▒▓▓▓▓▓▓▒░░▓▒▒██████████
                █████████▒▓░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓░░░░▒▓▓▓▓▓▓░░░░░░░░░░░█▒██████████
                █████████▒▓░░░░░░░░░░░░░░░▒▓▓▓▓▓▓░░░░░░░░▒▓▓▓▓▒░░░░░░░░░░░▒▒▒█████████
                █████████▒▓░░░░░░░░░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▒█████████
                █████████▓░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▒█████████
                ██████████▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒░░▒░░░░░░░░░░▒▒▒█████████
                ███████████▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░▒▒░░░░░░░░░░░█▒██████████
                ██████████▓▒▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒██████████
                █████████▓▒▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░▓███████████
                ████████▓░█▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▓▓▓▓▓▓▒▒██████████
                ███████▓░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒█████████
                ███████░▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒████████
                ██████▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓███████
                █████▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓░███████
                ████▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▒▓▓█████
                ████▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█▓▓▓▓▓▓▓▒▓█████


    ███████████   ███                       ████     ███████████                           █████                  
    ░░███░░░░░███ ░░░                       ░░███    ░░███░░░░░███                         ░░███                   
    ░███    ░███ ████  █████ █████  ██████  ░███     ░███    ░███  ██████   ████████    ███████   ██████    █████ 
    ░██████████ ░░███ ░░███ ░░███  ███░░███ ░███     ░██████████  ░░░░░███ ░░███░░███  ███░░███  ░░░░░███  ███░░  
    ░███░░░░░░   ░███  ░░░█████░  ░███████  ░███     ░███░░░░░░    ███████  ░███ ░███ ░███ ░███   ███████ ░░█████ 
    ░███         ░███   ███░░░███ ░███░░░   ░███     ░███         ███░░███  ░███ ░███ ░███ ░███  ███░░███  ░░░░███
    █████        █████ █████ █████░░██████  █████    █████       ░░████████ ████ █████░░████████░░████████ ██████ 
    ░░░░░        ░░░░░ ░░░░░ ░░░░░  ░░░░░░  ░░░░░    ░░░░░         ░░░░░░░░ ░░░░ ░░░░░  ░░░░░░░░  ░░░░░░░░ ░░░░░░  
                                                                                                                                                                                                                
*/

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IRNG {
	function rng(
		uint256 from,
		uint256 to,
		uint256 r
	) external view returns (uint256);
}

contract PixelPandas is ERC721A, PaymentSplitter, ReentrancyGuard {
    using MerkleProof for bytes32[];
    using Strings for uint256;

    constructor() ERC721A("Pixel Pandas", "PXLP") PaymentSplitter(addressList, splitList) {
        devWallet = msg.sender;
    }
    uint256 constant MAX_SUPPLY = 8888;                    // Track max and current supply for collection
    uint256 constant MAX_MINT_PER_WALLET_WL = 2;           // Panda Paradise holders are allocated 2 free mint per whitelisted wallet
    uint256 constant MAX_MINT_PER_WALLET_PUBLIC = 8;       // Maximum of 8 mints per wallet during public sale
    uint256 constant TEAM_RESERVES = 100;                  // Team mint reserves
    bool private reservesMinted = false;                   // Tracks if team reserves are minted

    string public _contractBaseURI;

    IRNG private random;

    // 2 free guarenteed for panda holders/wls per wallet (not per panda)
    // 8 for public 50/50 chance to pay .01
    // 100 reserved for team
    // 8 preminted for auction


	// Payment splitter
	address[] private addressList = [
		0x478b81132F7A428361DE2325B11d5fFCDb51e9b4, // 1
		0x5889689cEAb19e7eE692edbB6Bc7F607053522aC, // 2
        0x418a3c6DF48EDbEDc7C2B9C59cF7Baea2E57C260  // 3
	];
	uint256[] private splitList = [190, 5, 5];


    // Dev wallet to track onlyDev modifier
    address private devWallet;
    // Track wallets for minted amounts
    mapping (address => uint256) private walletAmountsWL;
    mapping (address => uint256) private walletAmountsPublic;
    // Amount paid if user rolls a paid mint
    uint256 constant MINT_PRICE = 0.01 ether;
    // Tracks if sale is enabled for public and WL mint
    bool public saleEnabled = false;
    bool public wlSaleEnabled = false;
    // Merkle root used for WL
	bytes32 public root = 0x0fdaf93eeaad8bc2b2fc34f7ebf7e4ef5f88586bf878788ea5b620a2ea9c1799;

    event mintedPublic(address indexed user, uint256 indexed amtFree);


    // Only dev modifier
    modifier onlyDev() {
		require(msg.sender == devWallet, "Only dev wallet is allowed to use this function");
		_;
	}

    // Setter functions
    function flipPublicSaleState() external onlyDev {
        saleEnabled = !saleEnabled;
    }

    function flipWLMintState() external onlyDev {
        wlSaleEnabled = !wlSaleEnabled;
    }

    function setMerkleRoot(bytes32 _root) external onlyDev {
		root = _root;
	}

    function setRandom(address _random) external onlyDev {
        random = IRNG(_random);
    }

    function setBaseURI(string memory newBaseURI) external onlyDev {
		_contractBaseURI = newBaseURI;
	}

    // Mint functions
    function rareAuctionMint(uint256 quantity) external onlyDev {
        require(quantity + _totalMinted() <= MAX_SUPPLY, "No more items are left to mint");
        _mint(msg.sender, quantity, '', true);
    }

    function reservesMint() external onlyDev {
        require(reservesMinted == false, "Team reserves have already been minted");
        require(TEAM_RESERVES + _totalMinted() <= MAX_SUPPLY, "No more items are left to mint");
        _mint(msg.sender, TEAM_RESERVES, '', true);
        reservesMinted = true;
    }

    function wlMint(uint256 quantity, bytes32[] calldata proof) external {
        require(wlSaleEnabled, "WL sale has not started");
        require(quantity + _totalMinted() <= MAX_SUPPLY, "No more items are left to mint");
        require(walletAmountsWL[msg.sender] < MAX_MINT_PER_WALLET_WL, "You are not allowed to mint any more Pixel Pandas");
        require(quantity == MAX_MINT_PER_WALLET_WL, "You are only allowed to mint 2 Pixel Panda per whitelisted wallet");
        require(isTokenValid(msg.sender, quantity, proof), "WL proof invalid");
        walletAmountsWL[msg.sender] += quantity;
        _mint(msg.sender, quantity, '', true);
    }

    function publicMint(uint256 quantity) external payable nonReentrant {
        require(quantity > 0, "You must mint at least 1 Pixel Panda");
        require(saleEnabled, "Sale has not started");
        require(quantity + _totalMinted() <= MAX_SUPPLY, "No more items are left to mint");
        require(walletAmountsPublic[msg.sender] + quantity <= MAX_MINT_PER_WALLET_PUBLIC, "You are not allowed to mint more than 8 Pixel Pandas per wallet");
        require(msg.value == quantity * MINT_PRICE, "Incorrect amount of ether sent");
        walletAmountsPublic[msg.sender] += quantity;
        _mint(msg.sender, quantity, '', true);

        uint256 returnAmt = (random.rng(1000, 2**69 - 28, block.timestamp) % ((((quantity * 6 * 2) / 2) / 3) / 2));
        payable(msg.sender).transfer(returnAmt * MINT_PRICE); // Returns funds for amount of Pixel Pandas that were free

        emit mintedPublic(msg.sender, returnAmt);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
		require(_exists(_tokenId), "ERC721AMetadata: URI query for nonexistent token");
		return string(abi.encodePacked(_contractBaseURI, _tokenId.toString()));
	}

    function _startTokenId() internal view override virtual returns (uint256) {
        return 1;
    }
    
    // Merkle tree WL
    function isTokenValid(
		address _to,
		uint256 _quantity,
		bytes32[] memory _proof
	) public view returns (bool) {
		// Construct Merkle tree leaf from the inputs supplied
		bytes32 leaf = keccak256(abi.encodePacked(_to, _quantity));
		// Verify the proof supplied, and return the verification result
		return _proof.verify(root, leaf);
	}

}
