import { client } from './DexClient';

// Constants
const DEFAULT_MIN_PROFIT_THRESHOLD = 0.0005; // 0.05% minimum profit threshold
const DEFAULT_SIMULATION_AMOUNT = 1000; // Initial amount for simulation
const DEFAULT_BASE_CURRENCIES = ['USDT', 'USDC', 'SOL'];
const DEFAULT_POLLING_INTERVAL = 5000; // 5 seconds

interface Ticker {
    instId: string;
    last: string;
    bidPx: string;
    askPx: string;
}

export interface ArbitrageOpportunity {
    firstPair: string;
    secondPair: string;
    thirdPair: string;
    profitRatio: number;
    tradingPath: string[];
    estimatedProfit: number;
}

interface ArbitrageConfig {
    minProfit?: number;
    baseCurrencies?: string[];
    maxResults?: number;
    simulationAmount?: number;
    pollingInterval?: number;
}

interface MonitoringConfig extends ArbitrageConfig {
    onOpportunityFound?: (opportunities: ArbitrageOpportunity[]) => void;
    onError?: (error: Error) => void;
    onNoOpportunities?: () => void;
}

/**
 * Get market tickers from OKX
 */
async function getTickers(): Promise<Ticker[]> {
    try {
        // Using raw API call since the SDK might not have direct ticker access
        const response = await fetch('https://www.okx.com/api/v5/market/tickers?instType=SPOT');
        const data = await response.json();
        
        if (data.code === '0') {
            return data.data;
        } else {
            throw new Error(`API Error: ${data.msg}`);
        }
    } catch (error) {
        console.error('Error fetching tickers:', error);
        throw error;
    }
}

/**
 * Simulate a triangular arbitrage trade
 */
function simulateTriangularTrade(
    initialAmount: number, 
    firstTicker: Ticker, 
    secondTicker: Ticker, 
    thirdTicker: Ticker
): { finalAmount: number; profit: number } {
    // First trade: Buy with ask price
    const amountAfterFirst = initialAmount / parseFloat(firstTicker.askPx);
    
    // Second trade: Buy with ask price
    const amountAfterSecond = amountAfterFirst / parseFloat(secondTicker.askPx);
    
    // Third trade: Sell with bid price
    const finalAmount = amountAfterSecond * parseFloat(thirdTicker.bidPx);
    
    const profit = finalAmount - initialAmount;
    
    return { finalAmount, profit };
}

/**
 * Find triangular arbitrage opportunities with configuration
 */
export async function findTriangularArbitrageOpportunities(config: ArbitrageConfig = {}): Promise<ArbitrageOpportunity[]> {
    const {
        minProfit = DEFAULT_MIN_PROFIT_THRESHOLD,
        baseCurrencies = DEFAULT_BASE_CURRENCIES,
        maxResults = 10,
        simulationAmount = DEFAULT_SIMULATION_AMOUNT
    } = config;

    try {
        const tickers = await getTickers();
        const opportunities: ArbitrageOpportunity[] = [];
        
        // Create ticker lookup map
        const tickerMap = new Map<string, Ticker>();
        tickers.forEach(ticker => {
            tickerMap.set(ticker.instId, ticker);
        });
        
        // Build currency mapping
        const baseCurrencyPairs = new Map<string, Set<string>>();
        
        for (const ticker of tickers) {
            const [base, quote] = ticker.instId.split('-');
            if (!baseCurrencyPairs.has(base)) {
                baseCurrencyPairs.set(base, new Set());
            }
            baseCurrencyPairs.get(base)!.add(quote);
        }
        
        // Find triangular opportunities
        for (const startCurrency of baseCurrencies) {
            const quoteCurrencies = baseCurrencyPairs.get(startCurrency);
            if (!quoteCurrencies) continue;
            
            for (const firstQuote of quoteCurrencies) {
                const secondPairs = baseCurrencyPairs.get(firstQuote);
                if (!secondPairs) continue;
                
                for (const secondQuote of secondPairs) {
                    // Check if we can complete the triangle
                    const thirdPair = `${secondQuote}-${startCurrency}`;
                    
                    const firstTicker = tickerMap.get(`${startCurrency}-${firstQuote}`);
                    const secondTicker = tickerMap.get(`${firstQuote}-${secondQuote}`);
                    const thirdTicker = tickerMap.get(thirdPair);
                    
                    if (firstTicker && secondTicker && thirdTicker) {
                        const { finalAmount, profit } = simulateTriangularTrade(
                            simulationAmount,
                            firstTicker,
                            secondTicker,
                            thirdTicker
                        );
                        
                        const profitRatio = profit / simulationAmount;
                        
                        if (profitRatio > minProfit) {
                            opportunities.push({
                                firstPair: firstTicker.instId,
                                secondPair: secondTicker.instId,
                                thirdPair: thirdTicker.instId,
                                profitRatio,
                                tradingPath: [firstTicker.instId, secondTicker.instId, thirdTicker.instId],
                                estimatedProfit: profit
                            });
                        }
                    }
                }
            }
        }
        
        // Sort by profit ratio and limit results
        opportunities.sort((a, b) => b.profitRatio - a.profitRatio);
        
        return opportunities.slice(0, maxResults);
        
    } catch (error) {
        console.error('Error finding arbitrage opportunities:', error);
        throw error;
    }
}

