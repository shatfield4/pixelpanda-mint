import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from "@walletconnect/web3-provider";
import truncateEthAddress from 'truncate-eth-address';
import abi from '../../contracts/TMC.json'

import ProgressBar from "@ramonak/react-progress-bar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import classes from "./mint.css";

import twitterLogo from './images/5296514_bird_tweet_twitter_twitter-logo_icon.svg';
import openseaLogo from './images/logo-01.svg';
import raritySniperLogo from './images/rarity-sniper.png';
import pxPanLogo from './images/pxpanlogo.png';
import pp500 from './images/pxpanlogo-p-500.png';
import pp800 from './images/pxpanlogo-p-800.png';
import pp1080 from './images/pxpanlogo-p-1080.png';
import pp1600 from './images/pxpanlogo-p-1600.png';
import pp2000 from './images/pxpanlogo.png';


import { Grid, Oval, MutatingDots } from  'react-loader-spinner'
import Confetti from "react-confetti";

const Mint = () => {
  const [count, setCount] = useState(1);
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState();
  const [tmcContract, setTmcContract] = useState();
  const [truncAccount, setTruncAccount] = useState();
  const [totalMinted, setTotalMinted] = useState('-');
  const [chainId, setChainId] = useState(0x1);
  const [publicPrice, setPublicPrice] = useState(2.0);
  const [totalSupply, setTotalSupply] = useState(410);
  const [maxMint, setMaxMint] = useState(8);

  const mintingEnabled = true;

  // Handles modals
  // Processing modal
  const [isMinting, setIsMinting] = useState(false);
  const handleOpenMinting = () => setIsMinting(true);
  const handleCloseMinting = () => setIsMinting(false);

  // Free mint success modal
  const [showFreeMint, setShowFreeMint] = useState(false);
  const handleOpenFreeMint = () => setShowFreeMint(true);
  const handleCloseFreeMint = () => setShowFreeMint(false);

  // Paid mint success modal
  const [showPaidMint, setShowPaidMint] = useState(false);
  const handleOpenPaidMint = () => setShowPaidMint(true);
  const handleClosePaidMint = () => setShowPaidMint(false);

  // Keeps track of values for modal
  const [amtFree, setAmtFree] = useState(2);
  const [amtPaid, setAmtPaid] = useState(5);

  // Modal styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
    
  };

  // Converts number to hex string
  const toHex = (num) => {
      const val = Number(num);
      return "0x" + val.toString(16);
    };

  const onPlusClicked = () => {
    if(count < maxMint)
    {
      setCount(count + 1);
    }
  };

  const onMinusClicked = () => {
    if (count > 1)
    {
      setCount(count - 1);
    }
  };


  const tmcContractAddress = "0xb43582E268bb751860606E118905987b97011022";
  const deployedChainId = 1; // 0x1 ETH Mainnet, 0x4 Rinkeby testnet


  useEffect(() => {
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require('ix2').init();
      document.dispatchEvent(new Event('readystatechange'))
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setAccount(accounts[0]);
        disconnect();
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
        disconnect();
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  // Provider options for Web3Modal
  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Pixel Pandas Mint",
        infuraId: "b3476aa6328d4b468b6256e95a7b3b33", // https://mainnet.infura.io/v3/b3476aa6328d4b468b6256e95a7b3b33
        chainId: 1,
        darkMode: true
      }
    },
    walletconnect: {
      package: WalletConnect, 
      options: {
          infuraId: "b3476aa6328d4b468b6256e95a7b3b33"
      }
    }
  }
  // Instantiate the Web3Modal
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions
  });

  // If user has connected to site before, automatically connect their wallet
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // Connect user to correct chain
  const switchNetwork = async () => {
    try {
      library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(deployedChainId)}]
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Connects wallet when user presses connect wallet button
  const connectWallet = async () => {
    try{
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();

      await switchNetwork();

      const tmcContract = new ethers.Contract(tmcContractAddress, abi, signer);

      const accounts = await library.listAccounts();

      if(accounts) {
        setAccount(accounts[0]);
        setTruncAccount(truncateEthAddress(accounts[0]));
      }

      setProvider(provider);
      setLibrary(library);
      setTmcContract(tmcContract);

      // Update total minted to display on site
      setTotalMinted(ethers.utils.formatUnits(await tmcContract.totalSupply(), 0));
      // Update current mint price
      setPublicPrice(ethers.utils.formatEther(await tmcContract.diamondPublicPrice()));
      

      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Mint clicked handler function for minting for public sale
  const mint = async () => {
    // try {
    //   let mintTx = await tmcContract.mintDiamond(count, { value: ethers.utils.parseEther((count * publicPrice).toString())});
    //   await mintTx.wait();

    //   alert(`Your mint transaction was successful: https://etherscan.io/tx/${mintTx.hash}`)
    //   setTotalMinted(ethers.utils.formatUnits(await tmcContract.totalSupply(), 0));
    // } catch (err) {
    //   if(err.toString().includes('insufficient')){
    //     alert("You do not have enough ETH in your wallet to mint.");
    //   }

    //   if(err.toString().includes('denied trans')){
    //     alert("You declined the mint transaction.")
    //   }

    //   if(err.toString().includes('not started')){
    //     alert("Public sale is not live.")
    //   }
    // }

    // alert(`Minting placeholder to mint ${count} Pixel Pandas`);


    handleOpenMinting(); // Handles opening modal
    await new Promise(resolve => setTimeout(resolve, 5000));
    handleCloseMinting();

    handleOpenFreeMint();
    await new Promise(resolve => setTimeout(resolve, 10000));
    handleCloseFreeMint();

    handleOpenPaidMint();
    await new Promise(resolve => setTimeout(resolve, 10000));
    handleClosePaidMint();

  }
  
  // Lets user disconnect wallet from site
  const disconnect = async () => {
    web3Modal.clearCachedProvider();
    setConnected(false);
    setProvider("");
    setLibrary("");
    setTruncAccount("");
    localStorage.clear();
  };


  return (
    <>
  <div className="page-wrapper">
    <div className="page-bg">
      <div className="top-nav">
        <div className="container">
          <div className="mid-div social-link-hold">
            <a
              href="https://twitter.com/PixelPandas_NFT"
              target="_blank"
              className="social-link w-inline-block"
            >
              <img
                src={twitterLogo}
                loading="lazy"
                alt=""
                className="social-icon"
              />
            </a>
            <a
              href="https://raritysniper.com/nft-drops-calendar"
              target="_blank"
              className="social-link w-inline-block"
            >
              <img
                src={raritySniperLogo}
                loading="lazy"
                alt=""
                className="social-icon"
              />
            </a>
            <a href="#" className="social-link w-inline-block">
              <img
                src={openseaLogo}
                loading="lazy"
                alt=""
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mid-section">
        <div className="container">
          <div className="mid-div vertical">
            <img
              src={pxPanLogo}
              loading="lazy"
              srcSet={`${pp500} 500w, ${pp800} 800w, ${pp1080} 1080w, ${pp1600} 1600w, ${pp2000} 2000w`}
              sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 90vw, 860px"
              alt=""
              className="big-logo"
            />
            <img
              src={require("./images/pxgif.gif")}
              loading="lazy"
              width={500}
              alt=""
              className="big-gif"
            />
            <div hidden={mintingEnabled === false}>
              {/* Disconnected to wallet */}
              <div hidden={connected === true}>
                <div className="mint-card-connect">
                  <img
                    src={require("./images/Emerald.gif")}
                    loading="lazy"
                    id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
                    alt=""
                    className="mint-image"
                  />
                  <br /><br />
                  <h1 className="mint-text-2">MINT NOW!</h1>
                  <br />
                  <button className="login-button" onClick={() => connectWallet()} hidden={connected}>Connect Wallet</button>
                </div>
              </div>

              {/* Connected to wallet */}
              <div hidden={connected === false}>
                <div className="mint-card">
                    <img
                      src={require("./images/Emerald.gif")}
                      loading="lazy"
                      id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
                      alt=""
                      className="mint-image"
                    />
                    <h1 className="mint-text-2">MINT NOW!</h1>
                    <button className="login-button" onClick={() => connectWallet()} hidden={connected}>Connect Wallet</button>
                    <h1 className="heading-2" hidden={connected === false}>{count}</h1>
                    <span className="plus-minus-buttons">
                      <button className="plus-button" hidden={connected === false} onClick={() => onPlusClicked()}>+</button>
                      <button className="minus-button" hidden={connected === false} onClick={() => onMinusClicked()}>-</button>
                    </span>
                    <button className="mint-button" onClick={() => mint()} hidden={connected === false}>Mint</button>
                    <div hidden={connected === false}>
                      <h1 className="mint-text-4">Total cost:<br></br><br></br> 50% Chance Free + Gas</h1>
                      <h1 className="mint-text-4">50% Chance 0.01 ETH + Gas</h1>
                    </div>
                    <span className="disconnect-container">
                      <button className="disconnect-button" onClick={() => disconnect()} hidden={connected === false}>Disconnect</button>
                    </span>
                  </div>
              </div>
            
            {/* Minting in progress modal */}
            <div>
              <Modal
                open={isMinting}
                onClose={handleCloseMinting}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <div className="modal-image">
                  <h1 className="mint-text-1">Minting your Pixel Pandas!</h1>
                  
                    <img
                      src={require("./images/pxgif.gif")}
                      loading="lazy"
                      id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
                      alt=""
                      className="mint-image"
                    />
                  <div className="spinner-container">
                    <MutatingDots 
                      height="100"
                      width="100"
                      color="red"
                      secondaryColor= 'white'
                      radius='12.5'
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                  <br />
                  <h1 className="mint-text-3">Waiting for blockchain confirmation...</h1>
                  </div>
                </Box>
              </Modal>
            </div>

            {/* Minting free mint success */}
            
            <div>
            <Confetti height={4000} run={showFreeMint} hidden={showFreeMint === false}/>
              <Modal
                open={showFreeMint}
                onClose={handleCloseFreeMint}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                
                <Box sx={style}>
                
                <div className="modal-image">
                  <h1 className="mint-text-1">Winner!</h1>
                  
                    <img
                      src={require("./images/Win.gif")}
                      loading="lazy"
                      id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
                      alt=""
                      className="mint-image-1"
                    />
                  <br />
                  <h1 className="mint-text-3">{amtFree} of your Pixel Pandas were free, but you ended up paying {amtPaid * 0.01} ETH!</h1>
                  <button className="close-button" onClick={() => handleCloseFreeMint()}>close</button>
                  </div>
                </Box>
              </Modal>
            </div>

          {/* Minting paid success */}
            
          <div>
              <Modal
                open={showPaidMint}
                onClose={handleClosePaidMint}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                
                <Box sx={style}>
                
                <div className="modal-image">
                  <h1 className="mint-text-1">Loser!</h1>
                  
                    <img
                      src={require("./images/Lose.gif")}
                      loading="lazy"
                      id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
                      alt=""
                      className="mint-image-1"
                    />
                  <br />
                  <h1 className="mint-text-3">{amtFree} of your Pixel Pandas were free, but you ended up paying {amtPaid * 0.01} ETH!</h1>
                  <button className="close-button" onClick={() => handleClosePaidMint()}>close</button>
                  </div>
                </Box>
              </Modal>
            </div>
            </div>
            

          <div className="w-container" />
          </div>
        </div>
        <div className="legendary-container">
          <h1 className="heading-2">Minting August 8,< br/>5PM PST!</h1>
        </div>
        <div className="legendary-container">
          <h1 className="heading-2">LEGENDARY Auction: TBA</h1>
        </div>
      </div>
      <div className="w-container">
        <div className="w-layout-grid grid">
          <img
            src={require("./images/Fire.gif")}
            loading="lazy"
            id="w-node-bb210c52-4b3f-c34d-3eda-ac268c70eab7-dc4c1064"
            alt=""
            className="image-2"
          />
          <img
            src={require("./images/Laughing-Gold.gif")}
            loading="lazy"
            id="w-node-_91fb36a5-144d-af8e-7b8d-6cc5fc5ad2f1-dc4c1064"
            alt=""
            className="image-3"
          />
          <img
            src={require("./images/Fox.gif")}
            loading="lazy"
            id="w-node-_723014db-acba-0216-6319-2201aefbc70d-dc4c1064"
            alt=""
            className="image-4"
          />
          <img
            src={require("./images/Gundam.gif")}
            loading="lazy"
            id="w-node-_556bf8ce-a327-aee8-ca7c-5563473d6212-dc4c1064"
            alt=""
            className="image-5"
          />
          <img
            src={require("./images/Titan.gif")}
            loading="lazy"
            id="w-node-_64e45a7c-af43-81e1-53a6-d5eeabe80c25-dc4c1064"
            alt=""
            className="image-6"
          />
          <img
            src={require("./images/Sakura.gif")}
            loading="lazy"
            id="w-node-c2fc1bde-2687-9129-b477-dd81658da03f-dc4c1064"
            alt=""
            className="image-7"
          />
          <img
            src={require("./images/Dark.gif")}
            loading="lazy"
            id="w-node-cecd523a-a0c4-fe04-26b7-cb8d5dec3868-dc4c1064"
            alt=""
            className="image-8"
          />
          <img
            src={require("./images/Astronaut-In-the-Ocean.gif")}
            loading="lazy"
            id="w-node-f3dc5a92-93f6-2ba7-7136-97acf042c223-dc4c1064"
            alt=""
            className="image-9"
          />
        </div>
      </div>
      <div className="faq-section">
        <a className="button w-button">
          {" "}
          FAQ's{" "}
        </a>
        <div className="container">
          <div className="mid-div vertical">
            <div className="faq-container">
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">What's tHIS?</h3>
                </div>
                <div className="faq-ans">
                  <div className="faq-ans-ins">
                    <p className="para">
                      <span>
                        <strong>
                          -No Roadmap
                          <br />
                          -No Discord
                          <br />
                          -CC0
                          <br />
                          -Instant Reveal
                          <br />
                          -7.5% Royalties
                        </strong>
                      </span>
                      <span className="text-span-7">
                        <strong>
                          <br />
                          <br />
                        </strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">
                    WHO CREATED PIXELPANDAS?
                  </h3>
                </div>
                <div className="faq-ans">
                  <p className="para faq-para">
                    <strong>
                      Brought to you by the team behind Panda Paradise, <br />
                      <br />
                      Panda's exist on multiple planes of existence, stay tuned
                      for more versions as we aim to be the most inclusive
                      project in terms of interoperability and art forms.
                      <br /><br />
                      Pixel Panda's are an extension of art and creativity to
                      reward current Panda Paradise Holders.{" "}
                    </strong>
                    <br />
                  </p>
                  <div className="columns w-row">
                    <div className="w-col w-col-4">
                      <img
                        src={require('./images/Panda.jpg')}
                        loading="lazy"
                        srcSet={`${require('./images/Panda-p-500.jpeg')} 500w, ${require('./images/Panda-p-800.jpeg')} 800w, ${require('./images/Panda-p-1080.jpeg')} 1080w, ${require('./images/Panda-p-1600.jpeg')} 1600w, ${require('./images/Panda-p-2000.jpeg')} 2000w, ${require('./images/Panda-p-2600.jpeg')} 2600w, ${require('./images/Panda-p-3200.jpeg')} 3200w, ${require('./images/Panda.jpg')} 5056w`}
                        sizes="(max-width: 479px) 81vw, (max-width: 767px) 220.546875px, (max-width: 991px) 26vw, 233.328125px"
                        alt=""
                        className="image"
                      />
                      <h2 className="heading">
                        <span>PandaGenesis</span>
                        <span className="text-span-3">
                          <br />
                        </span>
                        <span className="text-span-2">AKA @NFTDennis</span>
                      </h2>
                    </div>
                    <div className="w-col w-col-4">
                      <img
                        src={require('./images/Pink-Panda.jpg')}
                        loading="lazy"
                        srcSet={`${require('./images/Pink-Panda-p-500.jpeg')} 500w, ${require('./images/Pink-Panda-p-800.jpeg')} 800w, ${require('./images/Pink-Panda-p-1080.jpeg')} 1080w, ${require('./images/Pink-Panda-p-1600.jpeg')} 1600w, ${require('./images/Pink-Panda-p-2000.jpeg')} 2000w, ${require('./images/Pink-Panda-p-2600.jpeg')} 2600w, ${require('./images/Pink-Panda-p-3200.jpeg')} 3200w, ${require('./images/Pink-Panda.jpg')} 5056w`}
                        sizes="(max-width: 479px) 81vw, (max-width: 767px) 42vw, (max-width: 991px) 26vw, 233.328125px"
                        alt=""
                        className="image"
                      />
                      <h2 className="heading">
                        PandaSakura
                        <br />
                        <span className="text-span-2">AKA Krystal</span>
                      </h2>
                    </div>
                    <div className="w-col w-col-4">
                      <img
                        src={require('./images/Punk-Panda.jpg')}
                        loading="lazy"
                        srcSet={`${require('./images/Punk-Panda-p-500.jpeg')} 500w, ${require('./images/Punk-Panda-p-800.jpeg')} 800w, ${require('./images/Punk-Panda-p-1080.jpeg')} 1080w, ${require('./images/Punk-Panda-p-1600.jpeg')} 1600w, ${require('./images/Punk-Panda-p-2000.jpeg')} 2000w, ${require('./images/Punk-Panda-p-2600.jpeg')} 2600w, ${require('./images/Punk-Panda-p-3200.jpeg')} 3200w, ${require('./images/Punk-Panda.jpg')} 5056w`}
                        sizes="(max-width: 479px) 81vw, (max-width: 767px) 33vw, (max-width: 991px) 26vw, 233.328125px"
                        alt=""
                        className="image"
                      />
                      <h2 className="heading">
                        FrostyDog
                        <br />
                        <span className="text-span-2">AKA Sean</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">
                    How many pixel pandas are there?
                  </h3>
                </div>
                <div className="faq-ans">
                <p className="para faq-para">
                    <strong>
                      There will be a total of 8,888 Pixel Panda's
                      <br />
                      <br />8 Animated Rares for Auction
                      <br />3 Secret Legendary <br />
                      100 Reserved for Team + Giveaways
                    </strong>
                  </p>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">50% CHANCE Free MINT?</h3>
                </div>
                <div className="faq-ans">
                <p className="para faq-para">
                  <span>
                    <strong>
                      8,780 Available for 50% Chance Free Mint
                      <br />
                      Built on ERC50/50
                      <br />
                      Cost : .01 ETH or FREE + gas
                      <br />
                      Panda Paradise holders have priority whitelist ( Max 10 per whitelisted
                      wallet)
                      <br />
                      Public Mint Limit 3 Per Wallet
                    </strong>
                  </span>
                </p>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">
                    WHAT IS THE ROYALTY FEE?
                  </h3>
                </div>
                <div className="faq-ans">
                  <p className="para faq-para">
                    To further the development of Panda Paradise in the
                    metaverse, secondary market royalties will be 7.5% not
                    including Opensea's 2.5%. <br />
                    <br />
                    Royalties will be used as team salary and redistributed to
                    the community treasury through giveaways or experiences.{" "}
                    <br />
                    <br />
                    Being tired of seeing rug after rug, and projects with no
                    real utility , we were inspired to create a free mint with
                    no utility promised. Instead, we will under promise and
                    overdeliver. Whatever happens, happens.{" "}
                  </p>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">
                    HOW TO get on the Whitelist?
                  </h3>
                </div>
                <div className="faq-ans">
                  <p className="para faq-para">
                    When you this webpage the Whitelist is Already full. We
                    decided to stealth launch giving our early supporters
                    priority access to the Free Mint.
                  </p>
                </div>
              </div>
              <div className="faq-hold">
                <div className="faq-qstn">
                  <h3 className="h3-heading h3-faq">ROADMAP?</h3>
                </div>
                <div className="faq-ans">
                  <p className="para faq-para">
                    No roadmap, if we do dope shit, you will just wish you were
                    there.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top-nav">
        <div className="container">
          <div className="mid-div social-link-hold">
            <a
              href="https://twitter.com/pixelpandas"
              target="_blank"
              className="social-link w-inline-block"
            >
              <img
                src="images/5296514_bird_tweet_twitter_twitter-logo_icon.svg"
                loading="lazy"
                alt=""
                className="social-icon"
              />
            </a>
            <a
              href="https://discord.gg/doodlepenguins"
              target="_blank"
              className="social-link w-inline-block"
            />
            <a href="#" className="social-link w-inline-block">
              <img
                src="images/logo-01.svg"
                loading="lazy"
                alt=""
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* [if lte IE 9]><![endif] */}
</>

  );
}

export default Mint;