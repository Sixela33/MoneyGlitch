// swap.ts
import { client } from './DexClient';

interface ArbitrageOpportunity {
    firstPair: string;
    secondPair: string;
    thirdPair: string;
    profitRatio: number;
    tradingPath: string[];
    estimatedProfit: number;
}

/**
 * Execute a triangular arbitrage trade
 */
async function executeArbitrageSwap(opportunity: ArbitrageOpportunity, amount: number) {
  try {
    if (!process.env.SOLANA_PRIVATE_KEY) {
      throw new Error('Missing SOLANA_PRIVATE_KEY in .env file');
    }

    console.log("\nExecuting arbitrage trade:");
    console.log("------------------------");
    console.log(`Path: ${opportunity.tradingPath.join(' → ')}`);
    console.log(`Expected profit: ${(opportunity.profitRatio * 100).toFixed(3)}%`);
    console.log(`Estimated profit: $${opportunity.estimatedProfit.toFixed(2)}`);

    // Execute first swap
    console.log("\nExecuting first swap...");
    const firstSwap = await client.dex.executeSwap({
      chainId: '501',
      fromTokenAddress: opportunity.firstPair.split('-')[0],
      toTokenAddress: opportunity.firstPair.split('-')[1],
      amount: amount.toString(),
      slippage: '0.5',
      userWalletAddress: process.env.SOLANA_WALLET_ADDRESS!
    });

    if (!firstSwap.details?.toToken.amount) {
      throw new Error('First swap failed');
    }

    // Execute second swap
    console.log("\nExecuting second swap...");
    const secondSwap = await client.dex.executeSwap({
      chainId: '501',
      fromTokenAddress: opportunity.secondPair.split('-')[0],
      toTokenAddress: opportunity.secondPair.split('-')[1],
      amount: firstSwap.details?.toToken.amount || '',
      slippage: '0.5',
      userWalletAddress: process.env.SOLANA_WALLET_ADDRESS!
    });

    if (!secondSwap.details?.toToken.amount) {
      throw new Error('Second swap failed');
    }

    // Execute third swap
    console.log("\nExecuting final swap...");
    const thirdSwap = await client.dex.executeSwap({
      chainId: '501',
      fromTokenAddress: opportunity.thirdPair.split('-')[0],
      toTokenAddress: opportunity.thirdPair.split('-')[1],
      amount: secondSwap.details?.toToken.amount || '',
      slippage: '0.5',
      userWalletAddress: process.env.SOLANA_WALLET_ADDRESS!
    });

    if (!thirdSwap.details?.toToken.amount) {
      throw new Error('Third swap failed');
    }

    console.log("\nArbitrage trade completed successfully!");
    console.log("Final results:");
    
    const profitPercentage = (Number(thirdSwap.details?.toToken.amount || 0) / amount * 100).toFixed(3) + '%'
    
    console.log(JSON.stringify({
      initialAmount: amount,
      finalAmount: thirdSwap.details?.toToken.amount || '',
      profit: thirdSwap.details?.toToken.amount || 0 - amount,
      profitPercentage: profitPercentage
    }, null, 2));

    return {
      firstSwap,
      secondSwap,
      thirdSwap,
      totalProfit: thirdSwap.details?.toToken.amount || 0 - amount
    };

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error executing arbitrage:', error.message);
      if (error.message.includes('API Error:')) {
        const match = error.message.match(/API Error: (.*)/);
        if (match) console.error('API Error Details:', match[1]);
      }
    }
    throw error;
  }
}

// Export both functions
export { executeArbitrageSwap };