/**
 * Start continuous monitoring for arbitrage opportunities
 */
export function startArbitrageMonitoring(config: MonitoringConfig = {}): { stop: () => void } {
    const {
        pollingInterval = DEFAULT_POLLING_INTERVAL,
        onOpportunityFound = (opportunities) => {
            console.log(`\n🚀 Found ${opportunities.length} arbitrage opportunities:`);
            opportunities.forEach((opp, index) => {
                console.log(`\n${index + 1}. Path: ${opp.tradingPath.join(' → ')}`);
                console.log(`   Profit: ${(opp.profitRatio * 100).toFixed(4)}% (~$${opp.estimatedProfit.toFixed(2)})`);
            });
        },
        onError = (error) => {
            console.error('❌ Monitoring error:', error.message);
        },
        onNoOpportunities = () => {
            console.log('⏳ No profitable opportunities found, continuing to monitor...');
        },
        ...arbitrageConfig
    } = config;

    console.log('🔍 Starting triangular arbitrage monitoring...');
    console.log(`📊 Config: Min profit: ${(arbitrageConfig.minProfit || DEFAULT_MIN_PROFIT_THRESHOLD) * 100}%, Interval: ${pollingInterval}ms`);
    console.log(`💱 Base currencies: ${arbitrageConfig.baseCurrencies?.join(', ') || DEFAULT_BASE_CURRENCIES.join(', ')}`);

    let isRunning = true;

    const monitor = async () => {
        while (isRunning) {
            try {
                const opportunities = await findTriangularArbitrageOpportunities(arbitrageConfig);
                
                if (opportunities.length > 0) {
                    onOpportunityFound(opportunities);
                } else {
                    onNoOpportunities();
                }
                
                // Wait for next polling interval
                if (isRunning) {
                    await new Promise(resolve => setTimeout(resolve, pollingInterval));
                }
                
            } catch (error) {
                onError(error as Error);
                
                // Wait before retrying on error
                if (isRunning) {
                    await new Promise(resolve => setTimeout(resolve, pollingInterval));
                }
            }
        }
    };

    // Start monitoring
    monitor();

    // Return stop function
    return {
        stop: () => {
            console.log('🛑 Stopping arbitrage monitoring...');
            isRunning = false;
        }
    };
}

/**
 * Legacy function for backward compatibility
 */
export async function monitorArbitrageOpportunities(): Promise<void> {
    const opportunities = await findTriangularArbitrageOpportunities();
    
    if (opportunities.length > 0) {
        console.log(`\nFound ${opportunities.length} arbitrage opportunities:`);
        
        opportunities.slice(0, 5).forEach((opp, index) => {
            console.log(`\n${index + 1}. Path: ${opp.tradingPath.join(' → ')}`);
            console.log(`   Profit: ${(opp.profitRatio * 100).toFixed(4)}% (~$${opp.estimatedProfit.toFixed(2)})`);
        });
    } else {
        console.log('No profitable arbitrage opportunities found.');
    }
}
