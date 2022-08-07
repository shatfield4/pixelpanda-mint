// SPDX-License-Identifier: MIT LICENSE
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Randomizer is Ownable {
	address private boracle = 0xF10326C1c6884b094E03d616Cc8c7b920E3F73E0;
	mapping(address => bool) onlyCallableFrom;

	constructor() {
		onlyCallableFrom[msg.sender] = true;
	}

	//random number
	function rng(
		uint256 from,
		uint256 to,
		uint256 salty
	) external view returns (uint256) {
		require(onlyCallableFrom[msg.sender], "not in callable from list");
		uint256 seed = uint256(
			keccak256(
				abi.encodePacked(
					block.timestamp -
						1 +
						block.difficulty +
						((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp + 2)) +
						block.gaslimit +
						((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
						block.number +
						salty +
						boracle.balance
				)
			)
		);

		return (seed % ((to - from) + from));
	}

	function setOracleBalance(address _newOracle) external onlyOwner {
		boracle = _newOracle;
	}

	function setCallableFrom(address _callerAddress, bool allowed) external onlyOwner {
		onlyCallableFrom[_callerAddress] = allowed;
	}
}
